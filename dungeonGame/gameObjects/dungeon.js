import {getNewRoom} from "./dungeonRoom.js";
import chalk from 'chalk';
import {processDrop, processEncounter} from "../helpers/roomHelper.js";
import {roomArray} from "../helpers/dictionaries.js";

export class Dungeon {
    layout = [];
    level = 0;
    dungeonSize = 0;

    constructor(level, dungeonSize) {
        this.level = level;
        this.dungeonSize = dungeonSize;
    }

    clone() {
        const copy = new Dungeon(this.level, this.dungeonSize);
        copy.layout = [];
        this.layout.forEach((room) => {
            copy.layout.push(room.clone());
        });
        return copy;
    }

    generate() {
        for (let y = 0; y < this.dungeonSize; y++) {
            for (let x = 0; x < this.dungeonSize; x++) {
                this.layout.push(getNewRoom({x: x, y: y}, this.level));
            }
        }
    }

    roomAt(pos) {
        const index = pos.x + pos.y * this.dungeonSize;
        return this.layout[index];
    }

    getRoom(pos) {
        const id = pos.x + this.dungeonSize * pos.y;
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
        for (let y = 0; y < this.dungeonSize; y++) {
            let outputRow = ["", "", "", "", ""];
            for (let x = 0; x < this.dungeonSize; x++) {
                switch (this.layout[x + y * this.dungeonSize].isDiscovered()) {
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
        for (let i = 0; i < outputGrid.length; i++) {
            for (let j = 0; j < outputGrid[i].length; j++) {
                outputString += outputGrid[i][j] + "\n";
            }
        }

        console.log(outputString);
    }

    discoverRoom(pos) {
        this.layout[pos.x + pos.y * this.dungeonSize].discover();
    }

    discoverAll() {
        for (let room of this.layout) {
            room.discover();
        }
    }

    getSize() {
        return this.dungeonSize;
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

