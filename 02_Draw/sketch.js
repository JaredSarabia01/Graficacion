let x = 0;
let velocidad = 3;
function setup() {
  createCanvas(400, 200);
}

function draw() {
   background(220);
   frameRate(30);
   circle(x,100,40);
   x+=velocidad;
   if(x> width || x<0){
    velocidad = -velocidad;
   }
   
}