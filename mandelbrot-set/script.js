console.log("Well this codebit started!");
var body = document.getElementsByTagName("body")[0];

function createCanvas() {
	var canvas = document.createElement('canvas');
	canvas.id     = "myCanvas";
	canvas.width  = window.innerHeight;
	canvas.height = window.innerHeight;
	canvas.style.zIndex   = 8;
	canvas.style.position = "absolute";
	canvas.style.border   = "1px solid";
	body.appendChild(canvas);
	return canvas;
}
//create the canvas
var c = createCanvas();
var ctx = c.getContext("2d");
//create controls div
var controls = document.createElement("div");
controls.innerHTML = '<p id="focus">FOCUS: 0,0</p>\
					  <p id="FOV">FOV: 4</p>\
					  <p>Resolution:</p>'
controls.style = "position:absolute;right:5%";
//create the resolution slider
var res = document.createElement("INPUT");
res.type="range";res.min="10";res.max = c.height; res.value = res.max/10; res.step="10";
res.oninput = function() { render(); }
controls.appendChild(res);
//add the controls to the page
body.appendChild(controls);

c.addEventListener('click', function(event) { 
	var x = event.pageX - c.offsetLeft,
        y = event.pageY - c.offsetTop;
    if (y < c.height && x < c.width) { //check it is within the canvas
		//offset by current coords of grid
		x -= c.width/2, y -= c.height/2;
		var FOV = parseFloat(document.getElementById("FOV").innerHTML.slice(5));
		x = x*FOV + getOffset()[0];
		y = y*FOV + getOffset()[1];
        document.getElementById("focus").innerHTML = "FOCUS: "+x+","+y;
		render();
	}
}, false);

var getOffset = function() {
	var offsets = document.getElementById("focus").innerHTML.slice(7).split(",");
	return [parseFloat(offsets[0]), parseFloat(offsets[1])];
}

var changeFOV = function(x) {
	var FOV = document.getElementById("FOV");
	console.log(FOV.innerHTML.slice(5));
	FOV.innerHTML = "FOV: "+ (parseFloat(FOV.innerHTML.slice(5)) * x);
}

//handle key presses
window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case "ArrowDown":
      // Zoom out - increase FOV
	  changeFOV(10/9);
      break;
    case "ArrowUp":
      // Zoom in - increase FOV
	  changeFOV(0.9);
      break;
  }
  
  render();

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

//other variables
const maxIteration = 50;

function render() {
	//render grid
	ctx.fillStyle = "rgba(0,0,0)";
	ctx.fillRect(0,0,c.width,c.height);
	const FOV = parseFloat(document.getElementById("FOV").innerHTML.slice(5));
	const cols = res.value, rows = res.value;
	const interval = c.width / cols;
	for (var row = 0; row < rows; row++) {
		for (var col = 0; col < cols; col++) {
			var c_re = (col + (getOffset()[0]/FOV)/interval - cols/2.0)*FOV/cols;
			var c_im = (row + (getOffset()[1]/FOV)/interval - rows/2.0)*FOV/cols;
			var x = 0; var y = 0;
			var iteration = 0;
			while (x*x+y*y <= 4.0 && iteration < maxIteration) {
				x_new = x*x - y*y + c_re;
				y = 2*x*y + c_im;
				x = x_new;
				iteration += 1;
			}
			if (iteration < maxIteration) {
				ctx.fillStyle = "hsl("+(255-iteration*10)%255+",100%,50%)";
			} else {
				ctx.fillStyle = "rgba(0,0,0)";
			}
			ctx.fillRect(interval*col,interval*row,interval,interval);
		}
	}
	return;
}

render();