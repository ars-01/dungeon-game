import {loadDungeon, loadGraph, saveDungeon, saveGraph, savePlayer} from "./helpers/dataHelper.js";
import {generateNewTopology} from "./helpers/generationHelper.js";
import readline from "readline";
import {Dungeon} from "./objects/dungeon.js";
import {Character} from "./objects/character.js";

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

let root = generateNewTopology();
let dungeon = new Dungeon(root);
const player = new Character("Player", {x: 0, y: 0}, 100, 100, 100, true);
dungeon.print(player.pos);

process.stdin.on('keypress', async (chunk, key) => {
    if (!key) return;

    console.clear();
    if (key.name === 'q') {
        process.exit();
    }

    if(key.name === 'n') {
        root = generateNewTopology();
        player.pos = {x: 0, y: 0};
        dungeon = new Dungeon(root);
    }
    if (key.name === "f5") {
        await saveDungeon(dungeon);
        await savePlayer(player);
        console.log("saved graph");
    }
    if (key.name === "f9") {
        dungeon = await loadDungeon();
        player.pos = dungeon.playerPos;
        console.log("loaded graph");
    }
    if (key.name === "p") {
        console.log(dungeon.root.printSubGraph());
    }

    movePlayer(key.name);
    dungeon.print(player.pos);
    player.printStatus();

});

const movePlayer = (keyName) => {
    player.move(dungeon.root, keyName);
}
