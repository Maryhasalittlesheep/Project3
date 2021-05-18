// adventure manager global  
var adventureManager;

// p5.play
var cellSprite;
var playerAnimation;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects


// indexes into the clickable array (constants) 
const start = 0;
const next = 1;
const next2 =2
const start2 =3;


// room indices - look at adventureManager
const Splash = 0;
const Introduction = 1;
const Instruction = 2;
const Character = 3;
const s1 = 4;
const s2 =5;
const s3 =6;
const s4=7;
const s5=8;
const s6=9;
const s7=10;
const s8 =11;
const s9 =12;
const ending1=13;
const ending2=14;
const ending3=15;
const ending4=16;
const ending5=17;
const ending6=18;
const ending7=19;
const ending8=20;
const ending9=21;
const ending10=22;

// Allocate Adventure Manager with states table and interaction tables
function preload() {
  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

  // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  fs = fullscreen();
  print(mouseX,mouseY);
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();

  fill(255);
  textSize(30);
  text(mouseX+mouseY,40,0)
  //sprite 

}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }
}

function mouseReleased() {
  // dispatch all mouse events to adventure manager
  adventureManager.mouseReleased();
}



//-------------- CLICKABLE CODE  ---------------//

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;    
    clickables[i].onPress = clickableButtonPressed
  }

}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#3d6ba8";
  this.noTint = false;
  this.strokeWeight = 0;
  this.tine = "#3d6ba8";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#5282ab";
  this.strokeWeight = 0;
}

clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name);
} 


//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//

// Instructions screen has a backgrounnd image, loaded from the adventureStates table
// It is sublcassed from PNGRoom, which means all the loading, unloading and drawing of that
// class can be used. We call super() to call the super class's function as needed
class SplashRoom extends PNGRoom{
  draw(){
    super.draw()
  }
}
class ScenarioRoom extends PNGRoom {
  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();

    }
}