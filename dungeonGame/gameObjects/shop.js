import {lootTable} from "../resources/dictionaries.js";
import chalk from "chalk";
import {getRandomName} from "../helpers/shopHelper.js";

export class Shop {

    name = getRandomName();
    stock = [];
    gold = 500;

    constructor(dungeonLevel) {
        this.generateStock(dungeonLevel);
    }

    generateStock(dungeonLevel) {
        for (let i = 0; i < (5 + Math.ceil(Math.random() * 5)); i++) {
            const rand = Math.floor(Math.random() * 100) + dungeonLevel;
            if (rand > 100)
                this.stock.push(lootTable.uncommon[Math.floor(Math.random() * lootTable.uncommon.length)].clone());
            else if (rand > 130)
                this.stock.push(lootTable.rare[Math.floor(Math.random() * lootTable.rare.length)].clone());
            else if (rand > 160)
                this.stock.push(lootTable.mythic[Math.floor(Math.random() * lootTable.mythic.length)].clone());
            else
                this.stock.push(lootTable.common[Math.floor(Math.random() * lootTable.common.length)].clone());
        }
        if (dungeonLevel < 10) {
            this.stock.push(lootTable.common.find((item) => item.name === "Potion of Minor Healing"));
        } else if (dungeonLevel < 20) {
            this.stock.push(lootTable.uncommon.find((item) => item.name === "Potion of Healing"));
        } else if (dungeonLevel < 30) {
            this.stock.push(lootTable.rare.find((item) => item.name === "Potion of Vigorous Healing"));
        } else {
            this.stock.push(lootTable.mythic.find((item) => item.name === "Potion of Ultimate Healing"));
        }
    }

    checkStock() {
        if (this.stock.length < 1) return chalk.green("The stock is empty");
        let outputString = chalk.green(`${this.name}'s Gold: `) + chalk.yellow(this.gold) +
            chalk.green("\n--------------------\n");
        for (let i = 0; i < this.stock.length; i++) {
            outputString += chalk.green(`${i + 1}. `);
            switch (this.stock[i].rarity) {
                case "Common":
                    outputString += `${this.stock[i].name} (${this.stock[i].rarity})`;
                    break;
                case "Uncommon":
                    outputString += chalk.blue(`${this.stock[i].name} (${this.stock[i].rarity})`);
                    break;
                case "Rare":
                    outputString += chalk.magenta(`${this.stock[i].name} (${this.stock[i].rarity})`);
                    break;
                case "Mythic":
                    outputString += chalk.yellow(`${this.stock[i].name} (${this.stock[i].rarity})`);
                    break;
                default:
                    break;
            }
            outputString += chalk.green(`, intrinsic Value: ${this.stock[i].value} | Buy for `)
                + chalk.yellow(Math.floor(this.stock[i].sellValue * 1.1)) + chalk.green(" Gold\n");
        }
        console.log(outputString);
    }

    sellItem(id, playerGold) {
        let item = (this.stock[id].clone().sellValue < playerGold) ? this.stock.splice(id, 1)[0] : {name:"dummy"};
        if (item.name !== "dummy") {
            this.gold += Math.floor(item.sellValue * 1.1);
        }
        return item;
    }

    buyItem(item) {
        if (item.sellValue * 0.9 > this.gold) {
            console.log(chalk.magenta(`${this.name} does not have enough money to buy ${item.name}`));
            return false;
        }
        this.stock.push(item);
        this.gold -= Math.floor(item.sellValue * 0.9);
        return true;
    }
}
