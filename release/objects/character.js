import {asBar, getColor} from "../resources/tables.js";
import chalk from "chalk";

export class Character {

    name;
    level;
    isPlayer;

    maxHealth;
    health;
    maxStamina;
    stamina;
    maxMana;
    mana;

    gold;
    inventory = {
        weapons: [],
        armor: [],
        potions: [],
        misc: []
    };
    equipment = {
        head: null,
        main: null,
        arms: null,
        feet: null,
        weapon: null,
        shield: null
    };
    spells = {
        destruction: [],
        restoration: []
    }

    canAct = true;
    isOverencumbered = false;
    isInInventory = false;
    currentInventoryPage;
    isFighting = false;
    isBlocking = false;
    bonusArmor = 0;
    canTrade;

    constructor(name, maxHealth, maxStamina, maxMana, level = 0, isPlayer = false, canTrade = false) {
        this.name = name;
        this.level = level;
        this.isPlayer = isPlayer;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.maxStamina = maxStamina;
        this.stamina = maxStamina;
        this.mana = maxMana;
        this.maxMana = maxMana;
        this.canTrade = canTrade;
    }

    //character information and inventory management//

    printInventory(page = 0, showName = true) {
        if (showName)
            console.log(`Inventory of ${this.name}:\n`);
        console.log("Gold: " + chalk.hex("#ddd700")(this.gold) + "\n");
        const tabs = ["All", "Weapons", "Apparel", "Potions", "Misc"];
        let tabString = "";
        for (let i = 0; i < tabs.length; i++) {
            tabString += chalk.hex("#a0a0a0")(`"###[ ${i === page ? chalk.bold(tabs[i]) : tabs[i]} ]###`);
        }
        console.log(tabString);
        this.currentInventoryPage = page;
        switch (page) {
            case 0:
                this.getCumulatedInventory().forEach((item, index) => {
                    console.log(chalk.hex(getColor(item.rarity))(`${index + 1}. ${item.name}`));
                })
                break;
            case 1:
                this.inventory.weapons.forEach((item, index) => {
                    console.log(chalk.hex(getColor(item.rarity))(`${index + 1}. ${item.name}`));
                });
                break;
            case 2:
                this.inventory.armor.forEach((item, index) => {
                    console.log(chalk.hex(getColor(item.rarity))(`${index + 1}. ${item.name}`));
                });
                break;
            case 3:
                this.inventory.potions.forEach((item, index) => {
                    console.log(chalk.hex(getColor(item.rarity))(`${index + 1}. ${item.name}`));
                });
                break;
            case 4:
                this.inventory.misc.forEach((item, index) => {
                    console.log(chalk.hex(getColor(item.rarity))(`${index + 1}. ${item.name}`));
                });
                break;
            default:
                break;
        }
        console.log(`\nEncumbrance: ${this.getEncumbrance()}/${this.getMaxEncumbrance()}`);
    }

    getCumulatedInventory() {
        const temp = [];
        this.inventory.weapons.forEach((item, index) => {
            temp.push({name: item.name, rarity: item.rarity, type: 1, originalIndex: index});
        });
        this.inventory.armor.forEach((item, index) => {
            temp.push({name: item.name, rarity: item.rarity, type: 2, originalIndex: index});
        });
        this.inventory.potions.forEach((item, index) => {
            temp.push({name: item.name, rarity: item.rarity, type: 3, originalIndex: index});
        });
        this.inventory.misc.forEach((item, index) => {
            temp.push({name: item.name, rarity: item.rarity, type: 4, originalIndex: index});
        });

        temp.sort((a, b) => {a.name.localeCompare(b.name);});
        return temp;
    }

    printEquipment(showName = true) {
        if (showName)
            console.log(`Equipment of ${this.name}:`);
        console.log();

        if (this.equipment.weapon)
            console.log(chalk.hex(getColor(this.equipment.weapon.rarity))(`Weapon: ${this.equipment.weapon.name}`));
        else
            console.log("Weapon: -");

        if (this.equipment.shield)
            console.log(chalk.hex(getColor(this.equipment.shield.rarity))(`Weapon: ${this.equipment.shield.name}`));
        else
            console.log("Shield: -");

        if (this.equipment.head)
            console.log(chalk.hex(getColor(this.equipment.head.rarity))(`Head: ${this.equipment.head.name}`));
        else
            console.log("Head: -");

        if (this.equipment.main)
            console.log(chalk.hex(getColor(this.equipment.main.rarity))(`Armor: ${this.equipment.main.name}`));
        else
            console.log("Armor: -");

        if (this.equipment.arms)
            console.log(chalk.hex(getColor(this.equipment.arms.rarity))(`Arms: ${this.equipment.arms.name}`));
        else
            console.log("Arms: -");

        if (this.equipment.feet)
            console.log(chalk.hex(getColor(this.equipment.feet.rarity))(`Feet: ${this.equipment.feet.name}`));
        else
            console.log("Feet: -");
    }

    printStatus() {
        console.log(chalk.blueBright(`----[ ${this.name} ]----\n`));
        console.log("Health: " + chalk.red(asBar(this.health, this.maxHealth)));
        console.log("Stamina: " + chalk.green(asBar(this.stamina, this.maxStamina)));
        console.log("Mana: " + chalk.blue(asBar(this.mana, this.maxMana)));
    }

    getArmorValue() {
        let armorValue = this.bonusArmor;
        if (this.equipment.head)
            armorValue += this.equipment.head.value;
        if (this.equipment.main)
            armorValue += this.equipment.main.value;
        if (this.equipment.arms)
            armorValue += this.equipment.arms.value;
        if (this.equipment.feet)
            armorValue += this.equipment.feet.value;
        if (this.equipment.shield && this.isBlocking)
            armorValue += this.equipment.shield.value;
        return armorValue / 1000;
    }

    addItemToInventory(item) {
        switch (item.getType()) {
            case "Weapon":
                this.inventory.weapons.push(item.clone());
                this.inventory.weapons.sort((a, b) => {a.name.localeCompare(b.name);});
                break;
            case "Armor":
                this.inventory.armor.push(item.clone());
                this.inventory.armor.sort((a, b) => {a.name.localeCompare(b.name);});
                break;
            case "Potion":
                this.inventory.potions.push(item.clone());
                this.inventory.potions.sort((a, b) => {a.name.localeCompare(b.name);});
                break;
            case "Misc":
                this.inventory.misc.push(item.clone());
                this.inventory.misc.sort((a, b) => {a.name.localeCompare(b.name);});
                break;
            default:
                break;
        }
    }

    removeItemFromInventory(index, page = this.currentInventoryPage ? this.currentInventoryPage : -1) {
        if (!this.isInInventory)
            return;
        switch (page) {
            case 0:
                const temp = this.getCumulatedInventory();
                return this.removeItemFromInventory(temp[index].originalIndex, temp[index].type);
            case 1:
                return this.inventory.weapons.splice(index, 1);
            case 2:
                return this.inventory.armor.splice(index, 1);
            case 3:
                return this.inventory.potions.splice(index, 1);
            case 4:
                return this.inventory.misc.splice(index, 1);
            default:
                return;
        }
    }

    useItem(index, page = this.currentInventoryPage ? this.currentInventoryPage : -1) {
        if (!this.isInInventory)
            return;
        switch (page) {
            case 0:
                const temp = this.getCumulatedInventory();
                this.useItem(temp[index].originalIndex, temp[index].type);
                break;
            case 1:
                this.equipWeapon(index);
                break;
            case 2:
                this.equipArmor(index);
                break;
            case 3:
                this.usePotion(index);
                break;
            case 4:
                console.log(chalk.blueBright("This item cannot be used. (message sent by character.useItem)"));
                break;
            default:
                return;
        }
    }

    equipWeapon(index) {
        let temp = null;
        if (this.equipment.weapon)
            temp = this.equipment.weapon.clone();
        this.equipment.weapon = this.removeItemFromInventory(temp[index]);
        if (temp)
            this.addItemToInventory(temp);
    }

    unequipWeapon() {
        if (this.equipment.weapon) {
            const temp = this.equipment.weapon.clone();
            this.equipment.weapon = null;
            this.addItemToInventory(temp);
        }
    }

    equipArmor(index) {
        let temp = null;
        const item = this.removeItemFromInventory(index);
        switch (item.getSubTypes()[0]) {
            case "Head":
                if (this.equipment.head)
                    temp = this.equipment.head.clone();
                this.equipment.head = this.removeItemFromInventory(temp[index]);
                break;
            case "Main":
                if (this.equipment.main)
                    temp = this.equipment.main.clone();
                this.equipment.main = this.removeItemFromInventory(temp[index]);
                break;
            case "Arms":
                if (this.equipment.arms)
                    temp = this.equipment.arms.clone();
                this.equipment.arms = this.removeItemFromInventory(temp[index]);
                break;
            case "Feet":
                if (this.equipment.feet)
                    temp = this.equipment.feet.clone();
                this.equipment.feet = this.removeItemFromInventory(temp[index]);
                break;
            case "Shield":
                if (this.equipment.shield)
                    temp = this.equipment.shield.clone();
                this.equipment.shield = this.removeItemFromInventory(temp[index]);
                break;
            default:
                break;
        }
        if (temp)
            this.addItemToInventory(temp)
    }

    usePotion(index) {
        const item = this.removeItemFromInventory(index);
        switch (item.getSubTypes()[0]) {
            case "Health":
                switch (item.getSubTypes()[1]) {
                    case "Restore":
                        this.health = this.health + item.value > this.maxHealth ? this.maxHealth : this.health + item.value;
                        break;
                    case "Modify":
                        this.maxHealth = this.maxHealth + item.value <= 0 ? 0 : this.maxHealth + item.value;
                        this.health = this.health + item.value <= 0 ? 0 : this.health + item.value;
                        break;
                    default:
                        break;
                }
                break;
            case "Stamina":
                switch (item.getSubTypes()[1]) {
                    case "Restore":
                        this.stamina = this.stamina + item.value > this.maxStamina ? this.maxStamina : this.stamina + item.value;
                        break;
                    case "Modify":
                        this.maxStamina = this.maxStamina + item.value <= 0 ? 0 : this.maxStamina + item.value;
                        this.stamina = this.stamina + item.value <= 0 ? 0 : this.stamina + item.value;
                        break;
                    default:
                        break;
                }
                break;
            case "Mana":
                switch (item.getSubTypes()[1]) {
                    case "Restore":
                        this.mana = this.mana + item.value > this.maxMana ? this.maxMana : this.mana + item.value;
                        break;
                    case "Modify":
                        this.maxMana = this.maxMana + item.value <= 0 ? 0 : this.maxMana + item.value;
                        this.mana = this.mana + item.value <= 0 ? 0 : this.mana + item.value;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    getEncumbrance() {
        let weight = 0;
        this.inventory.weapons.forEach((item) => {
            weight += item.weight;
        });
        this.inventory.armor.forEach((item) => {
            weight += item.weight;
        });
        this.inventory.potions.forEach((item) => {
            weight += item.weight;
        });
        this.inventory.misc.forEach((item) => {
            weight += item.weight;
        });
        if (this.equipment.weapon)
            weight += this.equipment.weapon.weight;
        if (this.equipment.head)
            weight += this.equipment.head.weight;
        if (this.equipment.main)
            weight += this.equipment.main.weight;
        if (this.equipment.arms)
            weight += this.equipment.arms.weight;
        if (this.equipment.feet)
            weight += this.equipment.feet.weight;
        if (this.equipment.shield)
            weight += this.equipment.shield.weight;
        return weight;
    }

    getMaxEncumbrance() {
        return (this.maxStamina / 2) * 5;
    }

    unequipAll() {
        if (this.inventory.weapon)
            this.inventory.push(this.equipment.weapon);
        if (this.equipment.head)
            this.inventory.push(this.equipment.head);
        if (this.equipment.main)
            this.inventory.push(this.equipment.main);
        if (this.equipment.arms)
            this.inventory.push(this.equipment.arms);
        if (this.equipment.feet)
            this.inventory.push(this.equipment.feet);
        if (this.equipment.shield)
            this.inventory.push(this.equipment.shield);

        this.equipment.weapon = null;
        this.equipment.head = null;
        this.equipment.main = null;
        this.equipment.arms = null;
        this.equipment.feet = null;
        this.equipment.shield = null;
    }

    //combat//

    calculateMeleeDamage() {

    }

    calculateMagicDamage() {

    }

    calculateIncomingDamage(rawDamage, damageType) {
        const armorValue = this.getArmorValue();
    }

    block() {
        if (this.equipment.shield)
            this.isBlocking = true;
    }

    stopBlocking() {
        this.isBlocking = false;
    }
}