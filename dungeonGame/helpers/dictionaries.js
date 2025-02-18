import chalk from "chalk";
import promptSync from "prompt-sync";
import {Item} from "../gameObjects/item.js";
import {Enemy} from "../gameObjects/enemy.js";

const prompt = promptSync();

export const rarityToInteger = (string)  => {
    switch (string) {
        case "Common":
            return 0;
        case "Uncommon":
            return 70;
        case "Rare":
            return 110;
        case "Mythic":
            return 140;
        default:
            return 0;
    }
}

export const getItemId = (maxId) => {
    if (maxId < 1) return -100;
    let input = NaN;
    while (isNaN(input) || input < 0 || input > maxId) {
        let line = prompt(chalk.green("Enter a valid id: "));
        input = parseInt(line);
    }
    return input - 1;
}

export const getRandomArmor = (armorType, armorRarity) => {
    let armor = [];
    switch (armorType) {
        case "Magic":
            switch (armorRarity) {
                case "Common":
                    lootTable.common.forEach((item) => {
                        if (item.type.split("|")[0] === "Armor") {
                            if (item.type.split("|")[2] === "Light") {
                                armor.push(item.clone());
                            }
                        }
                    });
                    break;
                case "Uncommon":
                    lootTable.uncommon.forEach((item) => {
                        if (item.type.split("|")[0] === "Armor") {
                            if (item.type.split("|")[2] === "Light") {
                                armor.push(item.clone());
                            }
                        }
                    });
                    break;
                case "Rare":
                    lootTable.rare.forEach((item) => {
                        if (item.type.split("|")[0] === "Armor") {
                            if (item.type.split("|")[2] === "Light") {
                                armor.push(item.clone());
                            }
                        }
                    });
                    break;
                case "Mythic":
                    lootTable.mythic.forEach((item) => {
                        if (item.type.split("|")[0] === "Armor") {
                            if (item.type.split("|")[2] === "Light") {
                                armor.push(item.clone());
                            }
                        }
                    });
                    break;
                default:
                    break;
            }
            break;
        case "Melee":
            switch (armorRarity) {
                case "Common":
                    lootTable.common.forEach((item) => {
                        if (item.type.split("|")[0] === "Armor") {
                            if (item.type.split("|")[2] === "Heavy") {
                                armor.push(item.clone());
                            }
                        }
                    });
                    break;
                case "Uncommon":
                    lootTable.uncommon.forEach((item) => {
                        if (item.type.split("|")[0] === "Armor") {
                            if (item.type.split("|")[2] === "Heavy") {
                                armor.push(item.clone());
                            }
                        }
                    });
                    break;
                case "Rare":
                    lootTable.rare.forEach((item) => {
                        if (item.type.split("|")[0] === "Armor") {
                            if (item.type.split("|")[2] === "Heavy") {
                                armor.push(item.clone());
                            }
                        }
                    });
                    break;
                case "Mythic":
                    lootTable.mythic.forEach((item) => {
                        if (item.type.split("|")[0] === "Armor") {
                            if (item.type.split("|")[2] === "Heavy") {
                                armor.push(item.clone());
                            }
                        }
                    });
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
    let _head = [], _main = [], _arms = [], _feet = [];
    armor.forEach((item) => {
        switch (item.type.split("|")[1]) {
            case "Head":
                _head.push(item);
                break;
            case "Main":
                _main.push(item);
                break;
            case "Arms":
                _arms.push(item);
                break;
            case "Feet":
                _feet.push(item);
                break;
            default:
                break;
        }
    });
    return {
        head: _head[Math.floor(Math.random() * _head.length)],
        main: _main[Math.floor(Math.random() * _main.length)],
        arms: _arms[Math.floor(Math.random() * _arms.length)],
        feet: _feet[Math.floor(Math.random() * _feet.length)]
    };
}

export const getRandomWeapon = (weaponType, weaponRarity) => {
    let weapons = [];
    switch (weaponRarity) {
        case "Common":
            lootTable.common.forEach((item) => {
                if (item.type.split("|")[0] === "Weapon") {
                    if (item.type.split("|")[1] === weaponType) {
                        weapons.push(item.clone());
                    }
                }
            });
            break;
        case "Uncommon":
            lootTable.uncommon.forEach((item) => {
                if (item.type.split("|")[0] === "Weapon") {
                    if (item.type.split("|")[1] === weaponType) {
                        weapons.push(item.clone());
                    }
                }
            });
            break;
        case "Rare":
            lootTable.rare.forEach((item) => {
                if (item.type.split("|")[0] === "Weapon") {
                    if (item.type.split("|")[1] === weaponType) {
                        weapons.push(item.clone());
                    }
                }
            });
            break;
        case "Mythic":
            lootTable.mythic.forEach((item) => {
                if (item.type.split("|")[0] === "Weapon") {
                    if (item.type.split("|")[1] === weaponType) {
                        weapons.push(item.clone());
                    }
                }
            });
            break;
        default:
            break;
    }
    return weapons[Math.floor(Math.random() * weapons.length)];
}

export let playersList = [];

export const roomArray = [
    ("## ##" +
        "#   #" +
        "     " +
        "#   #" +
        "## ##").split(""),
    ("## ##" +
        "#   #" +
        "  T  " +
        "#   #" +
        "## ##").split(""),
    ("## ##" +
        "#   #" +
        "  Ö  " +
        "#   #" +
        "## ##").split(""),
    ("## ##" +
        "#   #" +
        "  S  " +
        "#   #" +
        "## ##").split("")
];

export const lootTable = {
    common: [
        //Weapons
        //Daggers
        new Item("Iron Dagger", "Weapon|Melee", 125, 4, 2, "Common", 10),
        new Item("Steel Dagger", "Weapon|Melee", 125, 5, 2.5, "Common", 18),
        //Maces
        new Item("Iron Mace", "Weapon|Melee", 125, 9, 13, "Common", 35),
        new Item("Steel Mace", "Weapon|Melee", 125, 10, 14, "Common", 65),
        //Swords
        new Item("Iron Sword", "Weapon|Melee", 125, 7, 9,"Common", 25),
        new Item("Steel Sword", "Weapon|Melee", 125, 8, 10, "Common", 45),
        //War Axes
        new Item("Iron War Axe", "Weapon|Melee", 125, 8, 11, "Common", 30),
        new Item("Steel War Axe", "Weapon|Melee", 125, 9, 12, "Common", 55),
        //Staves
        new Item("Staff of Flames", "Weapon|Magic", 25, 13, 8, "Common", 230),
        new Item("Staff of Frost", "Weapon|Magic", 25, 13, 8, "Common", 240),
        new Item("Staff of Sparks", "Weapon|Magic", 25, 13, 8, "Common", 250),

        //Armor
        //Hide
        new Item("Hide Armor", "Armor|Main|Light", 125, 20, 5, "Common", 50),
        new Item("Hide Helmet", "Armor|Head|Light", 125, 10, 2, "Common", 25),
        new Item("Hide Bracers", "Armor|Arms|Light", 125, 5, 1,"Common", 10),
        new Item("Hide Boots", "Armor|Feet|Light", 125, 5, 1,"Common", 10),
        //Iron
        new Item("Iron Armor", "Armor|Main|Heavy", 125, 25, 30, "Common", 125),
        new Item("Iron Helmet", "Armor|Head|Heavy", 125, 15, 5, "Common", 60),
        new Item("Iron Gauntlets", "Armor|Arms|Heavy", 125, 10, 5,"Common", 25),
        new Item("Iron Boots", "Armor|Feet|Heavy", 125, 10, 6,"Common", 25),
        //Steel
        new Item("Steel Armor", "Armor|Main|Heavy", 125, 31, 35, "Common", 275),
        new Item("Steel Helmet", "Armor|Head|Heavy", 125, 17, 5, "Common", 125),
        new Item("Steel Gauntlets", "Armor|Arms|Heavy", 125, 12, 4,"Common", 55),
        new Item("Steel Boots", "Armor|Feet|Heavy", 125, 12, 8,"Common", 55),

        //Potions
        new Item("Potion of Minor Healing", "Potion|Restore|Health", 1, 25, 0.25,"Common", 17),
        new Item("Potion of Minor Increase Health", "Potion|Augment|Health", 1, 5, 0.25,"Common", 23),
        new Item("Potion of Minor Increase Stamina", "Potion|Augment|Stamina", 1, 5, 0.25,"Common", 23),
    ],
    uncommon: [
        //Weapons
        //Daggers
        new Item("Elven Dagger", "Weapon|Melee", 250, 8, 4, "Uncommon", 95),
        new Item("Nordic Dagger", "Weapon|Melee", 250, 8, 3.5, "Uncommon", 115),
        new Item("Orcish Dagger", "Weapon|Melee", 250, 6, 3, "Uncommon", 30),
        //Maces
        new Item("Elven Mace", "Weapon|Melee", 250, 13, 17, "Uncommon", 330),
        new Item("Nordic Mace", "Weapon|Melee", 250, 13, 16, "Uncommon", 410),
        new Item("Orcish Mace", "Weapon|Melee", 250, 11, 15, "Uncommon", 105),
        //Swords
        new Item("Elven Sword", "Weapon|Melee", 250, 11, 13, "Uncommon", 235),
        new Item("Nordic Sword", "Weapon|Melee", 250, 11, 12, "Uncommon", 290),
        new Item("Orcish Sword", "Weapon|Melee", 250, 9, 11, "Uncommon", 75),
        //War Axes
        new Item("Elven War Axe", "Weapon|Melee", 250, 12, 15, "Uncommon", 280),
        new Item("Nordic War Axe", "Weapon|Melee", 250, 12, 14, "Uncommon", 350),
        new Item("Orcish War Axe", "Weapon|Melee", 250, 10, 13, "Uncommon", 90),
        //Staves
        new Item("Staff of Firebolts", "Weapon|Magic", 25, 25, 8, "Uncommon", 493),
        new Item("Staff of Ice Spikes", "Weapon|Magic", 25, 25, 8, "Uncommon", 511),
        new Item("Staff of Lightning Bolts", "Weapon|Magic", 25, 25, 8, "Uncommon", 538),

        //Armor
        //Elven
        new Item("Elven Armor", "Armor|Main|Light", 250, 29, 4, "Uncommon", 550),
        new Item("Elven Helmet", "Armor|Head|Light", 250, 13, 1, "Uncommon", 110),
        new Item("Elven Gauntlets", "Armor|Arms|Light", 250, 8, 1,"Uncommon", 45),
        new Item("Elven Boots", "Armor|Feet|Light", 250, 8, 1,"Uncommon", 45),
        //Nordic
        new Item("Nordic Armor", "Armor|Main|Heavy", 250, 43, 37, "Uncommon", 1600),
        new Item("Nordic Helmet", "Armor|Head|Heavy", 250, 20, 7, "Uncommon", 550),
        new Item("Nordic Gauntlets", "Armor|Arms|Heavy", 250, 15, 6,"Uncommon", 220),
        new Item("Nordic Boots", "Armor|Feet|Heavy", 250, 15, 6,"Uncommon", 220),
        //Orcish
        new Item("Orcish Armor", "Armor|Main|Heavy", 250, 40, 35, "Uncommon", 1000),
        new Item("Orcish Helmet", "Armor|Head|Heavy", 250, 20, 8, "Uncommon", 500),
        new Item("Orcish Gauntlets", "Armor|Arms|Heavy", 250, 15, 7,"Uncommon", 200),
        new Item("Orcish Boots", "Armor|Feet|Heavy", 250, 15, 7,"Uncommon", 200),

        //Potions
        new Item("Potion of Healing", "Potion|Restore|Health", 1, 50, 0.25,"Uncommon", 36),
        new Item("Potion of Increase Health", "Potion|Augment|Health", 1, 10, 0.25,"Uncommon", 41),
        new Item("Potion of Increase Stamina", "Potion|Augment|Stamina", 1, 10, 0.25,"Uncommon", 41),

    ],
    rare: [
        //Weapons
        //Daggers
        new Item("Ebony Dagger", "Weapon|Melee", 500, 10, 5, "Rare", 290),
        new Item("Glass Dagger", "Weapon|Melee", 500, 9, 4.5, "Uncommon", 165),
        new Item("Stahlrim Dagger", "Weapon|Melee", 500, 10, 4.5, "Rare", 395),
        //Maces
        new Item("Ebony Mace", "Weapon|Melee", 500, 16, 19, "Rare", 1000),
        new Item("Glass Mace", "Weapon|Melee", 500, 14, 18, "Rare", 575),
        new Item("Stahlrim Mace", "Weapon|Melee", 500, 16, 18, "Rare", 1375),
        //Swords
        new Item("Ebony Sword", "Weapon|Melee", 500, 13, 15, "Rare", 720),
        new Item("Glass Sword", "Weapon|Melee", 500, 12, 14, "Rare", 410),
        new Item("Stahlrim Sword", "Weapon|Melee", 500, 13, 14, "Rare", 985),
        //War Axes
        new Item("Ebony War Axe", "Weapon|Melee", 500, 15, 17, "Rare", 865),
        new Item("Glass War Axe", "Weapon|Melee", 500, 14, 16, "Rare", 490),
        new Item("Stahlrim War Axe", "Weapon|Melee", 500, 15, 16, "Rare", 1180),
        //Staves
        new Item("Staff of Fireballs", "Weapon|Magic", 25, 40, 8, "Rare", 1309),
        new Item("Staff of Ice Storms", "Weapon|Magic", 25, 40, 8, "Rare", 1401),
        new Item("Staff of Chain Lightning", "Weapon|Magic", 25, 40, 8, "Rare", 1494),

        //Armor
        //Ebony
        new Item("Ebony Armor", "Armor|Main|Heavy", 500, 43, 38, "Rare", 1500),
        new Item("Ebony Helmet", "Armor|Head|Heavy", 500, 21, 10, "Rare", 750),
        new Item("Ebony Gauntlets", "Armor|Arms|Heavy", 500, 16, 7,"Rare", 275),
        new Item("Ebony Boots", "Armor|Feet|Heavy", 500, 16, 7,"Rare", 275),
        //Glass
        new Item("Glass Armor", "Armor|Main|Light", 500, 38, 7, "Rare", 900),
        new Item("Glass Helmet", "Armor|Head|Light", 500, 16, 2, "Rare", 450),
        new Item("Glass Gauntlets", "Armor|Arms|Light", 500, 11, 2,"Rare", 190),
        new Item("Glass Boots", "Armor|Feet|Light", 500, 11, 2,"Rare", 190),
        //Stahlrim
        new Item("Stahlrim Armor", "Armor|Main|Heavy", 500, 46, 38, "Rare", 2200),
        new Item("Stahlrim Helmet", "Armor|Head|Heavy", 500, 22, 7, "Rare", 1135),
        new Item("Stahlrim Gauntlets", "Armor|Arms|Heavy", 500, 17, 7,"Rare", 450),
        new Item("Stahlrim Boots", "Armor|Feet|Heavy", 500, 17, 7,"Rare", 450),

        //Potions
        new Item("Potion of Vigorous Healing", "Potion|Restore|Health", 1, 75, 0.25,"Rare", 79),
        new Item("Potion of Vigorous Increase Health", "Potion|Augment|Health", 1, 15, 0.25,"Rare", 85),
        new Item("Potion of Vigorous Increase Stamina", "Potion|Augment|Stamina", 1, 15, 0.25,"Rare", 85),
    ],
    mythic: [
        //Weapons
        //Daggers
        new Item("Daedric Dagger", "Weapon|Melee", 1000, 11, 6, "Mythic", 500),
        new Item("Dragonbone Dagger", "Weapon|Melee", 1000, 12, 6.5, "Mythic", 600),
        //Maces
        new Item("Daedric Mace", "Weapon|Melee", 1000, 16, 20, "Mythic", 1750),
        new Item("Dragonbone Mace", "Weapon|Melee", 1000, 17, 22, "Mythic", 2000),
        //Swords
        new Item("Daedric Sword", "Weapon|Melee", 1000, 14, 16, "Mythic", 1250),
        new Item("Dragonbone Sword", "Weapon|Melee", 1000, 15, 19, "Mythic", 1500),
        //War Axes
        new Item("Daedric War Axe", "Weapon|Melee", 1000, 15, 18, "Mythic", 1500),
        new Item("Dragonbone War Axe", "Weapon|Melee", 1000, 16, 21, "Mythic", 1700),
        //Staves
        new Item("Staff of Incineration", "Weapon|Magic", 25, 60, 8, "Mythic", 2750),
        new Item("Staff of Icy Spear", "Weapon|Magic", 25, 60, 8, "Mythic", 2931),
        new Item("Staff of Lightning Storms", "Weapon|Magic", 25, 60, 8, "Mythic", 3014),

        //Armor
        //Daedric
        new Item("Daedric Armor", "Armor|Main|Heavy", 1000, 49, 50, "Mythic", 3200),
        new Item("Daedric Helmet", "Armor|Head|Heavy", 1000, 23, 15, "Mythic", 1600),
        new Item("Daedric Gauntlets", "Armor|Arms|Heavy", 1000, 18, 6,"Mythic", 625),
        new Item("Daedric Boots", "Armor|Feet|Heavy", 1000, 18, 10,"Mythic", 625),
        //Dragonscale
        new Item("Dragonscale Armor", "Armor|Main|Light", 1000, 41, 10, "Mythic", 1500),
        new Item("Dragonscale Helmet", "Armor|Head|Light", 1000, 17, 4, "Mythic", 750),
        new Item("Dragonscale Gauntlets", "Armor|Arms|Light", 1000, 12, 3,"Mythic", 300),
        new Item("Dragonscale Boots", "Armor|Feet|Light", 1000, 12, 3,"Mythic", 300),

        //Potions
        new Item("Potion of Ultimate Healing", "Potion|Restore|Health", 1, 100, 0.25,"Mythic", 251),
        new Item("Potion of Ultimate Increase Health", "Potion|Augment|Health", 1, 20, 0.25,"Mythic", 275),
        new Item("Potion of Ultimate Increase Stamina", "Potion|Augment|Stamina", 1, 20, 0.25,"Mythic", 275),
    ]
}

export const enemyTable = {
    common: [
        //Melee
        new Enemy("Bandit", "Melee", 5, "Common", 35, 1),
        new Enemy("Forsworn", "Melee", 6, "Common", 35, 1),
        new Enemy("Reaver", "Melee", 7, "Common", 35, 1),
        new Enemy("Draugr Thrall", "Melee", 3, "Common", 12, 1),
        new Enemy("Draugr", "Melee", 4, "Common", 50, 1),

        //Magic
        new Enemy("MagePlaceholderName", "Magic", 5, "Common", 50, 1),
        new Enemy("Vampire Fledgling", "Magic", 6, "Common", 35, 1),
        new Enemy("Ghost", "Magic", 7, "Common", 35, 1),

    ],
    uncommon: [
        //Melee
        new Enemy("Bandit Outlaw", "Melee", 5, "Uncommon", 109, 5),
        new Enemy("Bandit Thug", "Melee", 5, "Uncommon", 238, 9),
        new Enemy("Forsworn Forager", "Melee", 6, "Uncommon", 109, 5),
        new Enemy("Forsworn Looter", "Melee", 6, "Uncommon", 238, 9),
        new Enemy("Reaver Outlaw", "Melee", 7, "Uncommon", 109, 5),
        new Enemy("Reaver Thug", "Melee", 7, "Uncommon", 238, 9),
        new Enemy("Restless Draugr", "Melee", 4, "Uncommon", 150, 6),
        new Enemy("Draugr Overlord", "Melee", 4, "Uncommon", 210, 7),

        //Magic
        new Enemy("MagePlaceholderName", "Magic", 5, "Uncommon", 142, 6),
        new Enemy("MagePlaceholderName", "Magic", 5, "Uncommon", 142, 12),
        new Enemy("Vampire", "Magic", 6, "Uncommon", 120, 6),
        new Enemy("Blooded Vampire", "Magic", 6, "Uncommon", 224, 12),
        new Enemy("Dremora Churl", "Magic", 7, "Uncommon", 105, 6),
        new Enemy("Dremora Caitiff", "Magic", 7, "Uncommon", 171, 12),
    ],
    rare: [
        //Melee
        new Enemy("Bandit Highwayman", "Melee", 5, "Rare", 318, 14),
        new Enemy("Bandit Plunderer", "Melee", 5, "Rare", 398, 19),
        new Enemy("Forsworn Pillager", "Melee", 6, "Rare", 318, 14),
        new Enemy("Forsworn Ravager", "Melee", 6, "Rare", 398, 19),
        new Enemy("Reaver Highwayman", "Melee", 7, "Rare", 318, 14),
        new Enemy("Reaver Plunderer", "Melee", 7, "Rare", 398, 19),
        new Enemy("Draugr Wight", "Melee", 4, "Rare", 320, 13),
        new Enemy("Draugr Wight Lord", "Melee", 4, "Rare", 490, 15),

        //Magic
        new Enemy("MagePlaceholderName", "Magic", 5, "Rare", 275, 19),
        new Enemy("MagePlaceholderName", "Magic", 5, "Rare", 367, 27),
        new Enemy("Vampire Mistwalker", "Magic", 6, "Rare", 331, 20),
        new Enemy("Vampire Nightstalker", "Magic", 6, "Rare", 412, 28),
        new Enemy("Dremora Kynval", "Magic", 7, "Rare", 248, 19),
        new Enemy("Dremora Kynreeve", "Magic", 7, "Rare", 336, 27),
    ],
    mythic: [
        //Melee
        new Enemy("Bandit Marauder", "Melee", 5, "Mythic", 489, 25),
        new Enemy("Bandit Chief", "Melee", 5, "Mythic", 497, 28),
        new Enemy("Forsworn Shaman", "Melee", 6, "Mythic", 489, 25),
        new Enemy("Forsworn Briarheart", "Melee", 6, "Mythic", 497, 28),
        new Enemy("Reaver Marauder", "Melee", 7, "Mythic", 489, 25),
        new Enemy("Reaver Lord", "Melee", 7, "Mythic", 497, 28),
        new Enemy("Draugr Scourge", "Melee", 4, "Mythic", 700, 21),
        new Enemy("Draugr Scourge Lord", "Melee", 4, "Mythic", 880, 24),

        //Magic
        new Enemy("MagePlaceholderName", "Magic", 5, "Mythic", 467, 36),
        new Enemy("MagePlaceholderName", "Magic", 5, "Mythic", 467, 46),
        new Enemy("Ancient Vampire", "Magic", 6, "Mythic", 583, 38),
        new Enemy("Nightlord Vampire", "Magic", 6, "Mythic", 823, 48),
        new Enemy("Dremora Markynaz", "Magic", 7, "Mythic", 435, 36),
        new Enemy("Dremora Valynaz", "Magic", 7, "Mythic", 545, 46),
    ]
}

export const firstNames = [
    "Thalia", "Garrick", "Elowen", "Roderick", "Isolde", "Fenwick", "Brynn", "Alaric", "Selene", "Torvin", "Thalindra",
    "Fendril", "Brinor", "Varrick", "Nyssa", "Gadren", "Liora", "Jorvik", "Selwyn", "Elsbeth"
];

export const lastNames = [
    "Frostbrook", "Ironbark", "Bramblethorn", "Stonehelm", "Thundershade", "Galecrest", "Alderfrost", "Windwhistle",
    "Nightbloom", "Ashenstone", "Warespark", "Mossgather", "Ironforge", "Greenthorn", "Cloudspinner", "Quickfoot",
    "Firewhistle", "Starbloom", "Stonebinder", "Nightshade"
];


