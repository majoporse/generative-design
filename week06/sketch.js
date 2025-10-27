// import { Vector } from "../../.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/index";

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  frameRate(144);
}

function draw() {
  background(255, 0.3);

  let STRING = "skibidi";
  let FONT_SIZE = 64;
  noFill();
  stroke(0);
  textSize(FONT_SIZE);
  textAlign(CENTER, CENTER);
  textFont("Alfa Slab One");

  for (let i = 0; i < STRING.length; i++) {
    
    // text(STRING.charAt(i), width / 2, height / 2 + sin(millis() * 0.001 + i * 0.2) * 500);
    // get text points
    let points = font.textToPoints(STRING.charAt(i), width / 2 - (STRING.length * FONT_SIZE) / 4 + i * FONT_SIZE, height / 2, FONT_SIZE, {
      sampleFactor: 0.1,
    });

    // draw points
    for (let j = 0; j < points.length; j++) {
      let p = points[j];
      stroke((millis() * 0.1 + i * 20) % 360, 100, 100);
      point(p.x, p.y + sin(millis() * 0.002 + i * 0.2) * 500);
    }
    textSize(32);
    text("frameRate: " + floor(frameRate()), width - 100, height - 50);

  }
}
