let walls = [];
let ray;
let particle;
// let xoff = 0;
// let yoff = 10000;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  let brightness = 0;

  //N
  walls.push(new Boundary(100, 100, 100, 200, brightness));
  walls.push(new Boundary(100, 100, 120, 100, brightness));
  walls.push(new Boundary(120, 100, 150, 150, brightness));
  walls.push(new Boundary(150, 150, 150, 100, brightness));
  walls.push(new Boundary(150, 100, 170, 100, brightness));
  walls.push(new Boundary(170, 100, 170, 200, brightness));
  walls.push(new Boundary(170, 200, 150, 200, brightness));
  walls.push(new Boundary(150, 200, 120, 150, brightness));
  walls.push(new Boundary(120, 150, 120, 200, brightness));
  walls.push(new Boundary(120, 200, 100, 200, brightness));

  //I
  walls.push(new Boundary(200, 100, 200, 200, brightness));
  walls.push(new Boundary(220, 200, 200, 200, brightness));
  walls.push(new Boundary(220, 200, 220, 100, brightness));
  walls.push(new Boundary(220, 100, 200, 100, brightness));

  //C
  //x1, y1, x2, y2, cpx, cpy, cp2x, cp2y
  walls.push(new CurveSegment(300, 100, 300, 200, 220, 80, 220, 220, brightness));
  walls.push(new CurveSegment(300, 120, 300, 180, 240, 100, 240, 195, brightness));
  walls.push(new Boundary(300, 200, 300, 180, brightness));
  walls.push(new Boundary(300, 100, 300, 120, brightness));


  //K
  walls.push(new Boundary(320, 100, 320, 200, brightness));//  |
  walls.push(new Boundary(320, 100, 340, 100, brightness));//  -
  walls.push(new Boundary(340, 100, 340, 150, brightness));//  |
  walls.push(new Boundary(340, 150, 360, 100, brightness));//  /
  walls.push(new Boundary(360, 100, 370, 110, brightness));//  \
  walls.push(new Boundary(370, 110, 340, 180, brightness));//  /
  walls.push(new Boundary(340, 180, 380, 190, brightness));//  \
  walls.push(new Boundary(380, 190, 320, 200, brightness));//  _

  //Walls
  walls.push(new Boundary(0, 0, width, 0, brightness));
  walls.push(new Boundary(width, 0, width, height, brightness));
  walls.push(new Boundary(width, height, 0, height, brightness));
  walls.push(new Boundary(0, height, 0, 0, brightness));

  particle = new Particle(50, 100);
  // particle2 = new Particle(6, 5);
}

function draw() {
  background(0);
  for (let wall of walls) {
    wall.show();
  }
  // particle.update(noise(xoff) * width, noise(yoff) * height);
  particle.update(mouseX, mouseY);
  particle.show();
  particle.look(walls);

  // particle2.show();
  // particle2.look(walls);


  // xoff += 0.01;
  // yoff += 0.01;
}
