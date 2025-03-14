import {Spell} from "../objects/spell.js";
import {Effect} from "../objects/effect.js";
import {Item} from "../objects/item.js";

export const getColor = (string) => {
    switch (string) {
        case "Common":
            return "#ffffff";
        case "Uncommon":
            return "#00ffff";
        case "Rare":
            return "#ffff00";
        case "Mythic":
            return "#ff00ff";
        default:
            return "#ffffff";
    }
};

export const asBar = (value, maxValue) => {
    const percentage = Math.floor((value / maxValue) * 200);
    let outputString = "╣";
    for (let i = 0; i < 200; i += 4) {
        if (i <= percentage)
            outputString += "█";
        else
            switch (percentage - i) {
                case -1:
                    outputString += "▓";
                    break;
                case -2:
                    outputString += "▒";
                    break;
                case -3:
                    outputString += "░";
                    break;
                default:
                    outputString += " ";
            }
    }
    return outputString + "╠";
}

export const getRandomItem = (level) => {
    if (level <= 5) {
        return items.common[Math.floor(Math.random() * items.common.length)].clone();
    } else if (level <= 10) {
        return Math.random() < 0.5 ? items.uncommon[Math.floor(Math.random() * items.uncommon.length)].clone() : items.common[Math.floor(Math.random() * items.common.length)].clone();
    } else if (level <= 15) {
        return Math.random() < 0.5 ? items.rare[Math.floor(Math.random() * items.rare.length)].clone() : items.uncommon[Math.floor(Math.random() * items.uncommon.length)].clone();
    } else if (level <= 20) {
        return Math.random() < 0.5 ? items.mythic[Math.floor(Math.random() * items.mythic.length)].clone() : items.rare[Math.floor(Math.random() * items.rare.length)].clone();
    } else {
        return items.mythic[Math.floor(Math.random() * items.mythic.length)].clone();
    }
}

export const getRandomHeadPiece = (rarity, armorClass) => {
    const temp = [];
    switch (rarity) {
        case "Common":
            for (const item of items.common) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Head" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Uncommon":
            for (const item of items.uncommon) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Head" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Rare":
            for (const item of items.rare) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Head" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Mythic":
            for (const item of items.mythic) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Head" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        default:
            return null;
    }
    return temp[Math.floor(Math.random() * temp.length)];
}

export const getRandomMainPiece = (rarity, armorClass) => {
    const temp = [];
    switch (rarity) {
        case "Common":
            for (const item of items.common) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Main" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Uncommon":
            for (const item of items.uncommon) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Main" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Rare":
            for (const item of items.rare) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Main" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Mythic":
            for (const item of items.mythic) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Main" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        default:
            return null;
    }
    return temp[Math.floor(Math.random() * temp.length)];
}

export const getRandomArmsPiece = (rarity, armorClass) => {
    const temp = [];
    switch (rarity) {
        case "Common":
            for (const item of items.common) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Arms" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Uncommon":
            for (const item of items.uncommon) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Arms" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Rare":
            for (const item of items.rare) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Arms" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Mythic":
            for (const item of items.mythic) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Arms" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        default:
            return null;
    }
    return temp[Math.floor(Math.random() * temp.length)];
}

export const getRandomFootPiece = (rarity, armorClass) => {
    const temp = [];
    switch (rarity) {
        case "Common":
            for (const item of items.common) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Feet" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Uncommon":
            for (const item of items.uncommon) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Feet" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Rare":
            for (const item of items.rare) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Feet" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        case "Mythic":
            for (const item of items.mythic) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Feet" && item.getSubTypes()[1] === armorClass)
                    temp.push(item.clone());
            }
            break;
        default:
            return null;
    }
    return temp[Math.floor(Math.random() * temp.length)];
}

export const getRandomWeapon = (rarity, weaponClass) => {
    const temp = [];
    switch (rarity) {
        case "Common":
            for (const item of items.common) {
                if (item.type === "Weapon" && item.getSubTypes()[1] === weaponClass)
                    temp.push(item.clone());
            }
            break;
        case "Uncommon":
            for (const item of items.uncommon) {
                if (item.type === "Weapon" && item.getSubTypes()[1] === weaponClass)
                    temp.push(item.clone());
            }
            break;
        case "Rare":
            for (const item of items.rare) {
                if (item.type === "Weapon" && item.getSubTypes()[1] === weaponClass)
                    temp.push(item.clone());
            }
            break;
        case "Mythic":
            for (const item of items.mythic) {
                if (item.type === "Weapon" && item.getSubTypes()[1] === weaponClass)
                    temp.push(item.clone());
            }
            break;
        default:
            return null;
    }
    return temp[Math.floor(Math.random() * temp.length)];
}

export const getRandomShield = (rarity) => {
    const temp = [];
    switch (rarity) {
        case "Common":
            for (const item of items.common) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Shield")
                    temp.push(item.clone());
            }
            break;
        case "Uncommon":
            for (const item of items.uncommon) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Shield")
                    temp.push(item.clone());
            }
            break;
        case "Rare":
            for (const item of items.rare) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Shield")
                    temp.push(item.clone());
            }
            break;
        case "Mythic":
            for (const item of items.mythic) {
                if (item.type === "Apparel" && item.getSubTypes()[0] === "Shield")
                    temp.push(item.clone());
            }
            break;
        default:
            return null;
    }
    return temp[Math.floor(Math.random() * temp.length)];
}

export const walls = {
    horizontalHallwayDown: ("██▓█  ▓█▓█" +
                            "▓██▒  ░██▓").split(""),

    horizontalHallwayUp: ("███▓  ▒██▓" +
                          "█▓██  █▓██").split(""),

    verticalHallwayLeft: ("█▓" +
                          "█▓" +
                          "  " +
                          "  " +
                          "▒█" +
                          "▓█").split(""),

    verticalHallwayRight: ("░▒" +
                           "▓█" +
                           "  " +
                           "  " +
                           "█▓" +
                           "██").split(""),

    horizontalWall: ("▓██▓▒▒▓▓██" +
                     "██▓▒░▒▒▓█▓").split(""),

    verticalWall: ("▓█" +
                   "█▒" +
                   "██" +
                   "█▓" +
                   "▒░" +
                   "▓▓").split(""),
}

export const roomLayouts = {
    empty: ("      " +
        "      " +
        "      " +
        "      " +
        "      " +
        "      ").split(""),

    filled: ("█▓▒▓██" +
             "██▓▒░▒" +
             "███▓▒█" +
             "█▓█▓██" +
             "█▒██▓▓" +
             "▒█▓▓█▒").split(""),

    treasure:  ("      " +
                "      " +
                " ░▓▓░ " +
                " ▓██▓ " +
                " ▓▓▓▓ " +
                "      ").split(""),

    enemy: ("      " +
            "   █  " +
            "  ┐ ┐ " +
            "  ▀▓▀ " +
            "   ║  " +
            "      ").split(""),
}

//█ ▓ ▒ ░ ▀ ▬ ■ ▀ ╔ ╗ ║ ┐

export const overworldWalls = {
    horizontalPassage: ("            ").split(""),
    verticalPassage: ("  " +
        "  " +
        "  " +
        "  " +
        "  " +
        "  ").split(""),
    horizontalWall: ("████████████").split(""),
    verticalWall: ("██" +
        "██" +
        "██" +
        "██" +
        "██" +
        "██").split(""),
    emptyCorner: ("    ").split(""),
    fullCorner: ("████").split("")
};

export const effects = {
    flames: new Effect("Flames", "DamageHealth", 1, 1, 1),
    fireBolt: new Effect("Firebolt", "DamageHealth", 1, 1, 3),
    fireball: new Effect("Fireball", "DamageHealth", 1, 1, 8),
    incinerate: new Effect("Incinerate", "DamageHealth", 1, 1, 7),
    fireStorm: new Effect("FireStorm", "DamageHealth", 1, 1, 40),

    frostbite: new Effect("Frostbite", "DamageStamina", 1, 1, 8),
    freeze: new Effect("Freeze", "DamageStamina", 1, 1, 25),
    iceStorm: new Effect("Ice Storm", "DamageStamina", 1, 1, 40),
    icySpear: new Effect("Icy Spear", "DamageStamina", 1, 1, 60),
    blizzard: new Effect("Blizzard", "DamageStamina", 1, 2, 100),

    sparks: new Effect("Sparks", "DamageMana", 1, 1, 4),
    lightningBolt: new Effect("Lightning Bolt", "DamageMana", 1, 1, 13),
    chainLightning: new Effect("Chain Lightning", "DamageMana", 1, 1, 20),
    thunderbolt: new Effect("Thunderbolt", "DamageMana", 1, 1, 30),
    lightningStorm: new Effect("LightningStorm", "DamageMana", 1, 1, 40),

    armorOak: new Effect("Armor - Oak", "Armor", 1, 12, 40),
    armorStone: new Effect("Armor - Stone", "Armor", 1, 12, 60),
    armorIron: new Effect("Armor - Iron", "Armor", 1, 12, 80),
    armorEbony: new Effect("Armor - Ebony", "Armor", 1, 12, 100),
    armorDragonhide: new Effect("Armor - Dragonhide", "MeleeResistance", 1, 12, 80),
    paralyze: new Effect("Paralyze", "Paralysis", 1, 2, 1)
};

export const spells = {
    //Destruction
    flames: new Spell("Flames", "Destruction", "Fire", 8, 14, effects.flames.clone()),
    fireBolt: new Spell("Firebolt", "Destruction", "Fire", 25, 41, effects.fireBolt.clone()),
    fireball: new Spell("Fireball", "Destruction", "Fire", 40, 133, effects.fireball.clone()),
    incinerate: new Spell("Incinerate", "Destruction", "Fire", 60, 298, effects.incinerate.clone()),
    fireStorm: new Spell("Fire Storm", "Destruction", "Fire", 100, 1426, effects.fireStorm.clone()),

    frostbite: new Spell("Frostbite", "Destruction", "Ice", 8, 16, effects.frostbite.clone()),
    freeze: new Spell("Freeze", "Destruction", "Ice", 25, 41, effects.freeze.clone()),
    iceStorm: new Spell("Ice Storm", "Destruction", "Ice", 40, 144, effects.iceStorm.clone()),
    icySpear: new Spell("Icy Spear", "Destruction", "Ice", 60, 320, effects.icySpear.clone()),
    blizzard: new Spell("Blizzard", "Destruction", "Ice", 100, 1106, effects.blizzard.clone()),

    sparks: new Spell("Sparks", "Destruction", "Shock", 8, 19, effects.sparks.clone()),
    lightningBolt: new Spell("Lighting Bolt", "Destruction", "Shock", 25, 51, effects.lightningBolt.clone()),
    chainLightning: new Spell("Chain Lightning", "Destruction", "Shock", 40, 156, effects.chainLightning.clone()),
    thunderbolt: new Spell("Thunderbolt", "Destruction", "Shock", 60, 343, effects.thunderbolt.clone()),
    lightningStorm: new Spell("Lightning Storm", "Destruction", "Shock", 75, 138, effects.lightningStorm.clone()),

    //Restoration

    healing: new Spell("Healing", "Restoration", "Health", 10, 12),
    fastHealing: new Spell("Fast Healing", "Restoration", "Health", 50, 73),
    closeWounds: new Spell("Close Wounds", "Restoration", "Health", 100, 126),
    grandHealing: new Spell("Grand Healing", "Restoration", "Health", 200, 254),

    shortRest: new Spell("Short Rest", "Restoration", "Stamina", 10, 9),
    quickRecovery: new Spell("Quick Recovery", "Restoration", "Stamina", 50, 54),
    relaxation: new Spell("Relaxation", "Restoration", "Stamina", 100, 94),
    wakingSleep: new Spell("Waking Sleep", "Restoration", "Stamina", 200, 190),

    lesserWard: new Spell("Lesser Ward", "Restoration", "Armor|MagicResistance", 0.4, 34),
    steadfastWard: new Spell("Steadfast Ward", "Restoration", "Armor|MagicResistance", 0.6, 58),
    greaterWard: new Spell("Greater Ward", "Restoration", "Armor|MagicResistance", 0.8, 86),

    //Alteration

    oakFlesh: new Spell("Oakflesh", "Alteration", "Armor", 40, 103, effects.armorOak.clone()),
    stoneFlesh: new Spell("Stoneflesh", "Alteration", "Armor", 60, 166, effects.armorStone.clone()),
    ironFlesh: new Spell("Ironflesh", "Alteration", "Armor", 80 , 266, effects.armorIron.clone()),
    ebonyFlesh: new Spell("Ebonyflesh", "Alteration", "Armor", 100, 341, effects.armorEbony.clone()),
    dragonHide: new Spell("Dragonhide", "Alteration", "Armor", 800, 837, effects.armorDragonhide.clone()),
    paralyze: new Spell("Paralyze", "Alteration", "Paralysis", 450, 450, effects.paralyze.clone()),
};

export const items = {
    common: [
        //OneHanded Weapons
        //Swords
        new Item("Iron Sword", "Weapon", "Melee|OneHanded",125, 7, 9,"Common", 25),
        new Item("Steel Sword", "Weapon", "Melee|OneHanded",125, 8, 10, "Common", 45),
        //War Axes
        new Item("Iron War Axe", "Weapon", "Melee|OneHanded",125, 8, 11, "Common", 30),
        new Item("Steel War Axe", "Weapon", "Melee|OneHanded",125, 9, 12, "Common", 55),
        //Maces
        new Item("Iron Mace", "Weapon", "Melee|OneHanded", 125, 9, 13, "Common", 35),
        new Item("Steel Mace", "Weapon", "Melee|OneHanded",125, 10, 14, "Common", 65),
        //Daggers
        new Item("Iron Dagger", "Weapon", "Melee|OneHanded", 125, 4, 2, "Common", 10),
        new Item("Steel Dagger", "Weapon", "Melee|OneHanded", 125, 5, 2.5, "Common", 18),

        //TwoHanded Weapons
        //Greatswords
        new Item("Iron Greatsword", "Weapon", "Melee|TwoHanded", 125, 15, 16, "Common", 50),
        new Item("Steel Greatsword", "Weapon", "Melee|TwoHanded", 125, 17, 17, "Common", 90),
        //Battleaxes
        new Item("Iron Battleaxe", "Weapon", "Melee|TwoHanded", 125, 16, 20, "Common", 55),
        new Item("Steel Battleaxe", "Weapon", "Melee|TwoHanded", 125, 18, 21, "Common", 100),
        //Warhammers
        new Item("Iron Warhammer", "Weapon", "Melee|TwoHanded", 125, 18, 24, "Common", 60),
        new Item("Steel Warhammer", "Weapon", "Melee|TwoHanded", 125, 20, 25, "Common", 110),

        //Magic Weapons
        //Staves
        new Item("Staff of Flames", "Weapon", "Magic|Staff", 25, 13, 8, "Common", 230),
        new Item("Staff of Frost", "Weapon|Magic", "Magic|Staff", 25, 13, 8, "Common", 240),
        new Item("Staff of Sparks", "Weapon|Magic", "Magic|Staff", 25, 13, 8, "Common", 250),

        //Armor
        //Hide
        new Item("Hide Armor", "Apparel", "Main|LightArmor", 125, 20, 5, "Common", 50),
        new Item("Hide Helmet", "Apparel", "Head|LightArmor", 125, 10, 2, "Common", 25),
        new Item("Hide Bracers", "Apparel", "Arms|LightArmor", 125, 5, 1,"Common", 10),
        new Item("Hide Boots", "Apparel", "Feet|LightArmor", 125, 5, 1,"Common", 10),
        new Item("Hide Shield", "Apparel", "Shield|LightArmor", 125, 15, 4,"Common", 25),
        //Fur
        new Item("Fur Armor", "Apparel", "Main|LightArmor", 125, 23, 5, "Common", 50),
        new Item("Fur Helmet", "Apparel", "Head|LightArmor", 125, 11, 1, "Common", 25),
        new Item("Fur Bracers", "Apparel", "Arms|LightArmor", 125, 5, 1,"Common", 10),
        new Item("Fur Shoes", "Apparel", "Feet|LightArmor", 125, 6, 1,"Common", 4),
        //Leather
        new Item("Leather Armor", "Apparel", "Main|LightArmor", 125, 26, 6, "Common", 125),
        new Item("Leather Helmet", "Apparel", "Head|LightArmor", 125, 12, 2, "Common", 60),
        new Item("Leather Bracers", "Apparel", "Arms|LightArmor", 125, 7, 2,"Common", 25),
        new Item("Leather Boots", "Apparel", "Feet|LightArmor", 125, 7, 2,"Common", 25),
        //Iron
        new Item("Iron Armor", "Apparel", "Main|HeavyArmor", 125, 25, 30, "Common", 125),
        new Item("Iron Helmet", "Apparel", "Head|HeavyArmor", 125, 15, 5, "Common", 60),
        new Item("Iron Gauntlets", "Apparel", "Arms|HeavyArmor", 125, 10, 5,"Common", 25),
        new Item("Iron Boots", "Apparel", "Feet|HeavyArmor", 125, 10, 6,"Common", 25),
        new Item("Iron Shield", "Apparel", "Shield|HeavyArmor", 125, 20, 12, "Common", 60),
        new Item("Banded Iron Shield", "Apparel", "Shield|HeavyArmor", 125, 22, 12, "Common", 100),
        //Steel
        new Item("Steel Armor", "Apparel", "Main|HeavyArmor", 125, 31, 35, "Common", 275),
        new Item("Steel Helmet", "Apparel", "Head|HeavyArmor", 125, 17, 5, "Common", 125),
        new Item("Steel Gauntlets", "Apparel", "Arms|HeavyArmor", 125, 12, 4,"Common", 55),
        new Item("Steel Boots", "Apparel", "Feet|HeavyArmor", 125, 12, 8,"Common", 55),
        new Item("Steel Shield", "Apparel", "Shield|HeavyArmor", 125, 24, 12, "Common", 150),

        //Clothing
        new Item("Novice Black Robes of Destruction", "Apparel", "Main|Clothing", 125, 0, 1, "Common", 230,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.06)),
        new Item("Novice Black Robes of Restoration", "Apparel", "Main|Clothing", 125, 0, 1, "Common", 230,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.06)),
        new Item("Novice Black Robes of Alteration", "Apparel", "Main|Clothing", 125, 0, 1, "Common", 230,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.06)),
        new Item("Novice Robes of Destruction", "Apparel", "Main|Clothing", 125, 0, 1, "Common", 250,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.06)),
        new Item("Novice Robes of Restoration", "Apparel", "Main|Clothing", 125, 0, 1, "Common", 250,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.06)),
        new Item("Novice Robes of Alteration", "Apparel", "Main|Clothing", 125, 0, 1, "Common", 250,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.06)),

        new Item("Copper and Ruby Circlet of Minor Destruction", "Apparel", "Head|Clothing", 125, 0, 1, "Common", 130,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.06)),
        new Item("Copper and Moonstone Circlet of Minor Restoration", "Apparel", "Head|Clothing", 125, 0, 1, "Common", 130,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.06)),
        new Item("Copper and Sapphire Circlet of Minor Alteration", "Apparel", "Head|Clothing", 125, 0, 1, "Common", 130,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.06)),

        new Item("Copper Ruby Ring of Minor Destruction", "Apparel", "Arms|Clothing", 125, 0, 1, "Common", 90,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.06)),
        new Item("Copper Garnet Ring of Minor Restoration", "Apparel", "Arms|Clothing", 125, 0, 1, "Common", 90,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.06)),
        new Item("Copper Sapphire Ring of Minor Alteration", "Apparel", "Arms|Clothing", 125, 0, 1, "Common", 90,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.06)),

        new Item("Ragged Boots", "Apparel", "Feet|Clothing", 125, 0, 1, "Common", 1),

        //Potions
        new Item("Potion of Minor Healing", "Potion", "Restore|Health", 1, 25, 0.25,"Common", 17),
        new Item("Potion of Fortify Health", "Potion", "Augment|Health", 1, 5, 0.25,"Common", 23,
            new Effect("Increased Health", "Health", 1, 6, 10)),
        new Item("Potion of Fortify Stamina", "Potion", "Augment|Stamina", 1, 5, 0.25,"Common", 23,
            new Effect("Increased Stamina", "Stamina", 1, 6, 10)),

        //Misc (Books)
        new Item("Spell Tome: Flames", "Misc", "Book|SpellTome", 1, 1, 1, "Common", 150,
            new Effect("Learn Spell: Flames", "LearnSpell", 1, 1, 100)),
    ],
    uncommon: [
        //OneHanded Weapons
        //Swords
        new Item("Elven Sword", "Weapon", "Melee|OneHanded", 250, 11, 13, "Uncommon", 235),
        new Item("Orcish Sword", "Weapon", "Melee|OneHanded", 250, 9, 11, "Uncommon", 75),
        new Item("Dwarven Sword", "Weapon", "Melee|OneHanded", 250, 10, 12, "Uncommon", 125),
        //War Axes
        new Item("Elven War Axe", "Weapon", "Melee|OneHanded", 250, 12, 15, "Uncommon", 280),
        new Item("Orcish War Axe", "Weapon", "Melee|OneHanded", 250, 10, 13, "Uncommon", 90),
        new Item("Dwarven War Axe", "Weapon", "Melee|OneHanded", 250, 11, 14, "Uncommon", 165),
        //Maces
        new Item("Elven Mace", "Weapon", "Melee|OneHanded", 250, 13, 17, "Uncommon", 330),
        new Item("Orcish Mace", "Weapon", "Melee|OneHanded", 250, 11, 15, "Uncommon", 105),
        new Item("Dwarven Mace", "Weapon", "Melee|OneHanded", 250, 12, 16, "Uncommon", 190),
        //Daggers
        new Item("Elven Dagger", "Weapon", "Melee|OneHanded", 250, 8, 4, "Uncommon", 95),
        new Item("Orcish Dagger", "Weapon", "Melee|OneHanded", 250, 6, 3, "Uncommon", 30),
        new Item("Dwarven Dagger", "Weapon", "Melee|OneHanded", 250, 7, 3.5, "Uncommon", 55),

        //TwoHanded Weapons
        //Greatswords
        new Item("Elven Greatsword", "Weapon", "Melee|TwoHanded", 250, 20, 20, "Uncommon", 470),
        new Item("Orcish Greatsword", "Weapon", "Melee|TwoHanded", 250, 18, 18, "Uncommon", 75),
        new Item("Dwarven Greatsword", "Weapon", "Melee|TwoHanded", 250, 19, 19, "Uncommon", 270),
        //Battleaxes
        new Item("Elven Battleaxe", "Weapon", "Melee|TwoHanded", 250, 21, 24, "Uncommon", 520),
        new Item("Orcish Battleaxe", "Weapon", "Melee|TwoHanded", 250, 19, 25, "Uncommon", 165),
        new Item("Dwarven Battleaxe", "Weapon", "Melee|TwoHanded", 250, 20, 23, "Uncommon", 300),
        //Warhammers
        new Item("Elven Warhammer", "Weapon", "Melee|TwoHanded", 250, 23, 28, "Uncommon", 565),
        new Item("Orcish Warhammer", "Weapon", "Melee|TwoHanded", 250, 21, 26, "Uncommon", 180),
        new Item("Dwarven Warhammer", "Weapon", "Melee|TwoHanded", 250, 22, 27, "Uncommon", 325),

        //Magic Weapons
        //Staves
        new Item("Staff of Firebolts", "Weapon", "Magic|Staff", 25, 25, 8, "Uncommon", 493),
        new Item("Staff of Ice Spikes", "Weapon", "Magic|Staff", 25, 25, 8, "Uncommon", 511),
        new Item("Staff of Lightning Bolts", "Weapon", "Magic|Staff", 25, 25, 8, "Uncommon", 538),

        //Armor
        //Elven
        new Item("Elven Armor", "Apparel", "Main|LightArmor", 250, 29, 4, "Uncommon", 550),
        new Item("Elven Helmet", "Apparel", "Head|LightArmor", 250, 13, 1, "Uncommon", 110),
        new Item("Elven Gauntlets", "Apparel", "Arms|LightArmor", 250, 8, 1,"Uncommon", 45),
        new Item("Elven Boots", "Apparel", "Feet|LightArmor", 250, 8, 1,"Uncommon", 45),
        new Item("Elven Shield", "Apparel", "Shield|LightArmor", 250, 21, 4,"Uncommon", 115),
        //Chitin Heavy
        new Item("Chitin Heavy Armor", "Apparel", "Main|HeavyArmor", 250, 40, 35, "Uncommon", 650),
        new Item("Chitin Heavy Helmet", "Apparel", "Head|HeavyArmor", 250, 19, 5, "Uncommon", 300),
        new Item("Chitin Heavy Gauntlets", "Apparel", "Arms|HeavyArmor", 250, 14, 6,"Uncommon", 135),
        new Item("Chitin Heavy Boots", "Apparel", "Feet|HeavyArmor", 250, 14, 5,"Uncommon", 135),
        //Chitin Light
        new Item("Chitin Armor", "Apparel", "Main|LightArmor", 250, 30, 4, "Uncommon", 230),
        new Item("Chitin Helmet", "Apparel", "Head|LightArmor", 250, 13.5, 1, "Uncommon", 125),
        new Item("Chitin Bracers", "Apparel", "Arms|LightArmor", 250, 8.5, 1,"Uncommon", 50),
        new Item("Chitin Boots", "Apparel", "Feet|LightArmor", 250, 8.5, 2,"Uncommon", 50),
        new Item("Chitin Shield", "Apparel", "Shield|LightArmor", 250, 24.5, 8, "Uncommon", 215),
        //Dwarven
        new Item("Dwarven Armor", "Apparel", "Main|HeavyArmor", 250, 34, 45, "Uncommon", 400),
        new Item("Dwarven Helmet", "Apparel", "Head|HeavyArmor", 250, 18, 12, "Uncommon", 200),
        new Item("Dwarven Gauntlets", "Apparel", "Arms|HeavyArmor", 250, 13, 10,"Uncommon", 85),
        new Item("Dwarven Boots", "Apparel", "Feet|HeavyArmor", 250, 13, 10,"Uncommon", 85),
        new Item("Dwarven Shield", "Apparel", "Shield|LightArmor", 250, 26, 12, "Uncommon", 225),
        //Bonemold
        new Item("Bonemold Armor", "Apparel", "Main|HeavyArmor", 250, 35, 43, "Uncommon", 290),
        new Item("Bonemold Helmet", "Apparel", "Head|HeavyArmor", 250, 18, 11, "Uncommon", 135),
        new Item("Bonemold Gauntlets", "Apparel", "Arms|HeavyArmor", 250, 13, 7,"Uncommon", 60),
        new Item("Bonemold Boots", "Apparel", "Feet|HeavyArmor", 250, 13, 9,"Uncommon", 60),
        new Item("Bonemold Shield", "Apparel", "Shield|LightArmor", 250, 26, 11, "Uncommon", 95),

        //Clothing
        new Item("Black Robes of Destruction", "Apparel", "Main|Clothing", 250, 0, 1, "Uncommon", 800,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.12)),
        new Item("Black Robes of Restoration", "Apparel", "Main|Clothing", 250, 0, 1, "Uncommon", 800,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.12)),
        new Item("Black Robes of Alteration", "Apparel", "Main|Clothing", 250, 0, 1, "Uncommon", 800,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.12)),
        new Item("Robes of Destruction", "Apparel", "Main|Clothing", 250, 0, 1, "Uncommon", 850,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.12)),
        new Item("Robes of Restoration", "Apparel", "Main|Clothing", 250, 0, 1, "Uncommon", 850,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.12)),
        new Item("Robes of Alteration", "Apparel", "Main|Clothing", 250, 0, 1, "Uncommon", 850,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.12)),

        new Item("Silver and Ruby Circlet of Destruction", "Apparel", "Head|Clothing", 250, 0, 1, "Uncommon", 430,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.12)),
        new Item("Silver and Moonstone Circlet of Restoration", "Apparel", "Head|Clothing", 250, 0, 1, "Uncommon", 430,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.12)),
        new Item("Silver and Sapphire Circlet of Alteration", "Apparel", "Head|Clothing", 250, 0, 1, "Uncommon", 430,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.12)),

        new Item("Silver Ruby Ring of Destruction", "Apparel", "Arms|Clothing", 250, 0, 1, "Uncommon", 380,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.12)),
        new Item("Silver Garnet Ring of Restoration", "Apparel", "Arms|Clothing", 250, 0, 1, "Uncommon", 380,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.12)),
        new Item("Silver Amethyst Ring of Alteration", "Apparel", "Arms|Clothing", 250, 0, 1, "Uncommon", 380,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.12)),

        new Item("Boots", "Apparel", "Feet|Clothing", 250, 0, 1, "Uncommon", 5),

        //Potions
        new Item("Potion of Healing", "Potion", "Restore|Health", 1, 50, 0.25,"Uncommon", 36),
        new Item("Potion of Fortify Health", "Potion", "Augment|Health", 1, 10, 0.25,"Uncommon", 41,
            new Effect("Increased Health", "Health", 1, 6, 20)),
        new Item("Potion of Fortify Stamina", "Potion", "Augment|Stamina", 1, 10, 0.25,"Uncommon", 41,
            new Effect("Increased Stamina", "Stamina", 1, 6, 20)),

    ],
    rare: [
        //OneHanded Weapons
        //Swords
        new Item("Ebony Sword", "Weapon", "Melee|OneHanded",500, 13, 15, "Rare", 720),
        new Item("Glass Sword", "Weapon", "Melee|OneHanded", 500, 12, 14, "Rare", 410),
        new Item("Nordic Sword", "Weapon", "Melee|OneHanded", 250, 11, 12, "Uncommon", 290),
        //War Axes
        new Item("Ebony War Axe", "Weapon", "Melee|OneHanded", 500, 15, 17, "Rare", 865),
        new Item("Glass War Axe", "Weapon", "Melee|OneHanded", 500, 14, 16, "Rare", 490),
        new Item("Nordic War Axe", "Weapon", "Melee|OneHanded", 250, 12, 14, "Uncommon", 350),
        //Daggers
        new Item("Ebony Dagger", "Weapon", "Melee|OneHanded", 500, 10, 5, "Rare", 290),
        new Item("Glass Dagger", "Weapon", "Melee|OneHanded", 500, 9, 4.5, "Rare", 165),
        new Item("Nordic Dagger", "Weapon", "Melee|OneHanded", 250, 8, 3.5, "Uncommon", 115),
        //Maces
        new Item("Ebony Mace", "Weapon", "Melee|OneHanded", 500, 16, 19, "Rare", 1000),
        new Item("Glass Mace", "Weapon", "Melee|OneHanded", 500, 14, 18, "Rare", 575),
        new Item("Nordic Mace", "Weapon", "Melee|OneHanded", 250, 13, 16, "Uncommon", 410),

        //TwoHanded Weapons
        //Greatswords
        new Item("Ebony Greatsword", "Weapon", "Melee|TwoHanded", 500, 22, 22, "Rare", 1440),
        new Item("Glass Greatsword", "Weapon", "Melee|TwoHanded", 500, 21, 22, "Rare", 820),
        new Item("Nordic Greatsword", "Weapon", "Melee|TwoHanded", 500, 20, 19, "Rare", 585),
        //Battleaxes
        new Item("Ebony Battleaxe", "Weapon", "Melee|TwoHanded", 500, 23, 26, "Rare", 1585),
        new Item("Glass Battleaxe", "Weapon", "Melee|TwoHanded", 500, 22, 25, "Rare", 900),
        new Item("Nordic Battleaxe", "Weapon", "Melee|TwoHanded", 500, 21, 23, "Rare", 650),
        //Warhammers
        new Item("Ebony Warhammer", "Weapon", "Melee|TwoHanded", 500, 25, 30, "Rare", 1725),
        new Item("Glass Warhammer", "Weapon", "Melee|TwoHanded", 500, 24, 29, "Rare", 985),
        new Item("Nordic Warhammer", "Weapon", "Melee|TwoHanded", 500, 23, 27, "Rare", 700),

        //Magic Weapons
        //Staves
        new Item("Staff of Fireballs", "Weapon", "Magic|Staff", 25, 40, 8, "Rare", 1309),
        new Item("Staff of Ice Storms", "Weapon", "Magic|Staff", 25, 40, 8, "Rare", 1401),
        new Item("Staff of Chain Lightning", "Weapon", "Magic|Staff", 25, 40, 8, "Rare", 1494),

        //Armor
        //Orcish
        new Item("Orcish Armor", "Apparel", "Main|HeavyArmor", 500, 40, 35, "Rare", 1000),
        new Item("Orcish Helmet", "Apparel", "Head|HeavyArmor", 500, 20, 8, "Rare", 500),
        new Item("Orcish Gauntlets", "Apparel", "Arms|HeavyArmor", 500, 15, 7,"Rare", 200),
        new Item("Orcish Boots", "Apparel", "Feet|HeavyArmor", 500, 15, 7,"Rare", 200),
        new Item("Orcish Shield", "Apparel", "Shield|HeavyArmor", 500, 30, 14, "Rare", 500),
        //Nordic
        new Item("Nordic Armor", "Apparel", "Main|HeavyArmor", 500, 43, 37, "Rare", 1600),
        new Item("Nordic Helmet", "Apparel", "Head|HeavyArmor", 500, 20, 7, "Rare", 550),
        new Item("Nordic Gauntlets", "Apparel", "Arms|HeavyArmor", 500, 15, 6,"Rare", 220),
        new Item("Nordic Boots", "Apparel", "Feet|HeavyArmor", 500, 15, 6,"Rare", 220),
        new Item("Nordic Shield", "Apparel", "Shield|HeavyArmor", 500, 26.5, 10, "Rare", 335),
        //Ebony
        new Item("Ebony Armor", "Apparel", "Main|HeavyArmor", 500, 43, 38, "Rare", 1500),
        new Item("Ebony Helmet", "Apparel", "Head|HeavyArmor", 500, 21, 10, "Rare", 750),
        new Item("Ebony Gauntlets", "Apparel", "Arms|HeavyArmor", 500, 16, 7,"Rare", 275),
        new Item("Ebony Boots", "Apparel", "Feet|HeavyArmor", 500, 16, 7,"Rare", 275),
        new Item("Ebony Shield", "Apparel", "Shield|HeavyArmor", 500, 32, 14, "Rare", 750),
        //Glass
        new Item("Glass Armor", "Apparel", "Main|LightArmor", 500, 38, 7, "Rare", 900),
        new Item("Glass Helmet", "Apparel", "Head|LightArmor", 500, 16, 2, "Rare", 450),
        new Item("Glass Gauntlets", "Apparel", "Arms|LightArmor", 500, 11, 2,"Rare", 190),
        new Item("Glass Boots", "Apparel", "Feet|LightArmor", 500, 11, 2,"Rare", 190),
        new Item("Glass Shield", "Apparel", "Shield|LightArmor", 500, 27, 6,"Rare", 450),
        //Scaled
        new Item("Scaled Armor", "Apparel", "Main|LightArmor", 500, 32, 6, "Rare", 350),
        new Item("Scaled Helmet", "Apparel", "Head|LightArmor", 500, 14, 2, "Rare", 175),
        new Item("Scaled Bracers", "Apparel", "Arms|LightArmor", 500, 9, 2,"Rare", 70),
        new Item("Scaled Boots", "Apparel", "Feet|LightArmor", 500, 9, 2,"Rare", 70),


        //Clothing
        new Item("Adept Black Robes of Destruction", "Apparel", "Main|Clothing", 500, 0, 1, "Rare", 1300,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.18)),
        new Item("Adept Black Robes of Restoration", "Apparel", "Main|Clothing", 500, 0, 1, "Rare", 1300,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.18)),
        new Item("Adept Black Robes of Alteration", "Apparel", "Main|Clothing", 500, 0, 1, "Rare", 1300,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.18)),
        new Item("Adept Robes of Destruction", "Apparel", "Main|Clothing", 500, 0, 1, "Rare", 1350,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.18)),
        new Item("Adept Robes of Restoration", "Apparel", "Main|Clothing", 500, 0, 1, "Rare", 1350,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.18)),
        new Item("Adept Robes of Alteration", "Apparel", "Main|Clothing", 500, 0, 1, "Rare", 1350,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.18)),

        new Item("Jade and Emerald Circlet of Major Destruction", "Apparel", "Head|Clothing", 500, 0, 1, "Rare", 780,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.18)),
        new Item("Jade and Moonstone Circlet of Major Restoration", "Apparel", "Head|Clothing", 500, 0, 1, "Rare", 780,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.18)),
        new Item("Jade and Sapphire Circlet of Major Alteration", "Apparel", "Head|Clothing", 500, 0, 1, "Rare", 780,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.18)),

        new Item("Gold Emerald Ring of Major Destruction", "Apparel", "Arms|Clothing", 500, 0, 1, "Rare", 670,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.18)),
        new Item("Gold Garnet Ring of Major Restoration", "Apparel", "Arms|Clothing", 500, 0, 1, "Rare", 670,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.18)),
        new Item("Gold Sapphire Ring of Major Alteration", "Apparel", "Arms|Clothing", 500, 0, 1, "Rare", 670,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.18)),

        new Item("Fine Boots", "Apparel", "Feet|Clothing", 500, 0, 1, "Rare", 20),

        //Potions
        new Item("Potion of Vigorous Healing", "Potion", "Restore|Health", 1, 75, 0.25,"Rare", 79),
        new Item("Potion of Fortify Health", "Potion", "Augment|Health", 1, 15, 0.25,"Rare", 85,
            new Effect("Increased Health", "Health", 1, 6, 30)),
        new Item("Potion of Fortify Stamina", "Potion", "Augment|Stamina", 1, 15, 0.25,"Rare", 85,
            new Effect("Increased Stamina", "Stamina", 1, 6, 30)),
    ],
    mythic: [
        //OneHanded Weapons
        //Swords
        new Item("Daedric Sword", "Weapon", "Melee|OneHanded", 1000, 14, 16, "Mythic", 1250),
        new Item("Dragonbone Sword", "Weapon", "Melee|OneHanded", 1000, 15, 19, "Mythic", 1500),
        new Item("Stahlrim Sword", "Weapon", "Melee|OneHanded", 1000, 13, 14, "Mythic", 985),
        //War Axes
        new Item("Daedric War Axe", "Weapon", "Melee|OneHanded", 1000, 15, 18, "Mythic", 1500),
        new Item("Dragonbone War Axe", "Weapon", "Melee|OneHanded", 1000, 16, 21, "Mythic", 1700),
        new Item("Stahlrim War Axe", "Weapon", "Melee|OneHanded", 1000, 15, 16, "Mythic", 1180),
        //Daggers
        new Item("Daedric Dagger", "Weapon", "Melee|OneHanded", 1000, 11, 6, "Mythic", 500),
        new Item("Dragonbone Dagger", "Weapon", "Melee|OneHanded", 1000, 12, 6.5, "Mythic", 600),
        new Item("Stahlrim Dagger", "Weapon", "Melee|OneHanded", 1000, 10, 4.5, "Mythic", 395),
        //Maces
        new Item("Daedric Mace", "Weapon", "Melee|OneHanded", 1000, 16, 20, "Mythic", 1750),
        new Item("Dragonbone Mace", "Weapon", "Melee|OneHanded", 1000, 17, 22, "Mythic", 2000),
        new Item("Stahlrim Mace", "Weapon", "Melee|OneHanded", 1000, 16, 18, "Mythic", 1375),

        //TwoHanded Weapons
        //Greatswords
        new Item("Daedric Greatsword", "Weapon", "Melee|TwoHanded", 1000, 24, 23, "Mythic", 2500),
        new Item("Dragonbone Greatsword", "Weapon", "Melee|TwoHanded", 1000, 25, 27, "Mythic", 2725),
        new Item("Stahlrim Greatsword", "Weapon", "Melee|TwoHanded", 1000, 23, 21, "Mythic", 1970),
        //Battleaxes
        new Item("Daedric Battleaxe", "Weapon", "Melee|TwoHanded", 1000, 25, 27, "Mythic", 2750),
        new Item("Dragonbone Battleaxe", "Weapon", "Melee|TwoHanded", 1000, 26, 30, "Mythic", 3000),
        new Item("Stahlrim Battleaxe", "Weapon", "Melee|TwoHanded", 1000, 24, 25, "Mythic", 2150),
        //Warhammers
        new Item("Daedric Warhammer", "Weapon", "Melee|TwoHanded", 1000, 27, 31, "Mythic", 4000),
        new Item("Dragonbone Warhammer", "Weapon", "Melee|TwoHanded", 1000, 28, 33, "Mythic", 4475),
        new Item("Stahlrim Warhammer", "Weapon", "Melee|TwoHanded", 1000, 26, 29, "Mythic", 2850),

        //Magic Weapons
        //Staves
        new Item("Staff of Incineration", "Weapon", "Magic|Staff", 25, 60, 8, "Mythic", 2750),
        new Item("Staff of Icy Spear", "Weapon", "Magic|Staff", 25, 60, 8, "Mythic", 2931),
        new Item("Staff of Lightning Storms", "Weapon", "Magic|Staff", 25, 60, 8, "Mythic", 3014),

        //Armor
        //Daedric
        new Item("Daedric Armor", "Apparel", "Main|HeavyArmor", 1000, 49, 50, "Mythic", 3200),
        new Item("Daedric Helmet", "Apparel", "Head|HeavyArmor", 1000, 23, 15, "Mythic", 1600),
        new Item("Daedric Gauntlets", "Apparel", "Arms|HeavyArmor", 1000, 18, 6,"Mythic", 625),
        new Item("Daedric Boots", "Apparel", "Feet|HeavyArmor", 1000, 18, 10,"Mythic", 625),
        new Item("Daedric Shield", "Apparel", "Shield|HeavyArmor", 1000, 36, 15,"Mythic", 1600),
        //Dragonplate (Heavy)
        new Item("Dragonplate Armor", "Apparel", "Main|HeavyArmor", 1000, 46, 40, "Mythic", 2200),
        new Item("Dragonplate Helmet", "Apparel", "Head|HeavyArmor", 1000, 22, 8, "Mythic", 1050),
        new Item("Dragonplate Gauntlets", "Apparel", "Arms|HeavyArmor", 1000, 17, 8,"Mythic", 425),
        new Item("Dragonplate Boots", "Apparel", "Feet|HeavyArmor", 1000, 17, 8,"Mythic", 425),
        new Item("Dragonplate Shield", "Apparel", "Shield|HeavyArmor", 1000, 34, 15,"Mythic", 1050),
        //Dragonscale (Light)
        new Item("Dragonscale Armor", "Apparel", "Main|LightArmor", 1000, 41, 10, "Mythic", 1500),
        new Item("Dragonscale Helmet", "Apparel", "Head|LightArmor", 1000, 17, 4, "Mythic", 750),
        new Item("Dragonscale Gauntlets", "Apparel", "Arms|LightArmor", 1000, 12, 3,"Mythic", 300),
        new Item("Dragonscale Boots", "Apparel", "Feet|LightArmor", 1000, 12, 3,"Mythic", 300),
        new Item("Dragonscale Shield", "Apparel", "Shield|LightArmor", 1000, 29, 6,"Mythic", 750),
        //Stahlrim Heavy
        new Item("Stahlrim Heavy Armor", "Apparel", "Main|HeavyArmor", 1000, 46, 38, "Mythic", 2200),
        new Item("Stahlrim Heavy Helmet", "Apparel", "Head|HeavyArmor", 1000, 22, 7, "Mythic", 1135),
        new Item("Stahlrim Heavy Gauntlets", "Apparel", "Arms|HeavyArmor", 1000, 17, 7,"Mythic", 450),
        new Item("Stahlrim Heavy Boots", "Apparel", "Feet|HeavyArmor", 1000, 17, 7,"Mythic", 450),
        //Stahlrim Light
        new Item("Stahlrim Light Armor", "Apparel", "Main|LightArmor", 1000, 39, 7, "Mythic", 925),
        new Item("Stahlrim Light Helmet", "Apparel", "Head|LightArmor", 1000, 16.5, 2, "Mythic", 465),
        new Item("Stahlrim Light Bracers", "Apparel", "Arms|LightArmor", 1000, 11.5, 2,"Mythic", 215),
        new Item("Stahlrim Light Boots", "Apparel", "Feet|LightArmor", 1000, 11.5, 2,"Mythic", 215),
        new Item("Stahlrim Shield", "Apparel", "Shield|LightArmor", 1000, 29.5, 10,"Mythic", 600),

        //Clothing
        new Item("Archmage Black Robes of Destruction", "Apparel", "Main|Clothing", 1000, 0, 1, "Mythic", 1800,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.25)),
        new Item("Archmage Black Robes of Restoration", "Apparel", "Main|Clothing", 1000, 0, 1, "Mythic", 1800,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.25)),
        new Item("Archmage Black Robes of Alteration", "Apparel", "Main|Clothing", 1000, 0, 1, "Mythic", 1800,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.25)),
        new Item("Archmage Robes of Destruction", "Apparel", "Main|Clothing", 1000, 0, 1, "Mythic", 1850,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.25)),
        new Item("Archmage Robes of Restoration", "Apparel", "Main|Clothing", 1000, 0, 1, "Mythic", 1850,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.25)),
        new Item("Archmage Robes of Alteration", "Apparel", "Main|Clothing", 1000, 0, 1, "Mythic", 1850,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.25)),

        new Item("Gold and Ruby Circlet of Imminent Destruction", "Apparel", "Head|Clothing", 1000, 0, 1, "Mythic", 780,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.25)),
        new Item("Jade and Diamond Circlet of Holy Restoration", "Apparel", "Head|Clothing", 1000, 0, 1, "Mythic", 780,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.25)),
        new Item("Jade and Sapphire Circlet of Twisted Alteration", "Apparel", "Head|Clothing", 1000, 0, 1, "Mythic", 780,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.25)),

        new Item("Ebony Ruby Ring of Imminent Destruction", "Apparel", "Arms|Clothing", 1000, 0, 1, "Mythic", 690,
            new Effect("Fortify Destruction", "Destruction", 1, Infinity, 0.25)),
        new Item("Ebony Diamond Ring of Holy Restoration", "Apparel", "Arms|Clothing", 1000, 0, 1, "Mythic", 690,
            new Effect("Fortify Restoration", "Restoration", 1, Infinity, 0.25)),
        new Item("Ebony Sapphire Ring of Twisted Alteration", "Apparel", "Arms|Clothing", 1000, 0, 1, "Mythic", 690,
            new Effect("Fortify Alteration", "Alteration", 1, Infinity, 0.25)),

        new Item("Cuffed Boots", "Apparel", "Feet|Clothing", 1000, 0, 1, "Mythic", 25),

        //Potions
        new Item("Potion of Ultimate Healing", "Potion", "Restore|Health", 1, 100, 0.25,"Mythic", 251),
        new Item("Potion of Fortify Health", "Potion", "Augment|Health", 1, 20, 0.25,"Mythic", 275,
            new Effect("Increased Health", "Health", 1, 6, 30)),
        new Item("Potion of Fortify Stamina", "Potion", "Augment|Stamina", 1, 20, 0.25,"Mythic", 275,
            new Effect("Increased Stamina", "Stamina", 1, 6, 50)),
    ]
};

