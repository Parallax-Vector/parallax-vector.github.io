console.log("Well this codebit started!");

function createCanvas() {
	var canvas = document.createElement('canvas');
	canvas.id     = "myCanvas";
	canvas.width  = 480;
	canvas.height = 480;
	canvas.style.zIndex   = 8;
	canvas.style.position = "absolute";
	canvas.style.border   = "1px solid";
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	return canvas;
}

function Ant() {
	this.x = 25;//Math.floor(Math.random()*cols);
	this.y = 25;//Math.floor(Math.random()*rows);
	this.dir = 0; //up,right,down,left = 0,1,2,3
	this.grid = [];
	this.mode = 1; //0 = b&w ; 1 = freqhue
	
	this.update = function() {
		//change cell and turn depending on cell state
		if (this.grid[this.y][this.x] <= 0) { //if turned off, switch on
			this.grid[this.y][this.x] = -this.grid[this.y][this.x] + 10;            //set diversity of color
			this.dir += 1; //turn right
		} else {                         //else turn it off
			this.grid[this.y][this.x] = -this.grid[this.y][this.x] - 10;
			this.dir -= 1; //turn left
		}
		this.dir = this.dir % 4 //deal with edge cases
		if (this.dir < 0) {
			this.dir += 4;
		}
		//act on direction
		if (this.dir == 0) { //up
			this.y -= 1;
		} else if (this.dir == 1) {
			this.x += 1;
		} else if (this.dir == 2) {
			this.y += 1;
		} else if (this.dir == 3) {
			this.x -= 1;
		}
		//wrap around edges
		this.x = this.x % cols;
		this.y = this.y % rows;
		if (this.x == -1) {
			this.x += cols;
		}
		if (this.y == -1) {
			this.y += rows;
		}
		return this.grid;
	}
}

var c = createCanvas();
var ctx = c.getContext("2d");

const FPS = 5;

//create a grid
const cols = 50;
const rows = 50;
const xinterval = c.width / cols;
const yinterval = c.height/ rows;

var ant = new Ant(); //create the ant

for (var y = 0; y < rows; y++) {
	var row = [];
	for (var x = 0; x < cols; x++) {
		row.push(0);
	}
	ant.grid.push(row);
}

function draw() {
	ant.update();
	//render grid
	for (var y = 0; y < ant.grid.length; y++) {
		for (var x = 0; x < ant.grid[0].length; x++) {
			if (ant.grid[y][x] <= 0) { //off
				ctx.fillStyle = "hsl(0,0%,100%)";
			} else {                   //on
				if (ant.mode == 0) { //b&w
					ctx.fillStyle = "hsl(0,0%,0%)";
				} else {             //freqhue
					ctx.fillStyle = "hsl("+ant.grid[y][x]%255+",100%,50%)";
				}
			}
			ctx.fillRect(xinterval*x,yinterval*y,xinterval,yinterval);
		}
	}
	return;
}

var run = setInterval(draw,1000/FPS);
