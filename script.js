// Task 1. Polyfills

// Task 1.1
console.log("Task 1.1");

const notes = [
  {
    id: 1,
    title: "Recipe",
    description: "Ingredients include 2 eggs...",
    pagesCount: 2,
    isMarked: false,
    access: [],
  },
  {
    id: 2,
    title: "Workouts",
    description: "3 sets of squats...",
    pagesCount: 1,
    isMarked: true,
    access: [],
  },
  {
    id: 3,
    title: "Passwords",
    description: "VISA ...",
    pagesCount: 6,
    isMarked: true,
    access: [],
  },
  {
    id: 4,
    title: "To Do 2021",
    description: "1. Learn JS...",
    pagesCount: 3,
    isMarked: false,
    access: [],
  },
];

Array.prototype.map = function (callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i], i, this));
  }

  return newArray;
};

const notesView = notes.map(({ id, title }) => ({ id, title }));
console.log(notesView);

// Task 1.2
console.log("Task 1.2");

Array.prototype.filter = function (callback) {
  const newArray = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      newArray.push(this[i]);
    }
  }

  return newArray;
};

const markedNotes = notes.filter(({ isMarked }) => isMarked);
console.log(markedNotes);

// Task 1.3
console.log("Task 1.3");

Array.prototype.reduce = function (callback, initialValue) {
  const startIndex = initialValue === undefined ? 1 : 0;
  let accumulator = initialValue === undefined ? array[0] : initialValue;

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

const pagesCount = notes.reduce((sum, note) => sum + note.pagesCount, 0);
console.log(`Total number of pages ${pagesCount}`);

// Task 1.4
console.log("Task 1.4");

const testArray = [1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 5];

const uniqueValues = testArray.reduce((acc, item, index) => {
  for (let i = 0; i < testArray.length; i++) {
    if (testArray[i] === item && index !== i) {
      return acc;
    }
  }

  return [...acc, item];
}, []);

console.log(uniqueValues);

// Task 1.5
console.log("Task 1.5");

const videos = [
  {
    id: 65432445,
    title: "The Chamber",
  },
  {
    id: 675465,
    title: "Fracture",
  },
  {
    id: 70111470,
    title: "Die Hard",
  },
  {
    id: 654356453,
    title: "Bad Boys",
  },
];

const videoObject = videos.reduce(
  (acc, { id, title }) => ({ ...acc, [id]: title }),
  {}
);

console.log(videoObject);

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
