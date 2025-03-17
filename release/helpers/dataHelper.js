import * as fs from 'fs';
import {Node} from "../objects/node.js";
import {Dungeon} from "../objects/dungeon.js";
import {Character} from "../objects/character.js";
import {Effect} from "../objects/effect.js";
import {Item} from "../objects/item.js";
import {Spell} from "../objects/spell.js";
import {Tile} from "../objects/tile.js";

//save data

export const saveGraph = async (root) => {
    const graphJSON = JSON.stringify(root.getSubGraphArray());
    await fs.writeFile(`./resources/graph.json`, graphJSON, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

export const saveDungeon = async (dungeon, saveName) => {
    const dungeonJSON = JSON.stringify(dungeon.getSimplifiedDungeon(), null, 4);
    await fs.writeFile(`./resources/${saveName.replaceAll(" ", "_")}_dungeon.json`, dungeonJSON, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

export const savePlayer = async (player, saveName) => {
    const playerJSON = JSON.stringify(player.clone(), null, 4);
    await fs.writeFile(`./resources/${saveName.replaceAll(" ", "_")}_player.json`, playerJSON, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

export const addNewSave = async (player, dungeon, saveName = player.name) => {
    const saveList = await JSON.parse(fs.readFileSync(`./resources/save_list.json`, 'utf8'));
    for (let i = 0; i < saveList.length; i++) {
        if (saveList[i] === saveName) {
            saveList.splice(i, 1);
            i--;
        }
    }
    saveList.unshift(saveName);
    const _saveList = JSON.stringify(saveList);
    await fs.writeFile(`./resources/save_list.json`, _saveList, function (err) {
        if (err) {
            console.error(err);
        }
    });
    await savePlayer(player, saveName);
    await saveDungeon(dungeon, saveName);
}

export const wipeSaveData = async () => {
    const saveList = JSON.stringify([]);
    await fs.writeFile(`./resources/save_list.json`, saveList, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

//load data

export const loadGraph = async () => {
    const _root = await JSON.parse(fs.readFileSync(`./resources/graph.json`, 'utf8'));
    return await graphFromJSON(_root);
}

export const loadDungeon = async (saveName) => {
    const _dungeon = await JSON.parse(fs.readFileSync(`./resources/${saveName.replaceAll(" ", "_")}_dungeon.json`, 'utf8'));
    return dungeonFromJSON(_dungeon);
}

export const loadTutorialDungeon = async () => {
    const _dungeon = await JSON.parse(fs.readFileSync(`./resources/tutorial_dungeon.json`, 'utf8'));
    return dungeonFromJSON(_dungeon);
}

export const loadPlayer = async (saveName) => {
    const _player = await JSON.parse(fs.readFileSync(`./resources/${saveName.replaceAll(" ", "_")}_player.json`, 'utf8'));
    return characterFromJSON(_player);
}

export const loadSaveList = async () => {
    return await JSON.parse(fs.readFileSync(`./resources/save_list.json`, 'utf8'));
}

export const loadSave = async (saveName) => {
    return { player: await loadPlayer(saveName), dungeon: await loadDungeon(saveName) };
}

//get objects from JSON

const graphFromJSON = (data) => {
    const nodeArray = [];
    for (const shallowNode of data) {
        nodeArray.push(new Node(shallowNode.id, shallowNode.x, shallowNode.y));
    }

    for (const shallowNode of data) {
        let parent = nodeArray.find(parentNode => parentNode.id === shallowNode.parent);
        const child = nodeArray.find(node => node.id === shallowNode.id);
        if (parent)
            parent.addChild(child);
        if (child)
            child.setParent(parent ? parent : null);
    }

    return nodeArray.find(node => node.id === 0);
}

const dungeonFromJSON = (data) => {
    const root = graphFromJSON(data.root);
    const dungeon = new Dungeon(root, data.level);
    dungeon.root = root;
    dungeon.playerPos = data.playerPos;
    dungeon.enemies = [];
    for (const enemy of data.enemies) {
        if (enemy)
            dungeon.enemies.push(characterFromJSON(enemy));
    }
    dungeon.tiles = [];
    for (const tile of data.tiles) {
        dungeon.tiles.push(tileFromJSON(tile));
    }
    return dungeon;
}

const characterFromJSON = (data) => {
    const character = new Character(data.name, data.pos, data.maxHealth, data.maxStamina, data.maxMana, data.isPlayer, data.characterLevel, data.canTrade);
    character.isPlayer = data.isPlayer;
    character.deleted = data.deleted;
    character.health = data.health;
    character.healthBonus = data.healthBonus;
    character.stamina = data.stamina;
    character.staminaBonus = data.staminaBonus;
    character.mana = data.mana;
    character.manaBonus = data.manaBonus;
    character.gold = data.gold;

    for (const weapon of data.inventory.weapons)
        character.inventory.weapons.push(itemFromJSON(weapon));
    for (const apparel of data.inventory.apparel)
        character.inventory.apparel.push(itemFromJSON(apparel));
    for (const potion of data.inventory.potions)
        character.inventory.potions.push(itemFromJSON(potion));
    for (const misc of data.inventory.misc)
        character.inventory.misc.push(itemFromJSON(misc));

    character.equipment.weapon = data.equipment.weapon ? itemFromJSON(data.equipment.weapon) : null;
    character.equipment.shield = data.equipment.shield ? itemFromJSON(data.equipment.shield) : null;
    character.equipment.head = data.equipment.head ? itemFromJSON(data.equipment.head) : null;
    character.equipment.main = data.equipment.main ? itemFromJSON(data.equipment.main) : null;
    character.equipment.arms = data.equipment.arms ? itemFromJSON(data.equipment.arms) : null;
    character.equipment.feet = data.equipment.feet ? itemFromJSON(data.equipment.feet) : null;

    for (const destructionSpell of data.spells.destruction)
        character.spells.destruction.push(spellFromJSON(destructionSpell));
    for (const restorationSpell of data.spells.restoration)
        character.spells.restoration.push(spellFromJSON(restorationSpell));
    for (const alterationSpell of data.spells.alteration)
        character.spells.alteration.push(spellFromJSON(alterationSpell));

    for (const effect of data.effects)
        character.effects.push(effectFromJSON(effect));

    character.isParalyzed = data.isParalyzed;

    character.canAct = data.canAct;
    character.hasActed = data.hasActed;
    character.isRunningAway = data.isRunningAway;
    character.isOverencumbered = data.isOverencumbered;
    character.isTrading = data.isTrading;
    character.isInInventory = data.isInInventory;
    character.currentInventoryPage = data.currentInventoryPage;
    character.isInSpellbook = data.isInSpellbook;
    character.currentSpellBookPage = data.currentSpellBookPage;
    character.isFighting = data.isFighting;
    character.isBlocking = data.isBlocking;
    character.armorBonus = data.armorBonus;
    character.attackBonus = data.attackBonus;
    character.magicResistance = data.magicResistance;
    character.meleeResistance = data.meleeResistance;
    character.canTrade = data.canTrade;
    
    character.characterLevel = data.characterLevel;
    character.characterLevelXP = data.characterLevelXP;

    character.destructionSkill = data.destructionSkill;
    character.destructionSkillXP = data.destructionSkillXP;
    character.destructionSkillBonus = data.destructionSkillBonus;
    character.restorationSkill = data.restorationSkill;
    character.restorationSkillXP = data.restorationSkillXP;
    character.restorationSkillBonus = data.restorationSkillBonus;
    character.alterationSkill = data.alterationSkill;
    character.restorationSkillXP = data.restorationSkillXP;
    character.alterationSkillBonus = data.alterationSkillBonus;
    character.heavyArmorSkill = data.heavyArmorSkill;
    character.heavyArmorSkillXP = data.heavyArmorSkillXP;
    character.blockSkill = data.blockSkill;
    character.blockSkillXP = data.blockSkillXP;
    character.twoHandedSkill = data.twoHandedSkill;
    character.twoHandedSkillXP = data.twoHandedSkillXP;
    character.oneHandedSkill = data.oneHandedSkill;
    character.oneHandedSkillXP = data.oneHandedSkillXP;
    character.lightArmorSkill = data.lightArmorSkill;
    character.lightArmorSkillXP = data.lightArmorSkillXP;
    character.speechSkill = data.speechSkill;
    character.speechSkillXP = data.speechSkillXP;

    return character;
}

const tileFromJSON = (data) => {
    const tile = new Tile(data.pos);
    for (const item of data.items) {
        tile.items.push(itemFromJSON(item));
    }
    tile.gold = data.gold;
    tile.isVisible = data.isVisible;
    tile.uncovered = data.uncovered;
    tile.hasEnemy = data.hasEnemy;
    return tile;
}

const effectFromJSON = (data) => {
    if (data)
        return new Effect(data.name, data.type, data.subtype, data.timeToLive, data.magnitude);
    else
        return null;
}

const itemFromJSON = (data) => {
    const item = new Item(data.name, data.type, data.subtypes, data.durability, data.value, data.weight, data.rarity, data.sellValue, effectFromJSON(data.effect));
    item.subtypes = data.subtypes;
    return item;
}

const spellFromJSON = (data) => {
    return new Spell(data.name, data.school, data.subtype, data.value, data.manaCost, effectFromJSON(data.effect));
}

