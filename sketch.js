//variables
var ground;
var ironMan, ultron;
var ironManImg1, ironManImg2, ultronImg1, ultronImg2,spaceImg,spaceImg2;
var edges;
var serve;
var play;
var end ;
var gameState=serve;
var ultronsGroup;
var life=0;
var score=0;
var restart, restartImg;

function preload(){
  //loaded the images
  spaceImg = loadImage("spaceImg.png");
  spaceImg2 = loadImage("spaceImg2.png");

  ironManImg1 = loadImage("ironman1.png");
  ironManImg2 = loadImage("ironman2.png");

  ultronImg1 = loadImage("ultron1.png");
  ultronImg2 = loadImage("ultron2.png");

  restartImg = loadImage("restart.png");
}

function setup() {
  //created the canvas
  createCanvas(1000,550);
  //created the objects and added images
  ground = createSprite(350, 275, 200, 20);
  ironMan = createSprite(50,280,20,10);
  ironMan.addImage("ironManFlying",ironManImg1);
  ground.addImage("bgImg",spaceImg);

  ground.velocityX = -(6 + 3*score/100);

  //adjusting the background
  ground.scale=ground.scale+0.5;
  var edges = createEdgeSprites();
  ultronsGroup=new Group();
  restart = createSprite(500,300);
  restart.addImage("resetImg",restartImg);

  score = 0;
  
}

function draw() { 
  //setting the background
  background(spaceImg2);  
  text("Score: "+ score, 500,150);

if(gameState===serve){
  ground.velocityX=0;
  ironMan.velocityX=0;
  textSize(20);
  fill("white")
  text("Press UP and DOWN key to control IronMan. Do not touch the ultron bots and make it as far as you can. You will get 5 lives to destroy Ultron. Space bar to continue. All the best gamer!",500,300)

if(keyDown("space")){
  gameState=play
}
}

  if(gameState===play){

 restart.visible=false;
 //adding velocity to ground making it infinite
    ground.velocityX = -4;
    if(ground.x<0){
      ground.x = ground.width/2
    }

    /* if(ironMan.isTouching(edges)){
       ironMan.x=50;
       ironMan.y=280;yy
    }*/
    
      //controls for ironMan
    if(keyDown(UP_ARROW)){
      ironMan.y = ironMan.y-4
    }
    if(keyDown(DOWN_ARROW)){
      ironMan.y = ironMan.y+4
    }
    //call the functions
    spawnUltrons();

    if(ultronsGroup.isTouching(ironMan)){
      ironMan.destroy();
      gameState=end;
    }

  }
else if(gameState===end){
  ground.velocityX=0;
  ultronsGroup.destroyEach();
  restart.visible=true;
  restart.scale = 0.2;

if(mousePressedOver(restart)){
  reset();
}

}

  drawSprites();
  textSize(18)
  fill("white")
  text("Lives:"+ life, 500,100)

}
//function to spawn ultrons randomly
function spawnUltrons(){
  if(frameCount%120===0){
    ultron = createSprite(1000,300,20,20);
    ultron.addImage("ultronFlying",ultronImg1);
    ultron.velocityX = -4
    ultron.y = Math.round(random(50,500));
    ultron.lifetime=250;
    ultronsGroup.add(ultron);
  }
}

function reset(){
gameState=play;
life=0
score=0;
}