import chalk from "chalk";
import {getItemId, firstNames, lastNames} from "./dictionaries.js";


export const getRandomName = () => {
    return firstNames[Math.floor(Math.random() * firstNames.length)] + " "
        + lastNames[Math.floor(Math.random() * lastNames.length)];
}

const dialogueOptions = [
    chalk.green("1. Buy an Item"),
    chalk.green("2. Sell an Item"),
    chalk.green("3. Exit Shop")
];

export const shopActionResult = (action, player, shop) => {
    console.log();
    for (let i = 0; i < dialogueOptions.length; i++) {
        if (i === player.shopCycleCounter) {
            console.log(chalk.bold(chalk.green("-> ") + dialogueOptions[i]));
        } else {
            console.log(dialogueOptions[i]);
        }
    }
    switch (action) {
        case 0:
            buyAction(action, player, shop);
            break;
        case 1:
            sellAction(action, player, shop);
            break;
        case 2:
            player.exitShop();
            return 2;
        default:
            break;
    }
    return 0;
}

const sellAction = (action, player, shop) => {
    const id = getItemId(player.getInventorySize());
    if (id === -100 && action !== 2) {
        console.log(chalk.blueBright("\nYour Inventory is empty"));
        return -1;
    } else if (id === -1 && action !== 2) {
        console.log(chalk.blueBright("\nTransaction cancelled"));
        return -1;
    }
    const transactionSuccess = shop.buyItem(player.getItemInfo(id));
    if (transactionSuccess) {
        player.addGold(Math.floor(player.getItemInfo(id).sellValue * 0.9));
        console.log(chalk.blueBright(`You sold the ${player.removeItem(id)[0].name}`));
    }
}

const buyAction = (action, player, shop) => {
    const id = getItemId(shop.stock.length);
    if (id === -100 && action !== 2) {
        console.log(chalk.blueBright("\nYour Inventory is empty"));
        return -1;
    } else if (id === -1 && action !== 2) {
        console.log(chalk.blueBright("\nTransaction cancelled"));
        return -1;
    }
    const item = shop.sellItem(id, player.getGold());
    if (item.name !== "dummy") {
        player.addGold(-1 * Math.floor(1.1 * item.sellValue));
        player.addItem(item);
        console.log(chalk.blueBright(`\nYou bought ${item.name}`));
    }
}