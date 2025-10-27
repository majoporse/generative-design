// import { Vector } from "../../.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/index";

let WIDTH = 1000;
let HEIGHT = 1000;

// let agent;
// let ball;

let agents = [];
function setup() {
  createCanvas(WIDTH, HEIGHT);
  colorMode(HSB);
  stroke(255);
  strokeWeight(5);
  frameRate(144);
  // agent = new Agent(width / 2, height / 2);
  // ball = new Ball(width / 2, height / 2, 40);
}

// class CA {
//   constructor(cell_num) {
//     this.cell_num = cell_num;
//     this.cell_size = ceil(width / this.cell_num);
//     // init random state
//     // this.state = Array.from({length: this.cell_num}, () => Math.round(Math.random(0, 1)));
//     this.state = Array.from({length: this.cell_num}, () => 0);

//     // rules are in a map of tuples
//     this.rules = new Map([
//       ["000", 1],
//       ["001", 1],
//       ["010", 1],
//       ["011", 0],
//       ["100", 1],
//       ["101", 1],
//       ["110", 0],
//       ["111", 1]
//     ]);
//   }

//   draw() {
//     for (let i = 0; i < this.cell_num; i++) {
//       if (this.state[i] !== 1) {
//         fill(255);
//       } else {
//         fill(0);
//       }
//       // rect(i * this.cell_size, 0, this.cell_size, this.cell_size);
//       circle(i * this.cell_size, 0, this.cell_size);

//     }
//   }

//   update() {
//     console.log(this.rules);
//     let copy_state = Array.from(this.state);
//     for (let i = 1; i < this.cell_num - 1; i++) {
//       let new_state = this.rules.get(`${copy_state[i-1]}${copy_state[i]}${copy_state[i+1]}`);
//       this.state[i] = new_state;
//       console.log(`Cell ${i}: ${copy_state[i-1]}, ${copy_state[i]}, ${copy_state[i+1]} -> ${new_state} "${copy_state[i-1]}${copy_state[i]}${copy_state[i+1]}"`);
//     }
//   }
// }

// class Agent {
//   constructor(x, y) {
//     this.pos = createVector(x, y);
//     this.vel = createVector();
//     this.c = color(random(0, 255), random(0, 255), random(0, 255));
//     this.vel = p5.Vector.random2D();
//   }

//   draw() {
//     this.pos.add(this.vel);
//     stroke(this.c);
//     point(this.pos);
//   }
// }

// class Ball {
//   constructor(x, y, r) {
//     this.pos = createVector(x, y);
//     this.vel = createVector();
//     this.acc = createVector(0, 0.9);
//     this.r = r;
//   }

//   draw() {
//     this.pos.set(
//       constrain(this.pos.x, 0 + this.r, width - this.r),
//       constrain(this.pos.y, 0 + this.r, height - this.r)
//     );

//     this.vel.add(this.acc);
//     this.pos.add(this.vel);

//     if (this.pos.x < this.r || this.pos.x > width - this.r){
//       this.vel.x = -this.vel.x;
//     }

//     if (this.pos.y < this.r || this.pos.y > height - this.r){
//       this.vel.y = -this.vel.y + 2;
//     }

//     circle(this.pos.x, this.pos.y, this.r);
//   }
// }

class Agent {
  MIN_SIZE = 10;
  has_child = false;
  constructor(x, y, size, dirx, diry) {
    this.pos = createVector(x, y);
    this.size = size;
    this.time = millis();
    this.dirx = dirx;
    this.diry = diry;
  }

  draw() {
    if (!this.has_child && millis() - this.time > 20) {
      this.has_child = true;
      if (this.size * 0.5 < this.MIN_SIZE) return;
      agents.push(
        new Agent(
          this.pos.x + this.dirx * -5,
          this.pos.y + this.diry * -5,
          this.size * 0.5,
          this.dirx,
          this.diry
        )
      );
    }
    fill(this.time % 255, 255, 255);
    square(this.pos.x, this.pos.y, this.size);
    this.pos.x = constrain(this.pos.x, 0, width - this.size);
    this.pos.y = constrain(this.pos.y, 0, height - this.size);
  }
}
last = 0;
function mouseDragged() {
  if (millis() - last < 10) return;
  last = millis();
  agents.push(
    new Agent(mouseX, mouseY, 100, mouseX - pmouseX, mouseY - pmouseY)
  );
  // console.log(agents);
  console.log(mouseX - pmouseX);
}

function draw() {
  background(0, 0, 0, 0.1);
  colorMode(HSB);
  rectMode(CENTER);
  strokeWeight(5);
  stroke(0, 0, 0);
  const LIFE_MILIS = 1000;

  for (let agent of agents) {
    agent.draw();
  }
  agents = agents.filter((agent) => millis() - agent.time < LIFE_MILIS);

  // ball.draw();

  // agent.draw();
  // const NUM_CELLS = 40;
  // let ca = new CA(NUM_CELLS);
  // ca.state[NUM_CELLS / 2] = 1; // initial condition
  // strokeWeight(1);
  // for (let i = 0; i < NUM_CELLS; i++) {
  //   push();
  //   translate(0, i * ca.cell_size);
  //   ca.draw();
  //   ca.update();
  //   pop();
  // }
  // noLoop();
}

function mousePressed() {
  console.log(agents);
}
