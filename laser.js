function Laser(spos, angle) {
  this.pos = createVector(spos.x, spos.y);
  this.vel = p5.Vector.fromAngle(angle);
  this.vel.mult(10);

  this.update = function() {
    this.pos.add(this.vel);
  }
  this.render = function() { //shape and color of laser
    push();
    stroke(0,255,255);
  	strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }

  this.hits = function(asteroid) { //dictates the rule of if the laser and asteroid make contact
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < asteroid.r) { //if distance is less than the radius of the asteroid -- will be variable due to differing sizes of asteroids
      return true;
    } else {
      return false;
    }
  }

  this.offscreen = function() { 
    if (this.pos.x > width || this.pos.x < 0) {
      return true;
    }
    if (this.pos.y > height || this.pos.y < 0) {
      return true;
    }
    return false;
  }


}
