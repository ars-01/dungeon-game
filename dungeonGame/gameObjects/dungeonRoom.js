import {roomArray} from "../helpers/dictionaries.js";
import {Shop} from "./shop.js"

export class Room {
    layout;
    posX;
    posY;
    discovered = false;
    explored = false;
    type = 0;
    enemy;
    loot = [];
    shop;
    isshop = false;

    clone() {
        const copy = new Room();
        copy.layout = this.layout;
        copy.posX = this.posX;
        copy.posY = this.posY;
        copy.discovered = this.discovered;
        copy.explored = this.explored;
        copy.type = this.type;
        if (this.enemy)
            copy.enemy = this.enemy.clone();
        this.loot.forEach(item => {copy.loot.push(item.clone());});
        if (this.shop)
            copy.shop = this.shop.clone();
        copy.isshop = this.isshop;
        return copy;
    }

    setLayout(layout) {
        this.layout = layout;
    }

    getLayout() {
        return this.layout;
    }

    setPos(pos) {
        this.posX = pos.x;
        this.posY = pos.y;
    }

    getPos() {
        return {x:this.posX, y:this.posY};
    }

    getEnemy() {
        return this.enemy ? this.enemy : {name: "dummy", health: 1};
    }

    setEnemy(enemy) {
        this.enemy = enemy.clone();
    }

    discover() {
        this.discovered = true;
        if (this.type === 0)
            this.explored = true;
    }

    isDiscovered() {
        return this.discovered;
    }

    setType(type) {
        this.type = type;
    }

    getType() {
        return this.type;
    }

    explore() {
        this.explored = true;
    }

    isExplored() {
        return this.explored;
    }

    addLoot(item) {
        if (this.type > 1)
            return false;
        this.loot.push(item);
        this.setType(1);
        this.setLayout(roomArray[this.type]);
        return true;
    }

    getLoot() {
        return this.loot.length <= 0 ? { name:"dummy" } : this.loot.shift();
    }

    addShop(shop) {
        this.shop = shop;
        this.isshop = true;
    }

    getShop() {
        if (this.isshop)
            return this.shop;
        return {name:"dummy"};
    }

    isShop() {
        return this.isshop;
    }
}

export const getNewRoom = (pos, dungeonLevel) => {
    let newRoom = new Room();
    let index;
    const rand = Math.floor(Math.random() * 100);
    if (rand < 60) index = 0;
    else if (rand < 75) index = 1;
    else if (rand < 95) index = 2;
    else index = 3;
    newRoom.setLayout(roomArray[index]);
    newRoom.setType(index);
    newRoom.setPos(pos);
    if (index === 3)
        newRoom.addShop(new Shop(dungeonLevel));
    return newRoom;
}