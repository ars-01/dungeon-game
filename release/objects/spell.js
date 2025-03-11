export class Spell {
    name;
    //Destruction, Restoration, Alteration
    school;
    //Fire, Ice, Shock, Health, Stamina, Armor, (...?)
    subtype;
    value;
    manaCost;
    effect;

    constructor(name, school, subtype, value, manaCost, effect) {
        this.name = name;
        this.school = school;
        this.subtype = subtype;
        this.value = value;
        this.manaCost = manaCost;
        this.effect = effect;
    }

    clone() {
        const copy =  new Spell(this.name, this.school, this.subtype, this.value, this.manaCost);
        copy.effect = this.effect ? this.effect : null;
        return copy;
    }
}