function makeDroids() {
  const droids = [];

  for (let i = 0; i < 10; i++) {
    const droid = () => {
      console.log("D" + i);
    };

    droids.push(droid);
  }

  return droids;
}

for (let d of makeDroids()) {
  d();
}
