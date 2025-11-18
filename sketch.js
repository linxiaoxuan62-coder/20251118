
// 全視窗動畫：中間角色使用 `2/2_all.png` (6 幀)，右側角色使用 `1/1_all.png` (16 幀)
// 中間角色變數
let centerSheet;
let centerFrames = [];
const CENTER_FRAMES = 6;
let centerFrameW = 0;
let centerFrameH = 0;
let centerCurrent = 0;
let centerFps = 12;
let centerLast = 0;
let centerScale = 1;

// 右側角色變數
let rightSheet;
let rightFrames = [];
const RIGHT_FRAMES = 16;
let rightFrameW = 0;
let rightFrameH = 0;
let rightCurrent = 0;
let rightFps = 10;
let rightLast = 0;
let rightScale = 1;

function preload() {
	// 預載入兩個 spritesheets
	centerSheet = loadImage('2/2_all.png');
	rightSheet = loadImage('1/1_all.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);
	frameRate(60);

	// 中間角色切割
	if (!centerSheet) {
		console.error('centerSheet 未載入：請確認路徑 2/2_all.png 是否存在');
	} else {
		centerFrameW = floor(centerSheet.width / CENTER_FRAMES);
		centerFrameH = centerSheet.height;
		centerFrames = [];
		for (let i = 0; i < CENTER_FRAMES; i++) {
			let sx = i * centerFrameW;
			centerFrames.push(centerSheet.get(sx, 0, centerFrameW, centerFrameH));
		}
		centerScale = (width * 0.25) / centerFrameW;
		centerScale = min(centerScale, 3);
	}

	// 右側角色切割
	if (!rightSheet) {
		console.error('rightSheet 未載入：請確認路徑 1/1_all.png 是否存在');
	} else {
		rightFrameW = floor(rightSheet.width / RIGHT_FRAMES);
		rightFrameH = rightSheet.height;
		rightFrames = [];
		for (let i = 0; i < RIGHT_FRAMES; i++) {
			let sx = i * rightFrameW;
			rightFrames.push(rightSheet.get(sx, 0, rightFrameW, rightFrameH));
		}
		// 右側角色初始縮放：寬度約為視窗寬度的 12%
		rightScale = (width * 0.12) / rightFrameW;
		rightScale = min(rightScale, 3);
	}
}

function draw() {
	background('#fae3e3');

	// 若任一角色尚未載入完畢，顯示載入中
	if (centerFrames.length === 0 || rightFrames.length === 0) {
		fill(0);
		textAlign(CENTER, CENTER);
		text('載入中...', width / 2, height / 2);
		return;
	}

	// 更新中間動畫
	const centerInterval = 1000 / centerFps;
	if (millis() - centerLast >= centerInterval) {
		centerCurrent = (centerCurrent + 1) % centerFrames.length;
		centerLast = millis();
	}

	// 更新右側動畫
	const rightInterval = 1000 / rightFps;
	if (millis() - rightLast >= rightInterval) {
		rightCurrent = (rightCurrent + 1) % rightFrames.length;
		rightLast = millis();
	}

	// 繪製左側角色（視窗中間偏左，水平 25%）
	push();
	const drawCenterW = centerFrameW * centerScale;
	const drawCenterH = centerFrameH * centerScale;
	const leftX = width * 0.35;
	const midY = height / 2;
	image(centerFrames[centerCurrent], leftX, midY, drawCenterW, drawCenterH);
	pop();

	// 繪製右側角色（視窗中間偏右，水平 75%）
	push();
	const drawRightW = rightFrameW * rightScale;
	const drawRightH = rightFrameH * rightScale;
	const rightX = width * 0.65;
	const rightY = height / 2;
	image(rightFrames[rightCurrent], rightX, rightY, drawRightW, drawRightH);
	pop();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (centerFrameW > 0) {
		centerScale = (width * 0.25) / centerFrameW;
		centerScale = min(centerScale, 3);
	}
	if (rightFrameW > 0) {
		rightScale = (width * 0.12) / rightFrameW;
		rightScale = min(rightScale, 3);
	}
}

