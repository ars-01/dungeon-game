export const checkCombat = (player, dungeon) => {
    if (player.isFighting || player.isRunningAway)
        return;
    const playerPos = {x: player.pos.x, y: player.pos.y};
    let fightingFlag = false;
    for (const enemy of dungeon.enemies) {
        if (enemy.pos.x !== playerPos.x || enemy.pos.y !== playerPos.y)
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
    if (Math.random() < 0.5)
        return;
    let choice = "";
    switch (damageType) {
        case "Melee":
            if (character.equipment.shield)
                choice = "block";
            break;
        case "Magic":
            let hasWard = false;
            for (const spell of character.spells.restoration)
                if (spell.name.includes("Ward"))
                    hasWard = true;
            if (hasWard)
                choice = "ward";
            break;
    }
    if (choice.length <= 0)
        return;
    switch (choice) {
        case "block":
            character.block();
            break;
        case "ward":
            const temp = [];
            for (const spell of character.spells.restoration)
                if (spell.name.includes("Ward"))
                    temp.push(spell.clone());
            if (temp.length > 0)
                character.castSpell(); //TODO add spell
            break;
        default:
            break;
    }
}