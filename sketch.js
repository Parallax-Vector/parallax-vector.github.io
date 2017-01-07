//TheMiner63
//Credit to Daniel Shiffman
//Work originally inspired by his FFT Analysis Spiral - https://www.youtube.com/watch?v=2O3nm0Nvbi4
//This sketch file, and the linked html document are opensource. The soud files may be subject to copyright.

//General instances
var song;
var fft;
var amplitude;
//Canvas Visual Properties
var margin = 10;
//Audio Properties
var volumeHistory = [];
var ampRecord = 0;
var beatInterval = 0;
//Buttons
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
    angleMode(DEGREES);
    pauseButton = createButton('Pause | Play');
    restartButton = createButton('Restart');
    pauseButton.mousePressed(toggleSong);
    restartButton.mousePressed(restartSong);
    fft = new p5.FFT(0.85, 128);
    amplitude = new p5.Amplitude(0.85);
    amplitude.setInput(song);
    song.play();
}

function draw() {
    background(0);
    drawAmplitude(width/2, 0, width, height/2);
    drawSpiral(0, 0, width/2, height/2);
    drawBars(0, height/2, width/2, height);
  }

function drawSpiral(left, top, right, bottom) {
    //Positioning
    push();
    var spiralWidth = right - left - (margin * 2);
    var spiralHeight = bottom - top - (margin * 2);
    translate(left + (spiralWidth / 2) + margin, top + (spiralHeight / 2) + margin);
    if (spiralHeight > spiralWidth) {
        var radius = spiralWidth / 2;
    } else {
        var radius = spiralHeight / 2;
    }
    //Audio Processing
    var spectrum = fft.analyze();
    //Visual Representation
    colorMode(HSB);
    strokeWeight(4);
    for (var i = 0; i < spectrum.length; i++) {
        var angle = map(i, 0, spectrum.length, 0, 360);
        var amp = spectrum[i];
        var r = map(amp, 0, 256, 20, radius);
        var x = r * cos(angle);
        var y = r * sin(angle);
        stroke(i, 255, 255);
        line(0, 0, x, y);
    }
    pop();
}

function drawBars(left, top, right, bottom) {
    //Positioning
    push();
    var graphWidth = right - left - (margin * 2);
    var graphHeight = bottom - top - (margin*2);
    translate(left + margin, bottom - margin);
    //Audio Processing
    var spectrum = fft.analyze();
    //Visual Representation
    var barWidth = graphWidth / spectrum.length;
    stroke(255);
    strokeWeight(barWidth - 2);
    for (var i = 0; i < spectrum.length; i++) {
        var amp = map(spectrum[i],0,256,graphHeight/256,graphHeight);
        line(i * barWidth, 0 - amp, i * barWidth, 0);
    }
    pop();
}

function drawAmplitude(left, top, right, bottom) {
    //Positioning
    push();
    var graphWidth = right - left - (margin * 2);
    var graphHeight = bottom - top - (margin * 2);
    translate(left + margin, bottom - (graphHeight / 2) - margin);
    //Audio Processing
    var soundLevel = int(map(amplitude.getLevel(), 0, 1, 0, graphHeight/2));
    volumeHistory.reverse();
    volumeHistory.pop();
    volumeHistory.reverse();
    volumeHistory.push(soundLevel);
    while (volumeHistory.length < 64) {
        volumeHistory.push(0);
    }
    //Visual Representation
    colorMode(RGB);
    if (volumeHistory[volumeHistory.length - 1] > ampRecord) {
        ampRecord = volumeHistory[volumeHistory.length - 1];
    }
    strokeWeight(graphWidth / volumeHistory.length - 2);
    for (i = 0; i < volumeHistory.length; i++) {
        if (volumeHistory[i] >= ampRecord) {
            stroke(255, 0, 0);
        } else {
            stroke(255);
        }
        line(i * (graphWidth / volumeHistory.length), -volumeHistory[i], i * (graphWidth / volumeHistory.length), volumeHistory[i]);
    }
    strokeWeight((graphWidth / volumeHistory.length - 2) / 2);
    stroke(255, 0, 0);
    line(graphWidth, -graphHeight / 2, graphWidth, graphHeight / 2);
    pop();
}