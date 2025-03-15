import {asBar, getColor} from "../resources/tables.js";
import chalk from "chalk";
import {checkSkill} from "../helpers/functionsHelper.js";
import {Effect} from "./effect.js";

export class Character {

    name;
    pos = {x: 0, y: 0};
    isPlayer;
    deleted = false;

    maxHealth;
    health;
    healthBonus = 0;
    maxStamina;
    stamina;
    staminaBonus = 0;
    maxMana;
    mana;
    manaBonus = 0;

    gold = 0;
    inventory = {
        weapons: [],
        apparel: [],
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

    isParalyzed = false;

    canAct = true;
    hasActed = false;
    isRunningAway = false;
    isOverencumbered = false;
    isTrading = false;
    isInInventory = false;
    currentInventoryPage = 0;
    isInSpellbook = false;
    currentSpellBookPage = 0;
    isFighting = false;
    isBlocking = false;
    armorBonus = 0;
    attackBonus = 0;
    magicResistance = 0;
    meleeResistance = 0;
    canTrade;

    //skillLevels

    characterLevel;
    characterLevelXP = 0;

    //mage

    destructionSkill = 1;
    destructionSkillXP = 0;
    destructionSkillBonus = 0;
    restorationSkill = 1;
    restorationSkillXP = 0;
    restorationSkillBonus = 0;
    alterationSkill = 1;
    alterationSkillXP = 0;
    alterationSkillBonus = 0;

    //warrior

    heavyArmorSkill = 1;
    heavyArmorSkillXP = 0;
    blockSkill = 1;
    blockSkillXP = 0;
    twoHandedSkill = 1;
    twoHandedSkillXP = 0;

    //thief

    lightArmorSkill = 1;
    lightArmorSkillXP = 0;
    speechSkill = 1;
    speechSkillXP = 0;
    oneHandedSkill = 1;
    oneHandedSkillXP = 0;

    constructor(name, pos, maxHealth, maxStamina, maxMana, isPlayer = false, level = 0, canTrade = false) {
        this.name = name;
        this.pos = pos;
        this.characterLevel = level;
        this.isPlayer = isPlayer;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.maxStamina = maxStamina;
        this.stamina = maxStamina;
        this.mana = maxMana;
        this.maxMana = maxMana;
        this.canTrade = canTrade;
    }

    markForDelete() {
        this.deleted = true;
    }

    clone() {
        const copy = new Character(this.name, this.pos, this.maxHealth, this.maxStamina, this.maxMana, this.characterLevel, this.isPlayer, this.canTrade);
        copy.healthBonus = this.healthBonus;
        copy.staminaBonus = this.staminaBonus;
        copy.manaBonus = this.manaBonus;
        copy.gold = this.gold;
        copy.deleted = this.deleted;

        for (const weapon of this.inventory.weapons)
            copy.inventory.weapons.push(weapon.clone());
        for (const apparel of this.inventory.apparel)
            copy.inventory.apparel.push(apparel.clone());
        for (const potion of this.inventory.potions)
            copy.inventory.potions.push(potion.clone());
        for (const misc of this.inventory.misc)
            copy.inventory.misc.push(misc.clone());

        copy.equipment.weapon = this.equipment.weapon ? this.equipment.weapon.clone() : null;
        copy.equipment.shield = this.equipment.shield ? this.equipment.shield.clone() : null;
        copy.equipment.head = this.equipment.head ? this.equipment.head.clone() : null;
        copy.equipment.main = this.equipment.main ? this.equipment.main.clone() : null;
        copy.equipment.arms = this.equipment.arms ? this.equipment.arms.clone() : null;
        copy.equipment.feet = this.equipment.feet ? this.equipment.feet.clone() : null;

        for (const destructionSpell of this.spells.destruction)
            copy.spells.destruction.push(destructionSpell.clone());
        for (const restorationSpell of this.spells.restoration)
            copy.spells.restoration.push(restorationSpell.clone());
        for (const alterationSpell of this.spells.alteration)
            copy.spells.alteration.push(alterationSpell.clone());

        for (const effect of this.effects)
            copy.effects.push(effect.clone());

        copy.isParalyzed = this.isParalyzed;

        copy.canAct = this.canAct;
        copy.hasActed = this.hasActed;
        copy.isRunningAway = this.isRunningAway;
        copy.isOverencumbered = this.isOverencumbered;
        copy.isTrading = this.isTrading;
        copy.isInInventory = this.isInInventory;
        copy.currentInventoryPage = this.currentInventoryPage;
        copy.isInSpellbook = this.isInSpellbook;
        copy.currentSpellBookPage = this.currentSpellBookPage;
        copy.isFighting = this.isFighting;
        copy.isBlocking = this.isBlocking;
        copy.armorBonus = this.armorBonus;
        copy.attackBonus = this.attackBonus;
        copy.magicResistance = this.magicResistance;
        copy.meleeResistance = this.meleeResistance;
        copy.canTrade = this.canTrade;

        copy.characterLevel = this.characterLevel;
        copy.characterLevelXP = this.characterLevelXP;

        copy.destructionSkill = this.destructionSkill;
        copy.destructionSkillXP = this.destructionSkillXP;
        copy.destructionSkillBonus = this.destructionSkillBonus;
        copy.restorationSkill = this.restorationSkill;
        copy.restorationSkillXP = this.restorationSkillXP;
        copy.restorationSkillBonus = this.restorationSkillBonus;
        copy.alterationSkill = this.alterationSkill;
        copy.restorationSkillXP = this.restorationSkillXP;
        copy.alterationSkillBonus = this.alterationSkillBonus;
        copy.heavyArmorSkill = this.heavyArmorSkill;
        copy.heavyArmorSkillXP = this.heavyArmorSkillXP;
        copy.blockSkill = this.blockSkill;
        copy.blockSkillXP = this.blockSkillXP;
        copy.twoHandedSkill = this.twoHandedSkill;
        copy.twoHandedSkillXP = this.twoHandedSkillXP;
        copy.oneHandedSkill = this.oneHandedSkill;
        copy.oneHandedSkillXP = this.oneHandedSkillXP;
        copy.lightArmorSkill = this.lightArmorSkill;
        copy.lightArmorSkillXP = this.lightArmorSkillXP;
        copy.speechSkill = this.speechSkill;
        copy.speechSkillXP = this.speechSkillXP;

        return copy;
    }

    move(root, keyName) {
        switch (keyName) {
            case "up":
                if (root.edgeExists(this.pos, {x: this.pos.x, y: this.pos.y - 1}))
                    this.pos.y--;
                break;
            case "down":
                if (root.edgeExists(this.pos, {x: this.pos.x, y: this.pos.y + 1}))
                    this.pos.y++;
                break;
            case "left":
                if (root.edgeExists(this.pos, {x: this.pos.x - 1, y: this.pos.y}))
                    this.pos.x--;
                break;
            case "right":
                if (root.edgeExists(this.pos, {x: this.pos.x + 1, y: this.pos.y}))
                    this.pos.x++;
                break;
            default:
                break;
        }
    }

    //character information and inventory management//

    printInventory(page = this.currentInventoryPage, showName = true) {
        page = page < 0 ? page + 5 : page % 5;
        this.currentInventoryPage = page;
        if (showName)
            console.log(`Inventory of ${this.name}:\n`);
        const tabs = ["All", "Weapons", "Apparel", "Potions", "Misc"];
        let tabString = "";
        for (let i = 0; i < tabs.length; i++) {
            tabString += chalk.hex("#a0a0a0")(`████ ${i === page ? chalk.green(tabs[i]) : tabs[i]} ████`);
        }
        console.log(tabString + "\n");
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
                this.inventory.apparel.forEach((item, index) => {
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
        console.log(chalk.hex("#a0a0a0")("\n██████████████████████████████████████████████████████████████████████████████"));
        console.log(`\nEncumbrance: ${this.getEncumbrance()}/${this.getMaxEncumbrance()}   `
            + "Gold: " + chalk.hex("#ddd700")(this.gold) + "\n");
    }

    getCumulatedInventory() {
        const temp = [];
        for (let index = 0; index < this.inventory.weapons.length; index++) {
            const item = this.inventory.weapons[index].clone();
            temp.push({name: item.name, rarity: item.rarity, type: 1, originalIndex: index});
        }
        for (let index = 0; index < this.inventory.apparel.length; index++) {
            const item = this.inventory.apparel[index].clone();
            temp.push({name: item.name, rarity: item.rarity, type: 2, originalIndex: index});
        }
        for (let index = 0; index < this.inventory.potions.length; index++) {
            const item = this.inventory.potions[index].clone();
            temp.push({name: item.name, rarity: item.rarity, type: 3, originalIndex: index});
        }
        for (let index = 0; index < this.inventory.misc.length; index++) {
            const item = this.inventory.misc[index].clone();
            temp.push({name: item.name, rarity: item.rarity, type: 4, originalIndex: index});
        }

        temp.sort((a, b) => {b.name.localeCompare(a.name);});
        return temp;
    }

    addGold(amount) {
        this.gold += amount;
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

    printSpellBook(page = this.currentSpellBookPage, showName = true) {
        page = page < 0 ? page + 5 : page % 5;
        this.currentSpellBookPage = page;
        if (showName)
            console.log(`Spell Book of ${this.name}:\n`);
        const tabs = ["All", "Destruction", "Restoration", "Alteration", "Effects"];
        let tabString = "";
        for (let i = 0; i < tabs.length; i++) {
            tabString += chalk.hex("#a0a0a0")(`████ ${i === page ? chalk.green(tabs[i]) : tabs[i]} ████`);
        }
        console.log(tabString + "\n");
        this.currentSpellBookPage = page;
        switch (page) {
            case 0:
                this.getCumulatedSpellBook().forEach((spell, index) => {
                    console.log(chalk.hex("#ffffff")(`${index + 1}. ${spell.name}, ${spell.cost} mana`));
                })
                break;
            case 1:
                this.spells.destruction.forEach((spell, index) => {
                    console.log(chalk.hex("#ffffff")(`${index + 1}. ${spell.name}, ${spell.manaCost} mana`));
                });
                break;
            case 2:
                this.spells.restoration.forEach((spell, index) => {
                    console.log(chalk.hex("#ffffff")(`${index + 1}. ${spell.name}, ${spell.manaCost} mana`));
                });
                break;
            case 3:
                this.spells.alteration.forEach((spell, index) => {
                    console.log(chalk.hex("#ffffff")(`${index + 1}. ${spell.name}, ${spell.manaCost} mana`));
                });
                break;
            case 4:
                for (const effect of this.effects) {
                    console.log(chalk.hex("#ffffff")(effect.toString()));
                }
                break;
            default:
                break;
        }
        console.log(chalk.hex("#a0a0a0")("\n████████████████████████████████████████████████████████████████████████████████████████████"));
    }

    getCumulatedSpellBook() {
        const temp = [];
        this.spells.destruction.forEach((spell, index) => {
            temp.push({name: spell.name, type: 1, originalIndex: index, cost: spell.manaCost});
        });
        this.spells.restoration.forEach((spell, index) => {
            temp.push({name: spell.name, type: 2, originalIndex: index, cost: spell.manaCost});
        });
        this.spells.alteration.forEach((spell, index) => {
            temp.push({name: spell.name, type: 3, originalIndex: index, cost: spell.manaCost});
        });
        temp.sort((a, b) => {b.name.localeCompare(a.name);});
        return temp;
    }

    printStatus() {
        console.log(chalk.blueBright(`----[ ${this.name} ]----\n`));
        console.log("Health:  " + chalk.red(asBar(this.health, this.maxHealth)));
        console.log("Stamina: " + chalk.green(asBar(this.stamina, this.maxStamina)));
        console.log("Mana:    " + chalk.blue(asBar(this.mana, this.maxMana)));
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
        switch (item.type) {
            case "Weapon":
                this.inventory.weapons.push(item.clone());
                this.inventory.weapons.sort((a, b) => {b.name.localeCompare(a.name);});
                break;
            case "Apparel":
                this.inventory.apparel.push(item.clone());
                this.inventory.apparel.sort((a, b) => {b.name.localeCompare(a.name);});
                break;
            case "Potion":
                this.inventory.potions.push(item.clone());
                this.inventory.potions.sort((a, b) => {b.name.localeCompare(a.name);});
                break;
            case "Misc":
                this.inventory.misc.push(item.clone());
                this.inventory.misc.sort((a, b) => {b.name.localeCompare(a.name);});
                break;
            default:
                break;
        }
    }

    removeItemFromInventory(index, page = this.currentInventoryPage) {
        if (!this.isInInventory)
            return;
        switch (page) {
            case 0:
                const temp = this.getCumulatedInventory();
                return this.removeItemFromInventory(temp[index].originalIndex, temp[index].type);
            case 1:
                return this.inventory.weapons.splice(index, 1)[0];
            case 2:
                return this.inventory.apparel.splice(index, 1)[0];
            case 3:
                return this.inventory.potions.splice(index, 1)[0];
            case 4:
                return this.inventory.misc.splice(index, 1)[0];
            default:
                return;
        }
    }

    removeAllItems() {
        const items = [];
        for (const item of this.inventory.weapons.splice(0, this.inventory.weapons.length))
            items.push(item);
        for (const item of this.inventory.apparel.splice(0, this.inventory.apparel.length))
            items.push(item);
        for (const item of this.inventory.potions.splice(0, this.inventory.potions.length))
            items.push(item);
        for (const item of this.inventory.misc.splice(0, this.inventory.misc.length))
            items.push(item);
        return items;
    }

    itemInfo(index, page = this.currentInventoryPage) {
        if (!this.isInInventory)
            return;
        switch (page) {
            case 0:
                const temp = this.getCumulatedInventory();
                this.itemInfo(temp[index].originalIndex, temp[index].type);
                break;
            case 1:
                if (index < this.inventory.weapons.length)
                    this.inventory.weapons[index].detailedInfo();
                break;
            case 2:
                if (index < this.inventory.apparel.length)
                    this.inventory.apparel[index].detailedInfo();
                break;
            case 3:
                if (index < this.inventory.potions.length)
                    this.inventory.potions[index].detailedInfo();
                break;
            case 4:
                if (index < this.inventory.misc.length)
                    this.inventory.misc[index].detailedInfo();
                break;
            default:
                return;
        }
    }

    spellInfo(index, page = this.currentSpellBookPage) {
        if (!this.isInSpellbook)
            return;
        switch (page) {
            case 0:
                const temp = this.getCumulatedSpellBook();
                this.spellInfo(temp[index].originalIndex, temp[index].type);
                break;
            case 1:
                if (index < this.spells.destruction.length)
                    this.spells.destruction[index].detailedInfo();
                break;
            case 2:
                if (index < this.spells.restoration.length)
                    this.spells.restoration[index].detailedInfo();
                break;
            case 3:
                if (index < this.spells.alteration.length)
                    this.spells.alteration[index].detailedInfo();
                break;
            case 4:
                if (index < this.effects.length)
                    this.effects[index].detailedInfo();
                break;
            default:
                return;
        }
    }

    getInventoryPageLength(page) {
        switch (page) {
            case 0:
                return this.getCumulatedInventory().length;
            case 1:
                return this.inventory.weapons.length;
            case 2:
                return this.inventory.apparel.length;
            case 3:
                return this.inventory.potions.length;
            case 4:
                return this.inventory.misc.length;
            default:
                return 0;
        }
    }

    getSpellBookPageLength(page) {
        switch (page) {
            case 0:
                return this.getCumulatedSpellBook().length;
            case 1:
                return this.spells.destruction.length;
            case 2:
                return this.spells.restoration.length;
            case 3:
                return this.spells.alteration.length;
            default:
                return 0;
        }
    }

    useItem(index, page = this.currentInventoryPage) {
        if (!this.isInInventory)
            return;
        switch (page) {
            case 0:
                const temp = this.getCumulatedInventory();
                this.useItem(temp[index].originalIndex, temp[index].type);
                break;
            case 1:
                this.equipWeapon(index, 1);
                break;
            case 2:
                this.equipArmor(index, 2);
                break;
            case 3:
                this.usePotion(index, page);
                break;
            case 4:
                this.useMisc(index, page);
                break;
            default:
                return;
        }
    }

    equipWeapon(index, page = this.currentInventoryPage) {
        let temp = null;
        if (this.equipment.weapon)
            temp = this.equipment.weapon.clone();
        this.equipment.weapon = this.removeItemFromInventory(index, page);
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

    equipArmor(index, page = this.currentInventoryPage) {
        let temp = null;
        const item = this.removeItemFromInventory(index, page);
        //console.log(item);
        switch (item.getSubTypes()[0]) {
            case "Head":
                if (this.equipment.head)
                    temp = this.equipment.head.clone();
                this.equipment.head = item;
                break;
            case "Main":
                if (this.equipment.main)
                    temp = this.equipment.main.clone();
                this.equipment.main = item;
                break;
            case "Arms":
                if (this.equipment.arms)
                    temp = this.equipment.arms.clone();
                this.equipment.arms = item;
                break;
            case "Feet":
                if (this.equipment.feet)
                    temp = this.equipment.feet.clone();
                this.equipment.feet = item;
                break;
            case "Shield":
                if (this.equipment.shield)
                    temp = this.equipment.shield.clone();
                this.equipment.shield = item;
                break;
            default:
                this.addItemToInventory(item);
                break;
        }
        if (temp)
            this.addItemToInventory(temp)
    }

    usePotion(index, page = this.currentInventoryPage) {
        const item = this.removeItemFromInventory(index, page);
        switch (item.getSubTypes()[0]) {
            case "Restore":
                switch (item.getSubTypes()[1]) {
                    case "Health":
                        this.health = this.health + item.value > this.maxHealth ? this.maxHealth : this.health + item.value;
                        break;
                    case "Stamina":
                        this.stamina = this.stamina + item.value > this.maxStamina ? this.maxStamina : this.stamina + item.value;
                        break;
                    case "Mana":
                        this.mana = this.mana + item.value > this.maxMana ? this.maxMana : this.mana + item.value;
                        break;
                    default:
                        break;
                }
                break;
            case "Augment":
                this.addEffect(item.effect.clone());
                break;
            default:
                break;
        }
    }

    useMisc(index, page = this.currentInventoryPage) {
        const item = this.removeItemFromInventory(index, page);
        switch (item.getSubTypes()[0]) {
            case "Book":
                switch (item.getSubTypes()[1]) {
                    case "SpellTome":
                        this.addEffect(item.effect.clone());
                        break;
                    default:
                        console.log(chalk.redBright("This item cannot be used yet. (message sent by character.useMisc/SpellTome)"));
                        break;
                }
                break;
            default:
                this.addItemToInventory(item);
                console.log(chalk.redBright("This item cannot be used yet. (message sent by character.useMisc)"));
                break;
        }
    }

    getEncumbrance() {
        let weight = 0;
        this.inventory.weapons.forEach((item) => {
            weight += item.weight;
        });
        this.inventory.apparel.forEach((item) => {
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

    getMostCommonArmorType() {
        let light = 0;
        let heavy = 0;
        let none = 0;
        if (this.equipment.head)
            if (this.equipment.head.getSubTypes()[1] === "HeavyArmor")
                heavy++;
            else if (this.equipment.head.getSubTypes()[1] === "LightArmor")
                light++;
            else
                none++;
        if (this.equipment.main)
            if (this.equipment.main.getSubTypes()[1] === "HeavyArmor")
                heavy++;
            else if (this.equipment.main.getSubTypes()[1] === "LightArmor")
                light++;
            else
                none++;
        if (this.equipment.arms)
            if (this.equipment.arms.getSubTypes()[1] === "HeavyArmor")
                heavy++;
            else if (this.equipment.arms.getSubTypes()[1] === "LightArmor")
                light++;
            else
                none++;
        if (this.equipment.feet)
            if (this.equipment.feet.getSubTypes()[1] === "HeavyArmor")
                heavy++;
            else if (this.equipment.feet.getSubTypes()[1] === "LightArmor")
                light++;
            else
                none++;
        if (this.isBlocking)
            if (this.equipment.shield)
                if (this.equipment.shield.getSubTypes()[1] === "HeavyArmor")
                    heavy++;
                else if (this.equipment.shield.getSubTypes()[1] === "LightArmor")
                    light++;
                else
                    none++;

        if (none > heavy + light)
            return "None";
        if (light > heavy)
            return "LightArmor";
        else
            return "HeavyArmor";
    }

    unequipAll() {
        if (this.inventory.weapon)
            this.inventory.weapons.push(this.equipment.weapon);
        if (this.equipment.head)
            this.inventory.apparel.push(this.equipment.head);
        if (this.equipment.main)
            this.inventory.apparel.push(this.equipment.main);
        if (this.equipment.arms)
            this.inventory.apparel.push(this.equipment.arms);
        if (this.equipment.feet)
            this.inventory.apparel.push(this.equipment.feet);
        if (this.equipment.shield)
            this.inventory.apparel.push(this.equipment.shield);

        this.equipment.weapon = null;
        this.equipment.head = null;
        this.equipment.main = null;
        this.equipment.arms = null;
        this.equipment.feet = null;
        this.equipment.shield = null;
    }

    addEffect(effect) {
        const newEffect = effect.clone();
        newEffect.trigger(this);
        this.effects.push(newEffect);
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
        this.magicResistance = 0;
        this.meleeResistance = 0;
        this.destructionSkillBonus = 0;
        this.restorationSkillBonus = 0;
        this.alterationSkillBonus = 0;
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
                    this.characterLevelXP++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Destruction skill`));
                }
                break;
            case "Restoration":
                this.restorationSkillXP += value;
                if (checkSkill(this.restorationSkill, this.restorationSkillXP, 0)) {
                    this.restorationSkillXP -= this.restorationSkill * 50;
                    this.restorationSkill++;
                    this.characterLevelXP++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Restoration skill`));
                }
                break;
            case "Alteration":
                this.alterationSkillXP += value;
                if (checkSkill(this.alterationSkill, this.alterationSkillXP, 2)) {
                    this.alterationSkillXP -= this.alterationSkill * 10;
                    this.alterationSkill++;
                    this.characterLevelXP++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Alteration skill`));
                }
                break;
            case "HeavyArmor":
                this.heavyArmorSkillXP += value;
                if (checkSkill(this.heavyArmorSkill, this.heavyArmorSkillXP, 1)) {
                    this.heavyArmorSkillXP -= this.heavyArmorSkill * 25;
                    this.heavyArmorSkill++;
                    this.characterLevelXP++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Heavy Armor skill`));
                }
                break;
            case "Block":
                this.blockSkillXP += value;
                if (checkSkill(this.blockSkill, this.blockSkillXP, 1)) {
                    this.blockSkillXP -= this.blockSkill * 25;
                    this.blockSkill++;
                    this.characterLevelXP++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Block skill`));
                }
                break;
            case "TwoHanded":
                this.twoHandedSkillXP += value;
                if (checkSkill(this.twoHandedSkill, this.twoHandedSkillXP, 0)) {
                    this.twoHandedSkillXP -= this.twoHandedSkill * 50;
                    this.twoHandedSkill++;
                    this.characterLevelXP++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Two Handed skill`));
                }
                break;
            case "OneHanded":
                this.oneHandedSkillXP += value;
                if (checkSkill(this.oneHandedSkill, this.oneHandedSkillXP, 0)) {
                    this.oneHandedSkillXP -= this.oneHandedSkill * 50;
                    this.oneHandedSkill++;
                    this.characterLevelXP++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their One Handed skill`));
                }
                break;
            case "LightArmor":
                this.lightArmorSkillXP += value;
                if (checkSkill(this.lightArmorSkill, this.lightArmorSkillXP, 1)) {
                    this.lightArmorSkillXP -= this.lightArmorSkill * 25;
                    this.lightArmorSkill++;
                    this.characterLevelXP++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Light Armor skill`));
                }
                break;
            case "Speech":
                this.speechSkillXP += value;
                if (checkSkill(this.speechSkill, this.speechSkillXP, 1)) {
                    this.speechSkillXP -= this.speechSkill * 25;
                    this.speechSkill++;
                    this.characterLevelXP++;
                    if (logMessage)
                        console.log(chalk.blueBright(`${this.name} advanced their Speech skill`));
                }
                break;
            default:
                break;
        }
    }

    learnSpell(spell) {
        let includes = false;
        switch (spell.school) {
            case "Destruction":
                for (const _spell of this.spells.destruction)
                    if (_spell.name === spell.name)
                        includes = true;
                if (!includes)
                    this.spells.destruction.push(spell.clone());
                this.spells.destruction.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "Restoration":
                for (const _spell of this.spells.restoration)
                    if (_spell.name === spell.name)
                        includes = true;
                if (!includes)
                    this.spells.restoration.push(spell.clone());
                this.spells.restoration.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "Alteration":
                for (const _spell of this.spells.alteration)
                    if (_spell.name === spell.name)
                        includes = true;
                if (!includes)
                    this.spells.alteration.push(spell.clone());
                this.spells.alteration.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }
    }

    levelUp() {
        this.characterLevelXP = 0;
        this.characterLevel++;
        this.maxHealth += 10;
        this.maxStamina += 10;
        this.maxMana += 10;
        this.health = this.maxHealth;
        this.stamina = this.maxStamina;
        this.mana = this.maxMana;
    }

    onStartTurn() {
        this.applyEffects();
        this.isOverencumbered = (this.getEncumbrance() > this.getMaxEncumbrance());
        this.hasActed = false;
    }

    onEndTurn() {
        if (this.health <= 0)
            this.markForDelete();
        this.health  += 1;
        if (this.health > this.maxHealth + this.healthBonus)
            this.health = this.maxHealth + this.healthBonus;
        this.stamina += 1;
        if (this.stamina > this.maxStamina + this.staminaBonus)
            this.stamina = (this.maxStamina + this.staminaBonus);
        this.mana += 1;
        if (this.mana > (this.maxMana + this.manaBonus))
            this.mana = (this.maxMana + this.manaBonus);
        this.resetBuffs();
        if (this.characterLevelXP >= 10) {
            this.levelUp();
        }
    }

    rest(hours = 1) {
        for (let i = 0; i < 12 * 60 * hours; i++) {
            this.onStartTurn();
            this.onEndTurn();
        }
        console.clear();
        console.log(chalk.blueBright("You awaken feeling refreshed\n"));
    }

    getClass() {
        const warriorSkillSum = this.blockSkill + this.twoHandedSkill + this.heavyArmorSkill;
        const mageSkillSum = this.destructionSkill + this.restorationSkill + this.alterationSkill;
        const thiefSkillSum = this.oneHandedSkill + this.lightArmorSkill + this.speechSkill;

        if (warriorSkillSum > mageSkillSum && warriorSkillSum > thiefSkillSum)
            return "Warrior";
        if (mageSkillSum > warriorSkillSum && mageSkillSum > thiefSkillSum)
            return "Mage";
        if (thiefSkillSum > mageSkillSum && thiefSkillSum > warriorSkillSum)
            return "Thief";

        return "All";
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
            switch (this.equipment.weapon.getSubTypes()[1]) {
                case "TwoHanded":
                    cumulatedDamage += this.twoHandedSkill >= 25 ? Math.floor(baseDamage * 0.25) : 0;
                    this.advanceSkill("TwoHanded", cumulatedDamage);
                    break;
                case "OneHanded":
                    cumulatedDamage += this.oneHandedSkill >= 25 ? Math.floor(baseDamage * 0.25) : 0;
                    this.advanceSkill("OneHanded", cumulatedDamage);
                    break;
                default:
                    break;
            }
        return cumulatedDamage;
    }

    castSpell(index, page = this.currentSpellBookPage) {
        const output = {success: false, value: 0, spell: null, target: ""};
        if (page === -1 || (!this.isInSpellbook && this.isPlayer))
            return output;
        let spell;
        switch (page) {
            case 0:
                const temp = this.getCumulatedSpellBook();
                return this.castSpell(temp[index].originalIndex, temp[index].type);
            case 1:
                spell = this.spells.destruction[index].clone();
                break;
            case 2:
                spell = this.spells.restoration[index].clone();
                break;
            case 3:
                spell = this.spells.alteration[index].clone();
                break;
            default:
                break;
        }
        //console.log(`${this.name} attempts to cast \n${spell.detailedInfo()}\n\n(remove this from character.castSpell)\n`);
        let manaCost = spell.manaCost;
        if (manaCost >= 0)
            switch (spell.school) {
                case "Destruction":
                    if (!this.isFighting)
                        return output;
                    output.value = Math.floor(spell.value * (1 + (this.destructionSkill / 100)));
                    output.spell = spell.clone();
                    manaCost = spell.getReducedManaValue(this.destructionSkill, this.destructionSkillBonus);
                    output.target = "target";
                    break;
                case "Restoration":
                    output.value = Math.floor(spell.value * (1 + (this.restorationSkill / 100)));
                    manaCost = spell.getReducedManaValue(this.restorationSkill, this.restorationSkillBonus);
                    output.target = "self";
                    break;
                case "Alteration":
                    output.value = spell.value;
                    manaCost = spell.getReducedManaValue(this.alterationSkill, this.alterationSkillBonus);
                    output.target = "self";
                    break;
                default:
                    break;
            }
        if (manaCost > this.mana) {
            return output;
        }
        output.success = true;
        switch (spell.subtype) {
            case "Health":
                this.health = this.health + output.value >= this.maxHealth + this.healthBonus ? this.maxHealth + this.healthBonus : this.health + output.value;
                output.target = "self";
                break;
            case "Stamina":
                this.stamina = this.stamina + output.value >= this.maxStamina + this.staminaBonus ? this.maxStamina + this.staminaBonus : this.stamina + output.value;
                output.target = "self";
                break;
            case "Armor":
                this.effects.push(spell.effect.clone());
                output.target = "self";
                break;
            case "Armor|MagicResistance":
                if (!this.isFighting)
                    output.success = false;
                const wardType = spell.name.split(" ")[0];
                this.addEffect(new Effect(`Ward - ${wardType}`, "MagicResistance", 1, 1, spell.value));
                this.addEffect(new Effect(`Shield - ${wardType}`, "Armor", 1, 1, spell.value * 100));
                output.target = "self";
                break;
            case "Paralysis":
                if (!this.isFighting)
                    output.success = false;
                output.spell = spell.clone();
                output.target = "target";
                break;
            case "HealthToManaConversion":
                this.addEffect(spell.effect.clone());
                output.target = "self";
                break;
            default:
                break;
        }
        if (output.success)
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
        if (damageType !== "True")
            finalDamage *= (1 - armorValue);
        finalDamage = Math.floor(finalDamage);
        if (finalDamage > 0) {
            this.health -= finalDamage;
            console.log(chalk.blueBright(`${this.name} takes ${chalk.red(finalDamage)} damage`));
        } else {
            console.log(chalk.blueBright(`${this.name} takes no damage`));
        }

        if (this.getMostCommonArmorType() !== "None")
            this.advanceSkill(this.getMostCommonArmorType(), rawDamage);

        if (this.isBlocking && damageType !== "Magic")
            this.advanceSkill("Block", rawDamage);
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