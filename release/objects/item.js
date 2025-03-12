import chalk from "chalk";
import {getColor} from "../resources/tables.js";

export class Item {

    name;
    //Weapon, Apparel, Potion, Misc
    type;
    subtypes;
    weight;
    value;
    durability;
    rarity;
    sellValue;
    effect;

    constructor(name, type, subtypes, durability, value, weight, rarity, sellValue, effect) {
        this.name = name;
        this.type = type;
        this.subtypes = subtypes;
        this.weight = weight;
        this.value = value;
        this.durability = durability;
        this.rarity = rarity;
        this.sellValue = sellValue;
        this.effect = effect ? effect.clone() : null;
    }

    getSubTypes() {
        return this.subtypes.split("|");
    }

    clone() {
        const copy = new Item(this.name, this.type, this.subtypes, this.durability, this.value, this.weight, this.rarity, this.sellValue)
        copy.effect = this.effect ? this.effect.clone() : null;
        return copy;
    }

    decreaseDurability() {
        this.durability--;
    }

    detailedInfo() {
        //TODO: switch by type and print an ascii art picture of item (based type and subtypes, maybe have a render of each item)
        let outputString = `${this.name}\n\n`;
        outputString += `Durability: ${this.durability}\n`;
        outputString += `Category: ${this.type}, ${this.subtypes}\n`;
        switch (this.type) {
            case "Weapon":
                outputString += `Damage: ${this.value}\n`;
                break;
            case "Apparel":
                outputString += `Armor: ${this.value}\n`;
                break;
            case "Potion":
                outputString += `Magnitude: ${this.value}\n`;
                break;
            default:
                break;
        }
        outputString += `Weight: ${this.weight}\n`;
        outputString += `Sell Value: ${this.sellValue}\n`;
        if (this.effect)
            outputString += `Effect: ${this.effect.toString()}\n`;
        console.log(chalk.hex(getColor(this.rarity))(outputString));
    }
}