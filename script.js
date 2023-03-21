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

Array.prototype.notesView = function () {
  return this.map((note) => {
    return { id: note.id, title: note.title };
  });
};

console.log(notes.notesView());

// Task 1.2
console.log("Task 1.2");

Array.prototype.filterByProperty = function (property, value) {
  return this.filter((note) => note[property] === value);
};

console.log(notes.filterByProperty("isMarked", true));

// Task 1.3
console.log("Task 1.3");

Array.prototype.pagesCount = function () {
  return this.reduce((sum, note) => sum + note.pagesCount, 0);
};

console.log(`Total number of pages ${notes.pagesCount()}`);

// Task 1.4
console.log("Task 1.4");

const testArray = [1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 5];

Array.prototype.getUniqueValues = function () {
  return this.sort().filter((item) => {
    return this.indexOf(item) === this.lastIndexOf(item);
  });
};

console.log(testArray.getUniqueValues());

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

Array.prototype.convertArrayToObject = function () {
  return this.reduce((acc, video) => {
    acc[video.id] = video.title;
    return acc;
  }, {});
};

console.log(videos.convertArrayToObject());
