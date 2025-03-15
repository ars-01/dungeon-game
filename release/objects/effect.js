import {spells} from "../resources/tables.js";

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
        if (this.timeToLive > 9999900) {
            this.timeToLive = 10000000;
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
            case "FortifyDestruction":
                character.destructionSkillBonus += this.magnitude * this.subtype;
                character.destructionSkillBonus = character.destructionSkillBonus >= 1 ? 1 : character.destructionSkillBonus;
                break;
            case "FortifyRestoration":
                character.restorationSkillBonus += this.magnitude * this.subtype;
                character.restorationSkillBonus = character.restorationSkillBonus >= 1 ? 1 : character.restorationSkillBonus;
                break;
            case "FortifyAlteration":
                character.alterationSkillBonus += this.magnitude * this.subtype;
                character.alterationSkillBonus = character.alterationSkillBonus >= 1 ? 1 : character.alterationSkillBonus;
                break;
            case "LearnSpell":
                switch (this.magnitude) {
                    case 100:
                        character.learnSpell(spells.flames.clone());
                        break;
                    case 101:
                        character.learnSpell(spells.frostbite.clone());
                        break;
                    case 102:
                        character.learnSpell(spells.sparks.clone());
                        break;
                    case 110:
                        character.learnSpell(spells.fireBolt.clone());
                        break;
                    case 111:
                        character.learnSpell(spells.iceSpike.clone());
                        break;
                    case 112:
                        character.learnSpell(spells.lightningBolt.clone());
                        break;
                    case 120:
                        character.learnSpell(spells.fireball.clone());
                        break;
                    case 121:
                        character.learnSpell(spells.iceStorm.clone());
                        break;
                    case 122:
                        character.learnSpell(spells.chainLightning.clone());
                        break;
                    case 130:
                        character.learnSpell(spells.incinerate.clone());
                        break;
                    case 131:
                        character.learnSpell(spells.icySpear.clone());
                        break;
                    case 132:
                        character.learnSpell(spells.thunderbolt.clone());
                        break;
                    case 140:
                        character.learnSpell(spells.fireStorm.clone());
                        break;
                    case 141:
                        character.learnSpell(spells.blizzard.clone())
                        break;
                    case 142:
                        character.learnSpell(spells.lightningStorm.clone());
                        break;
                    case 200:
                        character.learnSpell(spells.healing.clone());
                        break;
                    case 201:
                        character.learnSpell(spells.shortRest.clone());
                        break;
                    case 202:
                        character.learnSpell(spells.lesserWard.clone());
                        break;
                    case 210:
                        character.learnSpell(spells.fastHealing.clone());
                        break;
                    case 211:
                        character.learnSpell(spells.quickRecovery.clone());
                        break;
                    case 212:
                        character.learnSpell(spells.steadfastWard.clone());
                        break;
                    case 220:
                        character.learnSpell(spells.closeWounds.clone());
                        break;
                    case 221:
                        character.learnSpell(spells.relaxation.clone());
                        break;
                    case 222:
                        character.learnSpell(spells.greaterWard.clone());
                        break;
                    case 230:
                        character.learnSpell(spells.grandHealing.clone());
                        break;
                    case 231:
                        character.learnSpell(spells.wakingSleep.clone());
                        break;
                    case 300:
                        character.learnSpell(spells.oakFlesh.clone());
                        break;
                    case 310:
                        character.learnSpell(spells.stoneFlesh.clone());
                        break;
                    case 311:
                        character.learnSpell(spells.equilibrium.clone());
                        break;
                    case 320:
                        character.learnSpell(spells.ironFlesh.clone());
                        break;
                    case 321:
                        character.learnSpell(spells.paralyze.clone());
                        break;
                    case 330:
                        character.learnSpell(spells.ebonyFlesh.clone());
                        break;
                    case 331:
                        character.learnSpell(spells.dragonHide.clone());
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;

        }
        this.timeToLive--;
    }

    toString() {
        return `${this.name}: ${this.subtype * this.magnitude} to ${this.type} ${this.timeToLive < 10000 ? ", " + this.timeToLive + "rounds remaining" : ""}`;
    }
}