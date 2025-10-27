let WIDTH = 1000;
let HEIGHT = 1000;

// added globals for recording
let cnv;
let mediaRecorder = null;
let recordedChunks = [];
let isRecording = false;

function setup() {
  // changed: store the created canvas so we can capture its stream
  cnv = createCanvas(WIDTH, HEIGHT);
  colorMode(HSB);
  stroke(255);
  strokeWeight(5);
  frameRate(144);
}

function draw() {
  background(0);
  noStroke();
  noFill();
  colorMode(HSB);

  // const LINE_COUNT = 100;
  // const RADIUS = height / LINE_COUNT;
  // const OFFSET = 1000;
  // const POINTS_PER_LINE = 100;
  // const POINT_WIDTH = width / POINTS_PER_LINE;

  // const LINE_COUNT = 100;
  // const RADIUS = height / LINE_COUNT;
  // const OFFSET = 1000;
  // const POINTS_PER_LINE = 100;
  // const POINT_WIDTH = width / POINTS_PER_LINE;

  // for (let i = -LINE_COUNT; i < LINE_COUNT * 2; i++) {
  //   stroke(0, 0, 255, 1);
  //   strokeWeight(2);

  //   beginShape();
  //   offsets = []
  //   for (let k = -2; k < POINTS_PER_LINE + 2; k++) {
  //     offset = noise(i * 0.01, k * 0.01, millis() / 10000) * OFFSET - OFFSET / 2;
  //     offsets.push(offset);

  //     curveVertex(
  //       k * POINT_WIDTH,
  //       i * RADIUS + RADIUS / 2 + offset
  //     );
  //   }

  //   // try color based on the distance from the line
  //   offset_sum = offsets.reduce((a, b) => a + b, 0);
  //   line_offset = (offsets[0] + offsets[offsets.length - 1]) / 2;
  //   average_offset = offset_sum / offsets.length;
  //   average_offset_diff = average_offset - line_offset;
  //   stroke((average_offset_diff * 3 + 360) % 360, 255, 255);
  //   strokeWeight(5);
  //   // endShape(CLOSE);

  //   endShape();

  map = [];
  const MAP_DEPTH = 20;
  const RESOLUTION = 7;
  const RAND_SCALE = 0.003;
  const FAST_SCALE = 0.01;

  // const floodfill = (x, y, map, visited) => {
  //   if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) return;
  //   if (map[x][y] == 0) return;
  //   if (visited[x][y]) return;

  //   visited[x][y] = true;
  //   point(x * RESOLUTION, y * RESOLUTION);

  //   floodfill(x + 1, y, map, visited);
  //   floodfill(x - 1, y, map, visited);
  //   floodfill(x, y + 1, map, visited);
  //   floodfill(x, y - 1, map, visited);
  // };

  for (let d = 0; d < MAP_DEPTH; d++) {
    cur_floor = Array(Math.floor(width / RESOLUTION))
      .fill()
      .map(() => Array(Math.floor(height / RESOLUTION)).fill(0));
    upper_bound = (d + 1) / MAP_DEPTH;
    lower_bound = d / MAP_DEPTH;

    for (let x = 0; x < cur_floor.length; x++) {
      for (let y = 0; y < cur_floor[0].length; y++) {
        cur_height = noise(
          x * RESOLUTION * RAND_SCALE,
          y * RESOLUTION * RAND_SCALE,
          frameCount * FAST_SCALE
        );

        // only add the edge points for this floor
        cur_floor[x][y] = 0;
        if (cur_height >= lower_bound && cur_height < upper_bound) {
          // check neighbors
          neighbors = [
            noise(
              (x + 1) * RESOLUTION * RAND_SCALE,
              y * RESOLUTION * RAND_SCALE,
              frameCount * FAST_SCALE
            ),
            noise(
              (x - 1) * RESOLUTION * RAND_SCALE,
              y * RESOLUTION * RAND_SCALE,
              frameCount * FAST_SCALE
            ),
            noise(
              x * RESOLUTION * RAND_SCALE,
              (y + 1) * RESOLUTION * RAND_SCALE,
              frameCount * FAST_SCALE
            ),
            noise(
              x * RESOLUTION * RAND_SCALE,
              (y - 1) * RESOLUTION * RAND_SCALE,
              frameCount * FAST_SCALE
            ),
          ];

          for (let n of neighbors) {
            if (n > upper_bound) {
              console.log(`{${x}, ${y}} edge, cur_height: ${cur_height}, neighbor: ${n}, bounds: [${lower_bound}, ${upper_bound}]`);
              cur_floor[x][y] = 1;
              break;
            }
          }
        }
      }
    }

    visited = Array(cur_floor.length)
      .fill()
      .map(() => Array(cur_floor[0].length).fill(false));

    for (let x = 0; x < cur_floor.length; x++) {
      for (let y = 0; y < cur_floor[0].length; y++) {
        if (cur_floor[x][y] == 0) continue;

        // if (visited[x][y]) continue;

        if (cur_floor[x][y] == 1) {
          strokeWeight(RESOLUTION);
          stroke((d / MAP_DEPTH) * 360, 255, 255);
          point(x * RESOLUTION, y * RESOLUTION);
          // floodfill(x, y, cur_floor, visited);
        }
      }
    }
  }

  // noLoop();
  // // bg
  // const LINE_W = 20;
  // for (let i = -(width / LINE_W); i < width / LINE_W; i++) {
  //   push();
  //   translate(width / 2, height / 2);
  //   rotate(radians(-30));
  //   // strokeWeight(20);
  //   // stroke(0, 0, 255);
  //   // point(0, 0); // performance boost

  //   stroke(0, 0, 255, 0.5);
  //   strokeWeight(1);
  //   line(i * LINE_W, -height, i * LINE_W, height);
  //   pop();
  // }

  strokeWeight(20);
  stroke(0, 0, 0);
  rect(0, 0, width, height);
}

// start/stop recording when 's' is pressed
function keyPressed() {
  if (key === "s" || key === "S") {
    // record 3 seconds by default
    startRecording(5000);
  }
}

// starts a MediaRecorder for the p5 canvas and saves after duration ms
function startRecording(duration = 3000, fps = 60) {
  if (!cnv || isRecording) return;
  const stream = cnv.elt.captureStream(fps);
  recordedChunks = [];

  try {
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp9",
    });
  } catch (e) {
    // fallback without codec hint
    mediaRecorder = new MediaRecorder(stream);
  }

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
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
    if (mediaRecorder && mediaRecorder.state === "recording")
      mediaRecorder.stop();
  }, duration);
}
