// Task 4 Async & Scopes

const DELAY_TIME = 2000;

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

function logHi() {
  console.log("Hi");
}

delay(DELAY_TIME).then(logHi);
