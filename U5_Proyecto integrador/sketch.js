const DATOS_PLANETAS = [
  { nombre:"Mercurio", radio:4.5,  orbita:80,  vel:0.047, col:[180,140,120], anillo:false, lunas:0 },
  { nombre:"Venus",    radio:7.2,  orbita:130, vel:0.035, col:[210,185,100], anillo:false, lunas:0 },
  { nombre:"Tierra",   radio:8,    orbita:185, vel:0.029, col:[70,130,200],  anillo:false, lunas:1 },
  { nombre:"Marte",    radio:5.5,  orbita:248, vel:0.024, col:[195,80,50],   anillo:false, lunas:2 },
  { nombre:"Júpiter",  radio:24,   orbita:350, vel:0.013, col:[200,160,110], anillo:false, lunas:4 },
  { nombre:"Saturno",  radio:20,   orbita:460, vel:0.009, col:[210,190,130], anillo:true,  lunas:2 },
  { nombre:"Urano",    radio:13,   orbita:555, vel:0.006, col:[150,210,220], anillo:true,  lunas:1 },
  { nombre:"Neptuno",  radio:12.5, orbita:640, vel:0.005, col:[80,100,220],  anillo:false, lunas:1 },
];

let pausado = false;
let velocidadTiempo = 1.0;
const VEL_MIN = 0.1, VEL_MAX = 6.0;

let angulos = [];        
let angulosLunas = [];    
let historialTrails = []; 
const MAX_TRAIL = 50; 

let tamSolActual = 38;    
let morphCorona = 0;      
let morphDir = 1;

let mostrarTrails = true;
let mostrarAsteroides = true;
let mostrarEtiquetas = true;
let modoLuzSolar = true;  
let modoColor = 0;       

let camZoomActual = 1.0, camZoomMeta = 1.0;

let asteroides = [], estrellas = [], fugaces = [];

function setup() {
  createCanvas(1200, 700, WEBGL);
  frameRate(60); 

  for (let i = 0; i < DATOS_PLANETAS.length; i++) {
    let angInic = (TWO_PI / DATOS_PLANETAS.length) * i;
    angulos.push(angInic);
    historialTrails.push([]);

    let lunasXPlaneta = [];
    for (let m = 0; m < DATOS_PLANETAS[i].lunas; m++) {
      lunasXPlaneta.push(random(TWO_PI));
    }
    angulosLunas.push(lunasXPlaneta);
  }

  for (let i = 0; i < 150; i++) asteroides.push(new Asteroide());
  for (let i = 0; i < 200; i++) estrellas.push(new Estrella());
  for (let i = 0; i < 3; i++) fugaces.push(new Fugaz());
}


function draw() {
  background(5, 5, 15);

  let dt = pausado ? 0 : (deltaTime / 1000.0) * velocidadTiempo;
  
  if (!pausado) {
    morphCorona += 0.02 * morphDir;
    if (morphCorona >= 1 || morphCorona <= 0) morphDir *= -1;
  }
  
  let morphSuave = easeInOut(morphCorona);
  tamSolActual = lerp(tamSolActual, lerp(36, 44, morphSuave), 0.05);
  camZoomActual = lerp(camZoomActual, camZoomMeta, 0.05);

  scale(camZoomActual);
  orbitControl();

  if (modoLuzSolar) {
    ambientLight(25);
    pointLight(255, 230, 150, 0, 0, 0); 
  } else {
    ambientLight(90);
    directionalLight(255, 255, 255, 0, 1, -0.5);
  }

  for (let e of estrellas) e.mostrar();
  for (let f of fugaces) { f.actualizar(dt); f.mostrar(); }

  if (mostrarTrails) dibujoTrails();
  dibujoGuiasOrbita();

  dibujoSol(morphSuave);

  if (mostrarAsteroides) {
    for (let a of asteroides) { a.actualizar(dt); a.mostrar(); }
  }
  for (let i = 0; i < DATOS_PLANETAS.length; i++) {
    let p = DATOS_PLANETAS[i];

    if (!pausado) angulos[i] += p.vel * velocidadTiempo * 0.015;

    let px = cos(angulos[i]) * p.orbita;
    let pz = sin(angulos[i]) * p.orbita;
    if (frameCount % 4 === 0 && !pausado) {
      historialTrails[i].push(createVector(px, 0, pz));
      if (historialTrails[i].length > MAX_TRAIL) historialTrails[i].shift();
    }

    push();
      rotateY(angulos[i]);
      translate(p.orbita, 0, 0);
      dibujoCuerpoPlaneta(p, i);

      for (let m = 0; m < p.lunas; m++) {
        if (!pausado) angulosLunas[i][m] += (0.05 + m * 0.02) * velocidadTiempo;
        
        push();
          rotateY(angulosLunas[i][m]);
          translate(p.radio * 2 + m * 7, 0, 0); 
          noStroke();
          ambientMaterial(170, 170, 170);
          sphere(p.radio * 0.22); 
        pop();
      }
    pop(); 
  }

}

function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

function dibujoSol(morphSuave) {
  push();
  noStroke();
  let tamCorona = lerp(tamSolActual * 1.4, tamSolActual * 2.0, morphSuave);
  ambientMaterial(255, 150, 50, 100);
  sphere(tamCorona); 
  
  ambientMaterial(255, 230, 100);
  sphere(tamSolActual);
  pop();
}

function dibujoGuiasOrbita() {
  noFill();
  stroke(60, 80, 120, 50);
  strokeWeight(0.5);
  push();
  rotateX(HALF_PI);
  for (let p of DATOS_PLANETAS) torus(p.orbita, 0.2, 40, 3);
  pop();
}

function dibujoCuerpoPlaneta(p, idx) {
  let col = obtenerColor(p.col, idx);
  noStroke();
  ambientMaterial(col);
  specularMaterial(100);
  shininess(20);

  rotateY(frameCount * 0.01);
  sphere(p.radio);

  if (p.anillo) {
    push();
    rotateX(HALF_PI + 0.2);
    ambientMaterial(col[0]*0.6, col[1]*0.6, col[2]*0.6);
    torus(p.radio * 1.8, p.radio * 0.12, 30, 3);
    pop();
  }
}

function dibujoTrails() {
  for (let i = 0; i < DATOS_PLANETAS.length; i++) {
    let trail = historialTrails[i];
    let col = obtenerColor(DATOS_PLANETAS[i].col, i);
    for (let j = 0; j < trail.length; j++) {
      push();
      translate(trail[j].x, trail[j].y, trail[j].z);
      noStroke();
  
      let rastroColor = color(col);
      rastroColor.setAlpha(map(j, 0, trail.length, 0, 120));
      ambientMaterial(rastroColor);
      sphere(DATOS_PLANETAS[i].radio * 0.25);
      pop();
    }
  }
}

function obtenerColor(colBase, idx) {
  if (modoColor === 1) {
    colorMode(HSB, 360, 100, 100);
    let c = color(map(idx, 0, DATOS_PLANETAS.length, 0, 360), 80, 90);
    colorMode(RGB, 255);
    return [red(c), green(c), blue(c)];
  }
  if (modoColor === 2) return [lerp(colBase[0], 255, 0.5), lerp(colBase[1], 255, 0.5), lerp(colBase[2], 255, 0.5)];
  return colBase;
}

class Asteroide {
  constructor() {
    this.radio = random(290, 330);
    this.angulo = random(TWO_PI);
    this.vel = random(0.005, 0.012);
    this.tam = random(1, 2.5);
    this.faseY = random(TWO_PI);
  }
  actualizar(dt) {
    if (!pausado) {
      this.angulo += this.vel * velocidadTiempo * 0.5;
      this.faseY += 0.02;
    }
  }
  mostrar() {
    push();
    rotateY(this.angulo);
    translate(this.radio, sin(this.faseY) * 8, 0);
    ambientMaterial(130, 120, 110);
    noStroke();
    sphere(this.tam);
    pop();
  }
}

class Estrella {
  constructor() {
    this.pos = p5.Vector.random3D().mult(random(800, 1200));
    this.tam = random(0.5, 2);
  }
  mostrar() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    let brillo = map(sin(frameCount * 0.05 + this.pos.x), -1, 1, 100, 255);
    ambientMaterial(brillo);
    sphere(this.tam);
    pop();
  }
}

class Fugaz {
  constructor() { this.reset(); }
  reset() {
    this.pos = createVector(random(-600,600), random(-400,-200), random(-400,400));
    this.vel = createVector(random(4,8), random(2,4), 0);
    this.vida = random(30, 60);
  }
  actualizar(dt) {
    if (!pausado) {
      this.pos.add(this.vel);
      this.vida--;
      if (this.vida <= 0) this.reset();
    }
  }
  mostrar() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    noStroke();
    ambientMaterial(255, 255, 200);
    sphere(1.5);
    pop();
  }
}

function keyPressed() {
  if (key === 'P' || key === 'p') pausado = !pausado;
  if (key === 'O' || key === 'o') { mostrarTrails = !mostrarTrails; if (!mostrarTrails) setup(); }
  if (key === 'A' || key === 'a') mostrarAsteroides = !mostrarAsteroides;
  if (key === 'L' || key === 'l') modoLuzSolar = !modoLuzSolar;
  if (key === 'C' || key === 'c') modoColor = (modoColor + 1) % 3;
  if (key === ' ') camZoomMeta = camZoomMeta === 1.0 ? 1.6 : 1.0;
}

function mouseWheel(event) {
  camZoomMeta = constrain(camZoomMeta - event.delta * 0.001, 0.4, 3.0);
  return false;
}