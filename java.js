let fontClimate, fontRoboto;
let imgVector, imgVector2; 

// --- Audio Variables ---
let bgMusic;
let bubbleSound;   // Click chung (bong bóng)
let coralClick1;   // Click san hô (Thường)
let coralClick2;   // Click san hô (Heat Up)

// =================================================================
// Colors & State Management
// =================================================================
const hexBlack = '#000000';
const hexWhite = '#FFFFFF';
const hexBlue  = '#0033FF';
const hexRed   = '#FF0000'; 

let colCurrent; 
let colBlue, colRed; 
let isAlertMode = false;

// --- Transition Timer: 5 Seconds ---
let transitionDuration = 5000; 
let currentProgress = 0.0;     

// --- Coral Animation Settings ---
let imgRotation = 0;
let coralSwaySpeed = 1;  
let coralSwayRange = 3;  
let ringStrokeWeight = 3; 

// --- Click Shake Effect ---
let clickShakeTimer = 0;       
let clickShakeDuration = 15;   

// --- Button Sway Configuration ---
let btnSwayX = 0;      
let btnSwayY = 650;    
let btnSwayW = 750;    
let btnSwayH = 500;    
let showDebugButton = false; 

// --- Ripple Effect Variables ---
let ripple1, ripple2, ripple3, ripple4, ripple5; 

// =================================================================
// Blob Configuration
// =================================================================
let blob1_W = 3207.4; let blob1_H = 1597.31;
let blob1_CX = -476.47 + (blob1_W / 2); let blob1_CY = -506.21 + (blob1_H / 2); 
let blob1_Len = 50; let blob1_Thick = 237; 
const blob1_MaxAlpha = 250; let blob1_Alpha = 250; 

let blob2_W = 2318.22; let blob2_H = 1154.49;
let blob2_CX = -9.81 + (blob2_W / 2); let blob2_CY = -396.24 + (blob2_H / 2); 
let blob2_Len = 30; let blob2_Thick = 150;
const blob2_MaxAlpha = 127; let blob2_Alpha = 127; 

let blob3_W = 1304; let blob3_H = 649.4;
let blob3_CX = 522.47 + (blob3_W / 2); let blob3_CY = -68.31 + (blob3_H / 2); 
let blob3_Len = 20; let blob3_Thick = 71;
const blob3_MaxAlpha = 250; let blob3_Alpha = 250; 

let blobSpeed1 = 0.4;   let blobAngle1 = 0;
let blobSpeed2 = -0.08; let blobAngle2 = 140;
let blobSpeed3 = 0.2;   let blobAngle3 = 180;

// =================================================================
// Text Configuration
// =================================================================
let baseSpeed1 = 0.02; let baseSpeed2 = 0; let baseSpeed3 = -0.04;  
let baseSpeed5 = 0.08;  let baseSpeed6 = -0.08;  let baseSpeed7 = 0.1;   

let sizeLayer1 = 100; let sizeLayer2 = 68; let sizeLayer3 = 50;  
let sizeLayer5 = 35;  let sizeLayer6 = 32; let sizeLayer7 = 19;  

let spacing1 = 0.5;    let spacing2 = 0.8;    let spacing3 = 1; 
let spacing5 = 0.7;    let spacing6 = 0.9;    let spacing7 = 0.8; 

let angleLayer1 = 140; let angleLayer2 = 205; let angleLayer3 = 145; 
let angleLayer5 = 120; let angleLayer6 = 150; let angleLayer7 = 160; 

let globalOffsetY = 10; 

// =================================================================

function preload() {
    imgVector = loadImage('assets/Vector.svg'); 
    imgVector2 = loadImage('assets/Vector2.svg'); 
    
    // Load Sounds
    bgMusic = loadSound('sounds/ambient_music_with_noise.mp3');
    bubbleSound = loadSound('sounds/bubble.wav');       
    coralClick1 = loadSound('sounds/coralclick.wav');   
    coralClick2 = loadSound('sounds/coralclick.wav');  
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(2); 
    textFont('Atkinson Hyperlegible Mono');
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);

    colBlue = color(hexBlue);
    colRed = color(hexRed);
    colCurrent = colBlue;
    
    // -----------------------------------------------------
    // 1. Heat Up Button
    // -----------------------------------------------------
    let btnWarning = createButton(''); 
    btnWarning.class('heat-btn'); 
    btnWarning.html(`
        <img src="assets/heatup.svg" alt="heat">
        <span>heat up</span>
    `);
    
    btnWarning.mousePressed(() => {
        // Play sound click
        if (bubbleSound.isLoaded()) bubbleSound.play();

        isAlertMode = !isAlertMode; 
        if (isAlertMode) {
            document.body.classList.add('alert-active');
            btnWarning.addClass('active');
            btnWarning.html(`
                <img src="assets/heatdown.svg" alt="cool">
                <span>heat down</span>
            `);
        } else {
            document.body.classList.remove('alert-active');
            btnWarning.removeClass('active');
            btnWarning.html(`
                <img src="assets/heatup.svg" alt="heat">
                <span>heat up</span>
            `);
        }
    });

    // -----------------------------------------------------
    // 2. Music Button
    // -----------------------------------------------------
    let btnMusic = createButton('');
    btnMusic.class('music-btn'); 
    btnMusic.html('<img src="assets/musicoff.svg" alt="Music Off">');
    
    let isMusicStarted = false; 
    let isMuted = true;         

    btnMusic.mousePressed(() => {
        userStartAudio();
        
        // Play sound click
        if (bubbleSound.isLoaded()) bubbleSound.play();

        if (!isMusicStarted) {
            bgMusic.setVolume(0.5);
            console.log("Music Started");
            bgMusic.loop(); 
            isMusicStarted = true;
            isMuted = false;
            
            btnMusic.html('<img src="assets/musicon.svg" alt="Music On">');
        } else {
            isMuted = !isMuted;
            
            if (isMuted) {
                bgMusic.setVolume(0, 0.2); 
                btnMusic.html('<img src="assets/musicoff.svg" alt="Music Off">');
            } else {
                bgMusic.setVolume(1, 0.2); 
                btnMusic.html('<img src="assets/musicon.svg" alt="Music On">');
            }
        }
    });

    // -----------------------------------------------------
    // Initialize Ripple Effects
    // -----------------------------------------------------
    ripple1 = new RippleRing(119.51, -180.56, 2072, 1030, 0.002);   
    ripple2 = new RippleRing(592, -8.08, 1171.51, 583.42, 0.003); 
    ripple3 = new RippleRing(675.3, 20.26, 1012.82, 504.08, 0.0045); 
    ripple4 = new RippleRing(1052.55, 178.55, 294, 146, 0.006);   
    ripple5 = new RippleRing(1148.76, 204.08, 110.67, 54.96, 0.008); 
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function checkMouseInButton() {
    let baseW = 1920; 
    let baseH = 1080;
    let scaleFactor = min(width / baseW, height / baseH);

    let dx = mouseX - width / 2;
    let dy = mouseY - height / 2;
    dx /= scaleFactor;
    dy /= scaleFactor;
    
    let logicX = dx + baseW / 2;
    let logicY = dy + baseH / 2 - globalOffsetY;

    if (logicX > btnSwayX && logicX < btnSwayX + btnSwayW &&
        logicY > btnSwayY && logicY < btnSwayY + btnSwayH) {
        return true;
    }
    return false;
}

// 🔥🔥 SỬA LOGIC CLICK CHUỘT TẠI ĐÂY 🔥🔥
function mousePressed() {
    
    // 1. Kiểm tra xem có click trúng San Hô không?
    if (checkMouseInButton()) {
        
        // ==> NẾU TRÚNG SAN HÔ: Rung lắc + Tiếng San hô
        clickShakeTimer = clickShakeDuration;

        if (isAlertMode) {
            // Heat Up Mode -> Play coralclick2.wav
            if (coralClick2.isLoaded()) coralClick2.play();
        } else {
            // Normal Mode -> Play coralclick.wav
            if (coralClick1.isLoaded()) coralClick1.play();
        }

    } else {
        // ==> NẾU KHÔNG TRÚNG SAN HÔ (Click nền): Play tiếng Bong bóng
        if (bubbleSound.isLoaded()) bubbleSound.play();
    }
}

function draw() {
    background(hexBlack);

    if (checkMouseInButton()) {
        cursor('pointer'); 
    } else {
        cursor(ARROW);   
    }

    // =================================================================
    // Core Logic
    // =================================================================
    
    let step = deltaTime / transitionDuration; 
    if (isAlertMode) {
        currentProgress += step; 
    } else {
        currentProgress -= step; 
    }
    currentProgress = constrain(currentProgress, 0, 1);

    // Colors
    colCurrent = lerpColor(colBlue, colRed, currentProgress);
    let colWhiteToRed = lerpColor(color(hexWhite), colRed, currentProgress);

    // Speeds
    let textSpeedMult = map(currentProgress, 0, 1, 1.0, 10.0);
    let rippleSpeedMult = map(currentProgress, 0, 1, 1.0, 8.0);
    let globalSwayFactor = 1.0 - currentProgress; 

    // Blob Opacity
    let blobOpacityMult = 1.0 - currentProgress; 
    blob1_Alpha = blob1_MaxAlpha * blobOpacityMult;
    blob2_Alpha = blob2_MaxAlpha * blobOpacityMult;
    blob3_Alpha = blob3_MaxAlpha * blobOpacityMult;

    // Angles
    angleLayer1 = (angleLayer1 + baseSpeed1 * textSpeedMult) % 360;
    angleLayer2 = (angleLayer2 + baseSpeed2 * textSpeedMult) % 360;
    angleLayer3 = (angleLayer3 + baseSpeed3 * textSpeedMult) % 360;
    angleLayer5 = (angleLayer5 + baseSpeed5 * textSpeedMult) % 360;
    angleLayer6 = (angleLayer6 + baseSpeed6 * textSpeedMult) % 360;
    angleLayer7 = (angleLayer7 + baseSpeed7 * textSpeedMult) % 360;
    
    blobAngle1 = (blobAngle1 + blobSpeed1 * textSpeedMult) % 360;
    blobAngle2 = (blobAngle2 + blobSpeed2 * textSpeedMult) % 360;
    blobAngle3 = (blobAngle3 + blobSpeed3 * textSpeedMult) % 360;

    // --- Draw ---
    let baseW = 1920;
    let baseH = 1080;
    let scaleFactor = min(width / baseW, height / baseH);
    
    push(); 
    translate(width / 2, height / 2); 
    scale(scaleFactor); 
    translate(-baseW / 2, -baseH / 2 + globalOffsetY);

    // Layer 0: Coral
    let bottomLine = 1080; 
    let pushDown1 = 50;  let pushDown2 = 350;

    let interactionSway = 0;
    if (clickShakeTimer > 0) {
        clickShakeTimer--; 
        if (currentProgress < 0.5) {
            interactionSway = sin(frameCount * 8) * 5; 
        } else {
            interactionSway = random(-3, 3); 
        }
    }

    let finalSway1 = (sin(frameCount * coralSwaySpeed) * coralSwayRange * globalSwayFactor) + interactionSway;
    let finalSway2 = (sin((frameCount + 45) * coralSwaySpeed) * coralSwayRange * globalSwayFactor) + interactionSway;

    // Coral Opacity
    let alphaImg1 = map(currentProgress, 0, 1, 127, 0);
    
    let blinkSpeed = 1; 
    let blinkingTarget = map(sin(frameCount * blinkSpeed), -1, 1, 170, 255);
    let alphaImg2 = map(currentProgress, 0, 1, 0, blinkingTarget); 

    if (alphaImg1 > 1) {
        push(); tint(255, alphaImg1); 
        translate(0 + imgVector.width / 2, bottomLine + pushDown1);
        rotate(imgRotation + finalSway1); 
        imageMode(CENTER); image(imgVector, 0, -imgVector.height / 2); pop();

        push(); tint(255, alphaImg1);
        translate(imgVector.width * 0.65 + imgVector.width / 2, bottomLine + pushDown2);
        rotate((imgRotation + 10) + finalSway2); 
        imageMode(CENTER); image(imgVector, 0, -imgVector.height / 2); pop();
    }

    if (alphaImg2 > 1) {
        push(); tint(255, alphaImg2); 
        translate(0 + imgVector2.width / 2, bottomLine + pushDown1);
        rotate(imgRotation + finalSway1); 
        imageMode(CENTER); image(imgVector2, 0, -imgVector2.height / 2); pop();

        push(); tint(255, alphaImg2);
        translate(imgVector2.width * 0.65 + imgVector2.width / 2, bottomLine + pushDown2);
        rotate((imgRotation + 10) + finalSway2); 
        imageMode(CENTER); image(imgVector2, 0, -imgVector2.height / 2); pop();
    }
    
    // Layer 1: Blobs
    drawCurvedBlob(blob1_CX, blob1_CY, blob1_W, blob1_H, blobAngle1, blob1_Len, blob1_Thick, blob1_Alpha);
    drawCurvedBlob(blob2_CX, blob2_CY, blob2_W, blob2_H, blobAngle2, blob2_Len, blob2_Thick, blob2_Alpha);
    drawCurvedBlob(blob3_CX, blob3_CY, blob3_W, blob3_H, blobAngle3, blob3_Len, blob3_Thick, blob3_Alpha);

    // Layer 2: Rings & Text
    drawTextOnEllipse("I f  the  ocean  di es,  we  di e.                                                     I f  the  ocean  di es,  we  di e.", -218.37, -355.07, 2716.04, 1348.67, angleLayer1, spacing1, colWhiteToRed, 'Notable', sizeLayer1, true);
    ripple1.update(rippleSpeedMult); 
    ripple1.display(colCurrent, ringStrokeWeight); 

    drawTextOnEllipse("Rising Sea Levels             Global Warming           Extreme Weather", 359.18, -86.34, 1674, 832, angleLayer3, spacing3, colWhiteToRed, 'Atkinson Hyperlegible Mono', sizeLayer3, true);
    ripple2.update(rippleSpeedMult); 
    ripple2.display(colCurrent, ringStrokeWeight);

    ripple3.update(rippleSpeedMult);
    ripple3.display(colCurrent, ringStrokeWeight);

    drawTextOnEllipse("Nguyen  Thi  Xuan  Hi en  -  s4072453                          Maciawa Team", 751.3, 54.2, 868, 432, angleLayer5, spacing5, colCurrent, 'Notable', sizeLayer5, true);

    drawTextOnEllipse("Coral Starvation   Coral Bleaching     Dying Reefs", 875.19, 116.09, 632, 314, angleLayer6, spacing6, colWhiteToRed, 'Atkinson Hyperlegible Mono', sizeLayer6, true);
    
    ripple4.update(rippleSpeedMult); 
    ripple4.display(colCurrent, ringStrokeWeight);
    
    ripple5.update(rippleSpeedMult);
    ripple5.display(colCurrent, ringStrokeWeight);

    drawTextOnEllipse("Zooxanthellae Loss - Algal Overgrowth - Food Chain Disruption -", 995.86, 155.65, 402, 200, angleLayer7, spacing7, colWhiteToRed, 'Atkinson Hyperlegible Mono', sizeLayer7, true);
    
    if (showDebugButton) {
        push();
        fill(0, 255, 0, 127); 
        noStroke();
        rect(btnSwayX, btnSwayY, btnSwayW, btnSwayH);
        fill(255); 
        textAlign(CENTER, CENTER); textSize(30);
        text("BUTTON SWAY AREA", btnSwayX + btnSwayW/2, btnSwayY + btnSwayH/2);
        pop();
    }

    pop(); 
}

// --- Helper Functions ---

class RippleRing {
    constructor(x, y, w, h, speed) {
        this.baseX = x; this.baseY = y;
        this.baseW = w; this.baseH = h;
        this.centerX = x + w / 2;
        this.centerY = y + h / 2;
        this.progress = random(0, 1); 
        this.speed = speed;
    }

    update(mult = 1.0) {
        this.progress += this.speed * mult;
        if (this.progress > 1) this.progress = 0;
    }

    display(colorToUse, maxStroke) {
        push();
        noFill();
        
        let currentScale = map(this.progress, 0, 1, 1.0, 1.15);
        let curW = this.baseW * currentScale;
        let curH = this.baseH * currentScale;

        let opacity;
        if (this.progress < 0.2) {
            opacity = map(this.progress, 0, 0.2, 0, 255);
        } else {
            opacity = map(this.progress, 0.2, 1, 255, 0);
        }

        let curStroke = map(this.progress, 0, 1, maxStroke, maxStroke * 0.5);
        
        let c = color(colorToUse);
        c.setAlpha(opacity);
        stroke(c);
        strokeWeight(curStroke);

        ellipseMode(CENTER);
        ellipse(this.centerX, this.centerY, curW, curH);
        pop();
    }
}

function drawCurvedBlob(cx, cy, w, h, startAngle, lengthAngle, thickness, opacity) {
    noFill();
    let blobColor = color(colCurrent); 
    blobColor.setAlpha(opacity); 
    stroke(blobColor); strokeWeight(thickness); strokeCap(ROUND); 
    arc(cx, cy, w, h, startAngle, startAngle + lengthAngle);
}

function drawTextOnEllipse(str, x, y, w, h, startAngle, spacingFactor, col, fontName, fontSize, isBottom = false, isBold = false) {
    textFont(fontName); textSize(fontSize);
    if (isBold) textStyle(BOLD); else textStyle(NORMAL);
    
    let c = color(col);
    c.setAlpha(255); 
    fill(c); 
    noStroke();

    let cx = x + w / 2; let cy = y + h / 2; let rx = w / 2; let ry = h / 2;
    let currentAngleRad = radians(startAngle);
    
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i); let charW = textWidth(char);
        let currentAngleDeg = degrees(currentAngleRad);
        let xPos = cx + rx * cos(currentAngleDeg); let yPos = cy + ry * sin(currentAngleDeg);
        push(); translate(xPos, yPos);
        let rotation = currentAngleDeg + (isBottom ? -90 : 90);
        rotate(rotation); text(char, 0, 0); pop();
        let dx_dtheta = -rx * sin(currentAngleRad);
        let dy_dtheta = ry * cos(currentAngleRad);
        let arcDerivative = sqrt(dx_dtheta*dx_dtheta + dy_dtheta*dy_dtheta);
        let angleStepRad = (charW * spacingFactor) / arcDerivative;
        if (isBottom) { currentAngleRad -= angleStepRad; } else { currentAngleRad += angleStepRad; }
    }
}

