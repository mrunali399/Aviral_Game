var backImage,backgr;
var player, player_running;
var ground,ground_img;

//var FoodGroup, bananaImage;
var obstaclesGroup, obstacle3,obstacle1,obstacle2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver; 
var score=0;
//var attempts=3;
var restart,restartImg
function preload(){
  backImage=loadImage("bg.jpg");
  player_running = loadAnimation("hero.gif");
 // bananaImage = loadImage("banana.png");
  obstacle3 = loadImage("stone.png"); 
  obstacle1=loadImage("2.png")
  obstacle2=loadImage("6.png")
  restartImg = loadImage("restart.png");

 
}

function setup() {
  createCanvas(800,400);
   
  //Background
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  //Player
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.25;
  
  //Ground
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  

  restart = createSprite(400,200);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  restart.visible = false;
  
 
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() { 
  background(0);
  drawSprites();
  
  stroke("red");
  textSize(20);
  fill("white");
  text("Score: "+ score, 550,50);
  
  if(gameState===PLAY){
  
    
    score = score + Math.round(getFrameRate()/60);
    
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
   
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }

    //Gravity
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
   
    spawnObstacles();  
 
    if(obstaclesGroup.isTouching(player)){ 
        gameState = END;
    }
  }else if(gameState === END){

    backgr.velocityX = 0;
    player.visible = false;
    restart.visible = true;
    
   
    obstaclesGroup.destroyEach();


    if(mousePressedOver(restart)) {
      reset();
    }

    textSize(30);
    fill(255);
    text("Game Over!", 310,160);
  }
}



function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(600,300,20,30);
    obstacle.setCollider('circle',0,0,45)
    // obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.25
    obstacle.lifetime = 300;
   // obstacle.depth = trex.depth;
   // trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
 
  restart.visible = false;
  player.visible = true;
  backgr.velocityX=-4;
  
  obstaclesGroup.destroyEach();
  
  
  
  score = 0;
  
}

