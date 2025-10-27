let WIDTH = 1000;
let HEIGHT = 1000;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  colorMode(HSB);
  stroke(255);
  strokeWeight(5);
  frameRate(144);
}

function draw() {
  // background(0, 0, 0, 0.01);
  // translate(width / 2, height / 2);
  // rotate(degrees(millis() % 1000));
  // line(-width, 100, width / 4, 100);
  // stroke(sin(millis() / 10000) * 255, 255, 255);

  // let RECT_SIZE = 300;
  // let NUM_SQUARES = 2;
  // let GAP = WIDTH/(NUM_SQUARES * 2 + 1) / 2;

  // background(0, 0, 12, 0.04);
  // translate(width / 2, height / 2);
  // rotate(radians(-45));
  // // rotate(degrees(millis() / 100000));
  // point(0, 0);
  // for (let i = -NUM_SQUARES; i <= NUM_SQUARES; i += 1) {
  //   rect(-RECT_SIZE / 2 + i * GAP, -RECT_SIZE / 2 + i * GAP, RECT_SIZE, RECT_SIZE);
  // }
  // noFill();
  // stroke(sin(millis() / 10000) * 255, 255, 255);

  // -------------------------------------------------------------

  // background(0, 0, 12, 0.04);
  // // translate(width / 2, height / 2);

  // point(0, 0);
  // let GAP = 25;
  // let MIN_SIZE = 10;
  // rectMode(CENTER);

  // const recRect = (size, x, y) => {
  //   if (size <= MIN_SIZE) return;
  //   recRect(size/ 2 - GAP, x - size / 4, y - size / 4);
  //   recRect(size / 2 - GAP, x + size / 4, y + size / 4);
  //   recRect(size / 2 - GAP, x - size / 4, y + size / 4);
  //   recRect(size / 2 - GAP, x + size / 4, y - size / 4);
  //   rect(x, y, size);
  //   point(x, y);
  //   line(x, y, x, y + size / 4);
  //   line(x, y, x + size / 4, y);
  //   line(x, y, x, y - size / 4);
  //   line(x, y, x - size / 4, y);
  // };

  // rectMode(CENTER);
  // recRect(width - GAP, width / 2, height / 2);
  // noFill();
  // stroke(sin(millis() / 10000) * 255, 255, 255);
  // strokeWeight(3);

  // -------------------------------------------------------------
  // background(0, 0, 150, 0.4);

  // rectMode(CENTER);

  // const angle = radians((millis() / 10000) * 360);
  // const SQUARE_SIZE = width / 11;
  // const MIN_SIZE = 1;
  // const GAP = 50;

  // const recRect = (size, x, y) => {
  //   if (size <= MIN_SIZE) return;
  //   recRect(size / 2 - GAP / 4, x - size / 4, y - size / 4);
  //   recRect(size / 2 - GAP / 4, x + size / 4, y + size / 4);
  //   recRect(size / 2 - GAP / 4, x - size / 4, y + size / 4);
  //   recRect(size / 2 - GAP / 4, x + size / 4, y - size / 4);
  //   rotate(random(-0.01, 0.01));
  //   rect(x, y, size);
  // };

  // for (let x = 0; x < width; x += SQUARE_SIZE) {
  //   for (let y = 0; y < height; y += SQUARE_SIZE) {
  //     push();
  //     translate(x, y);
  //     // rotate(angle);
  //     noFill();
  //     stroke(((x + y) / 8 + millis() / 50) % 255, 255, 255);
  //     strokeWeight(2);
  //     recRect(SQUARE_SIZE, 0, 0);
  //     pop();
  //   }
  // }

  // -------------------------------------------------------------
  background(0, 0, 150, 0.4);

  rectMode(CENTER);
  const angle = radians(millis() / 100);
  const NUM_SQUARES = 10;
  const SQUARE_SIZE = width / NUM_SQUARES;
  const actualSize =
    ((SQUARE_SIZE / 2) * sqrt(2)) / sin(radians(45 + ((millis() / 100) % 90)));

  strokeWeight(2);
  stroke(0);
  rect(width / 2, height / 2, width, height);
  for (
    let x = SQUARE_SIZE / 2;
    x < NUM_SQUARES * SQUARE_SIZE;
    x += SQUARE_SIZE
  ) {
    for (
      let y = SQUARE_SIZE / 2;
      y < NUM_SQUARES * SQUARE_SIZE;
      y += SQUARE_SIZE
    ) {
      push();
      translate(x, y);
      rotate(angle);
      noFill();
      stroke(((x + y) / 8 + millis() / 50) % 255, 255, 255);
      strokeWeight(2);
      rect(0, 0, actualSize, actualSize);
      rotate(-2 * angle);
      rect(0, 0, actualSize, actualSize);
      pop();
    }
  }

  // -------------------------------------------------------------
  // background(0, 0, 150, 0.4);
  // strokeWeight(10);
  // rectMode(CENTER);
  // fill("orange");
  // rect(width / 2, height / 2, width, height);
  // {
  //   beginShape();
  //   for (let pos of positions) {
  //     stroke((pos.x + pos.y + millis() / 50) % 255, 255, 255);
  //     curveVertex(pos.x, pos.y);
  //     point(pos.x, pos.y);
  //     fill(0, 0, 100);
  //   }
  //   if (positions.length > 3) {
  //     curveVertex(positions[0].x, positions[0].y);
  //     curveVertex(positions[1].x, positions[1].y);
  //     curveVertex(positions[2].x, positions[2].y);
  //   }
  //   endShape();
  // }
}

// positions = [];
// function mouseClicked() {
//   fill("orange");
//   positions.push({ x: mouseX, y: mouseY });
// }
