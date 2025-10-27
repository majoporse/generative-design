// import { Vector } from "../../.vscode/extensions/samplavigne.p5-vscode-1.2.16/p5types/index";

let img;
// added globals for recording
let cnv;
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  frameRate(144);
  const IMG_SCALE = 2;
  img.resize(img.width * IMG_SCALE, img.height * IMG_SCALE);
  img.loadPixels();
}

function preload() {
  img = loadImage("./sh.png");
}

function draw() {
  background(0);
  // colorMode(RGB);
  colorMode(HSB);

  const CIRCLE_SIZE = 15;
  const TOTAL_CIRCLES_X = img.width / CIRCLE_SIZE;
  const TOTAL_CIRCLES_Y = img.height / CIRCLE_SIZE;

  for (let y = 0; y < TOTAL_CIRCLES_Y; y++) {
    for (let x = 0; x < TOTAL_CIRCLES_X; x++) {
      let r =
        img.pixels[(y * img.width * CIRCLE_SIZE + x * CIRCLE_SIZE) * 4 + 0];
      let g =
        img.pixels[(y * img.width * CIRCLE_SIZE + x * CIRCLE_SIZE) * 4 + 1];
      let b =
        img.pixels[(y * img.width * CIRCLE_SIZE + x * CIRCLE_SIZE) * 4 + 2];
      let a =
        img.pixels[(y * img.width * CIRCLE_SIZE + x * CIRCLE_SIZE) * 4 + 3];

      let brightness = (r + g + b) / 3;

      // convert rgba to hsb
      fill(0, 0, 255);

      const offset_y = noise(x * 0.05, millis() * 0.0002) * 80;

      circle(
        x * CIRCLE_SIZE + CIRCLE_SIZE / 2,
        y * CIRCLE_SIZE + CIRCLE_SIZE / 2 + offset_y,
        (CIRCLE_SIZE / 255) * brightness
      );
    }
  }
}


// start/stop recording when 's' is pressed
function keyPressed() {
  if (key === 's' || key === 'S') {
    // record 3 seconds by default
    startRecording(3000);
  }
}

// starts a MediaRecorder for the p5 canvas and saves after duration ms
function startRecording(duration = 3000, fps = 60) {
  if (!cnv || isRecording) return;
  const stream = cnv.elt.captureStream(fps);
  recordedChunks = [];

  try {
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
  } catch (e) {
    // fallback without codec hint
    mediaRecorder = new MediaRecorder(stream);
  }

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `recording_${Date.now()}.webm`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    isRecording = false;
  };

  mediaRecorder.start();
  isRecording = true;
  // stop after the given duration
  setTimeout(() => {
    if (mediaRecorder && mediaRecorder.state === 'recording') mediaRecorder.stop();
  }, duration);
}