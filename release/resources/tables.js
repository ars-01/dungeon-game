import {Spell} from "../objects/spell.js";
import {Effect} from "../objects/effect.js";

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

//█ ▓ ▒ ░

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
    armorOak: new Effect("Armor - Oak", "Armor", 1, 12, 40),
    armorStone: new Effect("Armor - Stone", "Armor", 1, 12, 60),
    armorIron: new Effect("Armor - Iron", "Armor", 1, 12, 80),
    armorEbony: new Effect("Armor - Ebony", "Armor", 1, 12, 100),
    armorDragonhide: new Effect("Armor - Dragonhide", "MeleeResistance", 1, 12, 80),
    paralyze: new Effect("Paralyze", "Paralysis", 1, 2, 1)
};

export const spells = {
    //Destruction

    //Restoration

    //Alteration

    oakFlesh: new Spell("Oakflesh", "Alteration", "Armor", 40, 103, effects.armorOak.clone()),
    stoneFlesh: new Spell("Stoneflesh", "Alteration", "Armor", 60, 166, effects.armorStone.clone()),
    ironFlesh: new Spell("Ironflesh", "Alteration", "Armor", 80 , 266, effects.armorIron.clone()),
    ebonyFlesh: new Spell("Ebonyflesh", "Alteration", "Armor", 100, 341, effects.armorEbony.clone()),
    dragonHide: new Spell("Dragonhide", "Alteration", "Armor", 800, 837, effects.armorDragonhide.clone()),
    paralyze: new Spell("Paralyze", "Alteration", "Paralysis", 450, 450, effects.paralyze.clone()),
};



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