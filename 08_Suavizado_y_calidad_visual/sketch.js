
function setup() {
  createCanvas(1200,800);
}

function draw() {
   background(240);

   smooth();
   strokeWeight(8);
   line(50,150,150,50);

  // sin suavizado
  noSmooth();
  line(250,150,150,50);


}
