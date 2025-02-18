import {Player} from "./gameObjects/player.js";
import {Dungeon} from "./gameObjects/dungeon.js";
import readline from "readline";
import chalk from "chalk";
import {fight} from "./helpers/combatHelper.js";
import {inventoryActionResult} from "./helpers/inventoryHelper.js";
import {shopActionResult} from "./helpers/shopHelper.js";
import {Item} from "./gameObjects/item.js";
import promptSync from 'prompt-sync';
import {getItemId, playersList, showSavedPlayers} from "./helpers/dictionaries.js";
import {loadData, loadPlayersList, saveData} from "./helpers/dataHelper.js";


readline.emitKeypressEvents(process.stdin);

const prompt = promptSync();
let player;
let dungeon;

if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

const newGame = async () => {
    const playerName = prompt(chalk.green("Name your character: "));

    console.log(chalk.green("Choose your starting class: \n1. Warrior\n2. Mage"));
    let playerClass = -1;
    while (playerClass < 0)
        playerClass = getItemId(2);

    if (playerName === "dev")
        player = new Player(playerName, playerClass, 30000000);
    else
        player = new Player(playerName, playerClass, 100);
    dungeon = new Dungeon(0, 3);
    dungeon.generate();
    return true;
}

const loadGame = async () => {
    await loadPlayersList();
    if (playersList.length <= 0) {
        console.log(chalk.green("No players found"));
        return false;
    }
    let index = -2;
    while (index < 0) {
        console.clear();
        showSavedPlayers();
        index = getItemId(playersList.length);
        if (index === -1)
            process.exit();
    }
    const {newPlayer, newDungeon} = await loadData(playersList[index]);
    player = await newPlayer.clone();
    dungeon = await newDungeon.clone();
    console.clear();
    dungeon.print(player.getPos());
    console.log(chalk.blueBright(`\nLoaded "${player.name}" data`));
    return true;
}

const boot = async () => {
    await loadPlayersList();
    const dialogueOptions = [
        chalk.green("1. New Game"),
        chalk.green("2. Load Game"),
        chalk.green("3. Quit"),
    ];
    let index = -2;
    while (index < 0) {
        console.clear();
        dialogueOptions.forEach((option) => {console.log(option);});
        if (playersList.length <= 0)
            console.log(chalk.blueBright("\nNo players found\nTry selecting \"2. Load Game\"\nIf this message shows" +
                " up again, there are no existing save files\n"));
        index = getItemId(dialogueOptions.length);
        if (index === -1)
            process.exit();
    }
    switch (index) {
        case 0:
            return await newGame();
        case 1:
            return await loadGame();
        case 2:
            process.exit();
            break;
        default:
            break;
    }
}

let bootSuccessful = false;

while (!bootSuccessful) {
    bootSuccessful = await boot();
}

console.clear();
dungeon.discoverRoom(player.getPos());
dungeon.print(player.getPos());

await saveData(player, dungeon);

process.stdin.on('keypress', async (chunk, key) => {
    console.clear();
    if (!key) return;
    if (key.name === 'q' || player.health <= 0) {
        process.exit();
    }

    //generates new dungeon of higher level if current dungeon is fully cleared
    if (key.name === 'n' && dungeon.isExplored()) {
        resetDungeon();
        if (dungeon.getLevel() < 10)
            player.addItem(new Item("Potion of Minor Increase Health", "Potion|Augment|Health", 1, 5, 0.25, "Common", 23));
        else if (dungeon.getLevel() < 20)
            player.addItem(new Item("Potion of Increase Health", "Potion|Augment|Health", 1, 10, 0.25, "Uncommon", 41));
        else if (dungeon.getLevel() < 30)
            player.addItem(new Item("Potion of Vigorous Increase Health", "Potion|Augment|Health", 1, 15, 0.25, "Rare", 85));
        else
            player.addItem(new Item("Potion of Ultimate Increase Health", "Potion|Augment|Health", 1, 20, 0.25, "Mythic", 275));
        player.damageMultiplier += 0.1;
    }

    //swaps action depending on player state
    if (!player.isInInventory())
        if (player.isFighting()) {
            fightingAction(key);
        } else if (player.isInShop()) {
            shopAction(key);
        } else {
            exploreAction(key);
        }
    else {
        inventoryAction(key)
    }

    //status actions
    if (key.name === 'i') {
        inventoryAction(key);
    }

    if (key.name === 's') {
        player.showStatus();
    }

    if (dungeon.isExplored()) {
        console.log(chalk.green(`You cleared the Dungeon (lvl. ${dungeon.getLevel()})`));
    }

    if (key.name === 'f5' && !player.isInInventory() && !player.isInShop() && !player.isFighting()) {
        saveData(player, dungeon);
    }

    if (key.name === 'f9' && !player.isInInventory() && !player.isInShop() && !player.isFighting()) {
        const {newPlayer, newDungeon} = await loadData(player.name);
        player = newPlayer.clone();
        dungeon = newDungeon.clone();
        console.clear();
        dungeon.print(player.getPos());
        console.log(chalk.blueBright(`\nLoaded "${player.name}" data`));
        await loadPlayersList();
    }

});

const resetDungeon = () => {
    let level = dungeon.getLevel() + 1;
    let size = dungeon.getSize();
    dungeon = new Dungeon(level, size);
    dungeon.generate();
}

const fightingAction = (key) => {
    const action = player.chooseCombatAction(key.name, dungeon.getSize(), dungeon.roomAt(player.getPos()).getEnemy());
    if (action === 2) {
        dungeon.discoverRoom(player.getPos());
    }

    dungeon.print(player.getPos());
    let playerFightResult = 0;

    if (action === 0) {
        playerFightResult = fight(player, dungeon.roomAt(player.getPos()).getEnemy());
    }

    if (action >= 0 && action !== 2 && dungeon.roomAt(player.getPos()).getEnemy().health > 0) {
        playerFightResult = fight(dungeon.roomAt(player.getPos()).getEnemy(), player);
    }

    if (playerFightResult === 1) {
        dungeon.exploreRoom(player, dungeon.roomAt(player.getPos()), dungeon.getLevel());
    }

    if (action !== 2 && playerFightResult !== 1)
        player.printChoice(dungeon.roomAt(player.getPos()).getEnemy());
}

const exploreAction = (key) => {
    player.move(key.name, dungeon.getSize());
    dungeon.discoverRoom(player.getPos());
    dungeon.print(player.getPos());
    if (key.name === 'return') {
        const result = dungeon.exploreRoom(player, dungeon.roomAt(player.getPos()), dungeon.getLevel());
        if (result === 1)
            player.printChoice();
        else if (result === 2)
            shopAction("left");
    }
}

const inventoryAction = (key) => {
    console.clear();
    dungeon.print(player.getPos());
    player.showInventory();
    player.inInventory = true;
    const action = player.chooseInventoryAction(key.name);
    const actionResult = inventoryActionResult(player, action, dungeon.roomAt(player.getPos()));
    if (actionResult === 4) {
        console.clear();
        dungeon.print(player.getPos());
    }
}

const shopAction = (key) => {
    console.clear();
    dungeon.print(player.getPos());
    const action = player.chooseShopAction(key.name);
    dungeon.roomAt(player.getPos()).getShop().checkStock();
    player.showInventory();
    const actionResult = shopActionResult(action, player, dungeon.roomAt(player.getPos()).getShop());
    if (actionResult === 2) {
        console.clear();
        dungeon.print(player.getPos());
    }
}