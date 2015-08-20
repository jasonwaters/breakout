'use strict';
import resources from "./resources.js";
import Sprite from "./sprite.js";
import ContextUtil from "./contextutil.js"

require('../style.css');

if(!window.requestAnimationFrame){
	window.requestAnimationFrame = webkitRequestAnimationFrame ||
		mozRequestAnimationFrame || msRequestAnimationFrame ||
		function(callback){window.setInterval(callback, 1000/60)};
}

var canvas,
	ctx,
	util,
	ball,
	paddle,
	brick,
	bricks,
	STAGE_WIDTH,
	STAGE_HEIGHT,
	asset,
	running=true;

function init() {
	asset = {
		'explode': {
			'image': resources.get('img/explosion-sprite-sheet.png'),
			'frame': 0,
			'numFrames': 5,
			'spriteWidth': 118,
			'spriteHeight': 118
		}
	};

	ball = {
		"x": 100,
		"y": 100,
		"xVelocity": 5,
		"yVelocity": 5,
		'radius': 6,
		'color': "#FFFFFF"
	};

	paddle = {
		"x": 240,
		"y": 290,
		'width': 75,
		'height': 10,
		'xVelocity': 0,
		'color': "#FFFFFF"
	};

	brick = {
		'padding': 1,
		'width': 79,
		'height': 15

	};

	bricks = {
		"numColumns": 5,
		"numRows": 5,
		'rowColors': ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"],
		'rowHeight': brick.height + brick.padding,
		'columnWidth': brick.width + brick.padding,
		'rows': []
	};

	canvas = document.getElementById('breakout');
	ctx = canvas.getContext('2d');

	STAGE_WIDTH = canvas.width;
	STAGE_HEIGHT = canvas.height;

	util = new ContextUtil(ctx, STAGE_WIDTH, STAGE_HEIGHT);

	paddle.y = STAGE_HEIGHT - paddle.height;

	$('body').keydown(function(evt) {
		//right
		if(evt.which == 39) {
			paddle.xVelocity = 6;
		}else if(evt.which == 37) {
			paddle.xVelocity = -6;
		}
	});

	$('body').keyup(function() {
		paddle.xVelocity = 0;
	});

	initBricks();

	(function mainloop() {
		if (!running) return;
		window.requestAnimationFrame(mainloop);
		draw();
	})();
}

function initBricks() {
	for(var row=0;row<bricks.numRows;row++) {
		bricks.rows[row] = [];
		for(var col=0;col<bricks.numColumns;col++) {
			bricks.rows[row][col] = 1;
		}
	}
}



function drawBricks() {
	for(var y=0;y<bricks.rows.length;y++) {
		for(var x=0;x<bricks.rows[y].length;x++) {
			if(bricks.rows[y][x] == 1) {
				util.drawRect((x*bricks.columnWidth)+brick.padding,
					y*bricks.rowHeight+brick.padding,
					brick.width,
					brick.height,
					bricks.rowColors[y]);
			}
		}
	}
}

function draw() {
	util.clear();

	//draw ball
	util.drawCircle(ball.x, ball.y, ball.radius, ball.color);

	//draw paddle
	util.drawRect(paddle.x, paddle.y, paddle.width, paddle.height, paddle.color);

	drawBricks();

	ctx.drawImage(asset.explode.image, 0, 0, 118, 118, 0, 0, 118, 118);

	ball.x += ball.xVelocity;
	ball.y += ball.yVelocity;

	paddle.x += paddle.xVelocity;

	ball.row = Math.floor(ball.y/bricks.rowHeight);
	ball.col = Math.floor(ball.x/bricks.columnWidth);

	//reverse the ball and mark the brick as broken
	if(ball.row <= bricks.numRows-1 && bricks.rows[ball.row][ball.col]) {
		bricks.rows[ball.row][ball.col] = 0;
		ball.yVelocity = ball.yVelocity * -1;
	}

	if((ball.x + ball.radius + ball.xVelocity)>STAGE_WIDTH) {
		ball.xVelocity = Math.abs(ball.xVelocity) * -1;
	}

	if(ball.x-ball.radius<0) {
		ball.xVelocity = Math.abs(ball.xVelocity);
	}

	//paddle
	if(ball.y-ball.radius>paddle.y) {
		//game over
		running = false;
	}else if(ball.y+ball.radius+ball.yVelocity>paddle.y) {
		if(ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
			ball.yVelocity = Math.abs(ball.yVelocity) * -1;
			ball.xVelocity = 8 * (ball.x - (paddle.x + (paddle.width/2)))/paddle.width;
		}
	}

	if(ball.y-ball.radius<0) {
		ball.yVelocity = Math.abs(ball.yVelocity);
	}
}

resources.load([
	'img/explosion-sprite-sheet.png'
]);

resources.onReady(init);
