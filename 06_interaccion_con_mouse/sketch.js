let posiciones = [];
function setup() {
  createCanvas(400, 400);
}

function draw() {
   background(200);

for(let i = 0; i< posiciones.length; i++){
  circle(posiciones[i].x, posiciones[i].y, 30);
}
}
   function mousePressed(){
    posiciones.push({ x: mouseX, y: mouseY});
    background(random(255), random(255), random(255));
   }

