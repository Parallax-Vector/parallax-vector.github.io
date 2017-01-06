var song;
var fft;
var pauseButton;
var restartButton;

function toggleSong() {
  if (song.isPlaying()) {
      song.pause();
  } else {
      song.play();
  }
}

function restartSong() {
    song.stop();
    song.play();
}

function preload() {
  song = loadSound('sample.mp3');
}

function setup() {
  createCanvas(1200, 600);
  colorMode(HSB);
  angleMode(DEGREES);
  pauseButton = createButton('Pause | Play');
  restartButton = createButton('Restart');
  pauseButton.mousePressed(toggleSong);
  restartButton.mousePressed(restartSong);
  song.play();
  fft = new p5.FFT(0.9, 128);
}

function draw() {
    background(0);
    drawSpiral(0, 0, width/2, height);
    drawBars(width/2, 0, width, height);
  }

function drawSpiral(left,top,right,bottom) {
    var spectrum = fft.analyze();
    noStroke();
    var spiralWidth = right - left;
    var spiralHeight = bottom - top;
    if (spiralHeight > spiralWidth) {
        var radius = spiralWidth/2;
    } else {
        var radius = spiralHeight/2;
    }
    translate(spiralWidth / 2, spiralHeight / 2);
    for (var i = 0; i < spectrum.length; i++) {
        var angle = map(i, 0, spectrum.length, 0, 360);
        var amp = spectrum[i];
        var r = map(amp, 0, 256, 20, radius-10);
        var x = r * cos(angle);
        var y = r * sin(angle);
        stroke(i, 255, 255);
        line(0, 0, x, y);
        //vertex(x, y);
        //var y = map(amp, 0, 256, height, 0);
        //rect(i * w, y, w - 2, height - y);
    }
}

function drawBars(left, top, right, bottom) {
    var spectrum = fft.analyze();
    stroke(255);
    var graphWidth = right - left;
    var graphHeight = bottom - top;
    translate(left-(graphWidth/2),graphHeight/2);
    var barWidth = graphWidth / spectrum.length;
    strokeWeight(barWidth-1);
    console.log(graphHeight/2);
    for (var i = 0; i < spectrum.length; i++) {
        var amp = map(spectrum[i],0,256,graphHeight/256,graphHeight);
        fill(255);
        line(i * barWidth, 0 - amp, i * barWidth, 0);
    }

}