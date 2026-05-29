
function setup() {
  createCanvas(400, 400);
}

function draw() {
   background(240);

   let cx = width/4;
   let cy = height/4;
   let r= 150;

   //caratula
   stroke(0);
   strokeWeight(3);
   noFill();
   circle(cx,cy,r*2);

   let ang= frameCount*0.02;
   let ang2 = frameCount*0.002;
   //creacion del punto de la manecilla usando el cos/sen
   let x2=cx+(r*0.8)*cos(ang);
   let y2 = cy + (r*0.8)*sin(ang);
   let x22 = cx+(r*0.8)*cos(ang2);
   let y22= cy + (r*0.8)*sin(ang2);


  


   // Crear manecilla
   strokeWeight(5);
   line(cx,cy,x2,y2);
   strokeWeight(3);
   line(cx,cy,x22,y22)
   //arco de progreso
   strokeWeight(8);
   arc(cx,cy,r*2.1,r*2.1,0,ang);

}
