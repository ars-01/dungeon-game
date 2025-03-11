export class Item {

    name;
    //Weapon, Apparel, Potion, Misc
    type;
    subtypes;
    value;
    durability;
    effect;

    getType() {
        return this.type;
    }

    getSubTypes() {
        return this.subtypes.split("|");
    }

    clone() {

    }

    decreaseDurability() {
        this.durability--;
    }
}