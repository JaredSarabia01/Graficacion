
function setup() {
  createCanvas(600, 400);
}

function draw() {
   background(220);
   // base
   fill(200,150,100);
   rect(200, 200, 200);
   
   //techo
   fill(150,50,50);
   triangle(200, 200, 300, 120, 400, 200);

   // puerta
  fill(100,50,20);
  rect(260, 310, 40, 80);

  //sol
  fill(255, 200, 0);
  circle(500,80,80)
}