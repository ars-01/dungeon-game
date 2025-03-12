import {roomLayouts} from "../resources/tables.js";

export class Tile {
    pos;
    gold;
    items = [];
    isVisible = false;
    uncovered = false;


    constructor(pos) {
        this.pos = pos;
        this.gold = Math.floor(Math.random() * 20);
    }

    clone() {
        const copy = new Tile(this.pos);
        for (const item of this.items) {
            copy.items.push(item.clone());
        }
        copy.gold = this.gold;
        copy.isVisible = this.isVisible;
        copy.uncovered = this.uncovered;
        return copy;
    }

    addItem(item) {
        this.items.push(item.clone());
    }

    checkVisibility(pos) {
        this.isVisible = (Math.abs(this.pos.x - pos.x) <= 1) && (Math.abs(this.pos.y - pos.y) <= 0) ||
            (Math.abs(this.pos.x - pos.x) <= 0) && (Math.abs(this.pos.y - pos.y) <= 1);
        if (this.isVisible)
            this.uncovered = true;
    }

    getLayout(isConnected) {
        if (this.isVisible && isConnected) {
            if (this.items.length > 0)
                return roomLayouts.treasure;
            else
                return roomLayouts.empty;
        } else {
            if (this.uncovered)
                return roomLayouts.empty;
            else
                return roomLayouts.filled;
        }
    }
}