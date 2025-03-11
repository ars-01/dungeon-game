export const checkSkill = (skillLevel, skillXP, skillXPClass) => {
    switch (skillXPClass) {
        case 0:
            if (skillXP >= skillLevel * 50)
                return true;
            break;
        case 1:
            if (skillXP >= skillLevel * 25)
                return true;
            break;
        case 2:
            if (skillXP >= skillLevel * 10)
                return true;
            break;
        default:
            break;
    }
    return false;
}