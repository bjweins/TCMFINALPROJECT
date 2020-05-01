function Asteroid(pos, r) {
  if (pos) {
    this.pos = pos.copy();
  } else {
  	this.pos = createVector(random(width), random(height));
  }
  if (r) {
    this.r = r * 0.5;
  } else {
    this.r = random(20,50); //size of asteroid 
  }


  this.vel = p5.Vector.random2D();
  this.total = (random(10, 20));
  this.offset = [];
  for (var i = 0; i < this.total; i++) {
    this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
  }

  this.update = function() {
    this.pos.add(this.vel);
  }

  this.render = function() { //asteroid shape
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);
    //ellipse(0, 0, this.r * 2);
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.r + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);


    pop();
  }

  this.breakup = function() { //creates two new smaller asteroids when the asteroid makes contact with laser
    var newA = [];
    newA[0] = new Asteroid(this.pos, this.r);
    newA[1] = new Asteroid(this.pos, this.r);
    return newA;
  }

  this.edges = function() { //creates the edges for the asteroids and dictates asteroid location when asteroid passes edge of screen
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

}
