let images = [];
let currentImageIndex = 0;
let nextImageIndex = 1;
let alpha = 0;
let alphaStep = 1;
let frameInterval = 500;
let randomness = 60;  // The amount of randomness for the frameInterval

function preload() {
  for (let i = 1; i <= 3; i++) {
    images.push(loadImage(`assets/art_${i}.jpg`));
  }
}

function setup() {
  createCanvas(800, 600);
  frameInterval = random(frameInterval - randomness, frameInterval + randomness);
}

function draw() {
  background(0);

  // Draw current image
  tint(255, 255 - alpha);
  image(images[currentImageIndex], 0, 0, width, height);

  // Draw next image with varying opacity
  tint(255, alpha);
  image(images[nextImageIndex], 0, 0, width, height);

  // Change alpha and possibly switch images
  alpha += alphaStep;
  if (alpha >= 255) {
    alpha = 0;
    currentImageIndex = nextImageIndex;
    nextImageIndex = (currentImageIndex + 1) % images.length;
    frameInterval = random(frameInterval - randomness, frameInterval + randomness);
  }

  // Randomly decide whether to reverse direction
  if (frameCount % frameInterval === 0) {
    alphaStep *= (random(1) > 0.5) ? -1 : 1;
  }
}
