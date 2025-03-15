export const checkCombat = (player, dungeon) => {
    if (player.isRunningAway)
        return;
    const playerPos = {x: player.pos.x, y: player.pos.y};
    let fightingFlag = false;
    player.isFighting = false;
    for (const enemy of dungeon.enemies) {
        if (enemy.pos.x !== playerPos.x || enemy.pos.y !== playerPos.y || enemy.deleted)
            enemy.isFighting = false;
        else {
            enemy.isFighting = true;
            player.isFighting = true;
            fightingFlag = true;
            break;
        }
    }
    for (const enemy of dungeon.enemies) {
        if (!enemy.isFighting && fightingFlag)
            enemy.canAct = false;
        else
            enemy.canAct = true;
    }
}

export const autoDefend = (character, rawDamage, damageType) => {
    if (Math.random() < 0.5) {
        let choice = "";
        switch (character.getClass()) {
            case "Warrior":
                if (character.equipment.shield)
                    choice = "block";
                break;
            case "Mage":
                let hasWard = false;
                for (const spell of character.spells.restoration)
                    if (spell.name.includes("Ward"))
                        hasWard = true;
                if (hasWard)
                    choice = "ward";
                break;
            case "Thief":
                if (character.equipment.shield)
                    choice = "block";
                break;
            default:
                break;
        }
        if (choice.length > 0)
            switch (choice) {
                case "block":
                    character.block();
                    break;
                case "ward":
                    const temp = [];
                    for (let i = 0; i < character.spells.restoration.length; i++)
                        if (character.spells.restoration[i].name.includes("Ward")) {
                            console.log(character.spells.restoration[i].name, i);
                            temp.push(i);
                        }
                    if (temp.length > 0)
                        character.castSpell(temp[temp.length - 1], 2);
                    break;
                default:
                    break;
            }
    }

    character.takeDamage(rawDamage, damageType);
}