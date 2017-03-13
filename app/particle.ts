class Particle {
  position: p5.Vector;
  target: p5.Vector;
  velocity: p5.Vector;
  acceleration: p5.Vector;
  maxSpeed: number = 10;
  maxForce: number = 0.3;

  constructor(x: number, y: number) {
    this.position = createVector(x, y);
    this.target = this.position.copy();
    this.velocity = createVector();
    this.acceleration = createVector();
  }

  steering() {
    var force = this.arrive(this.target);
    var mouse = createVector(mouseX, mouseY);
    var flee = this.flee(mouse);

    flee.mult(10);

    this.applyForce(force);
    this.applyForce(flee);
  }

  applyForce(force: p5.Vector) {
    this.acceleration.add(force);
  }

  arrive(target: p5.Vector) {
    var desired = p5.Vector.sub(target, this.position);
    var distance = desired.mag();
    var speed = this.maxSpeed;
    if(distance < 100) {
      speed = map(distance, 0, 100, 0, this.maxSpeed);
    }
    desired.setMag(speed);
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce)
    return steer;
  }

  flee(target: p5.Vector) {
    var desired = p5.Vector.sub(target, this.position);
    var distance = desired.mag();
    if(distance < 50) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce)
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  show() {
    push();
      strokeWeight(5);
      noFill();
      stroke(255);
      translate(this.position.x, this.position.y);
      point(0, 0);
    pop();
  }
}
