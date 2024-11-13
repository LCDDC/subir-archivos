var PLAY = 1;
var END = 0;
var GameState = PLAY;

var trex, trex_running, trex_collide;

var ground, invisibleGround, groundImage;

var cloudGroup, cloudImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var gameOverImg;
var restartImg;

var jumpSound, checkpointSound, dieSound;

function preload(){
    trex_running = loadAnimation("trex1.png", "trex2.png", "trex3.png");
    trex_collided = loadImage("trex_collided.png");
    cloudImage = loadImage("cloud.png");
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    restartImg = loadImage("restart.png");
    gameOverImg = loadImage("gameOver.png");
    groundImg = loadImage("ground2.png");
    jumpSound = loadSound("jump.mp3");
    checkpointSound = loadSound("checkPoint.mp3");
    dieSound = loadSound("die.mp3");
}

function setup() {
    createCanvas(600, 200);
    
    trex = createSprite(50,180,20,50);
    trex.addAnimation("running", trex_running);
    trex.addAnimation("collided" ,trex_collided);
  
    trex.scale = 0.5;
    
    ground = createSprite(200,180,400,20);
    ground.addImage("ground",groundImage);
    ground.x = ground.width /2;
    
     gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(300,140);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.5;
    
    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;
    
    //crear grupos de obstáculos y nubes
    obstaclesGroup = createGroup();
    cloudsGroup = createGroup();
    
    console.log("Hola" + 5);
    
    trex.setCollider("circle",0,0,40);
    trex.debug = false
    
    score = 0;
    
  }

function draw(){
    background(180);
    text("Puntuacion: "+score, 500, 50);
    console.log("Esto es", GameState);
    if(GameState===PLAY){
        gameOver.visible = false;
        restart.visible = false;
        ground.velocityX = -(4+3* score/100);
        score = score+Math.round(frameCount/60);
        if(score>0 &&score%100 ===0){
            checkpointSound.play();
        }
        if(ground.x<0){
            ground.x = ground.width/2;
        }
        if(keyDown("space")&&trex.y>=100){
            trex.velocityY = -12;
            jumpSound.play();
        }
        trex.velocityY = trex.velocityY+0.91
        spawnClouds();
        spawnObstacles();
        //regresar a este punto al terminar las dos funciones anteriores
    }
    drawSprites();
}

function spawnObstacles(){
if(frameCount % 60 ===0){
    var obstacle = createSprite(400, 165, 10, 40)
    obstacle.velocityX = -(6+score/100);
    var rand = Math.round(random(1,6));
    switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle1);
                break;
        case 3: obstacle.addImage(obstacle1);
                break;
        case 4: obstacle.addImage(obstacle1);
                break;
        case 5: obstacle.addImage(obstacle1);
                break;
        case 6: obstacle.addImage(obstacle1);
                break;
        default: break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
    }
    }
function spawnClouds(){
if (frameCount % 60 === 0) {
     cloud = createSprite(600, 100, 40, 10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;

    cloud.lifetime = 200;

    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;

    cloudsGroup.add(cloud);
    }
}