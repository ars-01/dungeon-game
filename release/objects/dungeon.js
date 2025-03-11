import {roomLayouts, walls} from "../resources/tables.js";
import chalk from "chalk";

export class Dungeon {

    level;
    root;
    playerPos;
    enemies;

    constructor(root, level = 0) {
        this.level = level;
        this.root = root;
    }

    print(highlightPos) {
        this.playerPos = highlightPos;
        const {minX, minY, maxX, maxY} = this.root.getBounds();
        for (let y = minY; y <= maxY; y++) {
            const roomRow = ["", "", "", "", "", "", "", "", "", ""];
            for (let x = minX; x <= maxX; x++) {
                const pos = {x: x, y: y};
                const layout = {
                    wallUp: this.root.edgeExists(pos, {x: x, y: y - 1}) ? walls.horizontalHallwayUp : walls.horizontalWall,
                    wallDown: this.root.edgeExists(pos, {x: x, y: y + 1}) ? walls.horizontalHallwayDown: walls.horizontalWall,
                    wallLeft: this.root.edgeExists(pos, {x: x - 1, y: y}) ? walls.verticalHallwayLeft : walls.verticalWall,
                    wallRight: this.root.edgeExists(pos, {x: x + 1, y: y}) ? walls.verticalHallwayRight : walls.verticalWall,
                    innerSpace: this.root.hasChildAtPos(pos) || this.root.x === pos.x && this.root.y === pos.y ? roomLayouts.empty : roomLayouts.filled,
                }
                const color = (x === highlightPos.x && y === highlightPos.y) ? "#ff0000" : "#ffffff";
                for (let i = 0; i < 10; i++) {
                    roomRow[0] += chalk.hex(color)(layout.wallUp[i]);
                    roomRow[1] += chalk.hex(color)(layout.wallUp[i + 10]);
                    roomRow[0] += chalk.hex(color)(layout.wallUp[i]);
                    roomRow[1] += chalk.hex(color)(layout.wallUp[i + 10]);
                    if (i < 2) {
                        roomRow[2] += chalk.hex(color)(layout.wallLeft[i]);
                        roomRow[3] += chalk.hex(color)(layout.wallLeft[i + 2]);
                        roomRow[4] += chalk.hex(color)(layout.wallLeft[i + 4]);
                        roomRow[5] += chalk.hex(color)(layout.wallLeft[i + 6]);
                        roomRow[6] += chalk.hex(color)(layout.wallLeft[i + 8]);
                        roomRow[7] += chalk.hex(color)(layout.wallLeft[i + 10]);
                        roomRow[2] += chalk.hex(color)(layout.wallLeft[i]);
                        roomRow[3] += chalk.hex(color)(layout.wallLeft[i + 2]);
                        roomRow[4] += chalk.hex(color)(layout.wallLeft[i + 4]);
                        roomRow[5] += chalk.hex(color)(layout.wallLeft[i + 6]);
                        roomRow[6] += chalk.hex(color)(layout.wallLeft[i + 8]);
                        roomRow[7] += chalk.hex(color)(layout.wallLeft[i + 10]);
                    } else if (i < 8) {
                        roomRow[2] += chalk.hex(color)(layout.innerSpace[i - 2]);
                        roomRow[3] += chalk.hex(color)(layout.innerSpace[i + 4]);
                        roomRow[4] += chalk.hex(color)(layout.innerSpace[i + 10]);
                        roomRow[5] += chalk.hex(color)(layout.innerSpace[i + 16]);
                        roomRow[6] += chalk.hex(color)(layout.innerSpace[i + 22]);
                        roomRow[7] += chalk.hex(color)(layout.innerSpace[i + 28]);
                        roomRow[2] += chalk.hex(color)(layout.innerSpace[i - 2]);
                        roomRow[3] += chalk.hex(color)(layout.innerSpace[i + 4]);
                        roomRow[4] += chalk.hex(color)(layout.innerSpace[i + 10]);
                        roomRow[5] += chalk.hex(color)(layout.innerSpace[i + 16]);
                        roomRow[6] += chalk.hex(color)(layout.innerSpace[i + 22]);
                        roomRow[7] += chalk.hex(color)(layout.innerSpace[i + 28]);
                    } else {
                        roomRow[2] += chalk.hex(color)(layout.wallRight[i - 8]);
                        roomRow[3] += chalk.hex(color)(layout.wallRight[i - 6]);
                        roomRow[4] += chalk.hex(color)(layout.wallRight[i - 4]);
                        roomRow[5] += chalk.hex(color)(layout.wallRight[i - 2]);
                        roomRow[6] += chalk.hex(color)(layout.wallRight[i]);
                        roomRow[7] += chalk.hex(color)(layout.wallRight[i + 2]);
                        roomRow[2] += chalk.hex(color)(layout.wallRight[i - 8]);
                        roomRow[3] += chalk.hex(color)(layout.wallRight[i - 6]);
                        roomRow[4] += chalk.hex(color)(layout.wallRight[i - 4]);
                        roomRow[5] += chalk.hex(color)(layout.wallRight[i - 2]);
                        roomRow[6] += chalk.hex(color)(layout.wallRight[i]);
                        roomRow[7] += chalk.hex(color)(layout.wallRight[i + 2]);
                    }
                    roomRow[8] += chalk.hex(color)(layout.wallDown[i]);
                    roomRow[9] += chalk.hex(color)(layout.wallDown[i + 10]);
                    roomRow[8] += chalk.hex(color)(layout.wallDown[i]);
                    roomRow[9] += chalk.hex(color)(layout.wallDown[i + 10]);
                }
            }
            for (const string of roomRow)
                console.log(string);
        }
    }

    getSimplifiedCopy() {
        const root = this.root.getSubGraphArray();
        return {level: this.level, root: root, playerPos: this.playerPos};
    }
}