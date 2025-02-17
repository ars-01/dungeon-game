export class Item {
    name = "";
    type = "";
    durability = 0;
    value = 0;
    weight = 0;
    rarity = "";
    sellValue = 0;

    constructor(name, type, durability, value, weight, rarity, sellValue) {
        this.name = name;
        this.type = type;
        this.durability = durability;
        this.value = value;
        this.weight = weight;
        this.rarity = rarity;
        this.sellValue = sellValue;
    }

    clone() {
        return new Item(this.name, this.type, this.durability, this.value, this.weight, this.rarity, this.sellValue);
    }
}