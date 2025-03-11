export class Item {

    name;
    //Weapon, Apparel, Potion, Misc
    type;
    subtypes;
    weight;
    value;
    durability;
    sellValue;
    effect;

    constructor(name, type, subtypes, weight, value, durability, sellValue, effect) {
        this.name = name;
        this.type = type;
        this.subtypes = subtypes;
        this.weight = weight;
        this.value = value;
        this.durability = durability;
        this.sellValue = sellValue;
        this.effect = effect;
    }

    getSubTypes() {
        return this.subtypes;
    }

    clone() {
        const copy = new Item(this.name, this.type, this.subtypes, this.weight, this.durability, this.sellValue);
        copy.subtypes = [];
        for (const subtype of this.subtypes) {
            copy.subtypes.push(subtype);
        }
        copy.effect = this.effect ? this.effect.clone() : null;
        return copy;
    }

    decreaseDurability() {
        this.durability--;
    }
}