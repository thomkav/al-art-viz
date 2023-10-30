let imageList = [];
let currentImage = 0;
let nextImage = 1;
let opacityLevel = 0;
let opacityChangeRate = 1;
let baseFrameInterval = 500;
let frameIntervalVariability = 60; // Variability in frame interval
let speedFactor = 0.2; // Scale the speed of transitions (1 is normal, < 1 is slower, > 1 is faster)

function preload() {
  for (let i = 1; i <= 3; i++) {
    imageList.push(loadImage(`assets/art_${i}.jpg`));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  updateFrameInterval();
}

function draw() {
  background(0);

  // Calculate dimensions to make the images cover the canvas
  let imgAspect = imageList[currentImage].width / imageList[currentImage].height;
  let canvasAspect = width / height;
  let drawWidth, drawHeight;
  
  if (imgAspect > canvasAspect) {
    drawWidth = width;
    drawHeight = width / imgAspect;
  } else {
    drawHeight = height;
    drawWidth = height * imgAspect;
  }
  
  // Draw current image with reduced opacity
  tint(255, 255 - opacityLevel);
  image(imageList[currentImage], 0, 0, drawWidth, drawHeight);

  // Draw next image with increased opacity
  tint(255, opacityLevel);
  image(imageList[nextImage], 0, 0, drawWidth, drawHeight);


  // Modify opacity and switch images if needed
  opacityLevel += opacityChangeRate * speedFactor;
  if (opacityLevel >= 255) {
    opacityLevel = 0;
    currentImage = nextImage;
    nextImage = (currentImage + 1) % imageList.length;
    updateFrameInterval();
  }

  // Randomly reverse direction at intervals
  if (frameCount % Math.floor(baseFrameInterval * speedFactor) === 0) {
    opacityChangeRate *= (random(1) > 0.5) ? -1 : 1;
  }
}

function updateFrameInterval() {
  baseFrameInterval = random(baseFrameInterval - frameIntervalVariability, baseFrameInterval + frameIntervalVariability);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
