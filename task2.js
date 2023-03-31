// Task 2. Context

// Task 2.1

console.log("Task 2.1");

x = 1;
const context = { x: 2 };

function testThis(y) {
  console.log(`x=${this.x}, y=${y}`);
}

function bind(func, context) {
  return func.bind(context);
}

const boundFunction = bind(testThis, context);

testThis(100);
boundFunction(100);

// Task 2.2

console.log("Task 2.2");

function Robot(name) {
  this.name = name;
}

function add(op1, op2) {
  this.name = this.name || "Human";

  return this.name + " can count to " + (op1 + op2);
}

const voltron = new Robot("Voltron");
console.log(add.bind(voltron, 0, 1)());
console.log(add.call(voltron, 1, 2));
console.log(add.apply(voltron, [20, 30]));
