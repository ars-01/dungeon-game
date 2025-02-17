import chalk from "chalk";
import {processDrop} from "./roomHelper.js";
import {rarityToInteger} from "../resources/dictionaries.js";

export const fight = (attacker, defender) => {
    let output = "";
    if (attacker.isPlayer())
        output += chalk.blue(`${attacker.name}`);
    else
        output += chalk.red(`${attacker.name}`);
    output += chalk.green(" attacks ");
    if (defender.isPlayer())
        output += chalk.blue(`${defender.name}`);
    else
        output += chalk.red(`${defender.name}`);
    console.log(output);

    let damage = attacker.attack();

    console.log(chalk.green("They deal ") + chalk.red(damage) + chalk.green(" Damage"));

    damage = defender.takeDamage(damage);

    if (defender.isPlayer())
        output = chalk.blue(`${defender.name}`);
    else
        output = chalk.red(`${defender.name}`);

    if (defender.isBlocking()) {
        output += chalk.green(" only");
        if (defender.isPlayer())
            attacker.stagger();
    }

    output += chalk.green(" takes ") + chalk.red(damage) + chalk.green(" Damage\n");
    console.log(output);
    if (defender.health <= 0 && !defender.isPlayer()) {
        console.log(chalk.blue(`${attacker.name}`) + chalk.green(" has defeated the ")
            + chalk.red(`${defender.name}`));
        const {goldAmount, itemDrop} = processDrop({name: "dummy"}, defender.level, rarityToInteger(defender.rarity));
        attacker.addGold(goldAmount);
        attacker.addItem(itemDrop);
        attacker.setFighting(false);
        return 1;
    } else if (defender.health <= 0 && defender.isPlayer()) {
        console.log(chalk.red(`You have been defeated by the ${attacker.name}.`));
        return -1;
    }
    return 0;
}

