import { Node } from "../objects/node.js";
import {saveGraph} from "./dataHelper.js";
import chalk from "chalk";

const MAX_DEPTH = 5;
let id = 0;

const expand = (node, generation = 1) => {
    const up = {
        pos: {
            x: node.x,
            y: node.y - 1
        },
        probability: (Math.random() * MAX_DEPTH) - generation > 0
        //probability: (MAX_DEPTH) - generation > 0
    };
    const down = {
        pos: {
            x: node.x,
            y: node.y + 1
        },
        probability: (Math.random() * MAX_DEPTH) - generation > 0
        //probability: (MAX_DEPTH) - generation > 0
    };
    const left = {
        pos: {
            x: node.x - 1,
            y: node.y
        },
        probability: (Math.random() * MAX_DEPTH) - generation > 0
        //probability: (MAX_DEPTH) - generation > 0
    };
    const right = {
        pos: {
            x: node.x + 1,
            y: node.y
        },
        probability: (Math.random() * MAX_DEPTH) - generation > 0
        //probability: (MAX_DEPTH) - generation > 0
    };

    if (up.probability) {
        const upNode = new Node(++id, up.pos.x, up.pos.y, node);
        node.addChild(upNode);
        expand(upNode, generation + 1);
    }
    if (down.probability) {
        const downNode = new Node(++id, down.pos.x, down.pos.y, node);
        node.addChild(downNode);
        expand(downNode, generation + 1);
    }
    if (left.probability) {
        const leftNode = new Node(++id, left.pos.x, left.pos.y, node);
        node.addChild(leftNode);
        expand(leftNode, generation + 1);
    }
    if (right.probability) {
        const rightNode = new Node(++id, right.pos.x, right.pos.y, node);
        node.addChild(rightNode);
        expand(rightNode, generation + 1);
    }
}

export const printLayout = (node, highlightPos = {x: 0, y: 0}) => {
    const depth = node.getDepth();

    let outputString = '';
    for (let y = -depth; y < depth; y++) {
        for (let x = -depth; x < depth; x++) {
            if (node.hasChildAtPos({x: x, y: y}) || node.x === x && node.y === y) {
                if (x === highlightPos.x && y === highlightPos.y)
                    outputString += chalk.red(`+`);
                else
                    outputString += `+`;
            } else {
                outputString += " ";
            }
        }
        outputString += '\n';
    }

    console.log(outputString);
}

export const generateNewTopology = () => {
    id = 0;
    const root = new Node(0, 0, 0);
    expand(root);
    return root;
}