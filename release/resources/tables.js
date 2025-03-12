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
        //Weapons
        //Daggers
        new Item("Iron Dagger", "Weapon", "Melee|OneHanded", 125, 4, 2, "Common", 10),
        new Item("Steel Dagger", "Weapon", "Melee|OneHanded", 125, 5, 2.5, "Common", 18),
        //Maces
        new Item("Iron Mace", "Weapon", "Melee|OneHanded", 125, 9, 13, "Common", 35),
        new Item("Steel Mace", "Weapon", "Melee|OneHanded",125, 10, 14, "Common", 65),
        //Swords
        new Item("Iron Sword", "Weapon", "Melee|OneHanded",125, 7, 9,"Common", 25),
        new Item("Steel Sword", "Weapon", "Melee|OneHanded",125, 8, 10, "Common", 45),
        //War Axes
        new Item("Iron War Axe", "Weapon", "Melee|OneHanded",125, 8, 11, "Common", 30),
        new Item("Steel War Axe", "Weapon", "Melee|OneHanded",125, 9, 12, "Common", 55),
        //Staves
        new Item("Staff of Flames", "Weapon", "Magic|Fire", 25, 13, 8, "Common", 230),
        new Item("Staff of Frost", "Weapon|Magic", "Magic|Ice", 25, 13, 8, "Common", 240),
        new Item("Staff of Sparks", "Weapon|Magic", "Magic|Shock", 25, 13, 8, "Common", 250),

        //Armor
        //Hide
        new Item("Hide Armor", "Apparel", "Main|LightArmor", 125, 20, 5, "Common", 50),
        new Item("Hide Helmet", "Apparel", "Head|LightArmor", 125, 10, 2, "Common", 25),
        new Item("Hide Bracers", "Apparel", "Arms|LightArmor", 125, 5, 1,"Common", 10),
        new Item("Hide Boots", "Apparel", "Feet|LightArmor", 125, 5, 1,"Common", 10),
        //Iron
        new Item("Iron Armor", "Apparel", "Main|HeavyArmor", 125, 25, 30, "Common", 125),
        new Item("Iron Helmet", "Apparel", "Head|HeavyArmor", 125, 15, 5, "Common", 60),
        new Item("Iron Gauntlets", "Apparel", "Arms|HeavyArmor", 125, 10, 5,"Common", 25),
        new Item("Iron Boots", "Apparel", "Feet|HeavyArmor", 125, 10, 6,"Common", 25),
        //Steel
        new Item("Steel Armor", "Apparel", "Main|HeavyArmor", 125, 31, 35, "Common", 275),
        new Item("Steel Helmet", "Apparel", "Head|HeavyArmor", 125, 17, 5, "Common", 125),
        new Item("Steel Gauntlets", "Apparel", "Arms|HeavyArmor", 125, 12, 4,"Common", 55),
        new Item("Steel Boots", "Apparel", "Feet|HeavyArmor", 125, 12, 8,"Common", 55),

        //Potions
        new Item("Potion of Minor Healing", "Potion", "Restore|Health", 1, 25, 0.25,"Common", 17),
        new Item("Potion of Minor Increase Health", "Potion", "Augment|Health", 1, 5, 0.25,"Common", 23),
        new Item("Potion of Minor Increase Stamina", "Potion", "Augment|Stamina", 1, 5, 0.25,"Common", 23),
    ],
    uncommon: [
        //Weapons
        //Daggers
        new Item("Elven Dagger", "Weapon", "Melee|OneHanded", 250, 8, 4, "Uncommon", 95),
        new Item("Nordic Dagger", "Weapon", "Melee|OneHanded", 250, 8, 3.5, "Uncommon", 115),
        new Item("Orcish Dagger", "Weapon", "Melee|OneHanded", 250, 6, 3, "Uncommon", 30),
        //Maces
        new Item("Elven Mace", "Weapon", "Melee|OneHanded", 250, 13, 17, "Uncommon", 330),
        new Item("Nordic Mace", "Weapon", "Melee|OneHanded", 250, 13, 16, "Uncommon", 410),
        new Item("Orcish Mace", "Weapon", "Melee|OneHanded", 250, 11, 15, "Uncommon", 105),
        //Swords
        new Item("Elven Sword", "Weapon", "Melee|OneHanded", 250, 11, 13, "Uncommon", 235),
        new Item("Nordic Sword", "Weapon", "Melee|OneHanded", 250, 11, 12, "Uncommon", 290),
        new Item("Orcish Sword", "Weapon", "Melee|OneHanded", 250, 9, 11, "Uncommon", 75),
        //War Axes
        new Item("Elven War Axe", "Weapon", "Melee|OneHanded", 250, 12, 15, "Uncommon", 280),
        new Item("Nordic War Axe", "Weapon", "Melee|OneHanded", 250, 12, 14, "Uncommon", 350),
        new Item("Orcish War Axe", "Weapon", "Melee|OneHanded", 250, 10, 13, "Uncommon", 90),
        //Staves
        new Item("Staff of Firebolts", "Weapon", "Magic|Fire", 25, 25, 8, "Uncommon", 493),
        new Item("Staff of Ice Spikes", "Weapon", "Magic|Ice", 25, 25, 8, "Uncommon", 511),
        new Item("Staff of Lightning Bolts", "Weapon", "Magic|Shock", 25, 25, 8, "Uncommon", 538),

        //Armor
        //Elven
        new Item("Elven Armor", "Apparel", "Main|LightArmor", 250, 29, 4, "Uncommon", 550),
        new Item("Elven Helmet", "Apparel", "Head|LightArmor", 250, 13, 1, "Uncommon", 110),
        new Item("Elven Gauntlets", "Apparel", "Arms|LightArmor", 250, 8, 1,"Uncommon", 45),
        new Item("Elven Boots", "Apparel", "Feet|LightArmor", 250, 8, 1,"Uncommon", 45),
        //Nordic
        new Item("Nordic Armor", "Apparel", "Main|HeavyArmor", 250, 43, 37, "Uncommon", 1600),
        new Item("Nordic Helmet", "Apparel", "Head|HeavyArmor", 250, 20, 7, "Uncommon", 550),
        new Item("Nordic Gauntlets", "Apparel", "Arms|HeavyArmor", 250, 15, 6,"Uncommon", 220),
        new Item("Nordic Boots", "Apparel", "Feet|HeavyArmor", 250, 15, 6,"Uncommon", 220),
        //Orcish
        new Item("Orcish Armor", "Apparel", "Main|HeavyArmor", 250, 40, 35, "Uncommon", 1000),
        new Item("Orcish Helmet", "Apparel", "Head|HeavyArmor", 250, 20, 8, "Uncommon", 500),
        new Item("Orcish Gauntlets", "Apparel", "Arms|HeavyArmor", 250, 15, 7,"Uncommon", 200),
        new Item("Orcish Boots", "Apparel", "Feet|HeavyArmor", 250, 15, 7,"Uncommon", 200),

        //Potions
        new Item("Potion of Healing", "Potion", "Restore|Health", 1, 50, 0.25,"Uncommon", 36),
        new Item("Potion of Increase Health", "Potion", "Augment|Health", 1, 10, 0.25,"Uncommon", 41),
        new Item("Potion of Increase Stamina", "Potion", "Augment|Stamina", 1, 10, 0.25,"Uncommon", 41),

    ],
    rare: [
        //Weapons
        //Daggers
        new Item("Ebony Dagger", "Weapon", "Melee|OneHanded", 500, 10, 5, "Rare", 290),
        new Item("Glass Dagger", "Weapon", "Melee|OneHanded", 500, 9, 4.5, "Rare", 165),
        new Item("Stahlrim Dagger", "Weapon", "Melee|OneHanded", 500, 10, 4.5, "Rare", 395),
        //Maces
        new Item("Ebony Mace", "Weapon", "Melee|OneHanded", 500, 16, 19, "Rare", 1000),
        new Item("Glass Mace", "Weapon", "Melee|OneHanded", 500, 14, 18, "Rare", 575),
        new Item("Stahlrim Mace", "Weapon", "Melee|OneHanded", 500, 16, 18, "Rare", 1375),
        //Swords
        new Item("Ebony Sword", "Weapon", "Melee|OneHanded",500, 13, 15, "Rare", 720),
        new Item("Glass Sword", "Weapon", "Melee|OneHanded", 500, 12, 14, "Rare", 410),
        new Item("Stahlrim Sword", "Weapon", "Melee|OneHanded", 500, 13, 14, "Rare", 985),
        //War Axes
        new Item("Ebony War Axe", "Weapon", "Melee|OneHanded", 500, 15, 17, "Rare", 865),
        new Item("Glass War Axe", "Weapon", "Melee|OneHanded", 500, 14, 16, "Rare", 490),
        new Item("Stahlrim War Axe", "Weapon", "Melee|OneHanded", 500, 15, 16, "Rare", 1180),
        //Staves
        new Item("Staff of Fireballs", "Weapon", "Magic|Fire", 25, 40, 8, "Rare", 1309),
        new Item("Staff of Ice Storms", "Weapon", "Magic|Ice", 25, 40, 8, "Rare", 1401),
        new Item("Staff of Chain Lightning", "Weapon", "Magic|Shock", 25, 40, 8, "Rare", 1494),

        //Armor
        //Ebony
        new Item("Ebony Armor", "Apparel", "Main|HeavyArmor", 500, 43, 38, "Rare", 1500),
        new Item("Ebony Helmet", "Apparel", "Head|HeavyArmor", 500, 21, 10, "Rare", 750),
        new Item("Ebony Gauntlets", "Apparel", "Arms|HeavyArmor", 500, 16, 7,"Rare", 275),
        new Item("Ebony Boots", "Apparel", "Feet|HeavyArmor", 500, 16, 7,"Rare", 275),
        //Glass
        new Item("Glass Armor", "Apparel", "Main|LightArmor", 500, 38, 7, "Rare", 900),
        new Item("Glass Helmet", "Apparel", "Head|LightArmor", 500, 16, 2, "Rare", 450),
        new Item("Glass Gauntlets", "Apparel", "Arms|LightArmor", 500, 11, 2,"Rare", 190),
        new Item("Glass Boots", "Apparel", "Feet|LightArmor", 500, 11, 2,"Rare", 190),
        //Stahlrim
        new Item("Stahlrim Armor", "Apparel", "Main|HeavyArmor", 500, 46, 38, "Rare", 2200),
        new Item("Stahlrim Helmet", "Apparel", "Head|HeavyArmor", 500, 22, 7, "Rare", 1135),
        new Item("Stahlrim Gauntlets", "Apparel", "Arms|HeavyArmor", 500, 17, 7,"Rare", 450),
        new Item("Stahlrim Boots", "Apparel", "Feet|HeavyArmor", 500, 17, 7,"Rare", 450),

        //Potions
        new Item("Potion of Vigorous Healing", "Potion", "Restore|Health", 1, 75, 0.25,"Rare", 79),
        new Item("Potion of Vigorous Increase Health", "Potion", "Augment|Health", 1, 15, 0.25,"Rare", 85),
        new Item("Potion of Vigorous Increase Stamina", "Potion", "Augment|Stamina", 1, 15, 0.25,"Rare", 85),
    ],
    mythic: [
        //Weapons
        //Daggers
        new Item("Daedric Dagger", "Weapon", "Melee|OneHanded", 1000, 11, 6, "Mythic", 500),
        new Item("Dragonbone Dagger", "Weapon", "Melee|OneHanded", 1000, 12, 6.5, "Mythic", 600),
        //Maces
        new Item("Daedric Mace", "Weapon", "Melee|OneHanded", 1000, 16, 20, "Mythic", 1750),
        new Item("Dragonbone Mace", "Weapon", "Melee|OneHanded", 1000, 17, 22, "Mythic", 2000),
        //Swords
        new Item("Daedric Sword", "Weapon", "Melee|OneHanded", 1000, 14, 16, "Mythic", 1250),
        new Item("Dragonbone Sword", "Weapon", "Melee|OneHanded", 1000, 15, 19, "Mythic", 1500),
        //War Axes
        new Item("Daedric War Axe", "Weapon", "Melee|OneHanded", 1000, 15, 18, "Mythic", 1500),
        new Item("Dragonbone War Axe", "Weapon", "Melee|OneHanded", 1000, 16, 21, "Mythic", 1700),
        //Staves
        new Item("Staff of Incineration", "Weapon", "Magic|Fire", 25, 60, 8, "Mythic", 2750),
        new Item("Staff of Icy Spear", "Weapon", "Magic|Ice", 25, 60, 8, "Mythic", 2931),
        new Item("Staff of Lightning Storms", "Weapon", "Magic|Shock", 25, 60, 8, "Mythic", 3014),

        //Armor
        //Daedric
        new Item("Daedric Armor", "Apparel", "Main|HeavyArmor", 1000, 49, 50, "Mythic", 3200),
        new Item("Daedric Helmet", "Apparel", "Head|HeavyArmor", 1000, 23, 15, "Mythic", 1600),
        new Item("Daedric Gauntlets", "Apparel", "Arms|HeavyArmor", 1000, 18, 6,"Mythic", 625),
        new Item("Daedric Boots", "Apparel", "Feet|HeavyArmor", 1000, 18, 10,"Mythic", 625),
        //Dragonscale
        new Item("Dragonscale Armor", "Apparel", "Main|LightArmor", 1000, 41, 10, "Mythic", 1500),
        new Item("Dragonscale Helmet", "Apparel", "Head|LightArmor", 1000, 17, 4, "Mythic", 750),
        new Item("Dragonscale Gauntlets", "Apparel", "Arms|LightArmor", 1000, 12, 3,"Mythic", 300),
        new Item("Dragonscale Boots", "Apparel", "Feet|LightArmor", 1000, 12, 3,"Mythic", 300),

        //Potions
        new Item("Potion of Ultimate Healing", "Potion", "Restore|Health", 1, 100, 0.25,"Mythic", 251),
        new Item("Potion of Ultimate Increase Health", "Potion", "Augment|Health", 1, 20, 0.25,"Mythic", 275),
        new Item("Potion of Ultimate Increase Stamina", "Potion", "Augment|Stamina", 1, 20, 0.25,"Mythic", 275),
    ]
};

