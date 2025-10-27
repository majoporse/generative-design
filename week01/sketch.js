function setup() {
  createCanvas(400, 400);
}

function draw() {
    background(0, 10);
    circle(200, 200, 100);
    circle(150, 200, 100);
    let c = color(`hsl(${mouseX % 360}, 100%, 50%)`);
    fill(c);
    circle(mouseX, mouseY, 50);
    fill("#f4d35eff");
    circle(random(width), random(height), 10);
}
