var meter;
var textEntity;

function preload() {
  textEntity = new TextEntity('Sample');
  textEntity.setFont('/assets/yerbaluisa_demo-font-FFP.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  meter = new FPSmeter();

  textEntity.getParticles(windowWidth / 2 - 200, windowHeight / 2);
}

function draw() {
  background(51);

  textEntity.displayParticles();
  // textEntity.display(windowWidth / 2 - 200, windowHeight / 2);

  meter.tick();
}
