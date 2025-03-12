import {generateNewTopology} from "./generationHelper.js";
import {overworldWalls, roomLayouts} from "../resources/tables.js";
import chalk from "chalk";

export const printOverworldChunk = (node, highlightPos = {x: 0, y: 0}) => {
    const {minX, minY, maxX, maxY} = node.getBounds();
    for (let y = minY; y <= maxY; y++) {
        const roomRow = ["", "", "", "", "", "", "", "", "", ""];
        for (let x = minX; x <= maxX; x++) {
            const pos = {x: x, y: y};
            const edgeExistsUp = node.edgeExists(pos, {x: x, y: y - 1});
            const edgeExistsDown = node.edgeExists(pos, {x: x, y: y + 1});
            const edgeExistsLeft = node.edgeExists(pos, {x: x - 1, y: y});
            const edgeExistsRight = node.edgeExists(pos, {x: x + 1, y: y});
            const layout = {
                wallUp: edgeExistsUp ? overworldWalls.horizontalPassage : overworldWalls.horizontalWall,
                wallDown: edgeExistsDown ? overworldWalls.horizontalPassage : overworldWalls.horizontalWall,
                wallLeft: edgeExistsLeft ? overworldWalls.verticalPassage : overworldWalls.verticalWall,
                wallRight: edgeExistsRight ? overworldWalls.verticalPassage : overworldWalls.verticalWall,
                innerSpace: node.hasChildAtPos(pos) || node.x === pos.x && node.y === pos.y ? roomLayouts.empty : roomLayouts.filled,
                cornerUpLeft: edgeExistsUp && edgeExistsLeft ? overworldWalls.emptyCorner : overworldWalls.fullCorner,
                cornerUpRight: edgeExistsUp && edgeExistsRight ? overworldWalls.emptyCorner : overworldWalls.fullCorner,
                cornerDownLeft: edgeExistsDown && edgeExistsLeft ? overworldWalls.emptyCorner : overworldWalls.fullCorner,
                cornerDownRight: edgeExistsDown && edgeExistsRight ? overworldWalls.emptyCorner : overworldWalls.fullCorner,
            }
            const color = (x === highlightPos.x && y === highlightPos.y) ? "#ff0000" : "#707070";
            for (let i = 0; i < 10; i++) {
                if (i < 2) {
                    roomRow[0] += chalk.hex(color)(layout.cornerUpLeft[i]);
                    roomRow[1] += chalk.hex(color)(layout.cornerUpLeft[i + 2]);
                    roomRow[0] += chalk.hex(color)(layout.cornerUpLeft[i]);
                    roomRow[1] += chalk.hex(color)(layout.cornerUpLeft[i + 2]);
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
                    roomRow[8] += chalk.hex(color)(layout.cornerDownLeft[i]);
                    roomRow[9] += chalk.hex(color)(layout.cornerDownLeft[i + 2]);
                    roomRow[8] += chalk.hex(color)(layout.cornerDownLeft[i]);
                    roomRow[9] += chalk.hex(color)(layout.cornerDownLeft[i + 2]);
                } else if (i < 8) {
                    roomRow[0] += chalk.hex(color)(layout.wallUp[i - 2]);
                    roomRow[1] += chalk.hex(color)(layout.wallUp[i + 4]);
                    roomRow[0] += chalk.hex(color)(layout.wallUp[i - 2]);
                    roomRow[1] += chalk.hex(color)(layout.wallUp[i + 4]);
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
                    roomRow[8] += chalk.hex(color)(layout.wallDown[i - 2]);
                    roomRow[9] += chalk.hex(color)(layout.wallDown[i + 4]);
                    roomRow[8] += chalk.hex(color)(layout.wallDown[i - 2]);
                    roomRow[9] += chalk.hex(color)(layout.wallDown[i + 4]);
                } else {
                    roomRow[0] += chalk.hex(color)(layout.cornerUpRight[i - 8]);
                    roomRow[1] += chalk.hex(color)(layout.cornerUpRight[i - 6]);
                    roomRow[0] += chalk.hex(color)(layout.cornerUpRight[i - 8]);
                    roomRow[1] += chalk.hex(color)(layout.cornerUpRight[i - 6]);
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
                    roomRow[8] += chalk.hex(color)(layout.cornerDownRight[i - 8]);
                    roomRow[9] += chalk.hex(color)(layout.cornerDownRight[i - 6]);
                    roomRow[8] += chalk.hex(color)(layout.cornerDownRight[i - 8]);
                    roomRow[9] += chalk.hex(color)(layout.cornerDownRight[i - 6]);
                }
            }
        }
        for (const string of roomRow)
            console.log(string);
    }

}

const overworld = generateNewTopology(7);
printOverworldChunk(overworld);