export class OverworldChunk {

    pos;
    map;
    dungeon;
    characters = [];

    constructor(x, y) {
        this.pos = {x: x, y: y};
    }
}