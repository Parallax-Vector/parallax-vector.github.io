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
var scroll = 0;
var offset = 0;
var progressLW = 4;
//Audio Properties
var historyLength = 64;
var volumeHistory = [];
var bassHistory = [];
var midHistory = [];
var trebleHistory = [];
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
    ampRecord = 0;
    volumeHistory = [0];
    song.play();
}

function preload() {
    song = loadSound('sample.mp3');
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
    if (scroll != 0) {
        if (scroll > 0) {
            offset += scroll;
            scroll -= 1;
        } else if (scroll < 0) {
            offset += scroll;
            scroll += 1;
        }
    }
    translate(0, -offset);
    background(0);
    drawAmplitude(width/2, 0, width, height/2);
    drawSpiral(0, 0, width/2, height/2);
    drawBars(0, height / 2, width / 2, height);
    drawDissection(width / 2, height / 2, width, height);
    //console.log(song.currentTime());
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
        stroke((360/spectrum.length)*i, 255, 255);
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
    while (volumeHistory.length < historyLength) {
        volumeHistory.push(0);
    }
    //Visual Representation
    colorMode(RGB);
    stroke(255);
    strokeWeight(graphWidth / volumeHistory.length - 2);
    for (i = 0; i < volumeHistory.length; i++) {
        line(i * (graphWidth / volumeHistory.length), -volumeHistory[i], i * (graphWidth / volumeHistory.length), volumeHistory[i]);
    }
    stroke(255, 0, 0);
    progressLW = (graphWidth / volumeHistory.length - 2) / 2;
    strokeWeight(progressLW);
    line(graphWidth, -graphHeight / 2, graphWidth, graphHeight / 2);
    pop();
}

function drawDissection(left, top, right, bottom) {
    //Positioning
    push();
    var graphWidth = right - left - (margin * 2);
    var graphHeight = bottom - top - (margin * 2);
    translate(left + margin, bottom - margin);
    //Audio Processing
    var spectrum = fft.analyze();
    var bass = subset(spectrum, 0, int(spectrum.length / 3));
    var mid = subset(spectrum, int(spectrum.length /3)+1, int(spectrum.length / 3));
    var treble = subset(spectrum, int(spectrum.length / 3) * 2, int(spectrum.length / 3));
    var bassLvl = 0; var midLvl = 0; var trebleLvl = 0;
    for (freq = 0; freq < bass.length; freq++) {
        bassLvl += bass[freq];
    }
    for (freq = 0; freq < mid.length; freq++) {
        midLvl += mid[freq];
    }
    for (freq = 0; freq < treble.length; freq++) {
        trebleLvl += treble[freq];
    }
    bassLvl = bassLvl / bass.length; midLvl = midLvl / mid.length; trebleLvl = trebleLvl / treble.length;
    //console.log(bassLvl, midLvl, trebleLvl);
    bassHistory.reverse();
    bassHistory.pop();
    bassHistory.reverse();
    bassHistory.push(bassLvl);
    while (bassHistory.length < historyLength) {
        bassHistory.push(0);
    }
    midHistory.reverse();
    midHistory.pop();
    midHistory.reverse();
    midHistory.push(midLvl);
    while (midHistory.length < historyLength) {
        midHistory.push(0);
    }
    trebleHistory.reverse();
    trebleHistory.pop();
    trebleHistory.reverse();
    trebleHistory.push(trebleLvl);
    while (trebleHistory.length < historyLength) {
        trebleHistory.push(0);
    }
    //Visual Representation
    colorMode(RGB);
    strokeWeight(2);
    stroke(255, 0, 0);
    for (i = 0; i < bassHistory.length; i++) {
        line(i * (graphWidth/bassHistory.length),-bassHistory[i],(i+1)*(graphWidth/bassHistory.length),-bassHistory[i+1]);
    }
    stroke(0,0,255);
    for (i = 0; i < trebleHistory.length; i++) {
        line(i * (graphWidth / trebleHistory.length), -trebleHistory[i], (i + 1) * (graphWidth / trebleHistory.length), -trebleHistory[i + 1]);
    }
    stroke(0,255,0);
    for (i = 0; i < midHistory.length; i++) {
        line(i * (graphWidth / midHistory.length), -midHistory[i], (i + 1) * (graphWidth / midHistory.length), -midHistory[i + 1]);
    }
    strokeWeight(progressLW);
    stroke(255);
    line(graphWidth, -graphHeight, graphWidth, 0);
}

function mouseWheel(event) {
    if (event.delta > 0) {
        scroll = 10
    } else if (event.delta < 0) {
        scroll = -10
    }
    return false;
}