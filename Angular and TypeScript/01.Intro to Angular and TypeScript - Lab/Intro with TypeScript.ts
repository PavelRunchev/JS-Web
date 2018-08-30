import Animal from "./Inheritance";
import Greeter from "./Greeter";



let greeter : Greeter = new Greeter("TypeScript!");
console.log(greeter.greet());


class Dog extends Animal {
    bark() : void {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();


//Interfaces
function printLabel(labelledObj: { label: string, size: number }) {
    console.log(labelledObj.label);
    console.log(labelledObj.size);
}


let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);


//Generic function
function identity<T>(arg: T): T {
    return arg;
}

//type will be string
let output = identity<string>("myString");
//type will be number
let output1 = identity(5);

console.log(output);
console.log(output1);

enum Direction {
    Up = 1,
    Down = 2,
    Left = 4,
    Right = 10
}

let u = Direction.Left;
console.log('Enum -> Direction.Left = ' + u);
