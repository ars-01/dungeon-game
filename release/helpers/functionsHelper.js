import promptSync from "prompt-sync";

const prompt = promptSync();
const nameRegex = /^[A-Za-z ]+$/;

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

export const getId = (min, max) => {
    let id = -100;
    while (id < min || isNaN(id) || id > max) {
        id = parseInt(prompt(`Enter an integer between ${min} and ${max}: `));
        if (id === min - 1)
            return -100;
    }
    return id - 1;
}

export const enterString = (promptString) => {
    let output = "";
    while (!nameRegex.test(output)) {
        output = prompt(promptString);
    }
    return output;
}