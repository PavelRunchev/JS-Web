class Melon {
    weight: number;
    melonSort: string;
    elementIndex: number;

    constructor(weight: number, melonSort: string) {
        this.weight = weight;
        this.melonSort = melonSort;
        this.elementIndex = this.weight * Number(this.melonSort.length);
    }

    index() {
        return this.elementIndex;
    }

    toString() {
        return `Element: Watermelon\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
    }
}


class Watermelon extends Melon {
    element: string;
    constructor(weight, melonSort) {
        super(weight, melonSort);
        this.element = "Water";
    }
}

class Earthrmelon extends Melon {
    element: string;
    constructor(weight, melonSort) {
        super(weight, melonSort);
        this.element = "Earth";
    }
}

class Firemelon extends Melon {
    element: string;
    constructor(weight, melonSort) {
        super(weight, melonSort);
        this.element = "Fire";
    }
}

class Airmelon extends Melon {
    element: string;
    constructor(weight, melonSort) {
        super(weight, melonSort);
        this.element = "Air";
    }
}

let watermelon = new Watermelon(12.5, "Kingsize");
console.log(watermelon.toString());

let airmelon = new Airmelon(55, "Gragrz");
console.log(airmelon.toString());
console.log(airmelon.index());