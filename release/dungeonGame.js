import {loadDungeon, loadPlayer, saveDungeon, savePlayer} from "./helpers/dataHelper.js";
import {generateNewTopology} from "./helpers/generationHelper.js";
import readline from "readline";
import {Dungeon} from "./objects/dungeon.js";
import {Character} from "./objects/character.js";
import {characterAction} from "./helpers/characterActionHelper.js";
import {getRandomSpellTome, items} from "./resources/tables.js";
import {getRandomLeveledEnemy} from "./helpers/npcHelper.js";
import {getId} from "./helpers/functionsHelper.js";

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

let player = new Character("Player", {x: 0, y: 0}, 100, 100, 100, true, 1);
let root = generateNewTopology();
let dungeon = new Dungeon(root, player.characterLevel);

dungeon.print(player.pos);
console.log("\x1b[?25l");

player.addItemToInventory(items.common[0].clone());
player.addItemToInventory(items.rare[0].clone());
player.addItemToInventory(items.mythic[11].clone());
player.addItemToInventory(items.rare[29].clone());
player.addItemToInventory(getRandomSpellTome("Common"));

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
    if (!player.isInInventory && !player.isInSpellbook && !player.isTrading && !player.isFighting) {
        dungeon.enemyTurn();
        dungeon.print(player.pos);
    }

    player.printStatus();
});

