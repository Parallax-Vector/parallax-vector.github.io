function createCanvas() {
	var canvas = document.createElement('canvas');
	canvas.id     = "myCanvas";
	canvas.width  = 640;
	canvas.height = 640;
	canvas.style.zIndex   = 8;
	canvas.style.position = "absolute";
	canvas.style.border   = "1px solid";
	var body = document.getElementsByTagName("body")[0];
	body.appendChild(canvas);
	return canvas;
}
//create the canvas
var c = createCanvas();
var ctx = c.getContext("2d");

// Create input for user to give a text file
//insert html drag and drop zone
var code = '<div id="drop_zone" style="border:1px black dashed; float:right;width:20%;height:10%;text-align:center;">Drop files here</div>\
			<a href="" id="downloadButton" download><button style="float:right;height:2em;width:8em;">Download</button></a>';
c.insertAdjacentHTML("beforebegin", code);

// handle the file in javascript 
function handleFileSelect(evt) {
evt.stopPropagation();
evt.preventDefault();

var files = evt.dataTransfer.files; // FileList object.

var f = files[0];
var reader = new FileReader();
reader.onload = function(e) {
    processText(e.target.result);
};
reader.readAsText(f);
}

function handleDragOver(evt) {
evt.stopPropagation();
evt.preventDefault();
evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the d'n'd listeners.
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
const FPS = 20;

function processText(txt) {
	//force lower
	txt = txt.toLowerCase();
	//remove punctuation
	txt = txt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
	//turn to array
	var lines = txt.split("\n");
	var words = []
	for (var i = 0; i < lines.length; i++) {
		var line = lines[i].split(" ");
		words.push.apply(words,line);
	}
	console.log(words);
	var word_cols = {};
	var grid = [];
	for (var y = 0; y < words.length; y++) {
		var row = [];
		for (var x = 0; x < words.length; x++) {
			if (words[x] == words[y]) {
				if (word_cols.hasOwnProperty(words[x])) {
					row[x] = word_cols[words[x]];
				} else {
					//generate a colour for that word
					word_cols[words[x]] = [Math.random()*360,50]; //using HSL this is H and L
					row[x] = word_cols[words[x]];
				}
			} else {
				row[x] = [0,0];
			}
		}
		grid[y] = row;
	}
	//need to render the grid
	for (var y = 0; y < grid.length; y++) {
		for (var x = 0; x < grid[y].length; x++) {
			//draw a rectangle of that color....
			var wordcol = grid[y][x];
			ctx.fillStyle = "hsl("+wordcol[0]+",100%,"+wordcol[1]+"%)"; //Implementing HSL
			ctx.fillRect(c.width/grid.length * x, c.height/grid.length * y, c.width/grid.length, c.height/grid.length);
		}
	}
	//set download button source to the canvas -> image
	var downloadButton = document.getElementById('downloadButton');
	var img = c.toDataURL("image/png");
	downloadButton.setAttribute('href',img)
}