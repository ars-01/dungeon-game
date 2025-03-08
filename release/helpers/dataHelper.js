import * as fs from 'fs';
import {Node} from "../objects/node.js";
import {Dungeon} from "../objects/dungeon.js";

//save data
export const saveGraph = async (root) => {
    const graphJSON = JSON.stringify(root.getSubGraphArray());
    await fs.writeFile(`./resources/graph.json`, graphJSON, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

export const saveDungeon = async (dungeon) => {
    const dungeonJSON = JSON.stringify(dungeon.getSimplifiedCopy());
    await fs.writeFile(`./resources/dungeon.json`, dungeonJSON, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

//load data
export const loadGraph = async () => {
    const _root = await JSON.parse(fs.readFileSync(`./resources/graph.json`, 'utf8'));
    return await graphFromJSON(_root);
}

export const loadDungeon = async () => {
    const _dungeon = await JSON.parse(fs.readFileSync(`./resources/dungeon.json`, 'utf8'));
    return await dungeonFromJSON(_dungeon);
}

const graphFromJSON = (data) => {
    const nodeArray = [];
    for (const shallowNode of data) {
        nodeArray.push(new Node(shallowNode.id, shallowNode.x, shallowNode.y));
    }

    for (const shallowNode of data) {
        let parent = nodeArray.find(parentNode => parentNode.id === shallowNode.parent);
        const child = nodeArray.find(node => node.id === shallowNode.id);
        if (parent)
            parent.addChild(child);
        if (child)
            child.setParent(parent ? parent : null);
    }

    return nodeArray.find(node => node.id === 0);
}

const dungeonFromJSON = (data) => {
    const root = graphFromJSON(data.root);
    const dungeon = new Dungeon(data.level, root);
    dungeon.playerPos = data.playerPos;
    return dungeon;
}