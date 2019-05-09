var svg=document.documentElement /*svg object*/
var S=new Array() /*splines*/
var P=new Array() /*control points*/
var I=new Array() /*intersection points*/
var O   /*current object*/
var x0,y0 /*svg offset*/
var t = Array();

class Ray {
  constructor(pos, angle) {
    this.pos = pos;
    this.dir = p5.Vector.fromAngle(angle);
  }

  lookAt(x, y) {
    this.dir.x = x - this.pos.x;
    this.dir.y = y - this.pos.y;
    this.dir.normalize();
  }

  show() {
    stroke(255);
    push();
    translate(this.pos.x, this.pos.y);
    line(0, 0, this.dir.x * 10, this.dir.y * 10);
    pop();
  }

  cast(wall) {
    if(wall.type === 'line'){
      const x1 = wall.a.x;
      const y1 = wall.a.y;
      const x2 = wall.b.x;
      const y2 = wall.b.y;

      const x3 = this.pos.x;
      const y3 = this.pos.y;
      const x4 = this.pos.x + this.dir.x;
      const y4 = this.pos.y + this.dir.y;

      const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

      if (den == 0) {
        return;
      }

      const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
      const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

      if (t > 0 && t < 1 && u > 0) {

        const pt = createVector();

        pt.x = x1 + t * (x2 - x1);
        pt.y = y1 + t * (y2 - y1);

        return pt;
      } else {
        return;
      }
    } else if(wall.type === 'curve'){
        const curvePoint1x = wall.a.x;
        const curvePoint1y = wall.a.y;
        const curvePoint2x = wall.b.x;
        const curvePoint2y = wall.b.y;
        const controlPt1x = wall.c1.x;
        const controlPt1y = wall.c1.x;
        const controlPt2x = wall.c2.x;
        const controlPt2y = wall.c2.x;

        const segmentX1 = this.pos.x;
        const segmentY1 = this.pos.x;
        const segmentX2 = this.pos.x + this.dir.x;
        const segmentY2 = this.pos.y + this.dir.y;

        let result = this.computeIntersections(
          [curvePoint1x, controlPt1x, controlPt2x, curvePoint2x],
          [curvePoint1y, controlPt1y, controlPt2y, curvePoint2y],
          [segmentX1, segmentX2],
          [segmentX2, segmentY2]
        );

        if(result){
          // Get the closest one to the ray start
          let closestDist = Infinity;
          let closestCoord;

          for(let coord of result){
            const xy = createVector();
            xy.x = coord[0];
            xy.y = coord[1];

            let distance = p5.Vector.dist(this.pos, xy);

            if(closestDist > distance){
              closestDist = distance;
              closestCoord = xy;
            }
          }
          
          if(closestCoord){
            return closestCoord;
          } else {
            return;
          }
        }
    }
    
  }

  sgn( x ){
    if (x < 0.0) return -1;
    return 1;
  }

  /*computes intersection between a cubic spline and a line segment*/
  computeIntersections(px,py,lx,ly){
    // console.log(px, py, lx,)
    var X = Array();
    let result = [];
      
    var A = ly[1]-ly[0];      //A=y2-y1
    var B = lx[0]-lx[1];      //B=x1-x2
    var C = lx[0]*(ly[0]-ly[1]) + 
            ly[0]*(lx[1]-lx[0]);  //C=x1*(y1-y2)+y1*(x2-x1)

    var bx = this.bezierCoeffs(px[0],px[1],px[2],px[3]);
    var by = this.bezierCoeffs(py[0],py[1],py[2],py[3]);
    
    var P = Array();
    P[0] = A * bx[0]+B * by[0];   /* t^3 */
    P[1] = A * bx[1]+B * by[1];   /* t^2 */
    P[2] = A * bx[2]+B * by[2];   /* t */
    P[3] = A * bx[3]+B * by[3] + C; /* 1 */
    
    var r = this.cubicRoots(P);
    /* verify the roots are in bounds of the linear segment */
    for (var i = 0; i < 3; i++){
        t = r[i];

        X = Array();
        
        X[0] = bx[0] * t * t * t + bx[1] * t * t + bx[2] * t + bx[3];
        X[1] = by[0] * t * t * t + by[1] * t * t + by[2] * t + by[3];            
            
        /* above is intersection point assuming infinitely long line segment,
          make sure we are also in bounds of the line */

        var s;
        
        if ((lx[1]-lx[0])!=0){           /* if not vertical line */
          s = (X[0]-lx[0])/(lx[1]-lx[0]);
        } else{
          s = (X[1]-ly[0])/(ly[1]-ly[0]);
        }

        /* in bounds? */
        if (t < 0 || t > width || s < 0 || s > height){
            X[0] = -100;  /*move off screen*/
            X[1] = -100;
        } else{
          result.push(X);
        }
        
        /*move intersection point*/
        // I[i].setAttributeNS(null,"cx",X[0]);
        // I[i].setAttributeNS(null,"cy",X[1]);
    }

    if(result.length){
      return result; 
    } else{
      return;
    }
      
  }

  /*based on http://mysite.verizon.net/res148h4j/javascript/script_exact_cubic.html#the%20source%20code*/
  cubicRoots(P){
    var a = P[0];
    var b = P[1];
    var c = P[2];
    var d = P[3];
    
    var A = b/a;
    var B = c/a;
    var C = d/a;

      var Q, R, D, S, T, Im;

      var Q = (3 * B - Math.pow(A, 2))/9;
      var R = (9 * A * B - 27 * C - 2 * Math.pow(A, 3))/54;
      var D = Math.pow(Q, 3) + Math.pow(R, 2);    // polynomial discriminant

      var t = Array();
    
      if (D >= 0)                                 // complex or duplicate roots
      {
          var S = this.sgn(R + Math.sqrt(D)) * Math.pow(Math.abs(R + Math.sqrt(D)),(1/3));
          var T = this.sgn(R - Math.sqrt(D)) * Math.pow(Math.abs(R - Math.sqrt(D)),(1/3));

          t[0] = -A/3 + (S + T);                    // real root
          t[1] = -A/3 - (S + T)/2;                  // real part of complex root
          t[2] = -A/3 - (S + T)/2;                  // real part of complex root
          Im = Math.abs(Math.sqrt(3)*(S - T)/2);    // complex part of root pair   
          
          /*discard complex roots*/
          if (Im != 0){
              t[1]=-1;
              t[2]=-1;
          }
      
      }
      else                                          // distinct real roots
      {
          var th = Math.acos(R/Math.sqrt(-Math.pow(Q, 3)));
          
          t[0] = 2 * Math.sqrt(-Q) * Math.cos(th/3) - A/3;
          t[1] = 2 * Math.sqrt(-Q) * Math.cos((th + 2 * Math.PI)/3) - A/3;
          t[2] = 2 * Math.sqrt(-Q) * Math.cos((th + 4 * Math.PI)/3) - A/3;
          Im = 0.0;
      }
      
      /*discard out of spec roots*/
    for (var i = 0; i < 3; i++) 
      if (t[i] < 0 || t[i] > 1.0){
        t[i] = -1
      };
                  
    /*sort but place -1 at the end*/
    t = this.sortSpecial(t);
    return t;
  }

  sortSpecial(a){
      var flip;
      var temp;
      
      do {
          flip=false;
          for (var i=0;i<a.length-1;i++)
          {
              if ((a[i+1]>=0 && a[i]>a[i+1]) ||
                  (a[i]<0 && a[i+1]>=0))
              {
                  flip=true;
                  temp=a[i];
                  a[i]=a[i+1];
                  a[i+1]=temp;
                  
              }
          }
      } while (flip);
    return a;
  }

  // sign of number
  sgn( x ){
      if (x < 0.0) return -1;
      return 1;
  }

  bezierCoeffs(P0,P1,P2,P3){
    var Z = Array();
    Z[0] = -P0 + 3*P1 + -3*P2 + P3; 
      Z[1] = 3*P0 - 6*P1 + 3*P2;
      Z[2] = -3*P0 + 3*P1;
      Z[3] = P0;
    return Z;
  }
      
  /*creates formated path string for SVG cubic path element*/
  pathCubic(x,y){
    return "M "+x[0]+" "+y[0]+" C "+x[1]+" "+y[1]+" "+x[2]+" "+y[2]+" "+x[3]+" "+y[3];
  }

  /*creates formated path string for SVG cubic path element*/
  pathLine(x,y){
    return "M "+x[0]+" "+y[0]+" L "+x[1]+" "+y[1];
  }

  /*code from http://stackoverflow.com/questions/442404/dynamically-retrieve-html-element-x-y-position-with-javascript*/
  getOffset( el ) {
      var _x = 0;
      var _y = 0;
      while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
          _x += el.offsetLeft - el.scrollLeft;
          _y += el.offsetTop - el.scrollTop;
          el = el.offsetParent;
      }
      return { top: _y, left: _x };
  }
}
