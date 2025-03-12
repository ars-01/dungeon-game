import chalk from "chalk";
import {getId} from "./functionsHelper.js";

const inventoryDialogueOptions = ["Inspect", "Drop", "Use", "Exit"];
let currentInventoryDialogueOption = 0;

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
        actionFlag = false;
    }
}

const executeInventoryAction = (player, dungeon) => {
    //Inspect, Drop, Use, Exit
    switch (currentInventoryDialogueOption) {
        case 0:
            let index = getId(1, player.getInventoryPageLength(player.currentInventoryPage));
            if (index !== -100)
                player.itemInfo(index);
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            player.isInInventory = false;
            break;
        default:
            break;
    }
}

const spellBookAction = (player, dungeon, keyName) => {

}

export const playerAction = (player, dungeon, keyName) => {
    if (!player.isInInventory && !player.isFighting && !player.isInSpellbook &&
        !player.isTrading && !player.isParalyzed && !player.isOverencumbered) {
        movePlayer(player, dungeon, keyName);
    } else {
        if (player.isInInventory && !player.isInSpellbook) {
            inventoryAction(player, dungeon, keyName);
        } else if (player.isInSpellbook && !player.isInInventory) {
            spellBookAction(player, dungeon, keyName);
        } else {

        }
    }
}

