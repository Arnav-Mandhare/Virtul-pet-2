//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dog1,dog2;
var fedTime, lastFed;
var feedthedog,addFood;
var foodObj;
var fedTime, lastFed;



function preload()
{
  dog1 = loadImage("Dog.png");
  dog2 = loadImage("happydog.png");
  
  
  
}

function setup() {
  createCanvas(1000,1000);

  database=firebase.database();

  foodStock = database.ref('food')
  foodStock.on("value",readStock)
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dog1);
  dog.scale=0.5

  feed = createButton("Feedthedog");
  feed.position(700,95);
  feed.mousePreesed(feeddog);

  addFood = createButton("addFood");
  addFood.position(800,95);
  addFood.mousePreesed(addFoods);
}


function draw() {  

  background("green");

  feedTime=database.ref('FeedTime');
  feedTime.on("value",function(data)){
    lastFed = data.val();
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill(255,255,254);
  if(lastFed>12){
    text("last Feed :"+ lastFed%12 + "PM",350,30);
  }else if(lastFed == 0){
    text("last Feed : 12 AM",350,30);
  }else{
    text("last Feed :"+ lastFed + " AM",350,30);
  }
  
}

function readStock(data){
foodS=data.val();
}

function writeStock(x){

  if(x<0){
    x=0;
  }else{
    x=x+1
  }

  database.ref('/').update({
    food:x
  })
  
  

}

function addFoods(){
 foodS++
 database.ref('/').update({
   Food:foodS
 })

}
function feedthedog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    FeedTime:hour();
  })
}

