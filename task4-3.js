const LIMIT_RUNTIME = 2000;
const DELAY_TIME = Math.random() * 4000;

function logAfterDelay(ms) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    setTimeout(() => {
      const runtime = Date.now() - startTime;
      if (runtime < LIMIT_RUNTIME) {
        console.log(`Runtime: ${runtime}ms`);
        resolve();
      } else {
        console.error(`Runtime: ${runtime}ms`);
        reject(new Error("Runtime exception"));
      }
    }, ms);
  });
}

logAfterDelay(DELAY_TIME)
  .then(() => {
    console.log("Promise resolved successfully");
  })
  .catch((error) => {
    console.error("Promise rejected: ", error);
  });
