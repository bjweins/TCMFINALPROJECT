var ship;
var asteroids = [];
var lasers = [];
var score = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (var i = 0; i < 8; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() { //showing the playspace
  background(0);

  for (var i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('ooops!'); 

    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();


  }

  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) { //what happens if laser makes contact with asteroid. Both scoring in line 40 and breaking of asteroids
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
            score += 1;
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  console.log(lasers.length);

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  fill(255);
  textSize(18);
  text('Score = ' + score, 50, 50); //scoring system visualization


}

function keyReleased() { //what the program will do if the key is released. This will prevent constant rotation from ship if the right or left arrow is pressed
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed() { //movement of ship using key presses
  if (key == ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  } else if (keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    ship.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    ship.boosting(true);
  }
}
