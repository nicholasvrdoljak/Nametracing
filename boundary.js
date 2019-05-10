class Boundary {
  constructor(x1, y1, x2, y2, brightness) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
    this.type = 'line';
    this.brightness = brightness;
  }

  show() {
    stroke(this.brightness);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}
