//Create variables here
var dog, happyDog, dogNor, database, foodS, foodStock;

function preload()
{
  //load images here
  happyDog = loadImage("images/dogImg1.png");
  dogNor = loadImage("images/dogImg.png");

}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogNor);
  dog.scale = 0.5;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  //add styles here
  fill("white");
  stroke(3);
  textSize(20);
  text("Press UP_ARROW to feed Ken milk", 70, 50);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }
  else{
    x=x-1;
  }

  database.ref('/').update({
   'Food':x
  })
  console.log(x);
}


