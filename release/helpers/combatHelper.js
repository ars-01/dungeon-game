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
                    character.hasActed = false;
                    break;
                case "ward":
                    const temp = [];
                    for (let i = 0; i < character.spells.restoration.length; i++)
                        if (character.spells.restoration[i].name.includes("Ward")) {
                            console.log(character.spells.restoration[i].name, i);
                            temp.push(i);
                        }
                    if (temp.length > 0) {
                        character.castSpell(temp[temp.length - 1], 2);
                        character.hasActed = true;
                    }
                    break;
                default:
                    break;
            }
    }

    character.takeDamage(rawDamage, damageType);
}

export const warriorCombatAction = (character, player) => {
    if (character.health <= 0.1 * (character.maxHealth + character.healthBonus)) {
        const temp = [];
        for (let i = 0; i < character.inventory.potions.length; i++) {
            if (character.inventory.potions.length[i].name.includes("Health")) {
                temp.push(i);
            }
        }
        if (temp.length > 0) {
            character.usePotion(temp[0], 3);
            character.hasActed = true;
        }
    }
    if (character.hasActed)
        return;
    const rawDamage = character.getMeleeDamage();
    player.takeDamage(rawDamage, "Melee");
}

export const mageCombatAction = (character, player) => {
    let minDestructionSpellManaValue = 10000000;
    for (const spell of character.spells.destruction) {
        minDestructionSpellManaValue = Math.min(minDestructionSpellManaValue, spell.getReducedManaValue(character.destructionSkill, character.destructionSkillBonus));
    }

    if (character.mana < minDestructionSpellManaValue) {
        const temp = [];
        for (let i = 0; i < character.inventory.potions.length; i++) {
            if (character.inventory.potions.length[i].name.includes("Mana")) {
                temp.push(i);
            }
        }
        if (temp.length > 0) {
            character.usePotion(temp[0], 3);
            character.hasActed = true;
        }
    }
    if (character.hasActed)
        return;

    let destructionSpellIndex = -1;
    for (let i = 0; i < character.spells.destruction; i++) {
        if (character.spells.destruction[i].manaCost <= character.mana)
            destructionSpellIndex = Math.max(destructionSpellIndex, i);
    }

    let restorationSpellIndex = -1;
    for (let i = 0; i < character.spells.restoration; i++) {
        if (character.spells.restoration[i].manaCost <= character.mana && !character.spells.restoration[i].name.includes("Ward"))
            restorationSpellIndex = Math.max(restorationSpellIndex, i);
    }

    let alterationSpellIndex = -1;
    for (let i = 0; i < character.spells.alteration; i++) {
        if (character.spells.alteration[i].manaCost <= character.mana)
            alterationSpellIndex = Math.max(alterationSpellIndex, i);
    }

    let hasArmorEffect = false;
    for (const effect of character.effects)
        if (effect.name.includes("Armor"))
            hasArmorEffect = true;

    if (!hasArmorEffect && !character.hasActed) {
        character.castSpell(alterationSpellIndex, 3);
        character.hasActed = true;
    }

    if (character.health < 0.2 * (character.maxHealth + character.healthBonus) && !character.hasActed) {
        character.castSpell(restorationSpellIndex, 2);
        character.hasActed = true;
    }

    if (!character.hasActed) {
        character.hasActed = true;
        const {success, value, spell, target} = character.castSpell(destructionSpellIndex, 1);
        if (!success || !character.isFighting || target !== "target") {
            return;
        }
        player.takeDamage(value, "Magic");
        if (spell.effect)
            player.addEffect(spell.effect.clone());
    }
}

export const thiefCombatAction = (character, player) => {
    if (character.health <= 0.1 * (character.maxHealth + character.healthBonus)) {
        const temp = [];
        for (let i = 0; i < character.inventory.potions.length; i++) {
            if (character.inventory.potions.length[i].name.includes("Health")) {
                temp.push(i);
            }
        }
        if (temp.length > 0) {
            character.usePotion(temp[0], 3);
            character.hasActed = true;
        }
    }
    if (character.hasActed)
        return;
    const rawDamage = character.getMeleeDamage();
    player.takeDamage(rawDamage, "Melee");
}