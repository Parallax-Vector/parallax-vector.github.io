//Configuaration variables
var img;
var images = 25;
var imgIndex = 1;
var scl = 0.9;

//Other variables
var buttonH;
var buttonW;
var buttonMargin = 10;
var buttonRadius = 5;
var lButtonHover = 0;
var rButtonHover = 0;


function setup() {
    var canvas = createCanvas(windowWidth * scl, (windowWidth * scl) / 46 * 27);
    canvas.parent('custom-slideshow');
    buttonH = -height;
    frameRate(30);
    background(1);
    img = loadImage("assets/static/" + zfill(imgIndex) + ".png");
    nextImage = loadImage("assets/static/" + zfill(imgIndex + 1) + ".png");
}

function draw() {
    //Draw image
    background(1);
    if (img.width < img.height) {
        var ratio = height / img.height;
    } else {
        var ratio = width / img.width;
    }
    image(img, (width - ratio * img.width) / 2, (height - ratio * img.height) / 2, ratio * img.width, ratio * img.height);
    //Draw buttons
    buttonH = height / 9;
    if (buttonH < 40) {
        buttonH = 40;
    }
    buttonW = buttonH * 0.9;
    fill(50, 200);
    noStroke();
    rect(buttonMargin - lButtonHover, (height - buttonH) / 2 - lButtonHover, buttonW + lButtonHover * 2, buttonH + lButtonHover * 2, buttonRadius);
    rect(width - buttonMargin - buttonW - rButtonHover, (height - buttonH) / 2 - rButtonHover, buttonW + rButtonHover * 2, buttonH + rButtonHover * 2, buttonRadius);
    fill(255);
    triangle(buttonMargin + 5, height / 2, buttonW + buttonMargin - 5, (height - buttonH + 10) / 2, buttonW + 5, (height + buttonH - 10) / 2);
    triangle(width - buttonMargin - 5, height / 2, width + 5 - buttonW - buttonMargin, (height - buttonH + 10) / 2, width + 5 - buttonW - buttonMargin, (height + buttonH - 10) / 2);
    //Calculate spacing variables for index circles
    var initialMargin = width / 3;
    var spacing = 0;
    while (spacing < 15) {
        spacing = (width - initialMargin * 2) / (images - 1);
        if (initialMargin > 20) {
            initialMargin -= 5;
        } else {
            break;
        }
    }
    while (spacing * (images - 1) > width - (initialMargin * 2)) {
        spacing -= 1;
    }
    //Draw index circles
    var borderMargin = 10;
    fill(0, 100);
    rectMode(CORNERS);
    rect(initialMargin - 15, height - 20 - 15, width - initialMargin + 5, height - 5, 10);
    rectMode(CORNER);
    for (var i = 0; i < images; i++) {
        fill(255);
        if (i + 1 == imgIndex) { fill(0, 255, 0); }
        if (spacing <= 40) {
            ellipse(initialMargin + (spacing * i), height - 20, spacing / 2, spacing / 2);
        } else {
            ellipse(initialMargin + (spacing * i), height - 20, 20, 20);
        }
    }
}

function nextSlide() {
    imgIndex += 1;
    if (imgIndex > images) {
        imgIndex = 1;
    }
    img = loadImage("assets/static/" + zfill(imgIndex) + ".png");
}

function prevSlide() {
    imgIndex -= 1;
    if (imgIndex < 1) {
        imgIndex = images;
    }
    img = loadImage("assets/static/" + zfill(imgIndex) + ".png");
}

function mousePressed() {
    if (mouseY > (height - buttonH) / 2 && mouseY < (height + buttonH) / 2) {
        if (mouseX < buttonMargin + buttonW && mouseX > buttonMargin) {
            prevSlide();
        } else if (mouseX < width - buttonMargin && mouseX > width - buttonMargin - buttonW) {
            nextSlide();
        }
    }
}

function mouseMoved() {
    if (mouseY > (height - buttonH) / 2 && mouseY < (height + buttonH) / 2) {
        if (mouseX < buttonMargin + buttonW && mouseX > buttonMargin) {
            lButtonHover = 5;
        } else {
            lButtonHover = 0;
        }
        if (mouseX < width - buttonMargin && mouseX > width - buttonMargin - buttonW) {
            rButtonHover = 5;
        } else {
            rButtonHover = 0;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth * scl, (windowWidth * scl) / 46 * 27);
}

function zfill(n) {
    var str = "" + n;
    var pad = "0000";
    return pad.substring(0, pad.length - str.length) + str;
}
