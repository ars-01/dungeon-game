import {Character} from "../objects/character.js";
import {
    getRandomArmsPiece,
    getRandomDestructionSpell,
    getRandomFootPiece,
    getRandomHeadPiece,
    getRandomMainPiece,
    getRandomPotion,
    getRandomProtectionSpell,
    getRandomRestorationSpell,
    getRandomShield,
    getRandomSpellTome,
    getRandomWeapon
} from "../resources/tables.js";

const enemyNames = {
    warriors: {
        common: ["Bandit", "Forsworn", "Reaver", "Draugr", "Thug", "Draugr Thrall", "Dremora Churl"],
        uncommon: ["Bandit Outlaw", "Bandit Thug", "Forsworn Forager", "Forsworn Looter", "Reaver Outlaw", "Reaver Thug", "Restless Draugr", "Draugr Overlord", "Dremora Caitiff", "Dremora Kynval"],
        rare: ["Bandit Highwayman", "Bandit Plunderer", "Forsworn Pillager", "Forsworn Ravager", "Reaver Highwayman", "Reaver Plunderer", "Draugr Wight", "Draugr Wight Lord", "Dremora Kynreeve", "Dremora Markynaz"],
        mythic: ["Bandit Marauder", "Bandit Chief", "Forsworn Briarheart", "Reaver Marauder", "Reaver Lord", "Draugr Scourge", "Draugr Deathlord", "Dremora Valkynaz"]
    },

    mages: {
        common: ["Forsworn Shaman", "Witch", "Vampire Fledgling", "Vampire", "Novice normal Mage", "Dremora Churl", "Cult Initiate"],
        uncommon: ["Hag", "Blooded Vampire", "Vampire Mistwalker", "Apprentice normal Mage", "normal Mage Adept", "Dremora Caitiff", "Dremora Kynval", "Cultist", "Cultist Adept"],
        rare: ["Old Hag", "Vampire Nightstalker", "Ancient Vampire", "normal Mage", "normal Wizard", "Dremora Kynreeve", "Dremora Markynaz", "Ascendant Cultist", "Master Cultist", "Falmer Shaman"],
        mythic: ["Hagraven", "Master Vampire", "Nightlord Vampire", "fancymancer", "Arch fancymancer", "Dremora Valkynaz", "Arch Cultist", "Falmer Shadowmaster"],
    },

    thieves: {
        common: ["Lowlife", "Forsworn", "Bandit", "Falmer", "Draugr"],
        uncommon: ["Vagrant", "Forsworn Pillager", "Forsworn Ravager", "Bandit Outlaw", "Bandit Thug", "Falmer Skulker", "Restless Draugr", "Draugr Overlord"],
        rare: ["Scavenger", "Forsworn Pillager", "Forsworn Ravager", "Bandit Highwayman", "Bandit Plunderer", "Falmer Gloomlurker", "Falmer Nightprowler", "Draugr Wight", "Draugr Wight Lord"],
        mythic: ["Forsworn Briarheart", "Bandit Marauder", "Falmer Shadowmaster", "Falmer Warmonger", "Draugr Scourge", "Draugr Deathlord"]
    },
};

export const getRandomLeveledEnemy = (level, pos) => {
    let character;
    const classChoice = Math.floor(Math.random() * 3);
    switch (classChoice) {
        case 0:
            character = getBaseWarrior(level, pos);
            break;
        case 1:
            character = getBaseMage(level, pos);
            break;
        case 2:
            character = getBaseThief(level, pos);
            break;
        default:
            break;
    }

    equipCharacter(character, classChoice);

    nameCharacter(character, classChoice, true);

    return character;
}

const getBaseShopkeeper = (level, pos) => {

}

const getBaseWarrior = (level, pos) => {
    const warriorStatMultiplier = 3;
    const mageStatMultiplier = 0.5;
    const thiefStatMultiplier = 1.5;
    const character = new Character(
        "dummyWarrior",
        pos,
        50 + Math.floor(Math.floor(Math.random() * warriorStatMultiplier + 1) * warriorStatMultiplier * Math.floor(Math.sqrt(level * 10 * warriorStatMultiplier))),
        50 + Math.floor(Math.floor(Math.random() * thiefStatMultiplier + 1) * thiefStatMultiplier * Math.floor(Math.sqrt(level * 10 * thiefStatMultiplier))),
        50 + Math.floor(Math.floor(Math.random() * mageStatMultiplier + 1) * mageStatMultiplier * Math.floor(Math.sqrt(level * 10 * mageStatMultiplier)))
    );

    while (character.characterLevel <= level) {
        const classChoice = Math.random() * 5;
        const skillChoice = Math.floor(Math.random() * 3);
        if (classChoice < warriorStatMultiplier) {
            switch (skillChoice) {
                case 0:
                    character.advanceSkill("HeavyArmor", character.heavyArmorSkill * 25);
                    break;
                case 1:
                    character.advanceSkill("Block", character.blockSkill * 25);
                    break;
                case 2:
                    character.advanceSkill("TwoHanded", character.twoHandedSkill * 50);
                    break;
                default:
                    break;
            }
        } else if (classChoice < warriorStatMultiplier + thiefStatMultiplier) {
            switch (skillChoice) {
                case 0:
                    character.advanceSkill("LightArmor", character.lightArmorSkill * 25);
                    break;
                case 1:
                    character.advanceSkill("OneHanded", character.oneHandedSkill * 50);
                    break;
                case 2:
                    character.advanceSkill("Speech", character.speechSkill * 25);
                    break;
                default:
                    break;
            }
        } else {
            switch (skillChoice) {
                case 0:
                    character.advanceSkill("Destruction", character.destructionSkill * 50);
                    break;
                case 1:
                    character.advanceSkill("Restoration", character.restorationSkill * 50);
                    break;
                case 2:
                    character.advanceSkill("Alteration", character.alterationSkill * 10);
                    break;
                default:
                    break;
            }
        }
        if (character.characterLevelXP >= 10) {
            character.levelUp();
        }
    }

    return character;
}

const getBaseMage = (level, pos) => {
    const warriorStatMultiplier = 0.5;
    const mageStatMultiplier = 3;
    const thiefStatMultiplier = 1.5;
    const character = new Character(
        "dummyMage",
        pos,
        50 + Math.floor(Math.floor(Math.random() * warriorStatMultiplier + 1) * warriorStatMultiplier * Math.floor(Math.sqrt(level * 10 * warriorStatMultiplier))),
        50 + Math.floor(Math.floor(Math.random() * thiefStatMultiplier + 1) * thiefStatMultiplier * Math.floor(Math.sqrt(level * 10 * thiefStatMultiplier))),
        50 + Math.floor(Math.floor(Math.random() * mageStatMultiplier + 1) * mageStatMultiplier * Math.floor(Math.sqrt(level * 10 * mageStatMultiplier)))
    );

    while (character.characterLevel <= level) {
        const classChoice = Math.random() * 5;
        const skillChoice = Math.floor(Math.random() * 3);
        if (classChoice < mageStatMultiplier) {
            switch (skillChoice) {
                case 0:
                    character.advanceSkill("Destruction", character.destructionSkill * 50);
                    break;
                case 1:
                    character.advanceSkill("Restoration", character.restorationSkill * 50);
                    break;
                case 2:
                    character.advanceSkill("Alteration", character.alterationSkill * 10);
                    break;
                default:
                    break;
            }
        } else if (classChoice < mageStatMultiplier + thiefStatMultiplier) {
            switch (skillChoice) {
                case 0:
                    character.advanceSkill("LightArmor", character.lightArmorSkill * 25);
                    break;
                case 1:
                    character.advanceSkill("OneHanded", character.oneHandedSkill * 50);
                    break;
                case 2:
                    character.advanceSkill("Speech", character.speechSkill * 25);
                    break;
                default:
                    break;
            }
        } else {
            switch (skillChoice) {
                case 0:
                    character.advanceSkill("HeavyArmor", character.heavyArmorSkill * 25);
                    break;
                case 1:
                    character.advanceSkill("Block", character.blockSkill * 25);
                    break;
                case 2:
                    character.advanceSkill("TwoHanded", character.twoHandedSkill * 50);
                    break;
                default:
                    break;
            }
        }
        if (character.characterLevelXP >= 10) {
            character.levelUp();
        }
    }

    return character;
}

const getBaseThief = (level, pos) => {
    const warriorStatMultiplier = 1;
    const mageStatMultiplier = 1;
    const thiefStatMultiplier = 3;
    const character = new Character(
        "dummyThief",
        pos,
        50 + Math.floor(Math.floor(Math.random() * warriorStatMultiplier + 1) * warriorStatMultiplier * Math.floor(Math.sqrt(level * 10 * warriorStatMultiplier))),
        50 + Math.floor(Math.floor(Math.random() * thiefStatMultiplier + 1) * thiefStatMultiplier * Math.floor(Math.sqrt(level * 10 * thiefStatMultiplier))),
        50 + Math.floor(Math.floor(Math.random() * mageStatMultiplier + 1) * mageStatMultiplier * Math.floor(Math.sqrt(level * 10 * mageStatMultiplier)))
    );

    while (character.characterLevel <= level) {
        const classChoice = Math.random() * 5;
        const skillChoice = Math.floor(Math.random() * 3);
        if (classChoice < thiefStatMultiplier) {
            switch (skillChoice) {
                case 0:
                    character.advanceSkill("LightArmor", character.lightArmorSkill * 25);
                    break;
                case 1:
                    character.advanceSkill("OneHanded", character.oneHandedSkill * 50);
                    break;
                case 2:
                    character.advanceSkill("Speech", character.speechSkill * 25);
                    break;
                default:
                    break;
            }
        } else if (classChoice < thiefStatMultiplier + mageStatMultiplier) {
            switch (skillChoice) {
                case 0:
                    character.advanceSkill("Destruction", character.destructionSkill * 50);
                    break;
                case 1:
                    character.advanceSkill("Restoration", character.restorationSkill * 50);
                    break;
                case 2:
                    character.advanceSkill("Alteration", character.alterationSkill * 10);
                    break;
                default:
                    break;
            }
        } else {
            switch (skillChoice) {
                case 0:
                    character.advanceSkill("HeavyArmor", character.heavyArmorSkill * 25);
                    break;
                case 1:
                    character.advanceSkill("Block", character.blockSkill * 25);
                    break;
                case 2:
                    character.advanceSkill("TwoHanded", character.twoHandedSkill * 50);
                    break;
                default:
                    break;
            }
        }
        if (character.characterLevelXP >= 10) {
            character.levelUp();
        }
    }

    return character;
}

const equipCharacter = (character, characterClass) => {
    character.gold = Math.floor(Math.random() * character.characterLevel * 5) + 3;
    let armorClassString = "";
    let weaponClassString = "";
    switch (characterClass) {
        case 0:
            armorClassString = "HeavyArmor";
            weaponClassString = "TwoHanded";
            break;
        case 1:
            armorClassString = "Clothing";
            weaponClassString = "OneHanded|Dagger";
            break;
        case 2:
            armorClassString = "LightArmor";
            weaponClassString = "OneHanded";
            break;
        default:
            break;
    }

    const equipment = {
        head: null,
        main: null,
        arms: null,
        feet: null,
        weapon: null,
        shield: null,
    };

    let itemRarity = "";
    if (character.characterLevel < 7) {
        itemRarity = "Common";
    } else if (character.characterLevel < 14) {
        itemRarity = "Uncommon";
    } else if (character.characterLevel < 21) {
        itemRarity = "Rare";
    } else {
        itemRarity = "Mythic";
    }

    equipment.head = getRandomHeadPiece(itemRarity, armorClassString);
    equipment.main = getRandomMainPiece(itemRarity, armorClassString);
    equipment.arms = getRandomArmsPiece(itemRarity, armorClassString);
    equipment.feet = getRandomFootPiece(itemRarity, armorClassString);
    equipment.weapon = getRandomWeapon(itemRarity, weaponClassString);
    if (weaponClassString === "OneHanded")
        equipment.shield = getRandomShield(itemRarity);

    character.equipment.weapon = equipment.weapon;
    character.equipment.head = equipment.head;
    character.equipment.main = equipment.main;
    character.equipment.arms = equipment.arms;
    character.equipment.feet = equipment.feet;
    character.equipment.shield = equipment.shield;

    switch (characterClass) {
        case 0:
            for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++)
                character.addItemToInventory(getRandomPotion(itemRarity, "Healing"));
            break;
        case 1:
            character.addItemToInventory(getRandomSpellTome(itemRarity));
            character.learnSpell(getRandomDestructionSpell(itemRarity));
            character.learnSpell(getRandomRestorationSpell(itemRarity));
            character.learnSpell(getRandomProtectionSpell(itemRarity));
            character.addItemToInventory(getRandomPotion(itemRarity, "Mana"));
            break;
        case 2:
            for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++)
                character.addItemToInventory(getRandomPotion(itemRarity, "Healing"));
            break;
        default:
            break;
    }
}

const nameCharacter = (character, characterClass, isEnemy) => {
    let nameString = "";

    if (isEnemy) {
        if (character.characterLevel < 7) {
            switch (characterClass) {
                case 0:
                    nameString = enemyNames.warriors.common[Math.floor(Math.random() * enemyNames.warriors.common.length)];
                    break;
                case 1:
                    nameString = enemyNames.mages.common[Math.floor(Math.random() * enemyNames.mages.common.length)];
                    break;
                case 2:
                    nameString = enemyNames.thieves.common[Math.floor(Math.random() * enemyNames.thieves.common.length)];
                    break;
                default:
                    break;
            }
        } else if (character.characterLevel < 14) {
            switch (characterClass) {
                case 0:
                    nameString = enemyNames.warriors.uncommon[Math.floor(Math.random() * enemyNames.warriors.uncommon.length)];
                    break;
                case 1:
                    nameString = enemyNames.mages.uncommon[Math.floor(Math.random() * enemyNames.mages.uncommon.length)];
                    break;
                case 2:
                    nameString = enemyNames.thieves.uncommon[Math.floor(Math.random() * enemyNames.thieves.uncommon.length)];
                    break;
                default:
                    break;
            }
        } else if (character.characterLevel < 21) {
            switch (characterClass) {
                case 0:
                    nameString = enemyNames.warriors.rare[Math.floor(Math.random() * enemyNames.warriors.rare.length)];
                    break;
                case 1:
                    nameString = enemyNames.mages.rare[Math.floor(Math.random() * enemyNames.mages.rare.length)];
                    break;
                case 2:
                    nameString = enemyNames.thieves.rare[Math.floor(Math.random() * enemyNames.thieves.rare.length)];
                    break;
                default:
                    break;
            }
        } else {
            switch (characterClass) {
                case 0:
                    nameString = enemyNames.warriors.mythic[Math.floor(Math.random() * enemyNames.warriors.mythic.length)];
                    break;
                case 1:
                    nameString = enemyNames.mages.mythic[Math.floor(Math.random() * enemyNames.mages.mythic.length)];
                    break;
                case 2:
                    nameString = enemyNames.thieves.mythic[Math.floor(Math.random() * enemyNames.thieves.mythic.length)];
                    break;
                default:
                    break;
            }
        }
    } else {
        nameString = "Shopkeep Name";
    }

    const {normal, fancy} = getRandomElement();
    if (nameString.includes("normal")) {
        nameString = nameString.replace("normal", normal);
    }
    if (nameString.includes("fancy")) {
        nameString = nameString.replace("fancy", fancy);
    }

    character.name = nameString;
}

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

export const enemyAction = (enemy, dungeon) => {

}