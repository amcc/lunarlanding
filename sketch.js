// The audio i've used is from here:
// https://archive.org/details/Apollo11Audio/550-AAG.mp3

// create variables to store the sound and amplitude
let sound;
let amp;
let volumeLeft;
let volumeRight;
let diameterLeft;
let diameterRight;

// orbital settings
let moonDiameter = 100;
let orbitRadius;
let orbitRadius2 = 200;
let lunarModuleRadius = orbitRadius2;
let angle = 0;
let angle2 = 0;
let speed = 0.01;
let speed2 = 0.03;
let lunarModuleSpeed = speed2;

// milliseconds till touchdown = 221000
let touchdown = 221000

// preload the sound
function preload() {
  sound = loadSound('apollo.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  orbitRadius = width > height ? height/3 : width/3
  
  // connect to the volume/amplitude
  amp = new p5.Amplitude();

  playSound();
}

function playSound() {
  // play the song when its loaded
  sound.play();
}

function draw() {
  background(255);
  // radius of the moon
  var x = width / 2 + orbitRadius * cos(angle);
  var y = height / 2 + orbitRadius * sin(angle);
  // radius of the lunar module
  var x2 = x + lunarModuleRadius * cos(angle2);
  var y2 = y + lunarModuleRadius * sin(angle2);

  noStroke();

  // get the current volume
  // 0 gives you the left channel and 1 the right channel
  volumeLeft = amp.getLevel(0);
  volumeRight = amp.getLevel(1);
  // this smooths the level, higher number is more smoothing
  amp.smooth(0.9)
  // volume ranges from 0-1, but we want the circle bigger
  // this maps the vol (from 0-1 to 10-600
  diameterLeft = map(volumeLeft, 0, 1, 10, 600);
  diameterRight = map(volumeRight, 0, 1, 10, 600);

  // draw the circles on every frame
  // push and pop allows you to change settings and values
  // it prevents other things outside push and pop being affected
  // in this case its preventing the blendMode affecting the background


  push()
  smooth();
  blendMode(EXCLUSION);
  noStroke();
  fill("red")
  circle(width / 2, height / 2, diameterRight);
  fill("blue")
  circle(x, y, moonDiameter);
  fill("green")
  circle(x2, y2, diameterLeft);
  pop()
  angle += speed;
  angle2 += lunarModuleSpeed;
  
  // reduce the radius and speed by a fraction
  // equal to the current milliseconds and the
  // total milliseconds till touchdown (contact light)
  // on the recording
  
  if (lunarModuleRadius > moonDiameter) {
    lunarModuleRadius = (orbitRadius2 * (touchdown-millis())/touchdown)+moonDiameter;
  }
  if (lunarModuleSpeed > speed) {
    lunarModuleSpeed = (speed2 * (touchdown-millis())/touchdown) + speed;
  }
  
  //console.log("radius",lunarModuleRadius);
  //console.log("speed",lunarModuleSpeed);
  //console.log(millis());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
