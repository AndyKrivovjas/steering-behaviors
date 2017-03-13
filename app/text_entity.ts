class TextEntity {
  value: string;
  font: p5.Font;
  fontSize: number = 256;
  particles: Particle[] = [];

  constructor(s: string) {
    this.value = s;
  }

  setFont(path: string) {
    this.font = loadFont(path);
  }

  setFontSize(size: number) {
    this.fontSize = size;
  }

  getParticles(x: number, y: number) {
    var self = this;

    var pixels = self.font.textToPoints(this.value, x, y, this.fontSize, {
      sampleFactor: 0.4
    });
    pixels.forEach(function(pixel) {
      var particle = new Particle(pixel.x, pixel.y);
      self.particles.push(particle);
    });
  }

  displayParticles() {
    this.particles.forEach(function(item) {
      item.steering();
      item.update();
      item.show();
    });
  }

  display(x: number, y: number) {
    push();
      fill(255);
      textFont(this.font);
      textSize(this.fontSize);
      text(this.value, x, y);
    pop();
  }
}
