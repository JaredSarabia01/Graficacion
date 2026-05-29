let clouds = [];       
let skyDay = [135,206,235];
let skyNight = [10,24,74];
let isNight = false;

function setup() {
  createCanvas(800, 500);         

 
  clouds.push({x: -120, y: 80, v: 1.0});
  clouds.push({x: 200, y: 120, v: 0.8});
  clouds.push({x: 540, y: 60, v: 1.2});

 
  noStroke();
}

function draw() {
  background(220);

  if (!isNight) {
    fill(skyDay[0], skyDay[1], skyDay[2]);
  } else {
    fill(skyNight[0], skyNight[1], skyNight[2]);
  }
  rect(0, 0, width, height * 0.6);        // cielo (arriba)

  fill(0, 128, 0);
  rect(0, height * 0.6, width, height * 0.4);

  drawNubes();

  drawCasita();

  drawReloj();
}


function drawNubes() {
  fill(255);
  for (let i = 0; i < clouds.length; i++) {
    let c = clouds[i];
    ellipse(c.x, c.y, 80, 50);
    ellipse(c.x + 30, c.y + 5, 70, 45);
    ellipse(c.x - 30, c.y + 5, 70, 45);

    c.x += c.v;

    if (c.x > width + 100) c.x = -150;
  }
}

function drawCasita() {
  let baseW = 220;
  let baseH = 140;
  let baseX = width * 0.25;
  let baseY = height * 0.6 - baseH / 2;

  fill(200, 150, 100);
  rect(baseX, baseY, baseW, baseH);

  fill(150, 50, 50);
  triangle(baseX, baseY, baseX + baseW / 2, baseY - 80, baseX + baseW, baseY);

  fill(100, 50, 20);
  rect(baseX + baseW * 0.4, baseY + baseH * 0.35, baseW * 0.2, baseH * 0.65);

  fill(180, 220, 255);
  rect(baseX + 20, baseY + 20, 40, 40);
  rect(baseX + baseW - 60, baseY + 20, 40, 40);
}

function drawReloj() {
  push();
  let cx = width * 0.82;
  let cy = height * 0.25;
  let r = 80;

  noFill();
  stroke(0);
  strokeWeight(3);
  circle(cx, cy, r * 2);

  let ang = frameCount * 0.02;

  let x2 = cx + (r * 0.8) * cos(ang);
  let y2 = cy + (r * 0.8) * sin(ang);

  strokeWeight(5);
  line(cx, cy, x2, y2);

  strokeWeight(6);
  arc(cx, cy, r * 2.2, r * 2.2, 0, ang);

  pop();
}

function mousePressed() {
  isNight = !isNight;
}
