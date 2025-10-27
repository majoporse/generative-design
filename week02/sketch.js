let i = 0;
let ii = 0;

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB);
  stroke(255);
  strokeWeight(5);
}
const DEPTH_MOD = 2;
const MIN_DEPTH = 4;
const MAX_DEPTH = 5;
const MIN_DIAMETER = 50;
const color = 166;
const depthIncrement = 30;
const opacity = 1;
const thicc = 4;
const strokeOpacity = 1;

function recursiveCircle(x, y, diameter, depth = 1) {
  // strokeWeight(5 / depth);
  // stroke(0, 0, 0, 1 / depth);

  if (depth % DEPTH_MOD === 0 && depth >= MIN_DEPTH && depth <= MAX_DEPTH) {
    strokeWeight(thicc);
    stroke(0, 0, 100, strokeOpacity);
    // noStroke();
    fill((color + depth * depthIncrement) % 360, 0, 0, opacity);
    circle(x, y, diameter);
  }

  if (diameter >= MIN_DIAMETER) {
    recursiveCircle(x + diameter / 4, y, diameter / 2, depth + 1);
    recursiveCircle(x - diameter / 4, y, diameter / 2, depth + 1);
    recursiveCircle(x, y + diameter / 4, diameter / 2, depth + 1);
    recursiveCircle(x, y - diameter / 4, diameter / 2, depth + 1);
  }
}

function draw() {
  // i = (i + 1) % 360;
  // ii = (ii + 1) % 360;
  // background(220, 1);
  // fill(255, 100, 100, 0.3);
  // noStroke();

  // for (let x = 0; x < height; x += 50) {
  //   for (let y = 0; y < width; y += 50) {
  //     circle(x, y, 100 + i / 3);
  //     fill((ii) % 360, 100, 100, 0.3);
  //   }
  // }
  // noLoop();
  background(220, 1, 255);
  stroke(150, 255, 0, 0.5);
  noFill();
  strokeWeight(1);
  // noStroke();
  recursiveCircle(width / 2, height / 2, 2000);
  // recursiveCircle((3 * width) / 4, height / 4, 500);
  // recursiveCircle(width / 4, (3 * height) / 4, 500);
  // recursiveCircle((3 * width) / 4, (3 * height) / 4, 500);
  // recursiveCircle(width / 2, height / 2, 200);
  // recursiveCircle(width, height / 2, 200);
  // recursiveCircle(0, height / 2, 200);
  noLoop();

  noFill();

  // for (let r = 10; r < width; r += 100) {
  //   circle(width / 2, height / 2, r);
  // }
}

function keyPressed() {
  if (key === "s") {
    save("recursiveCircles.png");
  }
}
