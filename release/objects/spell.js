import chalk from "chalk";

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

    detailedInfo() {
        let outputString = `\n${chalk.bold.blueBright(this.name)}\n\n`;
        outputString += `School: ${this.school}\n`;
        outputString += `Subtype: ${this.subtype}\n`;
        switch (this.school) {
            case "Destruction":
                outputString += `Deals ${this.value} damage`;
                if (this.effect)
                    outputString += ` and applies Effect: ${chalk.blueBright(this.effect.toString())} to target\n`;
                else
                    outputString += ` to target\n`;
                break;
            case "Restoration":
                if (this.effect && this.subtype !== "Armor|MagicResistance")
                    outputString += `Applies Effect: ${chalk.blueBright(this.effect.toString())} to self\n`;
                else
                    outputString += `Restores ${this.value} ${this.subtype} to self\n`;
                break;
            case "Alteration":
                if (this.effect)
                    outputString += `Applies Effect: ${chalk.blueBright(this.effect.toString())}`;
                if (this.subtype === "Paralyze")
                    outputString += ` to target\n`;
                else
                    outputString += ` to self\n`;
                break;
            default:
                break;
        }
        outputString += `Mana Cost: ${this.manaCost}`;
        console.log(outputString);
    }

    getReducedManaValue(skillLevel, skillBonus) {
        return Math.ceil(this.manaCost * (1 - (1 / (skillLevel >= 100 ? 1 : (101 - skillLevel)))) * (1 - skillBonus))
    }
}