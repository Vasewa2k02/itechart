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

const notesView = notes.map((note) => {
  return { id: note.id, title: note.title };
});
console.log(notesView);

// Task 1.2
console.log("Task 1.2");

const markedNotes = notes.filter((note) => note.isMarked);
console.log(markedNotes);

// Task 1.3
console.log("Task 1.3");

const pagesCount = notes.reduce((sum, note) => sum + note.pagesCount, 0);
console.log(`Total number of pages ${pagesCount}`);

// Task 1.4
console.log("Task 1.4");

const testArray = [1, 1, 1, 2, 2, 3, 4, 4, 5, 5, 5, 5];

const getUnique = (arr) => {
  return arr
    .sort()
    .filter((item) => arr.indexOf(item) === arr.lastIndexOf(item));
};
console.log(getUnique(testArray));

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

const videosMap = videos.reduce((acc, video) => {
  acc[video.id] = video.title;
  return acc;
}, {});

console.log(videosMap);
