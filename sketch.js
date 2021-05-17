/***********************************************************************************
  Project 3
  by Mary Huang
***********************************************************************************/

// adventure manager global  
var adventureManager;

// p5.play
var playerSprite;
var playerAnimation;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects

// character arrays
var characterImages = [];   // array of character images, keep global for future expansion
var characters = [];        // array of charactes



// Allocate Adventure Manager with states table and interaction tables
function preload() {
  
  allocateCharacters();

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
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

 // drawCharacters();

  // don't draw them on first few screens
  if( adventureManager.getStateName() === "Splash" ||
      adventureManager.getStateName() === "Instructions" ||
      adventureManager.getStateName() === "Characters" ) {
    ;
  }
  else {
    drawCharacters();
  }
  
  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();
}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }

  // dispatch all keys to adventure manager
  adventureManager.keyPressed(key); 
}

function mouseReleased() {
  // dispatch all mouse events to adventure manager
  adventureManager.mouseReleased();
}

function drawCharacters() {
  for( let i = 0; i < characters.length; i++ ) {
    characters[i].draw();
  }
}

//-------------- CLICKABLE CODE  ---------------//

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;    
  }

  // we do specific callbacks for each clickable
  clickables[0].onPress = clickableButtonPressed;
  clickables[1].onPress = clickableButtonPressed;
  clickables[2].onPress = clickableButtonPressed;
  clickables[3].onPress = clickableButtonPressed;
  clickables[4].onPress = clickableButtonPressed;
  clickables[5].onPress = clickableButtonPressed;
  clickables[6].onPress = clickableButtonPressed;
  clickables[7].onPress = clickableButtonPressed;
  clickables[8].onPress = clickableButtonPressed;
  clickables[9].onPress = clickableButtonPressed;
  clickables[10].onPress = clickableButtonPressed;
  clickables[11].onPress = clickableButtonPressed;
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#AAAAAA";
}

clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name);
} 

//-- specific button callbacks: these will add or subtrack anger, then
//-- pass the clickable pressed to the adventure manager, which changes the
//-- state. A more elegant solution would be to use a table for all of these values
clGoomazonPays = function() {
    characters[goomazon].addAnger(2);
    characters[nimby].subAnger(1);
    characters[bigLabor].addAnger(1);
    adventureManager.clickablePressed(this.name);
}

clCityPays = function() {
  characters[mayor].addAnger(1);
  characters[nimby].subAnger(1);
  characters[goomazon].subAnger(2);
  adventureManager.clickablePressed(this.name);
}

clRaiseTaxes = function() {
  characters[nimby].addAnger(1);
  characters[consumer].addAnger(1);
  characters[treeHugger].addAnger(1);
  characters[goomazon].subAnger(1);
  adventureManager.clickablePressed(this.name);
}

clBuildRival = function() {
  characters[nimby].addAnger(2);
  characters[consumer].subAnger(1);
  characters[goomazon].addAnger(1);
  characters[bigLabor].addAnger(1);
  adventureManager.clickablePressed(this.name);
}

clIgnoreThem = function() {
  characters[nimby].addAnger(1);
  characters[treeHugger].addAnger(1);
  characters[bigLabor].addAnger(1);
  adventureManager.clickablePressed(this.name);
}

clCutArts = function() {
  characters[treeHugger].addAnger(2);
  characters[consumer].addAnger(2);
  characters[mayor].addAnger(1);
  adventureManager.clickablePressed(this.name);
}

clCutTransportation = function() {
  characters[treeHugger].addAnger(3);
  characters[mayor].addAnger(1);
  characters[consumer].addAnger(1);
  adventureManager.clickablePressed(this.name);
}

clCutCityWages = function() {
  characters[mayor].addAnger(2);
  characters[bigLabor].addAnger(2);
  characters[consumer].addAnger(1);
  adventureManager.clickablePressed(this.name);
}

clCutParks = function() {
  characters[mayor].addAnger(1);
  characters[treeHugger].addAnger(2);
  characters[consumer].addAnger(1);
  adventureManager.clickablePressed(this.name);
}





//-------------- CHARACTERS -------------//
function allocateCharacters() {
  // load the images first
  characterImages[goomazon] = loadImage("assets/goomazon.jpg");
  characterImages[mayor] = loadImage("assets/mayor.jpg");
  characterImages[bigLabor] = loadImage("assets/bigLabor.jpg");
  characterImages[nimby] = loadImage("assets/nimby.jpg");
  characterImages[treeHugger] = loadImage("assets/treeHugger.jpg");
  characterImages[consumer] = loadImage("assets/consumer.jpg");

  for( let i = 0; i < characterImages.length; i++ ) {
    characters[i] = new Character();
    characters[i].setup( characterImages[i], 50 + (400 * parseInt(i/2)), 120 + (i%2 * 120));
  }

  // default anger is zero, set up some anger values
  characters[bigLabor].addAnger(1);
  characters[nimby].addAnger(2);
  characters[treeHugger].addAnger(1);
  characters[consumer].subAnger(2); // test
}

class Character {
  constructor() {
    this.image = null;
    this.x = width/2;
    this.y = width/2;
  }

  setup(img, x, y) {
    this.image = img;
    this.x = x;
    this.y = y;
    this.anger = 0;
  }

  draw() {
    if( this.image ) {
      push();
      // draw the character icon
      imageMode(CENTER);
      image( this.image, this.x, this.y );

      // draw anger emojis
      for( let i = 0; i < this.anger; i++ ) {
        image(angerImage, this.x + 70 + (i*40), this.y +10 );
      }

      pop();
    }
  }

  getAnger() {
    return this.anger;
  }

  // add, check for max overflow
  addAnger(amt) {
    this.anger += amt;
    if( this.anger > maxAnger ) {
      this.anger = maxAnger;
    }

  }

  // sub, check for below zero
  subAnger(amt) {
    this.anger -= amt;
    if( this.anger < 0 ) {
      this.anger = 0;
    }
  }
}



//-------------- SUBCLASSES / YOUR DRAW CODE CAN GO HERE ---------------//

// Instructions screen has a backgrounnd image, loaded from the adventureStates table
// It is sublcassed from PNGRoom, which means all the loading, unloading and drawing of that
// class can be used. We call super() to call the super class's function as needed
class ScenarioRoom extends PNGRoom {
  // Constructor gets calle with the new keyword, when upon constructor for the adventure manager in preload()
  constructor() {
    super();    // call super-class constructor to initialize variables in PNGRoom

    this.titleText = "";
    this.bodyText = "";
  }

  // should be called for each room, after adventureManager allocates
  setText( titleText, bodyText ) {
    this.titleText = titleText;
    this.bodyText = bodyText;
    this.drawY = 360;
    this.drawX = 52;
  }

  // call the PNGRoom superclass's draw function to draw the background image
  // and draw our instructions on top of this
    draw() {
      // this calls PNGRoom.draw()
      super.draw();
      
      push();

      // title text
      fill(255);
      textAlign(LEFT);
      textFont(headlineFont);
      textSize(36);

      text("How do we feel?", this.drawX , 60);

      // title text
      textSize(30);

      text(this.titleText, this.drawX , this.drawY);
     
      // Draw text in a box
      //text(this.titleText, width/6, height/6, this.textBoxWidth, this.textBoxHeight );
    
      textFont(bodyFont);
      textSize(24);

      text(this.bodyText, this.drawX , this.drawY + 60, width - (this.drawX*2),height - (this.drawY+100) );
      
      pop();
    }
}

