import {Spell} from "../objects/spell.js";
import {Effect} from "../objects/effect.js";

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
}

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

};

