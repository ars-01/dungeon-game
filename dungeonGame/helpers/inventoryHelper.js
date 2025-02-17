import chalk from "chalk";
import {getItemId} from "./dictionaries.js";

const dialogueOptions = [
    chalk.green("1. Inspect an Item"),
    chalk.green("2. Drop an Item"),
    chalk.green("3. Use an Item"),
    chalk.green("4. Exit Inventory"),
];

export const inventoryActionResult = (player, action, room) => {
    console.log();
    for (let i = 0; i < dialogueOptions.length; i++) {
        if (i === player.inventoryCycleCounter) {
            console.log(chalk.bold(chalk.green("-> ") + dialogueOptions[i]));
        } else {
            console.log(dialogueOptions[i]);
        }
    }
    let id;
    switch (action) {
        case 0:
            //inspect an Item (enter inventory position with prompt)
            id = getItemId(player.getInventorySize());
            if (id === -100 && action !== 3) {
                console.log(chalk.blueBright("\nYour Inventory is empty"));
                return -1;
            } else if (id === -1 && action !== 3) {
                console.log(chalk.blueBright("\nAction cancelled"));
                return -1;
            }
            actionInspect(player.getItemInfo(id));
            return 0;
        case 1:
            //drop an Item (also per position)
            id = getItemId(player.getInventorySize());
            if (id === -100 && action !== 3) {
                console.log(chalk.blueBright("\nYour Inventory is empty"));
                return -1;
            } else if (id === -1 && action !== 3) {
                console.log(chalk.blueBright("\nAction cancelled"));
                return -1;
            }
            if (room.isShop()) {
                console.log(chalk.blueBright("\nYou cannot drop Items in shops"));
                return -1;
            }
            actionDrop(id, player, room);
            return 1;
        case 2:
            //use an Item (also per pos)
            id = getItemId(player.getInventorySize());
            if (id === -100 && action !== 3) {
                console.log(chalk.blueBright("\nYour Inventory is empty"));
                return -1;
            } else if (id === -1 && action !== 3) {
                console.log(chalk.blueBright("\nAction cancelled"));
                return -1;
            }
            actionUse(id, player);
            return 2;
        case 3:
            player.exitInventory();
            return 3;
        default:
            return -1;
    }
}

const actionInspect = (item) => {
    let outputString = "\n" + chalk.green("Name: ") + chalk.blue(item.name + ` (${item.rarity})`) + "\n" +
        chalk.green("Type: ") + chalk.blue(item.type) + "\n" +
        chalk.green("Durability: ") + chalk.blue(item.durability) + "\n" +
        chalk.green("Value (depends on Type): ") + chalk.blue(item.value) + "\n" +
        chalk.green("Weight: ") + chalk.blue(item.weight) + "\n" +
        chalk.green("Sell Value: ") + chalk.blue(item.sellValue) + "\n";
    console.log(outputString);
}

const actionDrop = (id, player, room) => {
    if (!room.addLoot(player.getItem(id)))
        return false;
    player.removeItem(id);
    return true;
}

const actionUse = (id, player) => {
    const itemInfo = player.getItem(id);
    const types = itemInfo.type.split("|");
    switch (types[0]) {
        case "Weapon":
            player.equipWeapon(id);
            break;
        case "Armor":
            player.equipArmor(id, types[1]);
            break;
        case "Potion":
            player.consumePotion(id, types[1], types[2]);
            break;
        case "Misc":
            console.log(chalk.green(`${itemInfo.name} cannot be used`));
            break;
        default:
            break;
    }
}