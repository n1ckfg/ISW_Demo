"use strict";

var player;
var bg;

function setup() {
	var canvas = createCanvas(640, 480);
	canvas.parent("canvas1");
	canvas.drop(gotFile);
	imageMode(CENTER);

	player = new Player();
	bg = new Background();
}

function draw() {
	background(127);

	if (player.img != null) player.run();
	if (bg.img != null) bg.run();
}

function keyPressed() {
	if (keyCode === LEFT_ARROW) {
		player.moveLeft();
	}
	if (keyCode === RIGHT_ARROW) {
		player.moveRight();
	}
	if (keyCode === UP_ARROW) {
		player.moveUp();
	}
	if (keyCode === DOWN_ARROW) {
		player.moveDown();
	}
}

function gotFile(file) {
	if (file.type === "image") {
		if (file.name === "background.png") {
			var img = createImg(file.data).hide(); // create an image DOM element
	  		bg.img = img;
  		} else if (file.name === "player.png") {
			var img = createImg(file.data).hide(); // create an image DOM element
	  		player.img = img;
  		}
	}
}

class Player {

	constructor() {
		this.img;
		this.speed = 0.1;
		this.delta = 10;
		this.pos = createVector(width/2, height/2);
		this.cursor = createVector(width/2, height/2);
	}

	loadImg(_img) {
		this.img = _img;
	}

	run() {
		this.pos.x = lerp(this.pos.x, this.cursor.x, this.speed);
		this.pos.y = lerp(this.pos.y, this.cursor.y, this.speed);
		image(this.img, this.pos.x, this.pos.y);
	}

	moveUp() {
		this.cursor.y -= this.delta;
	}

	moveDown() {
		this.cursor.y += this.delta;
	}

	moveLeft() {
		this.cursor.x -= this.delta;
	}

	moveRight() {
		this.cursor.x += this.delta;
	}

}

class Background {

	constructor() {
		this.img;
	}

	loadImg(_img) {
		this.img = _img;
	}

	run() {
		image(this.img, width/2, height/2, width, height);
	}

}