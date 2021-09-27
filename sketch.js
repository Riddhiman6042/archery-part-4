const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine, world;
let canvas;
let palyer, playerBase, playerArcher;
let playerArrows = [];
let baseimage;
let playerimage;

function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  let options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world, player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );

  arrow = new PlayerArrow(
    playerArcher.body.position.x,
    playerArcher.body.position.y,
    100,
    10
  );
}

function draw() {
  background(backgroundImg);
  image(baseimage, playerBase.position.x, playerBase.position.y, 180, 150)
  image(playerimage, player.position.x, player.position.y, 50, 180)
  Engine.update(engine);

  playerArcher.display();
  arrow.display();

  if (keyCode === 32) {
    arrow.shoot(playerArcher.body.angle);
  }

  for (let i = 0; i < playerArrows.length; i++) {
    if (playerArrows[i]) {
      Matter.Body.setVelocity(playerArrows[i].body, {
        x: 2.9,
        y: 0
      });

      playerArrows[i].display();
    }
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
}

// creating a new arrow when the space key is pressed
function keyPressed() {
  if (keyCode === 32) {
    let posX = playerArcher.body.position.x;
    let posY = playerArcher.body.position.y;
    let angle = playerArcher.body.angle;
    let arrow = new PlayerArrow(posX, posY, 100, 10, angle);

    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

// throwing the arrow when the space key is released
function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      let angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}