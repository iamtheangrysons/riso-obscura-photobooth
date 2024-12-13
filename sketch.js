let capture;
let resolution = 2; 
let exportButton;
let exportPinkChannelButton;
let exportBlueChannelButton;
let exportYellowChannelButton;
let downloadCanvasButton;
let borderSelector;
let textSelector;
let customFont;

let firstColorSlider;
let secondColorSlider;
let firstColorThreshold = 120; 
let secondColorThreshold = 180;



function preload(){
  customFont = loadFont('assets/VAGRB.ttf');
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('canvas-holder');
  capture = createCapture(VIDEO);
  capture.size(width / resolution, height / resolution); 
  capture.hide();
  noStroke();
  
  //----- brightness sliders ------
  firstColorSlider = select('#firstColorSlider');
  firstColorSlider.input(() => {
    firstColorThreshold = firstColorSlider.value();
  });
  
  secondColorSlider = select('#secondColorSlider');
  secondColorSlider.input(() => {
    secondColorThreshold = secondColorSlider.value();
  });
  //------- border selector --------
  borderSelector = select('#borderSelector');
  //------ text selector -------
  textSelector = select('#textSelector');
  //----- all 2 channel exports button -------
  const exportButton = select('#exportButton');
  exportButton.mousePressed(() => {
    console.log('Export button pressed');
    exportChannels();
  });
  //------ pink channel export only button -------
  const exportPinkChannelButton = select('#exportPinkChannelButton');
  exportPinkChannelButton.mousePressed(() => {
    console.log('Magenta only Export button pressed');
    exportPinkChannel();
  });
  //------ blue channel export only button -------
  exportBlueChannelButton = select('#exportBlueChannelButton');
  exportBlueChannelButton.mousePressed(() => {
    console.log('CK only Export button pressed');
    exportBlueChannel();
  });
  
  //------ yellow channel export only button -------
  exportYellowChannelButton = select('#exportYellowChannelButton');
  exportYellowChannelButton.mousePressed(() => {
    console.log('Yellow only Export button pressed');
    exportYellowChannel();
  });
    //------ download canvas button -------
    downloadCanvasButton = select('#downloadCanvasButton');
    downloadCanvasButton.mousePressed(() => {
      console.log('Download regular png button pressed');
      saveCanvas(canvas, 'photobooth-preview', 'png');
    });
}

function draw() {
  background('white');
  capture.loadPixels();
  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];
      
      let brightness = 0.299 * r + 0.587 * g + 0.114 * b;
      
      //-------- color selector in draw(); function -------
      let col;
      if (brightness < firstColorThreshold) {
        col = firstColor;
      } else if (brightness < secondColorThreshold) {
        col = secondColor;
      } else {
        col = thirdColor;
      }
      fill(col);
      rect(x * resolution, y * resolution, resolution*8, resolution*5);
    }
  }
  
  //-------- text selector in draw(); function -------
  let selectedText;
  if (textSelector.value() === 'smile') {
    selectedText = 'Smile!';
    textFont(customFont);
  } else if (textSelector.value() === 'sorry') {
    selectedText = 'Sorry...';
    textFont(customFont);
  } else if (textSelector.value() === 'happy-birthday') {
    selectedText = 'Happy Birthday!';
    textFont(customFont);
  } else if (textSelector.value() === 'thank-you') {
    selectedText = 'Thank You!';
    textFont(customFont);
  } else if (textSelector.value() === 'love') {
    selectedText = '୧ ‧₊˚ 🍮 ⋅ ☆';
    textFont('Arial');
  } else if (textSelector.value() === 'cute') {
    selectedText = '(˶˃ ᵕ ˂˶) .ᐟ.ᐟ';
    textFont('Arial');
  } else if (textSelector.value() === 'none') {
    selectedText = '';
  } else if (textSelector.value() === 'rabbit') {
    selectedText = '₍ᐢ.  ̫.ᐢ₎';
    textFont('Arial');
  }
  
  
  if (selectedText !== '') {
    textSize(50);
    textAlign(CENTER, CENTER);
    stroke(255);
    strokeWeight(15);
    fill(firstColor);
    text(selectedText, width / 2, 320);
    noStroke();
  }
  
  //-------- border selector in draw(); function -------
  if (borderSelector.value() === 'star') {
    drawStarBorder(this, resolution, thirdColor);
  } else if (borderSelector.value() === 'dots') {
    drawDotsBorder(this, resolution, thirdColor);
  } else if (borderSelector.value() === 'flowers') {
    drawFlowerBorder(this, resolution, thirdColor);
  } else if (borderSelector.value() === 'hearts') {
    drawHeartBorder();
  } else if (borderSelector.value() === 'mix-star-flowers') {
    drawMixStarFlowerBorder();
  } else if (borderSelector.value() === 'mix-hearts-dots') {
    drawMixHeartsDotsBorder();
  } else if (borderSelector.value() === 'none') {
    // Do nothing for 'none' option
  }
  
}

function exportChannels() {
  capture.loadPixels();
  
  let pinkChannel = createGraphics(capture.width, capture.height);
  let yellowChannel = createGraphics(capture.width, capture.height);
  let blueChannel = createGraphics(capture.width, capture.height);
  
  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 1];
      
      let brightness = (r + g + b) / 3;
      
      if (brightness < firstColorThreshold) {
        pinkChannel.stroke(0); 
        pinkChannel.point(x, y);
        yellowChannel.stroke(255); 
        yellowChannel.point(x, y);
        blueChannel.stroke(255); 
        blueChannel.point(x, y);
      } else {
        pinkChannel.stroke(255); 
        pinkChannel.point(x, y);
        
        if (brightness < secondColorThreshold) {
          yellowChannel.stroke(0); 
          yellowChannel.point(x, y);
        } else {
          yellowChannel.stroke(255); 
          yellowChannel.point(x, y);
        }
        
        if (brightness >= secondColorThreshold) {
          blueChannel.stroke(0); 
          blueChannel.point(x, y);
        } else {
          blueChannel.stroke(255); 
          blueChannel.point(x, y);
        }
      }
    }
  }
  
  //------ border graphics drawn onto bluechannel --------
  if (borderSelector.value() === 'star') {
    drawStarBorderGraphics(blueChannel, resolution);
  } else if (borderSelector.value() === 'dots') {
    drawDotsBorderGraphics(blueChannel, resolution);
  } else if (borderSelector.value() === 'flowers') {
    drawFlowerBorderGraphics(blueChannel, resolution);
  }  else if (borderSelector.value() === 'hearts') {
    drawHeartBorderGraphics(blueChannel, resolution);
  } else if (borderSelector.value() === 'mix-star-flowers') {
    drawMixStarFlowerBorderGraphics(blueChannel, resolution);
  } else if (borderSelector.value() === 'mix-hearts-dots') {
    drawMixHeartsDotsBorderGraphics(blueChannel);
  } else if (borderSelector.value() === 'none') {
    // Do nothing for 'none' option
  }
  
  
  //------ text graphics drawn onto pinkchannel --------
  let selectedText;
  if (textSelector.value() === 'smile') {
    selectedText = 'Smile!';
    pinkChannel.textFont(customFont);
  } else if (textSelector.value() === 'sorry') {
    selectedText = 'Sorry...';
    pinkChannel.textFont(customFont);
  } else if (textSelector.value() === 'happy-birthday') {
    selectedText = 'Happy Birthday!';
    pinkChannel.textFont(customFont);
  } else if (textSelector.value() === 'thank-you') {
    selectedText = 'Thank You!';
    pinkChannel.textFont(customFont);
  } else if (textSelector.value() === 'love') {
    selectedText = '୧ ‧₊˚ 🍮 ⋅ ☆';
    pinkChannel.textFont('Arial');
  } else if (textSelector.value() === 'cute') {
    selectedText = '(˶˃ ᵕ ˂˶) .ᐟ.ᐟ';
    pinkChannel.textFont('Arial');
  } else if (textSelector.value() === 'none') {
    selectedText = '';
  } 
  
  
  if (selectedText !== '') {
    pinkChannel.textSize(25);
    pinkChannel.textAlign(CENTER, CENTER);
    pinkChannel.stroke(255);
    pinkChannel.strokeWeight(7);
    pinkChannel.fill(50);
    pinkChannel.text(selectedText, capture.width / 2, capture.height-40);
    pinkChannel.noStroke();
  }
  
  pinkChannel.save('M-Channel.png');
  yellowChannel.save('Y-Channel.png');
  blueChannel.save('C-K-Channel.png');
}

//------ function to export pink channel only --------
function exportPinkChannel() {
  capture.loadPixels();
  
  let pinkChannel = createGraphics(capture.width, capture.height);
  
  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];
      
      let brightness = (r + g + b) / 3;
      
      if (brightness < firstColorThreshold) {
        pinkChannel.stroke(0); 
        pinkChannel.point(x, y);
      } else {
        pinkChannel.stroke(255); 
        pinkChannel.point(x, y);
      }
    }
  }
  //=========== individual export buttons ===========
  //------ text graphics drawn onto pinkchannel --------
  let selectedText;
  if (textSelector.value() === 'smile') {
    selectedText = 'Smile!';
    pinkChannel.textFont(customFont);
  } else if (textSelector.value() === 'sorry') {
    selectedText = 'Sorry...';
    pinkChannel.textFont(customFont);
  } else if (textSelector.value() === 'happy-birthday') {
    selectedText = 'Happy Birthday!';
    pinkChannel.textFont(customFont);
  } else if (textSelector.value() === 'thank-you') {
    selectedText = 'Thank You!';
    pinkChannel.textFont(customFont);
  } else if (textSelector.value() === 'love') {
    selectedText = '୧ ‧₊˚ 🍮 ⋅ ☆';
    pinkChannel.textFont('Arial');
  } else if (textSelector.value() === 'cute') {
    selectedText = '(˶˃ ᵕ ˂˶) .ᐟ.ᐟ';
    pinkChannel.textFont('Arial');
  } else if (textSelector.value() === 'none') {
    selectedText = '';
  }
  
  if (selectedText !== '') {
    pinkChannel.textSize(25);
    pinkChannel.textAlign(CENTER, CENTER);
    pinkChannel.stroke(255);
    pinkChannel.strokeWeight(7);
    pinkChannel.fill(50);
    pinkChannel.text(selectedText, capture.width / 2, capture.height-40);
    pinkChannel.noStroke();
  }
  pinkChannel.save('M-Channel.png');
}

function exportYellowChannel() {
  capture.loadPixels();
  
  let yellowChannel = createGraphics(capture.width, capture.height);
  
  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];
      
      let brightness = (r + g + b) / 3;
      
      if (brightness < firstColorThreshold || brightness >= secondColorThreshold) {
        yellowChannel.stroke(255); 
        yellowChannel.point(x, y);
      } else {
        yellowChannel.stroke(0); 
        yellowChannel.point(x, y);
      }
    }
  }
  
  yellowChannel.save('Y-Channel.png');
}

function exportBlueChannel() {
  capture.loadPixels();
  let blueChannel = createGraphics(capture.width, capture.height);
  
  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let index = (x + y * capture.width) * 4;
      let r = capture.pixels[index];
      let g = capture.pixels[index + 1];
      let b = capture.pixels[index + 2];
      
      let brightness = (r + g + b) / 3;
      
      if (brightness >= secondColorThreshold) {
        blueChannel.stroke(0); 
        blueChannel.point(x, y);
      } else {
        blueChannel.stroke(255); 
        blueChannel.point(x, y);
      }
    }
  }
  
  if (borderSelector.value() === 'star') {
    drawStarBorderGraphics(blueChannel, resolution);
  } else if (borderSelector.value() === 'dots') {
    drawDotsBorderGraphics(blueChannel, resolution);
  } else if (borderSelector.value() === 'flowers') {
    drawFlowerBorderGraphics(blueChannel, resolution);
  }  else if (borderSelector.value() === 'hearts') {
    drawHeartBorderGraphics(blueChannel, resolution);
  } else if (borderSelector.value() === 'mix-star-flowers') {
    drawMixStarFlowerBorderGraphics(blueChannel, resolution);
  } else if (borderSelector.value() === 'mix-hearts-dots') {
    drawMixHeartsDotsBorderGraphics(blueChannel);
  } else if (borderSelector.value() === 'none') {
    // Do nothing for 'none' option
  }
  
  
  blueChannel.save('C-K-Channel.png');
}