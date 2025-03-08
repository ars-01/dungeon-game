
export const walls = {
    horizontalHallwayDown: ("####  ####" +
        "####  ####").split(""),
    horizontalHallwayUp: ("####  ####" +
        "####  ####").split(""),
    verticalHallwayLeft: ("##" +
        "##" +
        "  " +
        "  " +
        "##" +
        "##").split(""),
    verticalHallwayRight: ("##" +
        "##" +
        "  " +
        "  " +
        "##" +
        "##").split(""),
    horizontalWall: ("####################").split(""),
    verticalWall: ("##" +
        "##" +
        "##" +
        "##" +
        "##" +
        "##").split(""),
}

export const roomLayouts = {
    empty: ("      " +
        "      " +
        "      " +
        "      " +
        "      " +
        "      ").split(""),
    filled: ("######" +
        "######" +
        "######" +
        "######" +
        "######" +
        "######").split(""),
}

export const getColor = (string) => {
    switch (string) {
        case "Common":
            return "#ffffff";
        case "Uncommon":
            return "#00ffff";
        case "Rare":
            return "#ffff00";
        case "Mythic":
            return "#ff00ff";
        default:
            return "#ffffff";
    }
};

export const asBar = (value, maxValue) => {
    const percentage = Math.floor((value / maxValue)) * 50;
    let outputString = "[";
    for (let i = 0; i < 50; i++) {
        if (i <= percentage)
            outputString += "#";
        else
            outputString += " "
    }
    return outputString + "]";
}