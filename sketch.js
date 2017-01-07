var song;
var fft;
var amplitude;

var volumeHistory = [];

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
    song = loadSound('LHPKOy3dtqQ.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight-20);
    colorMode(HSB);
    angleMode(DEGREES);
    pauseButton = createButton('Pause | Play');
    restartButton = createButton('Restart');
    pauseButton.mousePressed(toggleSong);
    restartButton.mousePressed(restartSong);
    song.play();
    fft = new p5.FFT(0.9, 128);
    amplitude = new p5.Amplitude(0.9);
    amplitude.setInput(song);
    for (i = 0; i < 100; i++) {
        volumeHistory[i] = 0;
    }
}

function draw() {
    background(0);
    drawAmplitude(width/2, 0, width, height/2);
    drawSpiral(0, 0, width/2, height/2);
    drawBars(0, height/2, width/2, height);
  }

function drawSpiral(left,top,right,bottom) {
    var spectrum = fft.analyze();
    strokeWeight(4);
    var spiralWidth = right - left;
    var spiralHeight = bottom - top;
    if (spiralHeight > spiralWidth) {
        var radius = spiralWidth/2;
    } else {
        var radius = spiralHeight/2;
    }
    push();
    var trans = [left + (spiralWidth / 2), top + (spiralHeight / 2)];
    translate(trans[0],trans[1]);
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
    pop();
}

function drawBars(left, top, right, bottom) {
    var spectrum = fft.analyze();
    stroke(255);
    var graphWidth = right - left;
    var graphHeight = bottom - top;
    push();
    var trans = [left, bottom];
    translate(trans[0], trans[1]);
    var barWidth = graphWidth / spectrum.length;
    strokeWeight(barWidth - 1);
    for (var i = 0; i < spectrum.length; i++) {
        var amp = map(spectrum[i],0,256,graphHeight/256,graphHeight);
        fill(255);
        line(i * barWidth, 0 - amp, i * barWidth, 0);
    }
    pop();
}

function drawAmplitude(left, top, right, bottom) {
    var graphWidth = right - left;
    var graphHeight = bottom - top;
    push();
    translate(left, bottom);
    var soundLevel = int(map(amplitude.getLevel(), 0, 1, 0, graphHeight));
    stroke(255);
    strokeWeight(10);
    fill(255);
    volumeHistory.reverse();
    volumeHistory.pop();
    volumeHistory.reverse();
    volumeHistory.push(soundLevel);
    for (i = 0; i < volumeHistory.length; i++) {
        line(i * 11, -volumeHistory[i], i * 11, -volumeHistory[i])
    }
    //line(100, 0 - soundLevel, 300, 0 - soundLevel);
    pop();
}