export class Item {

    name;

    value;
    durability;
    effect;

    getType() {

    }

    getSubTypes() {

    }

    clone() {

    }

    decreaseDurability() {
        this.durability--;
    }
}