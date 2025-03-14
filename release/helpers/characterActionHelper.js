import chalk from "chalk";
import {getId} from "./functionsHelper.js";

const inventoryDialogueOptions = ["Inspect", "Drop", "Use", "Exit"];
let currentInventoryDialogueOption = 0;

const spellBookDialogueOptions = ["Inspect", "Cast", "Exit"];
let currentSpellBookDialogueOption = 0;

const moveCharacter = (character, dungeon, keyName) => {
    character.onStartTurn();
    character.move(dungeon.root, keyName);
    character.onEndTurn();
}

const inventoryAction = (character, dungeon, keyName) => {
    if (character.isPlayer) {
        let actionFlag = false;
        switch (keyName) {
            case "up":
                currentInventoryDialogueOption = currentInventoryDialogueOption - 1 < 0 ? inventoryDialogueOptions.length - 1 : currentInventoryDialogueOption - 1;
                break;
            case "down":
                currentInventoryDialogueOption = currentInventoryDialogueOption + 1 >= inventoryDialogueOptions.length ? 0 : currentInventoryDialogueOption + 1;
                break;
            case "left":
                character.currentInventoryPage--;
                break;
            case "right":
                character.currentInventoryPage++;
                break;
            case "q":
                character.isInInventory = false;
                break;
            case "return":
                actionFlag = true;
                break;
        }
        if (character.isInInventory) {
            character.printInventory();
            if (actionFlag) {
                executeInventoryAction(character, dungeon);
            }
            for (let i = 0; i < inventoryDialogueOptions.length; i++) {
                if (currentInventoryDialogueOption === i)
                    console.log(chalk.bold.green(`-> ${inventoryDialogueOptions[i]}`));
                else
                    console.log(chalk.green(`${inventoryDialogueOptions[i]}`));
            }
        }
    } else {

    }
}

const executeInventoryAction = (character, dungeon) => {
    if (character.isPlayer) {
        //Inspect, Drop, Use, Exit
        let index = -100;
        switch (currentInventoryDialogueOption) {
            case 0:
                index = getId(1, character.getInventoryPageLength(character.currentInventoryPage));
                if (index !== -100)
                    character.itemInfo(index);
                break;
            case 1:
                index = getId(1, character.getInventoryPageLength(character.currentInventoryPage));
                if (index !== -100) {
                    const droppedItem = character.removeItemFromInventory(index, character.currentInventoryPage);
                    dungeon.getTileAt(character.pos).addItem(droppedItem);
                }
                break;
            case 2:
                index = getId(1, character.getInventoryPageLength(character.currentInventoryPage));
                if (index !== -100)
                    character.useItem(index);
                break;
            case 3:
                character.isInInventory = false;
                break;
            default:
                break;
        }
    } else {

    }
}

const spellBookAction = (character, dungeon, keyName) => {
    if (character.isPlayer) {
        let actionFlag = false;
        switch (keyName) {
            case "up":
                currentSpellBookDialogueOption = currentSpellBookDialogueOption - 1 < 0 ? spellBookDialogueOptions.length - 1 : currentSpellBookDialogueOption - 1;
                break;
            case "down":
                currentSpellBookDialogueOption = currentSpellBookDialogueOption + 1 >= spellBookDialogueOptions.length ? 0 : currentSpellBookDialogueOption + 1;
                break;
            case "left":
                character.currentSpellBookPage--;
                break;
            case "right":
                character.currentSpellBookPage++;
                break;
            case "q":
                character.isInSpellbook = false;
                break;
            case "return":
                actionFlag = true;
                break;
        }
        if (character.isInSpellbook) {
            character.printSpellBook();
            if (actionFlag) {
                executeSpellBookAction(character, dungeon);
            }
            for (let i = 0; i < spellBookDialogueOptions.length; i++) {
                if (currentSpellBookDialogueOption === i)
                    console.log(chalk.bold.green(`-> ${spellBookDialogueOptions[i]}`));
                else
                    console.log(chalk.green(`${spellBookDialogueOptions[i]}`));
            }
        } else {

        }
    }
}

const executeSpellBookAction = (character, dungeon) => {
    if (character.isPlayer) {
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
                character.isInSpellbook = false;
                break;
            default:
                break;
        }
    } else {

    }
}

const roomAction = (character, dungeon, keyName) => {
    if (character.isPlayer) {
        const tileGold = dungeon.getTileAt(character.pos).gold;
        if (tileGold > 0) {
            character.addGold(tileGold);
            dungeon.getTileAt(character.pos).gold = 0;
            console.log(chalk.blueBright(`You found ${tileGold} gold`));
        }
        if (dungeon.getTileAt(character.pos).items.length <= 0)
            return;
        dungeon.getTileAt(character.pos).printItems();
        const index = getId(1, dungeon.getTileAt(character.pos).items.length);
        if (index !== -100) {
            character.addItemToInventory(dungeon.getTileAt(character.pos).removeItem(index).clone());
        }
    } else {

    }
}

export const characterAction = (character, dungeon, keyName) => {
    if (character.isPlayer) {
        if (!character.isInInventory && !character.isFighting && !character.isInSpellbook &&
            !character.isTrading && !character.isParalyzed && !character.isOverencumbered) {
            switch (keyName) {
                case "t":
                    console.log(chalk.blueBright("How many hours would you like to wait?\n"));
                    character.rest(getId(1, 24));
                    break;
                case "return":
                    roomAction(character, dungeon, keyName);
                    break;
                default:
                    moveCharacter(character, dungeon, keyName);
                    break;
            }
        } else {
            if (character.isInInventory && !character.isInSpellbook) {
                inventoryAction(character, dungeon, keyName);
            } else if (character.isInSpellbook && !character.isInInventory) {
                spellBookAction(character, dungeon, keyName);
            } else {

            }
        }
    } else{
        if (!character.isInInventory && !character.isFighting && !character.isInSpellbook &&
            !character.isTrading && !character.isParalyzed && !character.isOverencumbered) {
            let direction;
            switch (Math.floor(Math.random() * 4)) {
                case 0:
                    direction = "up";
                    break;
                case 1:
                    direction = "down";
                    break;
                case 2:
                    direction = "left";
                    break;
                case 3:
                    direction = "right";
                    break;
                default:
                    break;
            }
            moveCharacter(character, dungeon, direction);
        }
    }
}

