import {Character} from "../objects/character.js";
import {
    getRandomArmsPiece,
    getRandomFootPiece,
    getRandomHeadPiece,
    getRandomMainPiece, getRandomShield,
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
        common: ["Forsworn Shaman", "Witch", "Vampire Fledgling", "Vampire", "Novice [normal] Mage", "Dremora Churl", "Cult Initiate"],
        uncommon: ["Hag", "Blooded Vampire", "Vampire Mistwalker", "Apprentice [normal] Mage", "[normal] Mage Adept", "Dremora Caitiff", "Dremora Kynval", "Cultist", "Cultist Adept"],
        rare: ["Old Hag", "Vampire Nightstalker", "Ancient Vampire", "[normal] Mage", "[normal] Wizard", "Dremora Kynreeve", "Dremora Markynaz", "Ascendant Cultist", "Master Cultist", "Falmer Shaman"],
        mythic: ["Hagraven", "Master Vampire", "Nightlord Vampire", "[fancy]mancer", "Arch [fancy]mancer", "Dremora Valkynaz", "Arch Cultist", "Falmer Shadowmaster"],
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

    nameCharacter(character, classChoice);

    return character;
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

const getBaseShopkeeper = (level, pos) => {

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
            weaponClassString = "Staff";
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

    if (character.characterLevel < 7) {
        equipment.head = getRandomHeadPiece("Common", armorClassString);
        equipment.main = getRandomMainPiece("Common", armorClassString);
        equipment.arms = getRandomArmsPiece("Common", armorClassString);
        equipment.feet = getRandomFootPiece("Common", armorClassString);
        equipment.weapon = getRandomWeapon("Common", weaponClassString);
        if (weaponClassString === "OneHanded")
            equipment.shield = getRandomShield("Common");
    } else if (character.characterLevel < 14) {
        equipment.head = getRandomHeadPiece("Uncommon", armorClassString);
        equipment.main = getRandomMainPiece("Uncommon", armorClassString);
        equipment.arms = getRandomArmsPiece("Uncommon", armorClassString);
        equipment.feet = getRandomFootPiece("Uncommon", armorClassString);
        equipment.weapon = getRandomWeapon("Uncommon", weaponClassString);
        if (weaponClassString === "OneHanded")
            equipment.shield = getRandomShield("Uncommon");
    } else if (character.characterLevel < 21) {
        equipment.head = getRandomHeadPiece("Rare", armorClassString);
        equipment.main = getRandomMainPiece("Rare", armorClassString);
        equipment.arms = getRandomArmsPiece("Rare", armorClassString);
        equipment.feet = getRandomFootPiece("Rare", armorClassString);
        equipment.weapon = getRandomWeapon("Rare", weaponClassString);
        if (weaponClassString === "OneHanded")
            equipment.shield = getRandomShield("Rare");
    } else {
        equipment.head = getRandomHeadPiece("Mythic", armorClassString);
        equipment.main = getRandomMainPiece("Mythic", armorClassString);
        equipment.arms = getRandomArmsPiece("Mythic", armorClassString);
        equipment.feet = getRandomFootPiece("Mythic", armorClassString);
        equipment.weapon = getRandomWeapon("Mythic", weaponClassString);
        if (weaponClassString === "OneHanded")
            equipment.shield = getRandomShield("Mythic");
    }

    character.equipment.weapon = equipment.weapon;
    character.equipment.head = equipment.head;
    character.equipment.main = equipment.main;
    character.equipment.arms = equipment.arms;
    character.equipment.feet = equipment.feet;
    character.equipment.shield = equipment.shield;


}

const nameCharacter = (character, characterClass) => {
    let nameString = "";

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

    const {normal, fancy} = getRandomElement();
    if (nameString.includes("[normal]")) {
        nameString.replace("[normal]", normal);
    }
    if (nameString.includes("[fancy]")) {
        nameString.replace("[fancy]", fancy);
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