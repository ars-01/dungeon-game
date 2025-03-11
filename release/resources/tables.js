import {Spell} from "../objects/spell.js";
import {Effect} from "../objects/effect.js";

export const walls = {
    horizontalHallwayDown: ("####  ####" +
        "####  ####").split(""),
    horizontalHallwayUp: ("####  ####" +
        "####  ####").split(""),
    verticalHallwayLeft: ("##" +
        "##" +
        "  " +
        "  " +
        "##" +
        "##").split(""),
    verticalHallwayRight: ("##" +
        "##" +
        "  " +
        "  " +
        "##" +
        "##").split(""),
    horizontalWall: ("####################").split(""),
    verticalWall: ("##" +
        "##" +
        "##" +
        "##" +
        "##" +
        "##").split(""),
}

export const roomLayouts = {
    empty: ("      " +
        "      " +
        "      " +
        "      " +
        "      " +
        "      ").split(""),
    filled: ("######" +
        "######" +
        "######" +
        "######" +
        "######" +
        "######").split(""),
}

export const spellEffects = {
    oakFlesh: new Spell("Oakflesh", "Alteration", "Armor", 40, 103,
        new Effect("Oakflesh", "Armor", 1, 12, 40)),
    stoneFlesh: new Spell("Stoneflesh", "Alteration", "Armor", 60, 166,
        new Effect("Stoneflesh", "Armor", 1, 12, 60)),
    ironFlesh: new Spell("Ironflesh", "Alteration", "Armor", 80 , 266,
        new Effect("Ironflesh", "Armor", 1, 12, 80)),
    ebonyFlesh: new Spell("Ebonyflesh", "Alteration", "Armor", 100, 341,
        new Effect("Ebonyflesh", "Armor", 1, 12, 100)),
    dragonHide: new Spell("Dragonhide", "Alteration", "Armor", 800, 837,
        new Effect("Dragonhide", "MeleeResistance", 1, 12, 80)),
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
    const percentage = Math.floor((value / maxValue)) * 50;
    let outputString = "[";
    for (let i = 0; i < 50; i++) {
        if (i <= percentage)
            outputString += "#";
        else
            outputString += " "
    }
    return outputString + "]";
}