export class Spell {
    name;
    school;
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
        return new Spell(this.name, this.school, this.subtype, this.value, this.manaCost, this.effect.clone());
    }
}