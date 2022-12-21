var bg, bgImg;
var bottomGround;
var topGround;
var balloon, balloonImg;
var obs1, obs2, obs3, obs1Image, obs2Image, obs3Image;
var gameState;
var obstacleGrup;
var numAleatorio;
var balloonParado;
var score = 0;
var buttonRestart, buttonRestartImg;
var button;

function preload() {
  bgImg = loadImage('assets/bg.png');
  obs1Image = loadImage('assets/obs1.png');
  obs2Image = loadImage('assets/obs2.png');
  obs3Image = loadImage('assets/obs3.png');
  buttonRestartImg = loadImage('assets/restart.png');
  balloonParado = loadAnimation('assets/balloon2.png');
  balloonImg = loadAnimation(
    'assets/balloon1.png',
    'assets/balloon2.png',
    'assets/balloon3.png'
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //imagem de plano de fundo
  // bg = createSprite(165, 485, 1, 1);
  // bg.addImage(bgImg);
  // bg.scale = 4.3;

  gameState = 'pausar';
  obstacleGrup = new Group();
  //criando canto superior e inferior
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //criando o balão
  balloon = createSprite(100, height - 250, 20, 50);
  balloon.addAnimation('balloon', balloonImg);
  balloon.addAnimation('balloonParado', balloonParado);
  balloon.scale = 0.2;

  //criando o botão
  // buttonRestart = createButton('ok');
  //buttonRestart = createImg('assets/restart.png');
  //buttonRestart.mousePressed(reiniciar);
  // buttonRestart.position(width / 2, 100);

  // button = createButton('click me');
  //button.position(0, 0);
  // button.mousePressed(reiniciar);

  buttonRestart = createSprite(width / 2, 100);
  buttonRestart.addImage(buttonRestartImg);
  buttonRestart.visible = false;
}
function draw() {
  background('black');
  image(bgImg, 0, 0, windowWidth, windowHeight);

  textSize('20');
  text('pontuação = ' + score, width - 200, 200);

  //fazendo o balão de ar quente pular
  if (gameState === 'pausar') {
    stroke('red');
    textSize('40');
    textAlign(CENTER, CENTER);
    text('tecle enter para começar', width / 2, height / 2);

    if (keyDown('enter')) {
      gameState = 'play';
    }
  }
  if (gameState === 'play') {
    score = Math.round(frameCount / 100);

    if (keyDown('space')) {
      balloon.velocityY = -6;
    }
    if (keyDown('right')) {
      balloon.velocityX = +6;
    }
    if (keyDown('left')) {
      balloon.velocityX = -6;
    }
    if (balloon.y < height / 2 && balloon.scale > 0.2) {
      balloon.scale -= 0.005;
    } else {
      balloon.scale += 0.005;
    }

    //adicionando gravidade
    balloon.velocityY = balloon.velocityY + 1;

    if (frameCount % 120 === 0) {
      numAleatorio = Math.round(random(1, 3));
      obstacles(numAleatorio);
    }
    if (obstacleGrup.isTouching(balloon)) {
      gameState = 'fim';
      balloon.velocityX = 0;
      balloon.velocityY = 0;
      balloon.y = height - 50;
      balloon.changeAnimation('balloonParado');
    }
  }

  if (gameState === 'fim') {
    obstacleGrup.destroyEach();
    score = 0;
    buttonRestart.visible = true;
    if (buttonRestart.mousePressed()) {
      reiniciar();
    }
  }
  drawSprites();
}

function obstacles(tipoObs) {
  var obstacle = createSprite(width - 50, height - 100, 30, 60);
  if (tipoObs === 1) {
    obstacle.addImage(obs1Image);
  } else if (tipoObs === 2) {
    obstacle.addImage(obs2Image);
  } else {
    obstacle.addImage(obs3Image);
  }
  obstacle.velocityX = -3;
  obstacle.scale = 0.3;
  obstacleGrup.add(obstacle);
  obstacle.lifetime = 400;
}

function reiniciar() {
  score = 0;
  gameState = 'pausar';
  balloon.changeAnimation(balloon);
}
