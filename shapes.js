
function randomDotSize(minDotSize, maxDotSize) {
    return random(minDotSize, maxDotSize);
  }

  function randomRotation() {
    return random(TWO_PI);
  }

  function randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2) {
    let starRadius1 = random(minStarRadius1, maxStarRadius1);
    let starRadius2 = random(minStarRadius2, maxStarRadius2);
    return { starRadius1, starRadius2 };
  }

  function drawStar(x, y, radius1, radius2, npoints, graphics, rotation = 0) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    graphics.push();
    graphics.translate(x, y);
    graphics.rotate(rotation);
    graphics.beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = cos(a) * radius2;
      let sy = sin(a) * radius2;
      graphics.vertex(sx, sy);
      sx = cos(a + halfAngle) * radius1;
      sy = sin(a + halfAngle) * radius1;
      graphics.vertex(sx, sy);
    }
    graphics.endShape(CLOSE);
    graphics.pop();
  }

  function drawHeart(x, y, size, graphics, rotation = 0) {
    const angle = PI / 6;
    const heartX = cos(angle) * size;
    const heartY = sin(angle) * size;
    
    graphics.push();
    graphics.translate(x, y);
    graphics.rotate(rotation);
    graphics.beginShape();
    graphics.vertex(0, 0);
    graphics.bezierVertex(heartX, -heartY, size, size / 3, 0, size);
    graphics.bezierVertex(-size, size / 3, -heartX, -heartY, 0, 0);
    graphics.endShape(CLOSE);
    graphics.pop();
  }

  function drawFlower(x, y, petalRadius, centerRadius, petalCount, graphics) {
    let angle = TWO_PI / petalCount;
    graphics.push();
    graphics.translate(x, y);
    for (let i = 0; i < petalCount; i++) {
      let petalX = cos(angle * i) * petalRadius;
      let petalY = sin(angle * i) * petalRadius;
      graphics.ellipse(petalX, petalY, petalRadius * 2, petalRadius * 2);
    }
    graphics.ellipse(0, 0, centerRadius * 2, centerRadius * 2);
    graphics.pop();
  }
  

  //------------------- draw function borders ----------------------

  function drawStarBorder() {
    let minStarRadius1 = 3;
    let maxStarRadius1 = 7;
    let minStarRadius2 = 6;
    let maxStarRadius2 = 14;
    let npoints = 5;
    let spacing = 30;
    
    noStroke();
    fill(thirdColor);
  
    //----- top border -------
    for (let x = spacing / 2; x < width; x += spacing) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      let rotation = randomRotation();
      drawStar(x, spacing / 2, starRadius1, starRadius2, npoints, this, rotation);
    }
  
    //----- bottom border -------
    for (let x = spacing / 2; x < width; x += spacing) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      let rotation = randomRotation();
      drawStar(x, height - spacing / 2, starRadius1, starRadius2, npoints, this, rotation);
    }
  
    //----- left border -------
    for (let y = spacing / 2; y < height; y += spacing) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      let rotation = randomRotation();
      drawStar(spacing / 2, y, starRadius1, starRadius2, npoints, this, rotation);
    }
  
    //----- right border -------
    for (let y = spacing / 2; y < height; y += spacing) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      let rotation = randomRotation();
      drawStar(width - spacing / 2, y, starRadius1, starRadius2, npoints, this, rotation);
    }
  }



  function drawDotsBorder() {
    let minDotSize = 10;
    let maxDotSize = 30;
    let spacing = 30;
    noStroke();
    fill(thirdColor);
  
    //----- top border -------
    for (let x = spacing / 2; x < width; x += spacing) {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      ellipse(x, spacing / 2, dotSize, dotSize);
    }
  
    //----- bottom border -------
    for (let x = spacing / 2; x < width; x += spacing) {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      ellipse(x, height - spacing / 2, dotSize, dotSize);
    }
  
    //----- left border -------
    for (let y = spacing / 2; y < height; y += spacing) {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      ellipse(spacing / 2, y, dotSize, dotSize);
    }
  
    //----- right border -------
    for (let y = spacing / 2; y < height; y += spacing) {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      ellipse(width - spacing / 2, y, dotSize, dotSize);
    }
  }

  function drawFlowerBorder() {
    let minPetalCount = 4;
    let maxPetalCount = 8;
    let minPetalRadius = 3;
    let maxPetalRadius = 7;
    let minCenterRadius = 2;
    let maxCenterRadius = 4;
    let spacing = 30;

    noStroke();
    fill(thirdColor);

    function drawFlower(x, y, petalRadius, centerRadius, petalCount) {
        let angle = TWO_PI / petalCount;
        push();
        translate(x, y);
        for (let i = 0; i < petalCount; i++) {
            let petalX = cos(angle * i) * petalRadius;
            let petalY = sin(angle * i) * petalRadius;
            ellipse(petalX, petalY, petalRadius * 2, petalRadius * 2);
        }
        ellipse(0, 0, centerRadius * 2, centerRadius * 2);
        pop();
    }

    //----- top border -------
    for (let x = spacing / 2; x < width; x += spacing) {
        let petalCount = floor(random(minPetalCount, maxPetalCount));
        let petalRadius = random(minPetalRadius, maxPetalRadius);
        let centerRadius = random(minCenterRadius, maxCenterRadius);
        drawFlower(x, spacing / 2, petalRadius, centerRadius, petalCount);
    }

    //----- bottom border -------
    for (let x = spacing / 2; x < width; x += spacing) {
        let petalCount = floor(random(minPetalCount, maxPetalCount));
        let petalRadius = random(minPetalRadius, maxPetalRadius);
        let centerRadius = random(minCenterRadius, maxCenterRadius);
        drawFlower(x, height - spacing / 2, petalRadius, centerRadius, petalCount);
    }

    //----- left border -------
    for (let y = spacing / 2; y < height; y += spacing) {
        let petalCount = floor(random(minPetalCount, maxPetalCount));
        let petalRadius = random(minPetalRadius, maxPetalRadius);
        let centerRadius = random(minCenterRadius, maxCenterRadius);
        drawFlower(spacing / 2, y, petalRadius, centerRadius, petalCount);
    }

    //----- right border -------
    for (let y = spacing / 2; y < height; y += spacing) {
        let petalCount = floor(random(minPetalCount, maxPetalCount));
        let petalRadius = random(minPetalRadius, maxPetalRadius);
        let centerRadius = random(minCenterRadius, maxCenterRadius);
        drawFlower(width - spacing / 2, y, petalRadius, centerRadius, petalCount);
    }
}

function drawHeartBorder() {
  let minHeartSize = 10;
  let maxHeartSize = 20;
  let spacing = 30;
  noStroke();
  fill(thirdColor);
  
  // Top border
  for (let x = spacing / 2; x < width; x += spacing) {
    let heartSize = random(minHeartSize, maxHeartSize);
    drawHeart(x, spacing / 2, heartSize, this);
  }

  // Bottom border
  for (let x = spacing / 2; x < width; x += spacing) {
    let heartSize = random(minHeartSize, maxHeartSize);
    drawHeart(x, height - spacing / 2, heartSize, this);
  }

  // Left border
  for (let y = spacing / 2; y < height; y += spacing) {
    let heartSize = random(minHeartSize, maxHeartSize);
    drawHeart(spacing / 2, y, heartSize, this);
  }

  // Right border
  for (let y = spacing / 2; y < height; y += spacing) {
    let heartSize = random(minHeartSize, maxHeartSize);
    drawHeart(width - spacing / 2, y, heartSize, this);
  }
}


function drawMixStarFlowerBorder() {
  let minStarRadius1 = 3;
  let maxStarRadius1 = 7;
  let minStarRadius2 = 6;
  let maxStarRadius2 = 14;
  let minPetalRadius = 3;
  let maxPetalRadius = 7;
  let minCenterRadius = 2;
  let maxCenterRadius = 5;
  let minPetalCount = 5;
  let maxPetalCount = 10;
  let spacing = 30;
  noStroke();
  fill(thirdColor);
  
  // Top border
  for (let x = spacing / 2; x < width; x += spacing) {
    if (random() < 0.5) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      drawStar(x, spacing / 2, starRadius1, starRadius2, 5, this);
    } else {
      let petalCount = floor(random(minPetalCount, maxPetalCount));
      let petalRadius = random(minPetalRadius, maxPetalRadius);
      let centerRadius = random(minCenterRadius, maxCenterRadius);
      drawFlower(x, spacing / 2, petalRadius, centerRadius, petalCount, this);
    }
  }

  // Bottom border
  for (let x = spacing / 2; x < width; x += spacing) {
    if (random() < 0.5) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      drawStar(x, height - spacing / 2, starRadius1, starRadius2, 5, this);
    } else {
      let petalCount = floor(random(minPetalCount, maxPetalCount));
      let petalRadius = random(minPetalRadius, maxPetalRadius);
      let centerRadius = random(minCenterRadius, maxCenterRadius);
      drawFlower(x, height - spacing / 2, petalRadius, centerRadius, petalCount, this);
    }
  }

  // Left border
  for (let y = spacing / 2; y < height; y += spacing) {
    if (random() < 0.5) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      drawStar(spacing / 2, y, starRadius1, starRadius2, 5, this);
    } else {
      let petalCount = floor(random(minPetalCount, maxPetalCount));
      let petalRadius = random(minPetalRadius, maxPetalRadius);
      let centerRadius = random(minCenterRadius, maxCenterRadius);
      drawFlower(spacing / 2, y, petalRadius, centerRadius, petalCount, this);
    }
  }

  // Right border
  for (let y = spacing / 2; y < height; y += spacing) {
    if (random() < 0.5) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      drawStar(width - spacing / 2, y, starRadius1, starRadius2, 5, this);
    } else {
      let petalCount = floor(random(minPetalCount, maxPetalCount));
      let petalRadius = random(minPetalRadius, maxPetalRadius);
      let centerRadius = random(minCenterRadius, maxCenterRadius);
      drawFlower(width - spacing / 2, y, petalRadius, centerRadius, petalCount, this);
    }
  }
}

function drawMixHeartsDotsBorder() {
  let minHeartSize = 10;
  let maxHeartSize = 20;
  let minDotSize = 10;
  let maxDotSize = 30;
  let spacing = 30;
  noStroke();
  fill(thirdColor);
  
  // Top border
  for (let x = spacing / 2; x < width; x += spacing) {
    if (random() < 0.5) {
      let heartSize = random(minHeartSize, maxHeartSize);
      drawHeart(x, spacing / 2, heartSize, this);
    } else {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      ellipse(x, spacing / 2, dotSize, dotSize);
    }
  }

  // Bottom border
  for (let x = spacing / 2; x < width; x += spacing) {
    if (random() < 0.5) {
      let heartSize = random(minHeartSize, maxHeartSize);
      drawHeart(x, height - spacing / 2, heartSize, this);
    } else {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      ellipse(x, height - spacing / 2, dotSize, dotSize);
    }
  }

  // Left border
  for (let y = spacing / 2; y < height; y += spacing) {
    if (random() < 0.5) {
      let heartSize = random(minHeartSize, maxHeartSize);
      drawHeart(spacing / 2, y, heartSize, this);
    } else {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      ellipse(spacing / 2, y, dotSize, dotSize);
    }
  }

  // Right border
  for (let y = spacing / 2; y < height; y += spacing) {
    if (random() < 0.5) {
      let heartSize = random(minHeartSize, maxHeartSize);
      drawHeart(width - spacing / 2, y, heartSize, this);
    } else {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      ellipse(width - spacing / 2, y, dotSize, dotSize);
    }
  }
}





  //------------------- export function borders ----------------------
  function drawStarBorderGraphics(graphics) {
    let minStarRadius1 = 3 / resolution;
    let maxStarRadius1 = 7 / resolution;
    let minStarRadius2 = 6 / resolution;
    let maxStarRadius2 = 14 / resolution;
    let npoints = 5;
    let spacing = 30 / resolution;
    
    graphics.noStroke();
    graphics.fill(0);
    
    //----- top border -------
    for (let x = spacing / 2; x < graphics.width; x += spacing) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      let rotation = randomRotation();
      drawStar(x, spacing / 2, starRadius1, starRadius2, npoints, graphics, rotation);
    }
  
    //----- bottom border -------
    for (let x = spacing / 2; x < graphics.width; x += spacing) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      let rotation = randomRotation();
      drawStar(x, graphics.height - spacing / 2, starRadius1, starRadius2, npoints, graphics, rotation);
    }
  
    //----- left border -------
    for (let y = spacing / 2; y < graphics.height; y += spacing) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      let rotation = randomRotation();
      drawStar(spacing / 2, y, starRadius1, starRadius2, npoints, graphics, rotation);
    }
  
    //----- right border -------
    for (let y = spacing / 2; y < graphics.height; y += spacing) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      let rotation = randomRotation();
      drawStar(graphics.width - spacing / 2, y, starRadius1, starRadius2, npoints, graphics, rotation);
    }
  }


  function drawDotsBorderGraphics(graphics, resolution) {
    let minDotSize = 10 / resolution;
    let maxDotSize = 30 / resolution;
    let spacing = 30 / resolution;
  
    graphics.noStroke();
    graphics.fill(0);
  
    //----- top border -------
    for (let x = spacing / 2; x < graphics.width; x += spacing) {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      graphics.ellipse(x, spacing / 2, dotSize, dotSize);
    }
  
    //----- bottom border -------
    for (let x = spacing / 2; x < graphics.width; x += spacing) {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      graphics.ellipse(x, graphics.height - spacing / 2, dotSize, dotSize);
    }
  
    //----- left border -------
    for (let y = spacing / 2; y < graphics.height; y += spacing) {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      graphics.ellipse(spacing / 2, y, dotSize, dotSize);
    }
  
    //----- right border -------
    for (let y = spacing / 2; y < graphics.height; y += spacing) {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      graphics.ellipse(graphics.width - spacing / 2, y, dotSize, dotSize);
    }
  }

  function drawFlowerBorderGraphics(graphics) {
    let minPetalCount = 4;
    let maxPetalCount = 8;
    let minPetalRadius = 3 / resolution;
    let maxPetalRadius = 7 / resolution;
    let minCenterRadius = 2 / resolution;
    let maxCenterRadius = 4 / resolution;
    let spacing = 30 / resolution;

    graphics.noStroke();
    graphics.fill(0);

    function drawFlower(x, y, petalRadius, centerRadius, petalCount, graphics) {
        let angle = TWO_PI / petalCount;
        graphics.push();
        graphics.translate(x, y);
        for (let i = 0; i < petalCount; i++) {
            let petalX = cos(angle * i) * petalRadius;
            let petalY = sin(angle * i) * petalRadius;
            graphics.ellipse(petalX, petalY, petalRadius * 2, petalRadius * 2);
        }
        graphics.ellipse(0, 0, centerRadius * 2, centerRadius * 2);
        graphics.pop();
    }

    //----- top border -------
    for (let x = spacing / 2; x < graphics.width; x += spacing) {
        let petalCount = floor(random(minPetalCount, maxPetalCount));
        let petalRadius = random(minPetalRadius, maxPetalRadius);
        let centerRadius = random(minCenterRadius, maxCenterRadius);
        drawFlower(x, spacing / 2, petalRadius, centerRadius, petalCount, graphics);
    }

    //----- bottom border -------
    for (let x = spacing / 2; x < graphics.width; x += spacing) {
        let petalCount = floor(random(minPetalCount, maxPetalCount));
        let petalRadius = random(minPetalRadius, maxPetalRadius);
        let centerRadius = random(minCenterRadius, maxCenterRadius);
        drawFlower(x, graphics.height - spacing / 2, petalRadius, centerRadius, petalCount, graphics);
    }

    //----- left border -------
    for (let y = spacing / 2; y < graphics.height; y += spacing) {
        let petalCount = floor(random(minPetalCount, maxPetalCount));
        let petalRadius = random(minPetalRadius, maxPetalRadius);
        let centerRadius = random(minCenterRadius, maxCenterRadius);
        drawFlower(spacing / 2, y, petalRadius, centerRadius, petalCount, graphics);
    }

    //----- right border -------
    for (let y = spacing / 2; y < graphics.height; y += spacing) {
        let petalCount = floor(random(minPetalCount, maxPetalCount));
        let petalRadius = random(minPetalRadius, maxPetalRadius);
        let centerRadius = random(minCenterRadius, maxCenterRadius);
        drawFlower(graphics.width - spacing / 2, y, petalRadius, centerRadius, petalCount, graphics);
    }
}

function drawHeartBorderGraphics(graphics, resolution) {
  let minHeartSize = 10 / resolution ;
  let maxHeartSize = 20 / resolution ;
  let spacing = 30 / resolution ; // Reduce spacing to make more hearts appear
  
  graphics.noStroke();
  graphics.fill(0);

  // Top border
  for (let x = spacing / 2; x < graphics.width; x += spacing) {
    let heartSize = random(minHeartSize, maxHeartSize);
    drawHeart(x, spacing / 2, heartSize, graphics);
  }

  // Bottom border
  for (let x = spacing / 2; x < graphics.width; x += spacing) {
    let heartSize = random(minHeartSize, maxHeartSize);
    drawHeart(x, graphics.height - spacing / 2, heartSize, graphics);
  }

  // Left border
  for (let y = spacing / 2; y < graphics.height; y += spacing) {
    let heartSize = random(minHeartSize, maxHeartSize);
    drawHeart(spacing / 2, y, heartSize, graphics);
  }

  // Right border
  for (let y = spacing / 2; y < graphics.height; y += spacing) {
    let heartSize = random(minHeartSize, maxHeartSize);
    drawHeart(graphics.width - spacing / 2, y, heartSize, graphics);
  }
}

function drawMixStarFlowerBorderGraphics(graphics, resolution) {
  let minStarRadius1 = 3 / resolution;
  let maxStarRadius1 = 7 / resolution;
  let minStarRadius2 = 6 / resolution;
  let maxStarRadius2 = 14 / resolution;
  let minPetalRadius = 3 / resolution;
  let maxPetalRadius = 7 / resolution;
  let minCenterRadius = 2 / resolution;
  let maxCenterRadius = 5 / resolution;
  let minPetalCount = 5;
  let maxPetalCount = 10;
  let spacing = 30 / resolution;
  graphics.noStroke();
  graphics.fill(0);
  
  // Top border
  for (let x = spacing / 2; x < graphics.width; x += spacing) {
    if (random() < 0.5) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      drawStar(x, spacing / 2, starRadius1, starRadius2, 5, graphics);
    } else {
      let petalCount = floor(random(minPetalCount, maxPetalCount));
      let petalRadius = random(minPetalRadius, maxPetalRadius);
      let centerRadius = random(minCenterRadius, maxCenterRadius);
      drawFlower(x, spacing / 2, petalRadius, centerRadius, petalCount, graphics);
    }
  }

  // Bottom border
  for (let x = spacing / 2; x < graphics.width; x += spacing) {
    if (random() < 0.5) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      drawStar(x, graphics.height - spacing / 2, starRadius1, starRadius2, 5, graphics);
    } else {
      let petalCount = floor(random(minPetalCount, maxPetalCount));
      let petalRadius = random(minPetalRadius, maxPetalRadius);
      let centerRadius = random(minCenterRadius, maxCenterRadius);
      drawFlower(x, graphics.height - spacing / 2, petalRadius, centerRadius, petalCount, graphics);
    }
  }

  // Left border
  for (let y = spacing / 2; y < graphics.height; y += spacing) {
    if (random() < 0.5) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      drawStar(spacing / 2, y, starRadius1, starRadius2, 5, graphics);
    } else {
      let petalCount = floor(random(minPetalCount, maxPetalCount));
      let petalRadius = random(minPetalRadius, maxPetalRadius);
      let centerRadius = random(minCenterRadius, maxCenterRadius);
      drawFlower(spacing / 2, y, petalRadius, centerRadius, petalCount, graphics);
    }
  }

  // Right border
  for (let y = spacing / 2; y < graphics.height; y += spacing) {
    if (random() < 0.5) {
      let { starRadius1, starRadius2 } = randomStarSize(minStarRadius1, maxStarRadius1, minStarRadius2, maxStarRadius2);
      drawStar(graphics.width - spacing / 2, y, starRadius1, starRadius2, 5, graphics);
    } else {
      let petalCount = floor(random(minPetalCount, maxPetalCount));
      let petalRadius = random(minPetalRadius, maxPetalRadius);
      let centerRadius = random(minCenterRadius, maxCenterRadius);
      drawFlower(graphics.width - spacing / 2, y, petalRadius, centerRadius, petalCount, graphics);
    }
  }
}


function drawMixHeartsDotsBorderGraphics(graphics, resolution) {
  let minHeartSize = 10 / resolution;
  let maxHeartSize = 20/ resolution;
  let minDotSize = 10/ resolution;
  let maxDotSize = 30/ resolution;
  let spacing = 30/ resolution;
  graphics.noStroke();
  graphics.fill(0);
  
  // Top border
  for (let x = spacing / 2; x < graphics.width; x += spacing) {
    if (random() < 0.5) {
      let heartSize = random(minHeartSize, maxHeartSize);
      drawHeart(x, spacing / 2, heartSize, graphics);
    } else {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      graphics.ellipse(x, spacing / 2, dotSize, dotSize);
    }
  }

  // Bottom border
  for (let x = spacing / 2; x < graphics.width; x += spacing) {
    if (random() < 0.5) {
      let heartSize = random(minHeartSize, maxHeartSize);
      drawHeart(x, graphics.height - spacing / 2, heartSize, graphics);
    } else {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      graphics.ellipse(x, graphics.height - spacing / 2, dotSize, dotSize);
    }
  }

  // Left border
  for (let y = spacing / 2; y < graphics.height; y += spacing) {
    if (random() < 0.5) {
      let heartSize = random(minHeartSize, maxHeartSize);
      drawHeart(spacing / 2, y, heartSize, graphics);
    } else {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      graphics.ellipse(spacing / 2, y, dotSize, dotSize);
    }
  }

  // Right border
  for (let y = spacing / 2; y < graphics.height; y += spacing) {
    if (random() < 0.5) {
      let heartSize = random(minHeartSize, maxHeartSize);
      drawHeart(graphics.width - spacing / 2, y, heartSize, graphics);
    } else {
      let dotSize = randomDotSize(minDotSize, maxDotSize);
      graphics.ellipse(graphics.width - spacing / 2, y, dotSize, dotSize);
    }
  }
}

