
class Greeter {
    public greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() : string {
        return `Welcome , ${this.greeting}`;
    }
}

export default Greeter;