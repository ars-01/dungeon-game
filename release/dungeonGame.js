import {
    addNewSave,
    loadDungeon,
    loadPlayer,
    loadSave,
    loadSaveList,
    saveDungeon,
    savePlayer, wipeSaveData
} from "./helpers/dataHelper.js";
import {generateNewTopology} from "./helpers/generationHelper.js";
import readline from "readline";
import {Dungeon} from "./objects/dungeon.js";
import {Character} from "./objects/character.js";
import {characterAction} from "./helpers/characterActionHelper.js";
import {
    getAllSpellTomes, getRandomArmsPiece, getRandomFootPiece,
    getRandomHeadPiece,
    getRandomMainPiece, getRandomShield, getRandomWeapon, spells,
} from "./resources/tables.js";
import {checkCombat} from "./helpers/combatHelper.js";
import chalk from "chalk";
import {enterString, getId} from "./helpers/functionsHelper.js";

const mainMenuDialogueOptions = ["New Game", "Load Game", "Wipe Data", "Exit"];
let selectedOption = 0;
let startFlag = false;

console.log("\x1b[?25l");

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

let player;
let root;
let dungeon;

const devStart = () => {
    player = new Character("Dev", {x: 0, y: 0}, 10000, 10000, 10000, true, 0, true);
    player.isPlayer = true;
    root = generateNewTopology();
    dungeon = new Dungeon(root, player.characterLevel);
    dungeon.playerPos = {x: player.pos.x, y: player.pos.y};
    dungeon.print();

    player.addItemToInventory(getRandomHeadPiece("Mythic", "LightArmor"));
    player.addItemToInventory(getRandomMainPiece("Mythic", "LightArmor"));
    player.addItemToInventory(getRandomArmsPiece("Mythic", "LightArmor"));
    player.addItemToInventory(getRandomFootPiece("Mythic", "LightArmor"));
    player.addItemToInventory(getRandomHeadPiece("Mythic", "HeavyArmor"));
    player.addItemToInventory(getRandomMainPiece("Mythic", "HeavyArmor"));
    player.addItemToInventory(getRandomArmsPiece("Mythic", "HeavyArmor"));
    player.addItemToInventory(getRandomFootPiece("Mythic", "HeavyArmor"));
    player.addItemToInventory(getRandomWeapon("Mythic", "OneHanded"));
    player.addItemToInventory(getRandomWeapon("Mythic", "TwoHanded"));
    player.addItemToInventory(getRandomShield("Mythic"));
    for (const item of getAllSpellTomes())
        player.addItemToInventory(item);
}

const newGame = (playerName, playerClass) => {
    startFlag = true;
    player = new Character(playerName, {x: 0, y: 0}, 100, 100, 100, true, 0, true);
    player.isPlayer = true;
    root = generateNewTopology();
    dungeon = new Dungeon(root, player.characterLevel);
    dungeon.playerPos = {x: player.pos.x, y: player.pos.y};
    dungeon.print();

    switch (playerClass) {
        case 0: //Warrior
            player.addItemToInventory(getRandomHeadPiece("Common", "HeavyArmor"));
            player.addItemToInventory(getRandomMainPiece("Common", "HeavyArmor"));
            player.addItemToInventory(getRandomArmsPiece("Common", "HeavyArmor"));
            player.addItemToInventory(getRandomFootPiece("Common", "HeavyArmor"));
            player.addItemToInventory(getRandomWeapon("Common", "TwoHanded"));
            break;
        case 1: //Mage
            player.addItemToInventory(getRandomHeadPiece("Common", "Clothing"));
            player.addItemToInventory(getRandomMainPiece("Common", "Clothing"));
            player.addItemToInventory(getRandomArmsPiece("Common", "Clothing"));
            player.addItemToInventory(getRandomFootPiece("Common", "Clothing"));
            player.addItemToInventory(getRandomWeapon("Common", "OneHanded|Dagger"));
            player.learnSpell(spells.flames.clone());
            player.learnSpell(spells.healing.clone());
            break;
        case 2: //Thief
            player.addItemToInventory(getRandomHeadPiece("Common", "LightArmor"));
            player.addItemToInventory(getRandomMainPiece("Common", "LightArmor"));
            player.addItemToInventory(getRandomArmsPiece("Common", "LightArmor"));
            player.addItemToInventory(getRandomFootPiece("Common", "LightArmor"));
            player.addItemToInventory(getRandomWeapon("Common", "OneHanded"));
            player.addItemToInventory(getRandomShield("Common"));
            break;
        default:
            break;
    }
}

const loadGame = async () => {
    const saveList = await loadSaveList();
    for (let i = 0; i < saveList.length; i++) {
        console.log(chalk.green(`${i + 1}. ${saveList[i]}`));
    }
    let index = getId(1, saveList.length);
    if (index >= 0) {
        const data = await loadSave(saveList[index]);
        player = data.player;
        dungeon = data.dungeon;
        player.pos = dungeon.playerPos;
        startFlag = true;
    }
}

const mainMenu = async (keyName) => {
    let actionFlag = false;
    switch (keyName) {
        case "up":
            selectedOption = selectedOption - 1 < 0 ? mainMenuDialogueOptions.length - 1 : selectedOption - 1;
            break;
        case "down":
            selectedOption = selectedOption + 1 >= mainMenuDialogueOptions.length ? 0 : selectedOption + 1;
            break;
        case "return":
            actionFlag = true;
            break;
        default:
            break;
    }
    if (actionFlag) {
        await mainMenuAction(selectedOption);
    }

    for (let i = 0; i < mainMenuDialogueOptions.length; i++) {
        if (selectedOption === i)
            console.log(chalk.bold.green(`--> ${i + 1}. ` + mainMenuDialogueOptions[i]));
        else
            console.log(chalk.green(`${i + 1}. ` + mainMenuDialogueOptions[i]));
    }
}

const mainMenuAction = async (option) => {
    console.clear();
    let index = -100;
    switch (option) {
        case 0: //new game
            console.log(chalk.green("Choose your class\n"));
            console.log(chalk.green("1. Warrior"));
            console.log(chalk.green("2. Mage"));
            console.log(chalk.green("3. Thief"));
            index = getId(1, 3);
            if (index >= 0)
                newGame(enterString("Name your character: "), index);
            break;
        case 1: //load game
            await loadGame();
            break;
        case 2: //wipe data
            await wipeSaveData();
            break;
        case 3:
            process.exit();
            break;
        default:
            break;
    }
}

await mainMenu("left");
process.stdin.on('keypress', async (chunk, key) => {
    if (!key) return;
    console.clear();
    console.log("\x1b[?25l");
    if (!startFlag) {
        await mainMenu(key.name);
        return;
    }

    if (key.name === 'q' && !player.isInInventory && !player.isInSpellbook && !player.isFighting && !player.isTrading) {
        process.exit();
    }

    if (key.name === "escape") {
        startFlag = false;
    }

    if(key.name === 'n') {
        root = generateNewTopology();
        dungeon = new Dungeon(root, player.characterLevel);
        player.pos = {x: dungeon.root.x, y: dungeon.root.y};
    }
    if (key.name === "f5") {
        await addNewSave(player, dungeon, "Quicksave");
        console.log("Quicksaving");
    }
    if (key.name === "f6") {
        await addNewSave(player, dungeon);
    }
    if (key.name === "f9") {
        const data = await loadSave("Quicksave");
        dungeon = data.dungeon;
        player = data.player;
        player.pos = dungeon.playerPos;
        console.log("loaded Quicksave");
    }
    if (key.name === "i" && !player.isInSpellbook) {
        player.isInInventory = true;
    }
    if (key.name === "o" && !player.isInInventory) {
        player.isInSpellbook = true;
    }
    if (key.name === "p") {
        player.printEquipment(true);
    }

    characterAction(player, dungeon, key.name);
    dungeon.playerPos = {x: player.pos.x, y: player.pos.y};
    if (!player.isInInventory && !player.isInSpellbook && !player.isTrading && !player.isFighting) {
        if (!player.isRunningAway)
            dungeon.enemyTurn(player);
        dungeon.print();
    }
    checkCombat(player, dungeon);
    if (player.isFighting && !player.isRunningAway && !player.isInInventory && !player.isInSpellbook) {
        dungeon.enemyTurn(player);
    }
    player.printStatus();
    dungeon.cleanup();
});

