var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("images/Dog.png");
happyDog=loadImage("images/happydog.png");
garden=loadImage("images/Garden.png");
washroom=loadImage("images/WashRoom.png");
bedroom=loadImage("images/BedRoom.png");
bedroom=loadImage("images/living Room.png");
}

function setup() {
  database=firebase.database();
  createCanvas(600,600);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  

}

function draw() {
  background("yellow")
  writeStock(foodS)
  if(gameState===1){
  dog.addImage(happyDog)
  dog.scale=0.175
  dog.y=250
  }

  if(gameState===2){
    dog.addImage(sadDog)
    dog.scale=0.175
    milkbottle2.visible=false;
    dog.y=250
  }
  var bath=createButton("I want to take bath")
  bath.position(580,125)
  if(bath.mousePressed(function(){
    gameState=3
    database.ref('/').update({'gameState':gameState});
  }))
  if(gameState===3){
    dog.addImage(washroom)
    dog.scale=1
    milkbottle2.visible=false
  }

  var Sleep=createButton("I am very sleepy")
  Sleep.position(710,125)
  if(Sleep.mousePressed(function(){
    gameState=4
    database.ref('/').update({'gameState':gameState});
  }))
  if(gameState===4){
    dog.addImage(bedroom)
    dog.scale=1
    milkbottle2.visible=false
  }
  
  var play=createButton("let's play!")
  play.position(500,160)
  if(play.mousePressed(function(){
    gameState=5
    database.ref('/').update({'gameState':gameState});
  }))
  if(gameState===5){
    dog.addImage(livingroom)
    dog.scale=1
    milkbottle2.visible=false
  }

  var PlayInGarden=createButton("let's play in park")
  PlayInGarden.position(585,160)
  if(PlayInGarden.mousePressed(function(){
    gameState=6
    database.ref('/').update({'gameState':gameState});
  }))
  if(gameState===6){
    dog.y=175
    dog.addImage(garden)
    dog.scale=1
    milkbottle2.visible=false
  }
  
  foodObj.display()
 

  if(foodS == 1){
  dog.addImage(happyDog)
  milkbottle2.visible=false;
  }else{
    dog.addImage(sadDog)
    milkbottle2.visible=true;
  }
  //console.log(hour())
  currentTime=hour();
  if(currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
   }else if(currentTime==(lastFed+2)){
    update("Sleeping");
      foodObj.bedroom();
   }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
      foodObj.washroom();
   }else{
    update("Hungry")
    foodObj.display();
   }
   
   if(gameState!="Hungry"){
     feed.hide();
     addFood.hide();
     dog.remove();
   }else{
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
   }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
}
  function writeStock(x){
    database.ref('/').update({
      Food:x
    })
  }



//function to update food stock and last fed time


//function to add food in stock


//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}