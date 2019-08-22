var drops = 2500;
var myRain = [];
var opacity = 100;

function Rain() {
	this.dX;
	this.dY;
	this.rX;
	this.rY;
	this.eol;
	this.speed;
	this.rMax;
	this.cOffset;
	this.drawDroplet = () => {
		stroke(color(40 + this.cOffset, 60  + this.cOffset, 140 + this.cOffset));
		if(this.dX >= width) {
			this.dX = 0;
		}

		if(this.dY >= width) {
			this.spawnRain();
		}
		this.dY += 6 * this.speed;
		point(this.dX, this.dY);
	};
	this.drawRipple = () => {
		stroke(color(20 + this.cOffset, 40  + this.cOffset, 120 + this.cOffset, 100));
		this.rX += 1;
		this.rY += .25;
		ellipse(this.dX, this.dY, this.rX, this.rY)
	};
	this.spawnRain = () => {
			this.dY = 0
			this.dX = Math.floor(Math.random() * width);
			this.eol = Math.floor(Math.random() * (height - height * .7) + height * .7);
			this.rX = 0;
			this.rY = 0;
			this.rMax = Math.floor(30 * (this.eol - (height * .7)) / (height - height * .7) + 1);
			this.cOffset = Math.floor(30 * (this.eol - (height * .7)) / (height - height * .7) * 4)
			this.speed = Math.random() + 1
	}
}

	for(let x = 0; x < drops; x++){
		myRain.push(new Rain);
	}

function setup(){
	frameRate(30);
	createCanvas(window.innerWidth, window.innerHeight);
	stroke(color(255));
	noFill();
	background(color(255,255,255,255));
}

function draw(){
	//background
	noStroke();
	if(Math.random() > .99) {
  fill("black");
  
	endShape();
		fill(color(200,200,200,opacity));
	} else {
		fill(color(30, 42, 79, opacity));
	}
	rect(0,0,width,height * .7);
	rect(0,height * .7, width, height * .3);
	
	//rain
	for(let i in myRain) {
		if(myRain[i].dY < myRain[i].eol && myRain[i].rX < myRain[i].rMax ){
			myRain[i].drawDroplet();
		} else if ( myRain[i].dY >= myRain[i].eol && myRain[i].rX < myRain[i].rMax ) {
			myRain[i].drawRipple();
		} else {
			if(Math.random() > .99){ // broke it here
				myRain[i].spawnRain();
			}
		}
	}
}

window.onresize = function() {
	setup();
}