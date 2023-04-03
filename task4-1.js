// Task 4 Async & Scopes

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

function logHi() {
  console.log("Hi");
}

delay(2000).then(logHi);
