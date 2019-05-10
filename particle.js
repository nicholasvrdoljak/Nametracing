class Particle {
  constructor(width, height) {
    this.pos = createVector(width / 2, height / 2);
    this.random = Math.floor(Math.random() * 10)
    this.rays = [];
    this.direction = 1;

    for (let a = 0; a < 360; a += 1) {
      if(a === 270 || 1 === 90){a = 270.1}
      if(a === 90){a = 90.1}  
      this.rays.push(new Ray(this.pos, radians(a)));
    }
  }

  update(x, y) {
    // this.pos.set(x, y);
    
    if(this.pos.x >= 400){
      this.direction = -1;
    } else if (this.pos.x <= 50){
      this.direction = 1;
    }
    this.pos.set(this.pos.x + (this.direction * 20), this.pos.y)
  }

  look(walls) {
    for (let ray of this.rays) {

      let closest;
      let record = Infinity;

      for (let wall of walls) {
        const pt = ray.cast(wall, this.pos);

        if (pt) {
          const d = p5.Vector.dist(this.pos, pt);

          if (d < record) {
            record = d;
            closest = pt;
          }
        }
      }

      if (closest) {
          // colorMode(HSB);
          // stroke((this.random * frameCount * 2) % 360, 255, 255, 50);
          stroke(255, 100);
          line(this.pos.x, this.pos.y, closest.x, closest.y);
      }
    }
  }

  show() {
    fill(255);
    ellipse(this.pos.x, this.pos.y, 0);
    for (let ray of this.rays) {
      ray.show();
    }
  }
}
