//this is made with p5js framework
//Highly inspired by Daniel Shiffman from Coding Train
let s;// mah snake, lah lah lah
let scl =20;//to scale the elements to the respective sizes required to play the game in good style
let food;// yeah, couldn't find a better name for that insignificant little grain :(
function setup(){  // a very well known function in p5js, used for setting up the basic attributes, like size of screen, initialise new objects,yada yada yada
	createCanvas(1480,700) //setting up the size of the canvas to roughly meet the size of the browser
	s = new Snake(); //creating new snake object 's' of class Snake
	frameRate(10); //to give the 'retro' feel
	pickLocation(); //this function is defined below
}

function pickLocation(){ //this function is used to pick any location between the width and height of the screen
	let cols = floor(width/scl); //used to define and match the smallest possible col size for the given scale
	let rows = floor(height/scl); //used to define and match the smallest possible row size for the given scale
	food = createVector(floor(random(cols)),floor(random(rows))); //random function is used to assign a random row and column for the food, and floor function ensures, that the pixels are properly placed
	food.mult(scl); //to match the size of food to scale of the canvas
}

function draw(){ //another well known function in p5js, this function is used to draw all the specific things that are present in the game
	background(51); //this is used to create a background color of the canvas a certain value from 0-255, 0 denoting black, 255-white
	s.update(); //function defined below
	s.show();  //function defined below
	if(s.eat(food)){ //eat function is defined below :), however this condition is basically checking if the snake eats the food
		pickLocation(); //if it does, the food is assigned a new random location by calling pickLocation function
	}
	s.death(); //function defined below... you can guess well hell is below as well, enough rhyming
	fill(204,204,0); //that's the color of food
	rect(food.x, food.y,scl,scl); //food a grain, a rectangle ;-;
}

function keyPressed(){ //finds the key pressed by the user and performs the task accordingly
	if(keyCode === UP_ARROW){  //up arrow is used for giving up direction
		s.dir(0,-1); //this is used to cause the snake to move 1 step in the direction of the coordinate (0,-1)
	}
	else if(keyCode === DOWN_ARROW){ //down arrow is used for giving down direction
		s.dir(0,1); //this is used to cause the snake to move 1 step in the direction of the coordinate (0,1)
	}
	else if(keyCode === RIGHT_ARROW){ //right arrow is used for giving right direction
		s.dir(1,0); //this is used to cause the snake to move 1 step in the direction of the coordinate (1,0)
	}
	else if(keyCode === LEFT_ARROW){ //left arrow is used for giving left direction
		s.dir(-1,0); //this is used to cause the snake to move 1 step in the direction of the coordinate (-1,0)
	} //dir refers to direction here, however note that dir is not defined yet, it will be, in the Snake class
}//end of keyPressed function
function Snake(){//like a constructor function
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.total = 0;
	this.tail = [];
	//all variables were defined
	this.dir = function(x,y){ //definition of dir i.e. direction function
		this.xspeed = x; //speed in the x coordinate axis
		this.yspeed = y; //speed in the y coordinate axis
	} //end of dir function

	this.update = function(){ //definition of update function
		if(this.total === this.tail.length){ //this checks whether the length of the snake is currently equal to the tail length
			//if it is, we run a loop to move each previous block of tail to the back of the array(snake after 0th position(head))
			for(let i = 0; i < this.tail.length-1; i++){
			this.tail[i] = this.tail[i+1];
		}
	}// end of update function
		this.tail[this.total-1] = createVector(this.x, this.y);
		this.x += (this.xspeed*scl); //change the position of x coordinate of the snake after each step change in position 
		// xspeed scaled to scl
		this.y += (this.yspeed*scl); //change the position of y coordinate of the snake after each step change in position
		// yspeed scaled to scl
		this.x = constrain(this.x, 0, width-scl); //providing a constrain for the snake to move only within the given width of box
		this.y = constrain(this.y, 0, height-scl); //providing constrain for the snake to move only within the given height of box
	}

	this.show = function(){
		fill(240);
		for(let i = 0; i < this.total; i++){
			rect(this.tail[i].x,this.tail[i].y,scl,scl);
		}
		
		rect(this.x, this.y, scl,scl);
	}

	this.eat = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y);
		if(d < 1){
			this.total++;
			return true;
		}
		else
			return false;
	}
	this.death = function(){
		for(var i = 0; i < this.tail.length; i++){
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if(d < 1){
				total = 0;
				this.tail = [];
			}
		}
	}
}
// yay! finished it within 100 lines of code
