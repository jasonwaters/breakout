/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { "default": obj };
	}
	
	var _resourcesJs = __webpack_require__(8);
	
	var _resourcesJs2 = _interopRequireDefault(_resourcesJs);
	
	var _spriteJs = __webpack_require__(2);
	
	var _spriteJs2 = _interopRequireDefault(_spriteJs);
	
	var _contextutilJs = __webpack_require__(3);
	
	var _contextutilJs2 = _interopRequireDefault(_contextutilJs);
	
	__webpack_require__(4);
	
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = webkitRequestAnimationFrame || mozRequestAnimationFrame || msRequestAnimationFrame || function (callback) {
			window.setInterval(callback, 1000 / 60);
		};
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
	    running = true;
	
	function init() {
		asset = {
			'explode': {
				'image': _resourcesJs2["default"].get('img/explosion-sprite-sheet.png'),
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
	
		util = new _contextutilJs2["default"](ctx, STAGE_WIDTH, STAGE_HEIGHT);
	
		paddle.y = STAGE_HEIGHT - paddle.height;
	
		$('body').keydown(function (evt) {
			//right
			if (evt.which == 39) {
				paddle.xVelocity = 6;
			} else if (evt.which == 37) {
				paddle.xVelocity = -6;
			}
		});
	
		$('body').keyup(function () {
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
		for (var row = 0; row < bricks.numRows; row++) {
			bricks.rows[row] = [];
			for (var col = 0; col < bricks.numColumns; col++) {
				bricks.rows[row][col] = 1;
			}
		}
	}
	
	function drawBricks() {
		for (var y = 0; y < bricks.rows.length; y++) {
			for (var x = 0; x < bricks.rows[y].length; x++) {
				if (bricks.rows[y][x] == 1) {
					util.drawRect(x * bricks.columnWidth + brick.padding, y * bricks.rowHeight + brick.padding, brick.width, brick.height, bricks.rowColors[y]);
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
	
		ball.row = Math.floor(ball.y / bricks.rowHeight);
		ball.col = Math.floor(ball.x / bricks.columnWidth);
	
		//reverse the ball and mark the brick as broken
		if (ball.row <= bricks.numRows - 1 && bricks.rows[ball.row][ball.col]) {
			bricks.rows[ball.row][ball.col] = 0;
			ball.yVelocity = ball.yVelocity * -1;
		}
	
		if (ball.x + ball.radius + ball.xVelocity > STAGE_WIDTH) {
			ball.xVelocity = Math.abs(ball.xVelocity) * -1;
		}
	
		if (ball.x - ball.radius < 0) {
			ball.xVelocity = Math.abs(ball.xVelocity);
		}
	
		//paddle
		if (ball.y - ball.radius > paddle.y) {
			//game over
			running = false;
		} else if (ball.y + ball.radius + ball.yVelocity > paddle.y) {
			if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
				ball.yVelocity = Math.abs(ball.yVelocity) * -1;
				ball.xVelocity = 8 * (ball.x - (paddle.x + paddle.width / 2)) / paddle.width;
			}
		}
	
		if (ball.y - ball.radius < 0) {
			ball.yVelocity = Math.abs(ball.yVelocity);
		}
	}
	
	_resourcesJs2["default"].load(['img/explosion-sprite-sheet.png']);
	
	_resourcesJs2["default"].onReady(init);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { 'default': obj };
	}
	
	var _resourcesJs = __webpack_require__(8);
	
	var _resourcesJs2 = _interopRequireDefault(_resourcesJs);
	
	function Sprite(url, pos, size, speed, frames, dir, once) {
		this.pos = pos;
		this.size = size;
		this.speed = typeof speed === 'number' ? speed : 0;
		this.frames = frames;
		this._index = 0;
		this.url = url;
		this.dir = dir || 'horizontal';
		this.once = once;
	};
	
	Sprite.prototype = {
		update: function update(dt) {
			this._index += this.speed * dt;
		},
	
		render: function render(ctx) {
			var frame;
	
			if (this.speed > 0) {
				var max = this.frames.length;
				var idx = Math.floor(this._index);
				frame = this.frames[idx % max];
	
				if (this.once && idx >= max) {
					this.done = true;
					return;
				}
			} else {
				frame = 0;
			}
	
			var x = this.pos[0];
			var y = this.pos[1];
	
			if (this.dir == 'vertical') {
				y += frame * this.size[1];
			} else {
				x += frame * this.size[0];
			}
	
			ctx.drawImage(_resourcesJs2['default'].get(this.url), x, y, this.size[0], this.size[1], 0, 0, this.size[0], this.size[1]);
		}
	};
	
	exports['default'] = Sprite;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	function ContextUtil(context, width, height) {
		this.ctx = context;
		this.ctxWidth = width;
		this.ctxHeight = height;
	}
	
	ContextUtil.prototype.drawCircle = function (x, y, r, color) {
		if (color) {
			this.ctx.fillStyle = color;
		}
	
		this.ctx.beginPath();
		this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
		this.ctx.closePath();
	
		this.ctx.fill();
	};
	
	ContextUtil.prototype.drawRect = function (x, y, w, h, color) {
		if (color) {
			this.ctx.fillStyle = color;
		}
	
		this.ctx.beginPath();
		this.ctx.rect(x, y, w, h);
		this.ctx.closePath();
	
		this.ctx.fill();
	};
	
	ContextUtil.prototype.clear = function () {
		this.ctx.clearRect(0, 0, this.ctxWidth, this.ctxHeight);
	};
	
	exports['default'] = ContextUtil;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(5);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\n\tbackground: #f2fcff;\n}\ncanvas {\n\tbackground-color: #000000;\n\tborder: 1px solid black;\n}", ""]);
	
	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	var resourceCache = {};
	var loading = [];
	var readyCallbacks = [];
	
	// Load an image url or an array of image urls
	function load(urlOrArr) {
		if (urlOrArr instanceof Array) {
			urlOrArr.forEach(function (url) {
				_load(url);
			});
		} else {
			_load(urlOrArr);
		}
	}
	
	function _load(url) {
		if (resourceCache[url]) {
			return resourceCache[url];
		} else {
			var img = new Image();
			img.onload = function () {
				resourceCache[url] = img;
	
				if (isReady()) {
					readyCallbacks.forEach(function (func) {
						func();
					});
				}
			};
			resourceCache[url] = false;
			img.src = url;
		}
	}
	
	function get(url) {
		return resourceCache[url];
	}
	
	function isReady() {
		var ready = true;
		for (var k in resourceCache) {
			if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
				ready = false;
			}
		}
		return ready;
	}
	
	function onReady(func) {
		readyCallbacks.push(func);
	}
	
	exports['default'] = {
		load: load,
		get: get,
		onReady: onReady,
		isReady: isReady
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map