import * as fs from 'fs';
import chalk from "chalk";
import {Player} from "../gameObjects/player.js";
import {Item} from "../gameObjects/item.js";
import {Dungeon} from "../gameObjects/dungeon.js";
import {Room} from "../gameObjects/dungeonRoom.js";
import {Enemy} from "../gameObjects/enemy.js";
import {Shop} from "../gameObjects/shop.js";

export const saveData = async (player, dungeon) => {
    const playerJSON = JSON.stringify(player.clone());
    const dungeonJSON = JSON.stringify(dungeon.clone());

    fs.writeFile(`./resources/player-${player.name}.json`, playerJSON, function (err) {
        if (err) {
            console.error(err);
        } else {

        }
    });

    fs.writeFile(`./resources/dungeon-${player.name}.json`, dungeonJSON, function (err) {
        if (err) {
            console.error(err);
        } else {

        }
    });

    console.log(chalk.blueBright(`Saved "${player.name}" data`));
}

export const loadData = async (playerName) => {
    try {
        const _player = await JSON.parse(fs.readFileSync(`./resources/player-${playerName}.json`, 'utf8'));
        const _dungeon = await JSON.parse(fs.readFileSync(`./resources/dungeon-${playerName}.json`, 'utf8'));

        const newPlayer = playerFromJSON(_player);
        const newDungeon = dungeonFromJSON(_dungeon);

        return {newPlayer, newDungeon};
    } catch (err) {
        console.error('Error reading or parsing file:', err);
    }
}

const playerFromJSON = (player) => {
    const copy = new Player(player.name, 0, player.maxHealth);
    copy.name = player.name;
    copy.pos.x = player.pos.x;
    copy.pos.y = player.pos.y;
    player.inventory.forEach(item => {copy.inventory.push(itemFromJSON(item));});
    copy.armor.head = itemFromJSON(player.armor.head);
    copy.armor.main = itemFromJSON(player.armor.main);
    copy.armor.arms = itemFromJSON(player.armor.arms);
    copy.armor.feet = itemFromJSON(player.armor.feet);
    copy.weapon = itemFromJSON(player.weapon);
    copy.blocking = player.blocking;
    copy.gold = player.gold;
    copy.maxHealth = player.maxHealth;
    copy.maxEncumbrance = player.maxEncumbrance;
    copy.damageMultiplier = player.damageMultiplier;
    copy.health = player.health;
    copy.fighting = player.fighting;
    copy.inInventory = player.inInventory;
    copy.inShop = player.inShop;
    copy.combatCycleCounter = player.combatCycleCounter;
    copy.inventoryCycleCounter = player.inventoryCycleCounter;
    copy.shopCycleCounter = player.shopCycleCounter;
    return copy;
}

const dungeonFromJSON = (dungeon) => {
    const copy = new Dungeon(dungeon.level, dungeon.dungeonSize);
    dungeon.layout.forEach((room) => {copy.layout.push(roomFromJSON(room));});
    return copy;
}

const itemFromJSON = (item) => {
    return new Item(item.name, item.type, item.durability, item.value, item.weight, item.rarity, item.sellValue);
}

const roomFromJSON = (room) => {
    const copy = new Room();
    copy.layout = room.layout;
    copy.posX = room.posX;
    copy.posY = room.posY;
    copy.discovered = room.discovered;
    copy.explored = room.explored;
    copy.type = room.type;
    if (room.enemy)
        copy.enemy = enemyFromJSON(room.enemy);
    room.loot.forEach(item => {copy.loot.push(itemFromJSON(item));});
    if (room.shop)
        copy.shop = shopFromJSON(room.shop);
    copy.isshop = room.isshop;
    return copy;
}

const enemyFromJSON = (enemy) => {
    const copy = new Enemy(enemy.name, enemy.type, enemy.damage, enemy.rarity, enemy.health, enemy.level);
    copy.blocking = enemy.blocking;
    copy.staggered = enemy.staggered;
    copy.armor.head = itemFromJSON(enemy.armor.head);
    copy.armor.main = itemFromJSON(enemy.armor.main);
    copy.armor.arms = itemFromJSON(enemy.armor.arms);
    copy.armor.feet = itemFromJSON(enemy.armor.feet);
    copy.weapon = itemFromJSON(enemy.weapon);
    return copy;
}

const shopFromJSON = (shop) => {
    const copy = new Shop(-1);
    copy.name = shop.name;
    shop.stock.forEach(item => {copy.stock.push(itemFromJSON(item));});
    copy.gold = shop.gold;
    return copy;
}