export class Effect {
    name;
    //Health, Stamina, Mana, Armor, Damage, MagicResistance, MeleeResistance
    type;
    //1 for bonus, -1 for damage
    subtype;
    timeToLive;
    magnitude;

    constructor(name, type, subtype, duration, magnitude) {
        this.name = name;
        this.type = type;
        this.subtype = subtype;
        this.timeToLive = duration;
        this.magnitude = magnitude;
    }

    clone() {
        return new Effect(this.name, this.type, this.subtype, this.timeToLive, this.magnitude);
    }

    trigger(character) {
        if (this.timeToLive <= 0) {
            character.tidyEffects();
            this.subtype = 0;
        }
        switch (this.type) {
            case "Health":
                character.healthBonus += this.magnitude * this.subtype;
                break;
            case "Stamina":
                character.staminaBonus += this.magnitude * this.subtype;
                break;
            case "Mana":
                character.manaBonus += this.magnitude * this.magnitude;
                break;
            case "DamageBuff":
                character.damageBonus += this.magnitude * this.subtype;
                break;
            case "Armor":
                character.armorBonus += this.magnitude * this.subtype;
                break;
            case "MagicResistance":
                character.magicResistance += this.magnitude * this.subtype;
                character.magicResistance = character.magicResistance >= 1 ? 1 : character.magicResistance;
                break;
            case "MeleeResistance":
                character.meleeResistance += this.magnitude * this.subtype;
                character.meleeResistance = character.meleeResistance >= 1 ? 1 : character.meleeResistance;
                break;
            case "Paralysis":
                if (this.subtype !== 0)
                    character.isParalyzed = true;
                else
                    character.isParalysed = false;
                break;
            case "DamageHealth":
                character.health = character.health - this.magnitude * this.subtype <= 0 ? 0 : character.health - this.magnitude * this.subtype;
                break;
            case "DamageStamina":
                character.stamina = character.stamina - this.magnitude * this.subtype <= 0? 0 : character.stamina - this.magnitude * this.subtype;
                break;
            case "DamageMana":
                character.mana = character.mana - this.magnitude * this.subtype <= 0 ? 0 : character.mana - this.magnitude * this.subtype;
                break;
            default:
                break;

        }
        this.timeToLive--;
    }

    toString() {
        return `${this.name}: ${this.subtype * this.magnitude} to ${this.type} for ${this.timeToLive} rounds`;
    }
}