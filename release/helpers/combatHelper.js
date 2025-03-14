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
    //console.log(player.isFighting);
}