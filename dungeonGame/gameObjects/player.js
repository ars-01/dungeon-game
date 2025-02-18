import chalk from "chalk";
import {getRandomArmor, getRandomWeapon} from "../helpers/dictionaries.js";

export class Player {
    name = "";
    pos = {x: 0, y: 0};
    inventory = [];
    armor = {
        head: "",
        main: "",
        arms: "",
        feet: ""
    };
    weapon = "";

    blocking = false;
    gold = 0;
    maxHealth = 100;
    maxEncumbrance = 150;
    damageMultiplier = 1;
    health;
    fighting = false;
    inInventory = false;
    inShop = false;
    combatCycleCounter = 0;
    inventoryCycleCounter = 0;
    shopCycleCounter = 0;

    constructor(name, playerClass, maxHealth) {
        this.name = name;
        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
        switch (playerClass) {
            case 0:
                this.armor = getRandomArmor("Melee", "Common");
                this.weapon = getRandomWeapon("Melee", "Common");
                break;
            case 1:
                this.armor = getRandomArmor("Magic", "Common");
                this.weapon = getRandomWeapon("Magic", "Common");
                break;
            default:
                break;
        }
    }

    clone() {
        const copy = new Player(this.name, 0, this.maxHealth);
        copy.name = this.name;
        copy.pos.x = this.pos.x;
        copy.pos.y = this.pos.y;
        this.inventory.forEach(item => {copy.inventory.push(item.clone());});
        copy.armor.head = this.armor.head.clone();
        copy.armor.main = this.armor.main.clone();
        copy.armor.arms = this.armor.arms.clone();
        copy.armor.feet = this.armor.feet.clone();
        copy.weapon = this.weapon.clone();
        copy.blocking = this.blocking;
        copy.gold = this.gold;
        copy.maxHealth = this.maxHealth;
        copy.maxEncumbrance = this.maxEncumbrance;
        copy.damageMultiplier = this.damageMultiplier;
        copy.health = this.health;
        copy.fighting = this.fighting;
        copy.inInventory = this.inInventory;
        copy.inShop = this.inShop;
        copy.combatCycleCounter = this.combatCycleCounter;
        copy.inventoryCycleCounter = this.inventoryCycleCounter;
        copy.shopCycleCounter = this.shopCycleCounter;
        return copy;
    }

    move(direction, dungeonSize) {
        switch (direction){
            case 'left':
                if (this.pos.x > 0)
                    this.pos.x -=1;
                break;
            case 'right':
                if (this.pos.x < dungeonSize - 1)
                    this.pos.x +=1;
                break;
            case 'up':
                if (this.pos.y > 0)
                    this.pos.y -=1;
                break;
            case 'down':
                if (this.pos.y < dungeonSize - 1)
                    this.pos.y +=1;
                break;
            default:
                break;
        }
    }

    getPos() {
        return this.pos;
    }

    addGold(gold) {
        this.gold += gold;
    }

    addItem(item) {
        this.inventory.push(item);
    }

    getItem(id) {
        return this.inventory[id].clone();
    }

    removeItem(id) {
        return this.inventory.splice(id, 1);
    }

    getGold() {
        return this.gold;
    }

    showInventory() {
        let outputString = chalk.green(`${this.name}'s Gold: `) + chalk.bold.yellow(`${this.gold}\n`);
        outputString += chalk.green("--------------------\n");
        for (let i = 0; i < this.inventory.length; i++) {
            outputString += chalk.green(`${i + 1}. `);
            switch (this.inventory[i].rarity) {
                case 'Common':
                    outputString += chalk.bold(` ${this.inventory[i].name} (${this.inventory[i].rarity})\n`);
                    break;
                case 'Uncommon':
                    outputString += chalk.bold.blue(` ${this.inventory[i].name} (${this.inventory[i].rarity})\n`);
                    break;
                case 'Rare':
                    outputString += chalk.bold.magenta(` ${this.inventory[i].name} (${this.inventory[i].rarity})\n`);
                    break;
                case 'Mythic':
                    outputString += chalk.bold.yellow(` ${this.inventory[i].name} (${this.inventory[i].rarity})\n`);
                    break;
                default:
                    break;
            }
        }
        console.log(outputString);
    }

    chooseInventoryAction(keyName) {
        switch (keyName) {
            case 'up':
                this.inventoryCycleCounter--;
                this.inventoryCycleCounter = this.inventoryCycleCounter < 0 ? (this.inventoryCycleCounter + 4) % 4 : this.inventoryCycleCounter % 4;
                break;
            case 'down':
                this.inventoryCycleCounter++;
                this.inventoryCycleCounter = this.inventoryCycleCounter < 0 ? (this.inventoryCycleCounter + 4) % 4 : this.inventoryCycleCounter % 4;
                break;
            case 'return':
                return this.inventoryCycleCounter;
            default:
                break;
        }
    }

    equipWeapon(id) {
        const newWeapon = this.removeItem(id)[0];
        this.inventory.push(this.weapon.clone());
        this.weapon = newWeapon;
        console.log(chalk.blueBright(`\nYou equipped the ${this.weapon.name}`));
    }

    equipArmor(id, subtype) {
        const newArmor = this.removeItem(id)[0];
        switch (subtype) {
            case "Head":
                this.inventory.push(this.armor.head.clone());
                this.armor.head = newArmor;
                console.log(chalk.blueBright(`\nYou equipped the ${this.armor.head.name}`));
                break;
            case "Main":
                this.inventory.push(this.armor.main.clone());
                this.armor.main = newArmor;
                console.log(chalk.blueBright(`\nYou equipped the ${this.armor.main.name}`));
                break;
            case "Arms":
                this.inventory.push(this.armor.arms.clone());
                this.armor.arms = newArmor;
                console.log(chalk.blueBright(`\nYou equipped the ${this.armor.arms.name}`));
                break;
            case "Feet":
                this.inventory.push(this.armor.feet.clone());
                this.armor.feet = newArmor;
                console.log(chalk.blueBright(`\nYou equipped the ${this.armor.feet.name}`));
                break;
            default:
                break;
        }
    }

    consumePotion(id, type, subtype) {
        const item = this.removeItem(id)[0];
        switch (type) {
            case "Restore":
                switch (subtype) {
                    case "Health":
                        this.health = this.health + item.value > this.maxHealth ? this.maxHealth : this.health + item.value;
                        console.log(chalk.blueBright(`You drank a ${item.name}\nYour health is now ${this.health} / ${this.maxHealth}`));
                        break;
                    default:
                        break;
                }
                break;
            case "Augment":
                switch (subtype) {
                    case "Health":
                        this.maxHealth += item.value;
                        this.health += item.value;
                        console.log(chalk.blueBright(`\nYou drank a ${item.name}\nYour health is now ${this.health} / ${this.maxHealth}`));
                        break;
                    case "Stamina":
                        this.maxEncumbrance += item.value;
                        console.log(chalk.blueBright(`\nYou drank a ${item.name}\nYou can carry up to ${this.maxEncumbrance} weight now`));
                        break;
                    case "Damage":
                        this.damageMultiplier += item.value;
                        console.log(chalk.blueBright(`\nYou drank a ${item.name}\nYour Damage Multiplier is now ${this.damageMultiplier}`));
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    isInInventory() {
        return this.inInventory;
    }

    exitInventory() {
        this.inInventory = false;
    }

    getInventorySize() {
        return this.inventory.length;
    }

    getItemInfo(id) {
        return this.inventory[id].clone();
    }

    showStatus() {
        let outputString = chalk.green("Status of ") + chalk.bold.magenta(this.name) + chalk.green("\n-----------------\n") +
        chalk.green("Health: ") + chalk.bold.blue(this.health + " / " + this.maxHealth) + "\n" +
        chalk.green("Armor Value: ") + chalk.bold.blue(this.getArmorValue()) + "\n" + chalk.green("Encumbrance: ");
        const encumbrance = this.getEncumbrance();
        if (encumbrance > this.maxEncumbrance - 30)
            outputString += chalk.bold.yellow(`${encumbrance} / ${this.maxEncumbrance}\n`);
        else if (encumbrance > this.maxEncumbrance)
            outputString += chalk.bold.red(`${encumbrance} / ${this.maxEncumbrance}\n`);
        else
            outputString += chalk.bold.blue(`${encumbrance} / ${this.maxEncumbrance}\n`);
        outputString += chalk.green("Damage: ") + chalk.bold.blue(`${Math.ceil(this.weapon.value * this.damageMultiplier)}`) + "\n";
        outputString += chalk.green("\n----[Weapon]-----\nWeapon: ") + chalk.bold.blue(`${this.weapon.name} (durability: ${this.weapon.durability})\n`);
        outputString += chalk.green(" \n---[Equipment]---\nHead: ") + chalk.bold.blue(`${this.armor.head.name} (Durability: ${this.armor.head.durability})\n`);
        outputString += chalk.green("Main: ") + chalk.bold.blue(`${this.armor.main.name} (Durability: ${this.armor.main.durability})\n`);
        outputString += chalk.green("Arms: ") + chalk.bold.blue(`${this.armor.arms.name} (Durability: ${this.armor.arms.durability})\n`);
        outputString += chalk.green("Feet: ") + chalk.bold.blue(`${this.armor.feet.name} (Durability: ${this.armor.feet.durability})\n`);

        console.log(outputString);
    }

    getEncumbrance() {
        let encumbrance = this.armor.head.weight + this.armor.main.weight +
            this.armor.arms.weight + this.armor.feet.weight + this.weapon.weight;
        for (let item of this.inventory)
            encumbrance += item.weight;
        return encumbrance;
    }

    getArmorValue() {
        let armorValue = 0;
        if (this.armor.head.durability > 0)
            armorValue += this.armor.head.value;
        if (this.armor.main.durability > 0)
            armorValue += this.armor.main.value;
        if (this.armor.arms.durability > 0)
            armorValue += this.armor.arms.value;
        if (this.armor.feet.durability > 0)
            armorValue += this.armor.feet.value;
        return armorValue * this.damageMultiplier;
    }

    isPlayer() {
        return true;
    }

    isBlocking() {
        return this.blocking;
    }

    setFighting(isFighting) {
        this.fighting = isFighting;
    }

    isFighting() {
        return this.fighting;
    }

    block() {
        this.blocking = true;
    }

    attack() {
        this.blocking = false;
        let finalDamage = Math.ceil(this.weapon.value * this.damageMultiplier);
        let critDamage = 0;
        if (Math.random() <= 0.1 && this.weapon.type.split("|")[1] !== "Magic")
            critDamage += Math.ceil(finalDamage * 0.5);
        if (Math.random() <= 0.15 && this.damageMultiplier >= 2.5 && this.weapon.type.split("|")[1] !== "Magic")
            critDamage += Math.ceil(finalDamage * 0.5) * 1.25;
        finalDamage += critDamage;
        if (this.getEncumbrance() > 150)
            finalDamage = Math.floor(finalDamage / 2);
        if (this.weapon.durability <= 0)
            finalDamage = 0;
        this.decreaseWeaponDurability();
        return Math.ceil(finalDamage);
    }

    takeDamage(attackValue) {
        let finalDamage = attackValue;
        let armorValue = this.getArmorValue();
        if (this.blocking && this.weapon.type.split("|")[1] !== "Magic") {
            armorValue += Math.ceil(this.weapon.value);
            this.decreaseWeaponDurability();
        }
        finalDamage *= (1 - armorValue / 500);
        this.health -= Math.floor(finalDamage);
        this.decreaseArmorDurability();
        return Math.floor(finalDamage);
    }

    decreaseArmorDurability() {
        if (Math.random() <= 0.3)
            this.armor.head.durability = this.armor.head.durability - 1 < 0 ? 0 : this.armor.head.durability - 1;
        if (Math.random() <= 0.3)
            this.armor.main.durability = this.armor.main.durability - 1 < 0 ? 0 : this.armor.main.durability - 1;
        if (Math.random() <= 0.3)
            this.armor.arms.durability = this.armor.main.durability - 1 < 0 ? 0 : this.armor.main.durability - 1;
        if (Math.random() <= 0.3)
            this.armor.feet.durability = this.armor.main.durability - 1 < 0 ? 0 : this.armor.main.durability - 1;
    }

    decreaseWeaponDurability() {
        if (Math.random() <= 0.3)
            this.weapon.durability = this.weapon.durability - 1 < 0 ? 0 : this.weapon.durability - 1;
    }

    runAway(dungeonSize) {
        if (this.pos.x > 0) {
            this.move("left", dungeonSize);
        } else {
            this.move("right", dungeonSize);
        }
        this.fighting = false;
    }

    chooseCombatAction(keyName, dungeonSize, enemy) {
        this.blocking = false;
        if (Math.random() < 0.3 && !enemy.isStaggered())
            enemy.block();
        switch (keyName) {
            case 'up':
                this.combatCycleCounter--;
                this.combatCycleCounter = this.combatCycleCounter < 0 ? (this.combatCycleCounter + 3) % 3 : this.combatCycleCounter % 3;
                break;
            case 'down':
                this.combatCycleCounter++;
                this.combatCycleCounter = this.combatCycleCounter < 0 ? (this.combatCycleCounter + 3) % 3 : this.combatCycleCounter % 3;
                break;
            case 'return':
                switch (this.combatCycleCounter) {
                    case 0:
                        return 0;
                    case 1:
                        this.block();
                        return 1;
                    case 2:
                        this.runAway(dungeonSize);
                        return 2;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
        return -1;
    }

    printChoice(enemy = {name:"dummy", health: 1}) {
        if (enemy.name !== "dummy")
            console.log(chalk.red(chalk.red(`You encounter a ${enemy.name} (lvl. ${enemy.level})\n`)))
        switch (this.combatCycleCounter) {
            case 0:
                console.log(chalk.bold.green(`-> 1. Attack with ${this.weapon.name}`));
                console.log(chalk.green(`2. Block with ${this.weapon.name}`));
                console.log(chalk.green("3. Run away"));
                break;
            case 1:
                console.log(chalk.green(`1. Attack with ${this.weapon.name}`));
                console.log(chalk.bold.green(`-> 2. Block with ${this.weapon.name}`));
                console.log(chalk.green("3. Run away"));
                break;
            case 2:
                console.log(chalk.green(`1. Attack with ${this.weapon.name}`));
                console.log(chalk.green(`2. Block with ${this.weapon.name}`));
                console.log(chalk.bold.green("-> 3. Run away"));
                break;
            default:
                break;
        }
    }

    enterShop() {
        this.inShop = true;
    }

    isInShop() {
        return this.inShop;
    }

    exitShop() {
        this.inShop = false;
    }

    chooseShopAction(keyName) {
        switch (keyName) {
            case 'up':
                this.shopCycleCounter--;
                this.shopCycleCounter = this.shopCycleCounter < 0 ? (this.shopCycleCounter + 3) % 3 : this.shopCycleCounter % 3;
                break;
            case 'down':
                this.shopCycleCounter++;
                this.shopCycleCounter = this.shopCycleCounter < 0 ? (this.shopCycleCounter + 3) % 3 : this.shopCycleCounter % 3;
                break;
            case 'return':
                return this.shopCycleCounter;
            default:
                break;
        }
    }
}