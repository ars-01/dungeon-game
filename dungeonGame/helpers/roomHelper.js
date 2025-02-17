import chalk from "chalk";
import {lootTable, enemyTable} from "./dictionaries.js";

export const processEncounter = (player, room, dungeonLevel) => {
    const rarity = Math.floor(Math.random() * 100);
    let enemy = room.getEnemy();
    if (enemy.name === "dummy") {
        if (rarity + dungeonLevel > 160) {
            const index3 = Math.floor(Math.random() * enemyTable.mythic.length);
            enemy = enemyTable.mythic[index3].clone();
        } else if (rarity + dungeonLevel > 130) {
            const index2 = Math.floor(Math.random() * enemyTable.rare.length);
            enemy = enemyTable.rare[index2].clone();
        } else if (rarity + dungeonLevel > 100) {
            const index1 = Math.floor(Math.random() * enemyTable.uncommon.length);
            enemy = enemyTable.uncommon[index1].clone();
        } else {
            const index0 = Math.floor(Math.random() * enemyTable.common.length);
            enemy = enemyTable.common[index0].clone();
        }
        room.setEnemy(enemy);
    }
    let outputString = chalk.red(`You encounter a ${enemy.name} (lvl. ${enemy.level})\n`);
    player.setFighting(true);
    console.log(outputString);
}

export const processDrop = (room, dungeonLevel, rarity = -1) => {
    const goldAmount = dungeonLevel * dungeonLevel + Math.ceil((Math.random() + 1) * 10 * (dungeonLevel + 1));
    let droppedItem = true;
    rarity = rarity < 0 ? Math.floor(Math.random() * 100) + dungeonLevel : rarity;
    let itemDrop = room.name !== "dummy" ? room.getLoot() : {name: "dummy"};
    if (itemDrop.name === "dummy") {
        droppedItem = false;
        if (room.name !== "dummy")
            room.explore();
        if (rarity > 160) {
            const index3 = Math.floor(Math.random() * lootTable.mythic.length);
            itemDrop = lootTable.mythic[index3].clone();
        } else if (rarity > 130) {
            const index2 = Math.floor(Math.random() * lootTable.rare.length);
            itemDrop = lootTable.rare[index2].clone();
        } else if (rarity > 100) {
            const index1 = Math.floor(Math.random() * lootTable.uncommon.length);
            itemDrop = lootTable.uncommon[index1].clone();
        } else {
            const index0 = Math.floor(Math.random() * lootTable.common.length);
            itemDrop = lootTable.common[index0].clone();
        }
    }
    let outputString = chalk.green("You find a ");
    switch (itemDrop.rarity) {
        case "Common":
            outputString += chalk.bold(`${itemDrop.name} (${itemDrop.rarity})`);
            break;
        case "Uncommon":
            outputString += chalk.bold.blue(`${itemDrop.name} (${itemDrop.rarity})`);
            break;
        case "Rare":
            outputString += chalk.bold.magenta(`${itemDrop.name} (${itemDrop.rarity})`);
            break;
        case "Mythic":
            outputString += chalk.bold.yellow(`${itemDrop.name} (${itemDrop.rarity})`);
            break;
        default:
            break;
    }
    if (!droppedItem)
        outputString += chalk.green(" and ") + chalk.bold.yellow(goldAmount) + chalk.green(" Gold");
    console.log(outputString);
    return {goldAmount, itemDrop};
}