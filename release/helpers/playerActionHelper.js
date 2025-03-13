import chalk from "chalk";
import {getId} from "./functionsHelper.js";

const inventoryDialogueOptions = ["Inspect", "Drop", "Use", "Exit"];
let currentInventoryDialogueOption = 0;

const spellBookDialogueOptions = ["Inspect", "Cast", "Exit"];
let currentSpellBookDialogueOption = 0;

const movePlayer = (player, dungeon, keyName) => {
    player.onStartTurn();
    player.move(dungeon.root, keyName);
    player.onEndTurn();
}

const inventoryAction = (player, dungeon, keyName) => {
    let actionFlag = false;
    switch (keyName) {
        case "up":
            currentInventoryDialogueOption = currentInventoryDialogueOption - 1 < 0 ? inventoryDialogueOptions.length - 1 : currentInventoryDialogueOption - 1;
            break;
        case "down":
            currentInventoryDialogueOption = currentInventoryDialogueOption + 1 >= inventoryDialogueOptions.length ? 0 : currentInventoryDialogueOption + 1;
            break;
        case "left":
            player.currentInventoryPage--;
            break;
        case "right":
            player.currentInventoryPage++;
            break;
        case "q":
            player.isInInventory = false;
            break;
        case "return":
            actionFlag = true;
            break;
    }
    if (player.isInInventory) {
        player.printInventory();
        if (actionFlag) {
            executeInventoryAction(player, dungeon);
        }
        for (let i = 0; i < inventoryDialogueOptions.length; i++) {
            if (currentInventoryDialogueOption === i)
                console.log(chalk.bold.green(`-> ${inventoryDialogueOptions[i]}`));
            else
                console.log(chalk.green(`${inventoryDialogueOptions[i]}`));
        }
    }
}

const executeInventoryAction = (player, dungeon) => {
    //Inspect, Drop, Use, Exit
    let index = -100;
    switch (currentInventoryDialogueOption) {
        case 0:
            index = getId(1, player.getInventoryPageLength(player.currentInventoryPage));
            if (index !== -100)
                player.itemInfo(index);
            break;
        case 1:
            index = getId(1, player.getInventoryPageLength(player.currentInventoryPage));
            if (index !== -100) {
                const droppedItem = player.removeItemFromInventory(index, player.currentInventoryPage);
                dungeon.getTileAt(player.pos).addItem(droppedItem);
            }
            break;
        case 2:
            index = getId(1, player.getInventoryPageLength(player.currentInventoryPage));
            if (index !== -100)
                player.useItem(index);
            break;
        case 3:
            player.isInInventory = false;
            break;
        default:
            break;
    }
}

const spellBookAction = (player, dungeon, keyName) => {
    let actionFlag = false;
    switch (keyName) {
        case "up":
            currentSpellBookDialogueOption = currentSpellBookDialogueOption - 1 < 0 ? spellBookDialogueOptions.length - 1 : currentSpellBookDialogueOption - 1;
            break;
        case "down":
            currentSpellBookDialogueOption = currentSpellBookDialogueOption + 1 >= spellBookDialogueOptions.length ? 0 : currentSpellBookDialogueOption + 1;
            break;
        case "left":
            player.currentSpellBookPage--;
            break;
        case "right":
            player.currentSpellBookPage++;
            break;
        case "q":
            player.isInSpellbook = false;
            break;
        case "return":
            actionFlag = true;
            break;
    }
    if (player.isInSpellbook) {
        player.printSpellBook();
        if (actionFlag) {
            executeSpellBookAction(player, dungeon);
        }
        for (let i = 0; i < spellBookDialogueOptions.length; i++) {
            if (currentSpellBookDialogueOption === i)
                console.log(chalk.bold.green(`-> ${spellBookDialogueOptions[i]}`));
            else
                console.log(chalk.green(`${spellBookDialogueOptions[i]}`));
        }
    }
}

const executeSpellBookAction = (player, dungeon) => {
    //Inspect, Cast, Exit
    let index = -100;
    switch (currentSpellBookDialogueOption) {
        case 0:
            //TODO: Inspect spell
            break;
        case 1:
            //TODO: Cast spell
            break;
        case 2:
            player.isInSpellbook = false;
            break;
        default:
            break;
    }
}

const roomAction = (player, dungeon, keyName) => {
    const tileGold = dungeon.getTileAt(player.pos).gold;
    if (tileGold > 0) {
        player.addGold(tileGold);
        dungeon.getTileAt(player.pos).gold = 0;
        console.log(chalk.blueBright(`You found ${tileGold} gold`));
    }
    if (dungeon.getTileAt(player.pos).items.length <= 0)
        return;
    dungeon.getTileAt(player.pos).printItems();
    const index = getId(1, dungeon.getTileAt(player.pos).items.length);
    if (index !== -100) {
        player.addItemToInventory(dungeon.getTileAt(player.pos).removeItem(index).clone());
    }
}

export const playerAction = (player, dungeon, keyName) => {
    if (!player.isInInventory && !player.isFighting && !player.isInSpellbook &&
        !player.isTrading && !player.isParalyzed && !player.isOverencumbered) {
        switch (keyName) {
            case "t":
                console.log(chalk.blueBright("How many hours would you like to wait?\n"));
                player.rest(getId(1, 24));
                break;
            case "return":
                roomAction(player, dungeon, keyName);
                break;
            default:
                movePlayer(player, dungeon, keyName);
                break;
        }
    } else {
        if (player.isInInventory && !player.isInSpellbook) {
            inventoryAction(player, dungeon, keyName);
        } else if (player.isInSpellbook && !player.isInInventory) {
            spellBookAction(player, dungeon, keyName);
        } else {

        }
    }
}

