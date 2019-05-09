class CurveSegment {
  constructor(x1, y1, x2, y2, cpx, cpy, cp2x, cp2y) {
    this.a = createVector(x1, y1);
    this.b = createVector(x2, y2);
    this.c1 = createVector(cpx, cpy)
    this.c2 = createVector(cp2x, cp2y)
    this.type = 'curve';

  }

  show() {
    stroke(255);
    noFill();
    bezier(this.a.x, this.a.y, this.c1.x, this.c1.y, this.c2.x, this.c2.y, this.b.x, this.b.y);
  }
}
