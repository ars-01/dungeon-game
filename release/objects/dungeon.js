import {getRandomItem, roomLayouts, walls} from "../resources/tables.js";
import chalk from "chalk";
import {Tile} from "./tile.js";
import {getRandomLeveledEnemy} from "../helpers/enemyHelper.js";

export class Dungeon {

    level;
    //also the entrance
    root;
    playerPos;
    enemies = [];
    tiles = [];

    constructor(root, level = 0) {
        this.level = level;
        this.root = root;
        this.generateLayout();
    }

    generateLayout() {
        const {minX, minY, maxX, maxY} = this.root.getBounds();
        for (let y = minY; y <= maxY; y++) {
            for (let x = minX; x <= maxX; x++) {
                const pos = {x: x, y: y};
                if (this.root.hasChildAtPos(pos) || this.root.x === pos.x && this.root.y === pos.y)
                    this.tiles.push(new Tile(pos));
            }
        }
        for (let i = 0; i < Math.ceil(Math.random() * this.tiles.length); i++) {
            const index = Math.floor(Math.random() * this.tiles.length);
            this.tiles[index].addItem(getRandomItem(this.level));
        }
        this.enemies.push(getRandomLeveledEnemy(this.level, this.tiles[Math.floor(Math.random() * this.tiles.length)].pos));
        if (this.tiles.length >= 7)
            this.enemies.push(getRandomLeveledEnemy(this.level, this.tiles[Math.floor(Math.random() * this.tiles.length)].pos));
        if (this.tiles.length >= 14)
            this.enemies.push(getRandomLeveledEnemy(this.level, this.tiles[Math.floor(Math.random() * this.tiles.length)].pos));
        if (this.tiles.length >= 21)
            this.enemies.push(getRandomLeveledEnemy(this.level, this.tiles[Math.floor(Math.random() * this.tiles.length)].pos));
    }

    getTileAt(pos) {
        for (const _tile of this.tiles) {
            if (_tile.pos.x === pos.x && _tile.pos.y === pos.y)
                return _tile;
        }
        return 0;
    }

    print(highlightPos) {
        this.playerPos = highlightPos;
        const {minX, minY, maxX, maxY} = this.root.getBounds();
        for (let y = minY; y <= maxY; y++) {
            const roomRow = ["", "", "", "", "", "", "", "", "", ""];
            for (let x = minX; x <= maxX; x++) {
                const pos = {x: x, y: y};
                const tile = this.getTileAt(pos);
                let connectedToPlayerSpace = this.root.edgeExists(this.playerPos, pos) || (this.playerPos.x === pos.x && this.playerPos.y === pos.y);
                let innerLayout = roomLayouts.filled;
                if (isNaN(tile)) {
                    if (connectedToPlayerSpace || tile.uncovered) {
                        tile.checkVisibility(this.playerPos);
                        innerLayout = tile.getLayout(connectedToPlayerSpace);
                    }
                }
                const layout = {
                    wallUp: this.root.edgeExists(pos, {x: x, y: y - 1}) && (connectedToPlayerSpace || tile.uncovered) ? walls.horizontalHallwayUp : walls.horizontalWall,
                    wallDown: this.root.edgeExists(pos, {x: x, y: y + 1}) && (connectedToPlayerSpace || tile.uncovered) ? walls.horizontalHallwayDown: walls.horizontalWall,
                    wallLeft: this.root.edgeExists(pos, {x: x - 1, y: y}) && (connectedToPlayerSpace || tile.uncovered) ? walls.verticalHallwayLeft : walls.verticalWall,
                    wallRight: this.root.edgeExists(pos, {x: x + 1, y: y}) && (connectedToPlayerSpace || tile.uncovered) ? walls.verticalHallwayRight : walls.verticalWall,
                    innerSpace: innerLayout,
                }
                const color = (x === highlightPos.x && y === highlightPos.y) ? "#ff0000" : "#969696";
                for (let i = 0; i < 10; i++) {
                    for (let j = 0; j < 2; j++) {
                        roomRow[0] += chalk.hex(color)(layout.wallUp[i]);
                        roomRow[1] += chalk.hex(color)(layout.wallUp[i + 10])
                        if (i < 2) {
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
                        } else {
                            roomRow[2] += chalk.hex(color)(layout.wallRight[i - 8]);
                            roomRow[3] += chalk.hex(color)(layout.wallRight[i - 6]);
                            roomRow[4] += chalk.hex(color)(layout.wallRight[i - 4]);
                            roomRow[5] += chalk.hex(color)(layout.wallRight[i - 2]);
                            roomRow[6] += chalk.hex(color)(layout.wallRight[i]);
                            roomRow[7] += chalk.hex(color)(layout.wallRight[i + 2]);
                        }
                        roomRow[8] += chalk.hex(color)(layout.wallDown[i]);
                        roomRow[9] += chalk.hex(color)(layout.wallDown[i + 10]);
                    }
                }
            }
            for (const string of roomRow)
                console.log(string);
        }
    }

    getSimplifiedDungeon() {
        const root = this.root.getSubGraphArray();
        const object = {level: this.level, root: root, playerPos: this.playerPos, enemies: this.enemies, tiles: []};
        for (const tile of this.tiles) {
            object.tiles.push(tile.clone());
        }
        return object;
    }
}