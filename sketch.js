var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var topObstacles, topObstaclesImg, topObstacle1, topObstacle2
var bottomObstacles, bottomObstaclesImg, bottomObstacle1, bottomObstacle2, bottomObstacle3
var restart, restartImg
var gameOver, gameOverImg
var die
var jump

function preload(){
bgImg = loadImage("assets/th.jpg")
topObstacle1 = loadImage("assets/obsTop1.png")
topObstacle2 = loadImage("assets/obsTop2.png")
bottomObstacle1 = loadImage("assets/obsBottom1.png")
bottomObstacle2 = loadImage("assets/obsBottom2.png")
bottomObstacle3 = loadImage("assets/obsBottom3.png")
restartImg = loadImage("assets/restart.png")
gameOverImg = loadImage("assets/gameOver.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

die = loadSound("assets/die.mp3")
jump = loadSound("assets/jump.mp3")
}

function setup(){
createCanvas(windowWidth, windowHeight)
//background image
bg = createSprite(width/2, height/2, width, height);
bg.addImage(bgImg);
bg.scale = 4

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.5;
}

function draw() {
  background("black");

  if (gameState === play){
    // calculating score
    score = score+Math.round(getFrameRate()/61);

        //making the hot air balloon jump
        if(keyDown("space")) {
          balloon.velocityY = -6 ;
              
        }
  
      //adding gravity
        balloon.velocityY = balloon.velocityY + 2;
        spawnBottomObstacles();
        spawnTopObstacles();
        drawSprites();

    gameOver.visible = false
    restart.visible = false


      if (balloon.isTouching(bottomObstacles)||balloon.isTouching(topObstacles)){
        gameState = end
        die.play();
      }
    }
  
    if (gameState === end){
      balloon.velocityY = 0

      bottomObstacles.setVelocityXEach(0)
      topObstacles.setVelocityXEach(0)
  
      bottomObstacles.setLifetimeEach (-1)
      topObstacles.setLifetimeEach (-1)

      gameOver.visible = true
      restart.visible = true
  
      if (mousePressedOver(restart)){
        reset()
      }
    }

function spawnBottomObstacles(){
  if(frameCount % 120 === 0) {
    bottomObstacle = createSprite(width, height-100, 40,10);

    bottomObstacle.velocityX = -(6);

    var r = Math.round(random(1,3))
    switch(r){
      case 1: bottomObstacle.addImage(bottomObstacle1)
      bottomObstacle.scale = 0.2;
      break;
      case 2: bottomObstacle.addImage(bottomObstacle2)
      bottomObstacle.scale = 0.15;
      break;
      case 3: bottomObstacle.addImage(bottomObstacle3)
      bottomObstacle.scale = 0.225;
      break;
      default:break
    }
  }
}

function spawnTopObstacles(){
  if(frameCount % 150 === 0) {
    topObstacle = createSprite(width, 50, 40,10);
 
    topObstacle.velocityX = -(6);

    var r = Math.round(random(1,2))
    switch(r){
      case 1: topObstacle.addImage(topObstacle1)
      topObstacle.scale = 0.3;
      break;
      case 2: topObstacle.addImage(topObstacle2)
      topObstacle.scale = 0.2;
      break;
      default:break
    }
  }
}