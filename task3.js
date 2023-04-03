// Task 3. Timers and events

// Task 3.1

const downloads = [
  {
    id: 1,
    title: "Recipe",
    status: "Done",
  },
  {
    id: 2,
    title: "Workouts",
    status: "Pending",
  },
  {
    id: 3,
    title: "Passwords",
    status: "Pending",
  },
  {
    id: 4,
    title: "To Do 2021",
    status: "Pending",
  },
  {
    id: 5,
    title: "Books",
    status: "Failed",
  },
];

function fillTable(tableClassName, data) {
  document.querySelector(tableClassName).innerHTML =
    `<tr><th>ID</th><th>Title</th><th>Status</th></tr>` +
    data.reduce(
      (result, { id, title, status }) =>
        result + `<tr><td>${id}</td><td>${title}</td><td>${status}</td></tr>`,
      ""
    );
}

fillTable(".downloads", downloads);

function checkStatus() {
  console.log("Check started");

  for (let i = 0; i < downloads.length; i++) {
    if (downloads[i].status === "Pending") {
      downloads[i].status = "Done";
      fillTable(".downloads", downloads);
      return;
    }
  }

  clearInterval(intervalId);
}

const TIME_BEFORE_CHECK = 3000;
const TIME_BETWEEN_CHCKES = 5000;
let intervalId;

document.querySelector(".check-status").addEventListener("click", () => {
  setTimeout(() => {
    checkStatus();
    intervalId = setInterval(checkStatus, TIME_BETWEEN_CHCKES);
  }, TIME_BEFORE_CHECK);
});

// Task 3.2

const leftField = document.querySelector(".leftField");
const rightField = document.querySelector(".rightField");
const TIME_TO_SYNC = 1000;
let timeoutId;

leftField.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    rightField.value = leftField.value;
  }, TIME_TO_SYNC);
});

rightField.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    leftField.value = rightField.value;
  }, TIME_TO_SYNC);
});
