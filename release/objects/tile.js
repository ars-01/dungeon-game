import {getColor, roomLayouts} from "../resources/tables.js";
import chalk from "chalk";

export class Tile {
    pos;
    gold;
    items = [];
    isVisible = false;
    uncovered = false;
    hasEnemy = false;

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
        copy.hasEnemy = this.hasEnemy
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
            if (this.hasEnemy)
                return roomLayouts.enemy;
            if (this.items.length > 0)
                return roomLayouts.treasure;
            return roomLayouts.empty;
        } else {
            if (this.uncovered)
                return roomLayouts.empty;
            else
                return roomLayouts.filled;
        }
    }

    printItems() {
        console.log(chalk.blueBright("You have found the following items: \n"));
        for (let i = 0; i < this.items.length; i++) {
            console.log(chalk.hex(getColor(this.items[i].rarity))(`${i + 1}. ${this.items[i].name}`));
        }
        console.log(chalk.blueBright("\nEnter the Index of an Item to pick it up, or enter 0 to cancel\n"));
    }

    removeItem(index) {
        return this.items.splice(index, 1)[0];
    }
}