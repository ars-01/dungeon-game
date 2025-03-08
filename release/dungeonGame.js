import {loadGraph, saveDungeon, saveGraph} from "./helpers/dataHelper.js";
import {generateNewTopology, printLayout} from "./helpers/generationHelper.js";
import readline from "readline";
import {Dungeon} from "./objects/dungeon.js";

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
    process.stdin.setRawMode(true);

let root = generateNewTopology();
let dungeon = new Dungeon(root);
let pos = {x:0, y:0};
dungeon.print(pos);

process.stdin.on('keypress', async (chunk, key) => {
    if (!key) return;

    console.clear();
    if (key.name === 'q') {
        process.exit();
    }

    if(key.name === 'n') {
        root = generateNewTopology();
        pos = {x: 0, y: 0};
        dungeon = new Dungeon(root);
    }
    if (key.name === "s") {
        await saveGraph(root);
        //await saveDungeon(dungeon);
        console.log("saved graph");
    }
    if (key.name === "l") {
        root = await loadGraph();
        pos = {x: 0, y:0};
        dungeon = new Dungeon(root);
        console.log("loaded graph");
    }
    if (key.name === "p") {
        console.log(root.printSubGraph());
    }

    moveHighlight(key.name);
    dungeon.print(pos);
    console.log(root.getSize());
});

const moveHighlight = (keyName) => {
    switch (keyName) {
        case "up":
            if (root.edgeExists(pos, {x: pos.x, y: pos.y - 1}))
                pos.y--;
            break;
        case "down":
            if (root.edgeExists(pos, {x: pos.x, y: pos.y + 1}))
                pos.y++;
            break;
        case "left":
            if (root.edgeExists(pos, {x: pos.x - 1, y: pos.y}))
                pos.x--;
            break;
        case "right":
            if (root.edgeExists(pos, {x: pos.x + 1, y: pos.y}))
                pos.x++;
            break;
        default:
            break;
    }
}
