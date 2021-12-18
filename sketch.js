var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostJump = loadImage("ghost-jumping.png")
}

function setup() {
  createCanvas(600, windowHeight);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(150,250,20,20);
  ghost.addImage("ghost-standing.png", ghostImg)
  ghost.addImage("ghost-jumping.png",ghostJump) 
  ghost.scale = 0.5
  ghost.velocityY = 3
  createEdgeSprites()
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost.setCollider("rectangle",0,20,200,200)
  
  
}

function draw() {
  if(gameState == "play"){
    background(200);
    spookySound.play()
    spawnDoor();
    ghost.velocityY = 3
    if(keyDown("SPACE")){
      ghost.velocityY = -3
      ghost.changeImage("ghost-jumping.png",ghostJump)
    }
    if(keyDown("RIGHT_ARROW")){
      ghost.velocityX = 1
    }
    if(keyDown("LEFT_ARROW")){
      ghost.velocityX = -1
    }
    if(ghost.isTouching(climbersGroup)){
      gameState = "over"
    }
    if(ghost.isTouching(invisibleBlockGroup)){
      ghost.velocityY=0
    }
    if(tower.y > 400){
        tower.y = 300
      }
    if(ghost.y>windowHeight){
      gameState = "over"
    }

  }  
  drawSprites();
  if(gameState == "over"){
    background("black")
    fill("Yellow")
    textSize(50)
    text("Game Over", 300,300)
    spookySound.stop()

  }
}

function spawnDoor(){
  if(frameCount % 250 ==0){
    
    door = createSprite(Math.round(random(100,525)),0);
    climber = createSprite(door.x,door.y+65)
    invisibleBlock = createSprite(door.x,door.y+60,100,40);
    climber.debug = true
    invisibleBlock.visible = false
    door.addImage("door.png", doorImg);
    climber.addImage("climber.png", climberImg)
    door.velocityY = 1
    invisibleBlock.velocityY = door.velocityY
    climber.velocityY = 1
    door.lifetime = 800
    climber.lifetime = 800
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
  }
  
}
