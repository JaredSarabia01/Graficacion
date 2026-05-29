
function setup() {
  createCanvas(600, 400);
}

function draw() {
   background(240);
   // linea vertical centro
   line(width/2, 0, width/2, height);
   // linea horizontal centro
   line(0, height/2, width, height/2);
   line(width, height,0,0);
   line(width,0, 0, height);
   line(width,height,0 ,0);
   circle(width/4, height/4,100);
   circle( (3*width)/4, height/4, 100);
   circle(width/4, (3*height)/4,100);
   circle((3*width)/4, (3*height)/4,100);
}