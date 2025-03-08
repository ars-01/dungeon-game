import {getNewRoom, Room} from "./dungeonRoom.js";
import chalk from 'chalk';
import {processDrop, processEncounter} from "../helpers/roomHelper.js";
import {roomArray} from "../helpers/dictionaries.js";
import {getNewTopology, ShallowNode} from "../helpers/generationHelper.js";

export class Dungeon {
    layout = [];
    level = 0;
    width = 0;
    height
    layoutMap = "";
    topology = [];

    constructor(level) {
        this.level = level;
    }

    clone() {
        const copy = new Dungeon(this.level);
        copy.width = this.width;
        copy.height = this.height;
        copy.layout = [];
        this.layout.forEach((room) => {
            copy.layout.push(room.clone());
        });
        this.topology.forEach((node) => {
            copy.topology.push(node.clone());
        });
        copy.layoutMap = this.layoutMap;
        return copy;
    }

    generate() {
        const {topology, width, height, map} = getNewTopology();
        this.topology = topology;
        this.width = width;
        this.height = height;
        this.layoutMap = map;
        for (let x = 0; x <= width; x++) {
            for (let y = 0; y <= height; y++) {
                let roomAppended = false;
                const room = getNewRoom({x: x, y: y}, this.level);
                for (let node of topology) {
                    if (node.pos.x === room.getPos().x && node.pos.y === room.getPos().y) {
                        roomAppended = true;
                    }
                }
                if (!roomAppended) {
                    room.layout = "#########################".split("");
                    room.discover();
                    room.explore();
                }
                this.layout.push(room);
            }
        }
    }

    getNodeAtPos(pos) {
        let copy = new ShallowNode(-1, {x: -1, y: -1});
        this.topology.forEach((node) => {
            if (node.getPos().x === pos.x && node.getPos().y === pos.y) {
                copy = node.clone();
            }
        });
        return copy;
    }

    roomAt(pos) {
        const index = pos.x + pos.y * this.width;
        return this.layout[index];
    }

    getRoom(pos) {
        const id = pos.x + this.width * pos.y;
        let roomString = this.layout[id].getLayout();
        let output = [];
        for (let y = 0; y < 5; y++) {
            let outputRow = "";
            for (let x = 0; x < 5; x++) {
                outputRow += roomString[x + y * 5] + roomString[x + y * 5];
            }
            output.push(outputRow);
        }
        return output;
    }

    print(playerPos) {
        let outputGrid = [];
        for (let y = 0; y < this.height; y++) {
            let outputRow = ["##", "##", "##", "##", "##"];
            for (let x = 0; x < this.width; x++) {
                switch (this.layout[x + y * this.width].isDiscovered()) {
                    case true:
                        const room = this.getRoom({x: x, y: y});
                        if (playerPos.x === x && playerPos.y === y) {
                            for (let n = 0; n < 5; n++) {
                                outputRow[n] += chalk.red(room[n]);
                            }
                            break;
                        }
                        for (let n = 0; n < 5; n++) {
                            outputRow[n] += room[n];
                        }
                        break;
                    case false:
                        const roomEmpty = this.getRoom({x: x, y: y});
                        for (let n = 0; n < 5; n++) {
                            let emptyString = "";
                            for (let i = 0; i < roomEmpty[n].length; i++) {
                                emptyString += " ";
                            }
                            outputRow[n] += emptyString;
                        }
                        break;
                    default:
                        break;
                }
            }
            outputGrid.push(outputRow);
        }
        let outputString = "";
        for (let i = 0; i < this.width; i++) {
            outputString += "##########";
        }
        outputString += "####\n";
        for (let i = 0; i < outputGrid.length; i++) {
            for (let j = 0; j < outputGrid[i].length; j++) {
                outputString += outputGrid[i][j] + "##\n";
            }
        }
        for (let i = 0; i < this.width; i++) {
            outputString += "##########";
        }
        outputString += "####\n";

        console.log(outputString);
        console.log(this.layoutMap);
    }

    discoverRoom(pos) {
        this.layout[pos.x + pos.y * this.width].discover();
    }

    discoverAll() {
        for (let room of this.layout) {
            room.discover();
        }
    }

    getLevel() {
        return this.level;
    }

    setLevel(level) {
        this.level = level;
    }

    isExplored() {
        for (let room of this.layout)
            if (!room.isExplored()) return false;
        return true;
    }

    exploreRoom(player, room, dungeonLevel) {
        switch (room.getType()) {
            case 0:
                console.log(chalk.green("You find nothing."));
                room.explore();
                break;
            case 1:
                if (room.isExplored()) {
                    if (room.loot.length > 0) {
                        const { itemDrop } = processDrop(room, dungeonLevel);
                        player.addItem(itemDrop);
                    } else {
                        console.log(chalk.green("You find nothing."));
                    }

                    if (room.loot.length <= 0) {
                        room.setLayout(roomArray[0]);
                    }
                    break;
                }
                const { goldAmount, itemDrop } = processDrop(room, dungeonLevel);
                player.addGold(goldAmount);
                player.addItem(itemDrop);
                if (room.loot.length <= 0) {
                    room.setLayout(roomArray[0]);
                }
                break;
            case 2:
                if (room.getEnemy().health > 0) {
                    processEncounter(player, room, dungeonLevel);
                    return 1;
                } else {
                    room.explore();
                    room.setType(0);
                    room.setLayout(roomArray[0]);
                    return 0;
                }
            case 3:
                player.enterShop();
                room.explore();
                return 2;
            default:
                break;
        }
        return false;
    }
}

