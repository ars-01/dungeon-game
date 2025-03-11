import {asBar, getColor} from "../resources/tables.js";
import chalk from "chalk";
import {checkSkill} from "../helpers/functionsHelper.js";
import {Effect} from "./effect.js";

export class Character {

    name;
    level;
    isPlayer;

    maxHealth;
    health;
    healthBonus = 0;
    maxStamina;
    stamina;
    staminaBonus = 0;
    maxMana;
    mana;
    manaBonus = 0;

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
        restoration: [],
        alteration: []
    }
    effects = [];

    canAct = true;
    isOverencumbered = false;
    isInInventory = false;
    currentInventoryPage;
    isFighting = false;
    isBlocking = false;
    armorBonus = 0;
    attackBonus = 0;
    magicResistance = 0;
    meleeResistance = 0;
    canTrade;

    //skillLevels
    characterLevel = 1;
    characterLevelXP = 0;

    //mage
    destructionSkill = 1;
    destructionSkillXP = 0;
    restorationSkill = 1;
    restorationSkillXP = 0;
    alterationSkill = 1;
    alterationSkillXP = 0;

    //warrior
    heavyArmorSkill = 1;
    heavyArmorSkillXP = 0;
    blockSkill = 1;
    blockSkillXP = 0;
    twoHandedSkill = 1;
    twoHandedSkillXP = 0;
    oneHandedSkill = 1;
    oneHandedSkillXP = 0;

    //thief
    lightArmorSkill = 1;
    lightArmorSkillXP = 0;
    speechSkill = 1;
    speechSkillXP = 0;

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
        let armorValue = this.armorBonus;
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
        return armorValue / 1000 > 1 ? 1 : armorValue / 1000;
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

    addEffect(effect) {
        this.effects.push(effect);
    }

    applyEffects() {
        this.resetBuffs();
        for (const effect of this.effects) {
            effect.trigger(this);
        }
        if (this.equipment.head)
            if (this.equipment.head.effect)
                this.equipment.head.effect.trigger(this);
        if (this.equipment.main)
            if (this.equipment.main.effect)
                this.equipment.main.effect.trigger(this);
        if (this.equipment.arms)
            if (this.equipment.arms.effect)
                this.equipment.arms.effect.trigger(this);
        if (this.equipment.feet)
            if (this.equipment.feet.effect)
                this.equipment.feet.trigger(this);
    }

    tidyEffects() {
        for (let i = 0; i < this.effects.length; i++) {
            if (this.effects[i].timeToLive > 0)
                continue;
            this.effects.splice(i, 1);
            i--;
        }
    }

    resetBuffs() {
        this.healthBonus = 0;
        this.staminaBonus = 0;
        this.manaBonus = 0;
        this.armorBonus = 0;
        this.attackBonus = 0;
    }

    printEffects() {
        let hasEffects = false;
        let outputString = "\n";
        for (const effect of this.effects) {
            if (effect.timeToLive > 0) {
                outputString += effect.toString() + "\n";
                hasEffects = true;
            }
        }
        if (hasEffects) {
            console.log(chalk.blueBright(`Active effects of ${this.name}:`));
            console.log(outputString);
        } else {
            console.log(chalk.blueBright(`${this.name} has no active effects`));
        }
    }

    advanceSkill(skill, value, logMessage = this.isPlayer) {
        switch (skill) {
            case "Destruction":
                this.destructionSkillXP += value;
                if (checkSkill(this.destructionSkill, this.destructionSkillXP, 0)) {
                    this.destructionSkillXP -= this.destructionSkill * 50;
                    this.destructionSkill++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Destruction skill`));
                }
                break;
            case "Restoration":
                this.restorationSkillXP += value;
                if (checkSkill(this.restorationSkill, this.restorationSkillXP, 0)) {
                    this.restorationSkillXP -= this.restorationSkill * 50;
                    this.restorationSkill++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Restoration skill`));
                }
                break;
            case "Alteration":
                this.alterationSkillXP += value;
                if (checkSkill(this.alterationSkill, this.alterationSkillXP, 2)) {
                    this.alterationSkillXP -= this.alterationSkill * 10;
                    this.alterationSkill++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Alteration skill`));
                }
                break;
            case "HeavyArmor":
                this.heavyArmorSkillXP += value;
                if (checkSkill(this.heavyArmorSkill, this.heavyArmorSkillXP, 1)) {
                    this.heavyArmorSkillXP -= this.heavyArmorSkill * 25;
                    this.heavyArmorSkill++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Heavy Armor skill`));
                }
                break;
            case "Block":
                this.blockSkillXP += value;
                if (checkSkill(this.blockSkill, this.blockSkillXP, 1)) {
                    this.blockSkillXP -= this.blockSkill * 25;
                    this.blockSkill++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Block skill`));
                }
                break;
            case "TwoHanded":
                this.twoHandedSkillXP += value;
                if (checkSkill(this.twoHandedSkill, this.twoHandedSkillXP, 0)) {
                    this.twoHandedSkillXP -= this.twoHandedSkill * 50;
                    this.twoHandedSkill++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Two Handed skill`));
                }
                break;
            case "OneHanded":
                this.oneHandedSkillXP += value;
                if (checkSkill(this.oneHandedSkill, this.oneHandedSkillXP, 0)) {
                    this.oneHandedSkillXP -= this.oneHandedSkill * 50;
                    this.oneHandedSkill++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their One Handed skill`));
                }
                break;
            case "LightArmor":
                this.lightArmorSkillXP += value;
                if (checkSkill(this.lightArmorSkill, this.lightArmorSkillXP, 1)) {
                    this.lightArmorSkillXP -= this.lightArmorSkill * 25;
                    this.lightArmorSkill++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Light Armor skill`));
                }
                break;
            case "Speech":
                this.speechSkillXP += value;
                if (checkSkill(this.speechSkill, this.speechSkillXP, 1)) {
                    this.speechSkillXP -= this.speechSkill * 25;
                    this.speechSkill++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Speech skill`));
                }
                break;
            default:
                break;
        }
    }

    //combat//

    getMeleeDamage() {
        let baseDamage;
        let cumulatedDamage = 0;
        if (this.equipment.weapon) {
            baseDamage = this.equipment.weapon.value * (1 + (this.equipment.weapon.getSubTypes()[0] === "TwoHanded" ?
                                                            (this.twoHandedSkill / 100) :
                                                            (this.oneHandedSkill / 100)));
        } else {
            baseDamage = Math.floor((1 + (this.characterLevel / 2)) * (1 + this.oneHandedSkill / 100));
        }
        cumulatedDamage += this.attackBonus;
        cumulatedDamage += baseDamage;
        if (Math.random() <= 0.1)
            cumulatedDamage += Math.floor(baseDamage * 0.5);
        if (this.equipment.weapon)
            switch (this.equipment.weapon.getSubTypes()[0]) {
                case "TwoHanded":
                    cumulatedDamage += this.twoHandedSkill >= 25 ? Math.floor(baseDamage * 0.25) : 0;
                    break;
                case "OneHanded":
                    cumulatedDamage += this.oneHandedSkill >= 25 ? Math.floor(baseDamage * 0.25) : 0;
                    break;
                default:
                    break;
            }
        return cumulatedDamage;
    }

    castSpell(school, id) {
        const output = {success: false, value: 0};
        let spell;
        let manaCost;
        switch (school) {
            case "Destruction":
                if (!this.isFighting)
                    break;
                spell = this.spells.destruction[id].clone();
                output.value = Math.floor(spell.value * (1 + (this.destructionSkill / 100)));
                manaCost = Math.ceil(spell.manaCost * (1 - (1 / this.destructionSkill >= 100 ? 100 : this.destructionSkill)));
                break;
            case "Restoration":
                spell = this.spells.restoration[id].clone();
                output.value = Math.floor(spell.value * (1 + (this.restorationSkill / 100)));
                manaCost = Math.ceil(spell.manaCost * (1 - (1 / this.restorationSkill >= 100 ? 100 : this.restorationSkill)));
                break;
            case "Alteration":
                spell = this.spells.alteration[id].clone();
                output.value = spell.value;
                manaCost = Math.ceil(spell.manaCost * (1 - (1 / this.alterationSkill >= 100 ? 100 : this.alterationSkill)));
                break;
            default:
                break;
        }
        if (manaCost > this.mana)
            return output;
        output.success = true;
        switch (spell.subtype) {
            case "Health":
                this.health = this.health + output.value >= this.maxHealth + this.healthBonus ? this.maxHealth + this.healthBonus : this.health + output.value;
                break;
            case "Stamina":
                this.stamina = this.stamina + output.value >= this.maxStamina + this.staminaBonus ? this.maxStamina + this.staminaBonus : this.stamina + output.value;
                break;
            case "Armor":
                this.effects.push(spell.effect.clone());
                break;
            default:
                break;
        }
        this.advanceSkill(spell.school, output.value);
        this.mana -= manaCost;
        return output;
    }

    takeDamage(rawDamage, damageType) {
        let finalDamage = rawDamage;
        const armorValue = this.getArmorValue();
        if (damageType === "Magic")
            finalDamage *= (1 - this.magicResistance);
        else if (damageType === "Melee")
            finalDamage *= (1 - this.meleeResistance);
        else if (damageType !== "True")
            finalDamage *= (1 - armorValue);
        finalDamage = Math.floor(finalDamage);
        if (finalDamage > 0) {
            this.health -= finalDamage;
            console.log(chalk.blueBright(`${this.name} takes ${chalk.red(finalDamage)} damage`));
        } else {
            console.log(chalk.blueBright(`${this.name} takes no damage`));
        }
    }

    block() {
        if (this.equipment.shield) {
            this.isBlocking = true;
            if (this.equipment.shield.effect)
                this.equipment.shield.effect.trigger(this);
        }
    }

    stopBlocking() {
        this.isBlocking = false;
    }


}