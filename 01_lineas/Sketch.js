function setup() {
  createCanvas(800, 600);
  background(150);
}

function draw() {
  stroke(0);
  line(width/2, 0, width/2, height);
  line(0,height/2, width, height/2);
  line(width,0, 0, height);
  line(0,0, width, height);
  fill(0, 0, 255);
  noStroke();
  circle(width/2, height/2, 50);

}