import {loadDungeon, loadPlayer, saveDungeon, savePlayer} from "./helpers/dataHelper.js";
import {generateNewTopology} from "./helpers/generationHelper.js";
import readline from "readline";
import {Dungeon} from "./objects/dungeon.js";
import {Character} from "./objects/character.js";
import {characterAction} from "./helpers/characterActionHelper.js";
import {
    getAllSpellTomes, getRandomArmsPiece, getRandomFootPiece,
    getRandomHeadPiece,
    getRandomMainPiece, getRandomShield, getRandomWeapon,
} from "./resources/tables.js";
import {checkCombat} from "./helpers/combatHelper.js";

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

let player = new Character("Player", {x: 0, y: 0}, 10000, 10000, 10000, true);
let root = generateNewTopology();
let dungeon = new Dungeon(root, player.characterLevel);
dungeon.playerPos = {x: player.pos.x, y: player.pos.y};
dungeon.print();
console.log("\x1b[?25l");

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

process.stdin.on('keypress', async (chunk, key) => {
    if (!key) return;

    console.clear();
    console.log("\x1b[?25l");
    if (key.name === 'q' && !player.isInInventory && !player.isInSpellbook && !player.isFighting && !player.isTrading) {
        process.exit();
    }

    if(key.name === 'n') {
        root = generateNewTopology();
        dungeon = new Dungeon(root, player.characterLevel);
        player.pos = {x: dungeon.root.x, y: dungeon.root.y};
    }
    if (key.name === "f5") {
        await saveDungeon(dungeon);
        await savePlayer(player);
        console.log("saved game");
    }
    if (key.name === "f9") {
        dungeon = await loadDungeon();
        player = await loadPlayer();
        player.pos = dungeon.playerPos;
        console.log("loaded game");
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

