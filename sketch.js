let walls = [];
let ray;
let particle;
// let xoff = 0;
// let yoff = 10000;

function setup() {
  createCanvas(screen.width, screen.height);

  // // Creating random walls
  // for (let i = 0; i < 5; i++) {
  //   let x1 = random(width);
  //   let x2 = random(width);
  //   let y1 = random(height);
  //   let y2 = random(height);
  //   walls[i] = new Boundary(x1, y1, x2, y2);
  // }

  //N
  walls.push(new Boundary(100, 100, 100, 200));
  walls.push(new Boundary(100, 100, 120, 100));
  walls.push(new Boundary(120, 100, 150, 150));
  walls.push(new Boundary(150, 150, 150, 100));
  walls.push(new Boundary(150, 100, 170, 100));
  walls.push(new Boundary(170, 100, 170, 200));
  walls.push(new Boundary(170, 200, 150, 200));
  walls.push(new Boundary(150, 200, 120, 150));
  walls.push(new Boundary(120, 150, 120, 200));
  walls.push(new Boundary(120, 200, 100, 200));

  //I
  walls.push(new Boundary(200, 100, 200, 200));
  walls.push(new Boundary(220, 200, 200, 200));
  walls.push(new Boundary(220, 200, 220, 100));
  walls.push(new Boundary(220, 100, 200, 100));

  //C
  walls.push(new CurveSegment(300, 100, 300, 200, 220, 80, 220, 220));

  //K
  walls.push(new Boundary(320, 100, 320, 200));
  walls.push(new Boundary(320, 100, 340, 100));
  walls.push(new Boundary(340, 100, 340, 150));
  walls.push(new Boundary(340, 150, 360, 100));
  walls.push(new Boundary(360, 100, 370, 110));
  walls.push(new Boundary(370, 110, 340, 180));
  walls.push(new Boundary(340, 180, 380, 190));
  walls.push(new Boundary(380, 190, 320, 200));

  //Walls
  walls.push(new Boundary(0, 0, width, 0));
  walls.push(new Boundary(width, 0, width, height));
  walls.push(new Boundary(width, height, 0, height));
  walls.push(new Boundary(0, height, 0, 0));

  particle = new Particle();
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


  // xoff += 0.01;
  // yoff += 0.01;
}
