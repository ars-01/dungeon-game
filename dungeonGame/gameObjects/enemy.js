import chalk from "chalk";
import {getRandomArmor, getRandomWeapon, lootTable} from "../resources/dictionaries.js";

const getRandomElement = () => {
    let normal;
    let fancy;
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            normal = "Fire";
            fancy = "Pyro";
            break;
        case 1:
            normal = "Ice";
            fancy = "Cryo";
            break;
        case 2:
            normal = "Storm";
            fancy = "Electro";
            break;
        default:
            break;
    }
    return {normal, fancy};
}

export class Enemy {
    name = "";
    type = "";
    damage = 0;
    rarity = "";
    health = 0;
    level = 0;

    blocking = false;
    staggered = false;
    armor = {
        head: "",
        main: "",
        arms: "",
        feet: ""
    };
    weapon = "";

    constructor(name, type, damage, rarity, health, level) {
        this.name = name;
        this.type = type;
        this.damage = damage;
        this.rarity = rarity;
        this.health = health;
        this.level = level;
        if (this.name === "MagePlaceholderName") {
            const {normal, fancy} = getRandomElement();
            switch (this.level) {
                case 1:
                    this.name = `Novice ${normal} Mage`;
                    break;
                case 6:
                    this.name = `Apprentice ${normal} Mage`;
                    break;
                case 12:
                    this.name = `${normal} Mage Adept`;
                    break;
                case 19:
                    this.name = `${normal} Mage`;
                    break;
                case 27:
                    this.name = `${normal} Wizard`;
                    break;
                case 36:
                    this.name = `${fancy}mancer`;
                    break;
                case 46:
                    this.name = `Arch ${fancy}mancer`;
                    break;
                default:
                    break;
            }
        }
        this.armor = getRandomArmor(this.type, this.rarity);
        this.weapon = getRandomWeapon(this.type, this.rarity);
    }

    clone() {
        return new Enemy(this.name, this.type, this.damage, this.rarity, this.health, this.level);
    }

    block() {
        this.blocking = true;
    }

    attack() {
        this.blocking = false;
        if (this.staggered) {
            console.log(chalk.blueBright(`${this.name} is staggered`));
            this.staggered = false;
            return 0;
        }
        this.blocking = false;
        let finalDamage = Math.floor(this.damage * ( 1 + this.level / 10));
        let critDamage = 0;
        if (Math.random() <= 0.1 && this.type !== "Magic")
            critDamage += Math.floor(finalDamage * 0.5);
        if (Math.random() <= 0.15 && this.type !== "Magic" && this.level >= 25)
            critDamage += Math.floor(finalDamage * 0.5 * 1.25);
        return this.weapon.durability > 0 ? finalDamage + critDamage : 0;
    }

    stagger() {
        this.staggered = true;
        this.blocking = false;
    }

    isStaggered() {
        return this.staggered;
    }

    takeDamage(attackValue) {
        let finalDamage = attackValue;
        let armorValue = this.getArmorValue();
        if (this.blocking && this.type !== "Magic") {
            armorValue += Math.ceil(this.weapon.value / 3);
            this.decreaseWeaponDurability();
        }
        finalDamage *= (1 - armorValue / 500);
        this.health -= Math.floor(finalDamage);
        this.decreaseArmorDurability();
        return Math.floor(finalDamage);
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
        return armorValue;
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

    isPlayer() {
        return false;
    }

    isBlocking() {
        return this.blocking;
    }
}