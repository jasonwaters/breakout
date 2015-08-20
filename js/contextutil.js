'use strict';

function ContextUtil(context, width, height) {
	this.ctx = context;
	this.ctxWidth = width;
	this.ctxHeight = height;
}

ContextUtil.prototype.drawCircle = function(x, y, r, color) {
	if(color) {
		this.ctx.fillStyle = color;
	}

	this.ctx.beginPath();
	this.ctx.arc(x, y, r, 0, Math.PI*2, true);
	this.ctx.closePath();

	this.ctx.fill();
};

ContextUtil.prototype.drawRect = function(x, y, w, h, color) {
	if(color) {
		this.ctx.fillStyle = color;
	}

	this.ctx.beginPath();
	this.ctx.rect(x, y, w, h);
	this.ctx.closePath();

	this.ctx.fill();
};

ContextUtil.prototype.clear = function() {
	this.ctx.clearRect(0,0, this.ctxWidth, this.ctxHeight);
};

export default ContextUtil;