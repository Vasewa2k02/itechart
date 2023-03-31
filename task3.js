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

function fillTable(tableClassName) {
  const table = document.getElementsByClassName(tableClassName)[0];

  table.innerHTML = `<tr><th>ID</th><th>Title</th><th>Status</th></tr>`;
  table.innerHTML += downloads
    .map(({ id, title, status }) => {
      return `<tr><td>${id}</td><td>${title}</td><td>${status}</td></tr>`;
    })
    .join("");

  return table;
}

const table = fillTable("downloads");

function checkStatus() {
  console.log("Check started");

  for (let i = 1; i < table.rows.length; i++) {
    if (table.rows[i].cells[2].textContent === "Pending") {
      table.rows[i].cells[2].textContent = "Done";
      return;
    }
  }

  clearInterval(intervalId);
}

let intervalId;

document
  .getElementsByClassName("check-status")[0]
  .addEventListener("click", () => {
    setTimeout(() => {
      checkStatus();
      intervalId = setInterval(checkStatus, 5000);
    }, 3000);
  });

// Task 3.2

const leftField = document.getElementsByClassName("leftField")[0];
const rightField = document.getElementsByClassName("rightField")[0];
let timeoutId;

leftField.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    rightField.value = leftField.value;
  }, 1000);
});

rightField.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    leftField.value = rightField.value;
  }, 1000);
});
