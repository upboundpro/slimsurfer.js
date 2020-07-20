/*!
 * slimsurfer.js 4.0.1 (2020-07-20)
 * https://github.com/upboundpro/slimsurfer.js
 * @license BSD-3-Clause
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("SlimSurfer", [], factory);
	else if(typeof exports === 'object')
		exports["SlimSurfer"] = factory();
	else
		root["SlimSurfer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/slimsurfer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/debounce/index.js":
/*!****************************************!*\
  !*** ./node_modules/debounce/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ }),

/***/ "./src/drawer.js":
/*!***********************!*\
  !*** ./src/drawer.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var util = _interopRequireWildcard(__webpack_require__(/*! ./util */ "./src/util/index.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Parent class for renderers
 *
 * @extends {Observer}
 */
var Drawer = /*#__PURE__*/function (_util$Observer) {
  _inherits(Drawer, _util$Observer);

  var _super = _createSuper(Drawer);

  /**
   * @param {HTMLElement} container The container node of the slimsurfer instance
   * @param {WavesurferParams} params The slimsurfer initialisation options
   */
  function Drawer(container, params) {
    var _this;

    _classCallCheck(this, Drawer);

    _this = _super.call(this);
    /** @private */

    _this.container = container;
    /**
     * @type {WavesurferParams}
     * @private
     */

    _this.params = params;
    /**
     * The width of the renderer
     * @type {number}
     */

    _this.width = 0;
    /**
     * The height of the renderer
     * @type {number}
     */

    _this.height = params.height * _this.params.pixelRatio;
    /** @private */

    _this.lastPos = 0;
    /**
     * The `<wave>` element which is added to the container
     * @type {HTMLElement}
     */

    _this.wrapper = null;
    return _this;
  }
  /**
   * Alias of `util.style`
   *
   * @param {HTMLElement} el The element that the styles will be applied to
   * @param {Object} styles The map of propName: attribute, both are used as-is
   * @return {HTMLElement} el
   */


  _createClass(Drawer, [{
    key: "style",
    value: function style(el, styles) {
      return util.style(el, styles);
    }
    /**
     * Create the wrapper `<wave>` element, style it and set up the events for
     * interaction
     */

  }, {
    key: "createWrapper",
    value: function createWrapper() {
      this.wrapper = this.container.appendChild(document.createElement('wave'));
      this.style(this.wrapper, {
        display: 'block',
        position: 'relative',
        userSelect: 'none',
        webkitUserSelect: 'none',
        //height: this.params.height + 'px'
        height: '100%'
      });

      if (this.params.fillParent || this.params.scrollParent) {
        this.style(this.wrapper, {
          width: '100%',
          overflowX: this.params.hideScrollbar ? 'hidden' : 'auto',
          overflowY: 'hidden'
        });
      }

      this.setupWrapperEvents();
    }
    /**
     * Handle click event
     *
     * @param {Event} e Click event
     * @param {?boolean} noPrevent Set to true to not call `e.preventDefault()`
     * @return {number} Playback position from 0 to 1
     */

  }, {
    key: "handleEvent",
    value: function handleEvent(e, noPrevent) {
      !noPrevent && e.preventDefault();
      var clientX = e.targetTouches ? e.targetTouches[0].clientX : e.clientX;
      var bbox = this.wrapper.getBoundingClientRect();
      var nominalWidth = this.width;
      var parentWidth = this.getWidth();
      var progress;

      if (!this.params.fillParent && nominalWidth < parentWidth) {
        progress = (clientX - bbox.left) * (this.params.pixelRatio / nominalWidth) || 0;

        if (progress > 1) {
          progress = 1;
        }
      } else {
        progress = (clientX - bbox.left + this.wrapper.scrollLeft) / this.wrapper.scrollWidth || 0;
      }

      return progress;
    } // We want to handle mouse clicks

    /**
     * @private
     */

  }, {
    key: "setupWrapperEvents",
    value: function setupWrapperEvents() {
      var _this2 = this;

      this.wrapper.addEventListener('click', function (e) {
        var scrollbarHeight = _this2.wrapper.offsetHeight - _this2.wrapper.clientHeight;

        if (scrollbarHeight != 0) {
          // scrollbar is visible.  Check if click was on it
          var bbox = _this2.wrapper.getBoundingClientRect();

          if (e.clientY >= bbox.bottom - scrollbarHeight) {
            // ignore mousedown as it was on the scrollbar
            return;
          }
        }

        if (_this2.params.interact) {
          _this2.fireEvent('click', e, _this2.handleEvent(e));
        }
      });
      this.wrapper.addEventListener('scroll', function (e) {
        return _this2.fireEvent('scroll', e);
      });
    }
    /**
     * Draw peaks on the canvas
     * @param {number[]|number[][]} peaks Can also be an array of arrays for split channel
     * rendering
     * @param {number} length The width of the area that should be drawn
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that should be
     * rendered
     */

  }, {
    key: "drawPeaks",
    value: function drawPeaks(peaks, length, start, end) {
      if (!this.setWidth(length)) {
        this.clearWave();
      }

      this.params.barWidth ? this.drawBars(peaks, 0, start, end) : this.drawWave(peaks, 0, start, end);
    }
    /**
     * Scroll to the beginning
     */

  }, {
    key: "resetScroll",
    value: function resetScroll() {
      if (this.wrapper !== null) {
        this.wrapper.scrollLeft = 0;
      }
    }
    /**
     * Recenter the viewport at a certain percent of the waveform
     *
     * @param {number} percent Value from 0 to 1 on the waveform
     */

  }, {
    key: "recenter",
    value: function recenter(percent) {
      var position = this.wrapper.scrollWidth * percent;
      this.recenterOnPosition(position, true);
    }
    /**
     * Recenter the viewport on a position, either scroll there immediately or
     * in steps of 5 pixels
     *
     * @param {number} position X-offset in pixels
     * @param {boolean} immediate Set to true to immediately scroll somewhere
     */

  }, {
    key: "recenterOnPosition",
    value: function recenterOnPosition(position, immediate) {
      var scrollLeft = this.wrapper.scrollLeft;
      var half = ~~(this.wrapper.clientWidth / 2);
      var maxScroll = this.wrapper.scrollWidth - this.wrapper.clientWidth;
      var target = position - half;
      var offset = target - scrollLeft;

      if (maxScroll == 0) {
        // no need to continue if scrollbar is not there
        return;
      } // if the cursor is currently visible...


      if (!immediate && -half <= offset && offset < half) {
        // we'll limit the "re-center" rate.
        var rate = 5;
        offset = Math.max(-rate, Math.min(rate, offset));
        target = scrollLeft + offset;
      } // limit target to valid range (0 to maxScroll)


      target = Math.max(0, Math.min(maxScroll, target)); // no use attempting to scroll if we're not moving

      if (target != scrollLeft) {
        this.wrapper.scrollLeft = target;
      }
    }
    /**
     * Get the current scroll position in pixels
     *
     * @return {number} current scroll position in pixels
     */

  }, {
    key: "getScrollX",
    value: function getScrollX() {
      var pixelRatio = this.params.pixelRatio;
      var x = Math.round(this.wrapper.scrollLeft * pixelRatio); // In cases of elastic scroll (safari with mouse wheel) you can
      // scroll beyond the limits of the container
      // Calculate and floor the scrollable extent to make sure an out
      // of bounds value is not returned
      // Ticket #1312

      if (this.params.scrollParent) {
        var maxScroll = ~~(this.wrapper.scrollWidth * pixelRatio - this.getWidth());
        x = Math.min(maxScroll, Math.max(0, x));
      }

      return x;
    }
    /**
     * Get the width of the container
     *
     * @return {number} width of the container
     */

  }, {
    key: "getWidth",
    value: function getWidth() {
      return Math.round(this.container.clientWidth * this.params.pixelRatio);
    }
    /**
     * Set the width of the container
     *
     * @param {number} width width of the container
     */

  }, {
    key: "setWidth",
    value: function setWidth(width) {
      if (this.width == width) {
        return false;
      }

      this.width = width;

      if (this.params.fillParent || this.params.scrollParent) {
        this.style(this.wrapper, {
          width: ''
        });
      } else {
        this.style(this.wrapper, {
          width: ~~(this.width / this.params.pixelRatio) + 'px'
        });
      }

      this.updateSize();
      return true;
    }
    /**
     * Set the height of the container
     *
     * @param {number} height
     */

  }, {
    key: "setHeight",
    value: function setHeight(height) {
      if (height == this.height) {
        return false;
      }

      this.height = height;
      this.style(this.wrapper, {
        // height: ~~(this.height / this.params.pixelRatio) + 'px'
        height: '100%'
      });
      this.updateSize();
      return true;
    }
    /**
     * Called by slimsurfer when progress should be renderered
     *
     * @param {number} progress From 0 to 1
     */

  }, {
    key: "progress",
    value: function progress(_progress) {
      var minPxDelta = 1 / this.params.pixelRatio;
      var pos = Math.round(_progress * this.width) * minPxDelta;

      if (pos < this.lastPos || pos - this.lastPos >= minPxDelta) {
        this.lastPos = pos;

        if (this.params.scrollParent && this.params.autoCenter) {
          var newPos = ~~(this.wrapper.scrollWidth * _progress);
          this.recenterOnPosition(newPos);
        }

        this.updateProgress(pos);
      }
    }
    /**
     * This is called when slimsurfer is destroyed
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.unAll();

      if (this.wrapper) {
        if (this.wrapper.parentNode == this.container) {
          this.container.removeChild(this.wrapper);
        }

        this.wrapper = null;
      }
    }
    /* Renderer-specific methods */

    /**
     * Called after cursor related params have changed.
     *
     * @abstract
     */

  }, {
    key: "updateCursor",
    value: function updateCursor() {}
    /**
     * Called when the size of the container changes so the renderer can adjust
     *
     * @abstract
     */

  }, {
    key: "updateSize",
    value: function updateSize() {}
    /**
     * Draw a waveform with bars
     *
     * @abstract
     * @param {number[]|number[][]} peaks Can also be an array of arrays for split channel
     * rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that should be
     * rendered
     */

  }, {
    key: "drawBars",
    value: function drawBars(peaks, channelIndex, start, end) {}
    /**
     * Draw a waveform
     *
     * @abstract
     * @param {number[]|number[][]} peaks Can also be an array of arrays for split channel
     * rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that should be
     * rendered
     */

  }, {
    key: "drawWave",
    value: function drawWave(peaks, channelIndex, start, end) {}
    /**
     * Clear the waveform
     *
     * @abstract
     */

  }, {
    key: "clearWave",
    value: function clearWave() {}
    /**
     * Render the new progress
     *
     * @abstract
     * @param {number} position X-Offset of progress position in pixels
     */

  }, {
    key: "updateProgress",
    value: function updateProgress(position) {}
  }]);

  return Drawer;
}(util.Observer);

exports.default = Drawer;
module.exports = exports.default;

/***/ }),

/***/ "./src/drawer.multicanvas.js":
/*!***********************************!*\
  !*** ./src/drawer.multicanvas.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _drawer = _interopRequireDefault(__webpack_require__(/*! ./drawer */ "./src/drawer.js"));

var util = _interopRequireWildcard(__webpack_require__(/*! ./util */ "./src/util/index.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * @typedef {Object} CanvasEntry
 * @private
 * @property {HTMLElement} wave The wave node
 * @property {CanvasRenderingContext2D} waveCtx The canvas rendering context
 * @property {?HTMLElement} progress The progress wave node
 * @property {?CanvasRenderingContext2D} progressCtx The progress wave canvas
 * rendering context
 * @property {?number} start Start of the area the canvas should render, between 0 and 1
 * @property {?number} end End of the area the canvas should render, between 0 and 1
 */

/**
 * MultiCanvas renderer for slimsurfer. Is currently the default and sole built
 * in renderer.
 */
var MultiCanvas = /*#__PURE__*/function (_Drawer) {
  _inherits(MultiCanvas, _Drawer);

  var _super = _createSuper(MultiCanvas);

  /**
   * @param {HTMLElement} container The container node of the slimsurfer instance
   * @param {WavesurferParams} params The slimsurfer initialisation options
   */
  function MultiCanvas(container, params) {
    var _this;

    _classCallCheck(this, MultiCanvas);

    _this = _super.call(this, container, params);
    /**
     * @type {number}
     * @private
     */

    _this.maxCanvasWidth = params.maxCanvasWidth;
    /**
     * @private
     * @type {number}
     */

    _this.maxCanvasElementWidth = Math.round(params.maxCanvasWidth / params.pixelRatio);
    /**
     * Whether or not the progress wave is renderered. If the `waveColor`
     * and `progressColor` are the same colour it is not.
     * @type {boolean}
     */

    _this.hasProgressCanvas = params.waveColor != params.progressColor;
    /**
     * @private
     * @type {number}
     */

    _this.halfPixel = 0.5 / params.pixelRatio;
    /**
     * @private
     * @type {Array}
     */

    _this.canvases = [];
    /** @private */

    _this.progressWave = null;
    return _this;
  }
  /**
   * Initialise the drawer
   */


  _createClass(MultiCanvas, [{
    key: "init",
    value: function init() {
      this.createWrapper();
      this.createElements();
    }
    /**
     * Create the canvas elements and style them
     *
     * @private
     */

  }, {
    key: "createElements",
    value: function createElements() {
      this.progressWave = this.wrapper.appendChild(this.style(document.createElement('wave'), {
        position: 'absolute',
        zIndex: 3,
        left: 0,
        top: 0,
        bottom: 0,
        overflow: 'hidden',
        width: '0',
        height: '100%',
        display: 'none',
        boxSizing: 'border-box',
        borderRightStyle: 'solid',
        pointerEvents: 'none'
      }));
      this.addCanvas();
      this.updateCursor();
    }
    /**
     * Update cursor style from params.
     */

  }, {
    key: "updateCursor",
    value: function updateCursor() {
      this.style(this.progressWave, {
        borderRightWidth: this.params.cursorWidth + 'px',
        borderRightColor: this.params.cursorColor
      });
    }
    /**
     * Adjust to the updated size by adding or removing canvases
     */

  }, {
    key: "updateSize",
    value: function updateSize() {
      var _this2 = this;

      var totalWidth = Math.round(this.width / this.params.pixelRatio);
      var requiredCanvases = Math.ceil(totalWidth / this.maxCanvasElementWidth);

      while (this.canvases.length < requiredCanvases) {
        this.addCanvas();
      }

      while (this.canvases.length > requiredCanvases) {
        this.removeCanvas();
      }

      this.canvases.forEach(function (entry, i) {
        // Add some overlap to prevent vertical white stripes, keep the width even for simplicity.
        var canvasWidth = _this2.maxCanvasWidth + 2 * Math.ceil(_this2.params.pixelRatio / 2);

        if (i == _this2.canvases.length - 1) {
          canvasWidth = _this2.width - _this2.maxCanvasWidth * (_this2.canvases.length - 1);
        }

        _this2.updateDimensions(entry, canvasWidth, _this2.height);

        _this2.clearWaveForEntry(entry);
      });
    }
    /**
     * Add a canvas to the canvas list
     *
     * @private
     */

  }, {
    key: "addCanvas",
    value: function addCanvas() {
      var entry = {};
      var leftOffset = this.maxCanvasElementWidth * this.canvases.length;
      entry.wave = this.wrapper.appendChild(this.style(document.createElement('canvas'), {
        //position: 'absolute',
        position: 'relative',
        zIndex: 2,
        left: leftOffset + 'px',
        top: 0,
        bottom: 0,
        height: '100%',
        pointerEvents: 'none'
      }));
      entry.waveCtx = entry.wave.getContext('2d');

      if (this.hasProgressCanvas) {
        entry.progress = this.progressWave.appendChild(this.style(document.createElement('canvas'), {
          //position: 'absolute',
          position: 'relative',
          left: leftOffset + 'px',
          top: 0,
          bottom: 0,
          height: '100%'
        }));
        entry.progressCtx = entry.progress.getContext('2d');
      }

      this.canvases.push(entry);
    }
    /**
     * Pop one canvas from the list
     *
     * @private
     */

  }, {
    key: "removeCanvas",
    value: function removeCanvas() {
      var lastEntry = this.canvases.pop();
      lastEntry.wave.parentElement.removeChild(lastEntry.wave);

      if (this.hasProgressCanvas) {
        lastEntry.progress.parentElement.removeChild(lastEntry.progress);
      }
    }
    /**
     * Update the dimensions of a canvas element
     *
     * @private
     * @param {CanvasEntry} entry
     * @param {number} width The new width of the element
     * @param {number} height The new height of the element
     */

  }, {
    key: "updateDimensions",
    value: function updateDimensions(entry, width, height) {
      var elementWidth = Math.round(width / this.params.pixelRatio);
      var totalWidth = Math.round(this.width / this.params.pixelRatio); // Where the canvas starts and ends in the waveform, represented as a decimal between 0 and 1.

      entry.start = entry.waveCtx.canvas.offsetLeft / totalWidth || 0;
      entry.end = entry.start + elementWidth / totalWidth;
      entry.waveCtx.canvas.width = width;
      entry.waveCtx.canvas.height = height;
      this.style(entry.waveCtx.canvas, {
        width: elementWidth + 'px'
      });
      this.style(this.progressWave, {
        display: 'block'
      });

      if (this.hasProgressCanvas) {
        entry.progressCtx.canvas.width = width;
        entry.progressCtx.canvas.height = height;
        this.style(entry.progressCtx.canvas, {
          width: elementWidth + 'px'
        });
      }
    }
    /**
     * Clear the whole waveform
     */

  }, {
    key: "clearWave",
    value: function clearWave() {
      var _this3 = this;

      this.canvases.forEach(function (entry) {
        return _this3.clearWaveForEntry(entry);
      });
    }
    /**
     * Clear one canvas
     *
     * @private
     * @param {CanvasEntry} entry
     */

  }, {
    key: "clearWaveForEntry",
    value: function clearWaveForEntry(entry) {
      entry.waveCtx.clearRect(0, 0, entry.waveCtx.canvas.width, entry.waveCtx.canvas.height);

      if (this.hasProgressCanvas) {
        entry.progressCtx.clearRect(0, 0, entry.progressCtx.canvas.width, entry.progressCtx.canvas.height);
      }
    }
    /**
     * Draw a waveform with bars
     *
     * @param {number[]|number[][]} peaks Can also be an array of arrays for split channel
     * rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0. Must be an integer.
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that should be
     * rendered
     */

  }, {
    key: "drawBars",
    value: function drawBars(peaks, channelIndex, start, end) {
      var _this4 = this;

      return this.prepareDraw(peaks, channelIndex, start, end, function (_ref) {
        var absmax = _ref.absmax,
            hasMinVals = _ref.hasMinVals,
            height = _ref.height,
            offsetY = _ref.offsetY,
            halfH = _ref.halfH,
            peaks = _ref.peaks;

        // if drawBars was called within ws.empty we don't pass a start and
        // don't want anything to happen
        if (start === undefined) {
          return;
        } // Skip every other value if there are negatives.


        var peakIndexScale = hasMinVals ? 2 : 1;
        var length = peaks.length / peakIndexScale;
        var bar = _this4.params.barWidth * _this4.params.pixelRatio;
        var gap = _this4.params.barGap === null ? Math.max(_this4.params.pixelRatio, ~~(bar / 2)) : Math.max(_this4.params.pixelRatio, _this4.params.barGap * _this4.params.pixelRatio);
        var step = bar + gap;
        var scale = length / _this4.width;
        var first = start;
        var last = end;
        var i;

        for (i = first; i < last; i += step) {
          var peak = peaks[Math.floor(i * scale * peakIndexScale)] || 0;
          var h = Math.round(peak / absmax * halfH);

          _this4.fillRect(i + _this4.halfPixel, halfH - h + offsetY, bar + _this4.halfPixel, h * 2);
        }
      });
    }
    /**
     * Draw a waveform
     *
     * @param {number[]|number[][]} peaks Can also be an array of arrays for split channel
     * rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0
     * @param {number?} start The x-offset of the beginning of the area that
     * should be rendered (If this isn't set only a flat line is rendered)
     * @param {number?} end The x-offset of the end of the area that should be
     * rendered
     */

  }, {
    key: "drawWave",
    value: function drawWave(peaks, channelIndex, start, end) {
      var _this5 = this;

      return this.prepareDraw(peaks, channelIndex, start, end, function (_ref2) {
        var absmax = _ref2.absmax,
            hasMinVals = _ref2.hasMinVals,
            height = _ref2.height,
            offsetY = _ref2.offsetY,
            halfH = _ref2.halfH,
            peaks = _ref2.peaks;

        if (!hasMinVals) {
          var reflectedPeaks = [];
          var len = peaks.length;
          var i;

          for (i = 0; i < len; i++) {
            reflectedPeaks[2 * i] = peaks[i];
            reflectedPeaks[2 * i + 1] = -peaks[i];
          }

          peaks = reflectedPeaks;
        } // if drawWave was called within ws.empty we don't pass a start and
        // end and simply want a flat line


        if (start !== undefined) {
          _this5.drawLine(peaks, absmax, halfH, offsetY, start, end);
        } // Always draw a median line


        _this5.fillRect(0, halfH + offsetY - _this5.halfPixel, _this5.width, _this5.halfPixel);
      });
    }
    /**
     * Tell the canvas entries to render their portion of the waveform
     *
     * @private
     * @param {number[]} peaks Peak data
     * @param {number} absmax Maximum peak value (absolute)
     * @param {number} halfH Half the height of the waveform
     * @param {number} offsetY Offset to the top
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that
     * should be rendered
     */

  }, {
    key: "drawLine",
    value: function drawLine(peaks, absmax, halfH, offsetY, start, end) {
      var _this6 = this;

      this.canvases.forEach(function (entry) {
        _this6.setFillStyles(entry);

        _this6.drawLineToContext(entry, entry.waveCtx, peaks, absmax, halfH, offsetY, start, end);

        _this6.drawLineToContext(entry, entry.progressCtx, peaks, absmax, halfH, offsetY, start, end);
      });
    }
    /**
     * Render the actual waveform line on a canvas
     *
     * @private
     * @param {CanvasEntry} entry
     * @param {Canvas2DContextAttributes} ctx Essentially `entry.[wave|progress]Ctx`
     * @param {number[]} peaks
     * @param {number} absmax Maximum peak value (absolute)
     * @param {number} halfH Half the height of the waveform
     * @param {number} offsetY Offset to the top
     * @param {number} start The x-offset of the beginning of the area that
     * should be rendered
     * @param {number} end The x-offset of the end of the area that
     * should be rendered
     */

  }, {
    key: "drawLineToContext",
    value: function drawLineToContext(entry, ctx, peaks, absmax, halfH, offsetY, start, end) {
      if (!ctx) {
        return;
      }

      var length = peaks.length / 2;
      var scale = this.params.fillParent && this.width != length ? this.width / length : 1;
      var first = Math.round(length * entry.start); // Use one more peak value to make sure we join peaks at ends -- unless,
      // of course, this is the last canvas.

      var last = Math.round(length * entry.end) + 1;

      if (first > end || last < start) {
        return;
      }

      var canvasStart = Math.min(first, start);
      var canvasEnd = Math.max(last, end);
      var i;
      var j;
      ctx.beginPath();
      ctx.moveTo((canvasStart - first) * scale + this.halfPixel, halfH + offsetY);

      for (i = canvasStart; i < canvasEnd; i++) {
        var peak = peaks[2 * i] || 0;
        var h = Math.round(peak / absmax * halfH);
        ctx.lineTo((i - first) * scale + this.halfPixel, halfH - h + offsetY);
      } // Draw the bottom edge going backwards, to make a single
      // closed hull to fill.


      for (j = canvasEnd - 1; j >= canvasStart; j--) {
        var _peak = peaks[2 * j + 1] || 0;

        var _h = Math.round(_peak / absmax * halfH);

        ctx.lineTo((j - first) * scale + this.halfPixel, halfH - _h + offsetY);
      }

      ctx.closePath();
      ctx.fill();
    }
    /**
     * Draw a rectangle on the waveform
     *
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */

  }, {
    key: "fillRect",
    value: function fillRect(x, y, width, height) {
      // console.log('Drawing rect');
      var startCanvas = Math.floor(x / this.maxCanvasWidth);
      var endCanvas = Math.min(Math.ceil((x + width) / this.maxCanvasWidth) + 1, this.canvases.length);
      var i;

      for (i = startCanvas; i < endCanvas; i++) {
        var entry = this.canvases[i];
        var leftOffset = i * this.maxCanvasWidth;
        var intersection = {
          x1: Math.max(x, i * this.maxCanvasWidth),
          y1: y,
          x2: Math.min(x + width, i * this.maxCanvasWidth + entry.waveCtx.canvas.width),
          y2: y + height
        };

        if (intersection.x1 < intersection.x2) {
          this.setFillStyles(entry);
          this.fillRectToContext(entry.waveCtx, intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1);
          this.fillRectToContext(entry.progressCtx, intersection.x1 - leftOffset, intersection.y1, intersection.x2 - intersection.x1, intersection.y2 - intersection.y1);
        }
      }
    }
    /**
     * Performs preparation tasks and calculations which are shared by drawBars and drawWave
     *
     * @private
     * @param {number[]|number[][]} peaks Can also be an array of arrays for split channel
     * rendering
     * @param {number} channelIndex The index of the current channel. Normally
     * should be 0
     * @param {number?} start The x-offset of the beginning of the area that
     * should be rendered (If this isn't set only a flat line is rendered)
     * @param {number?} end The x-offset of the end of the area that should be
     * rendered
     * @param {function} fn The render function to call
     */

  }, {
    key: "prepareDraw",
    value: function prepareDraw(peaks, channelIndex, start, end, fn) {
      var _this7 = this;

      return util.frame(function () {
        // Split channels and call this function with the channelIndex set
        if (peaks[0] instanceof Array) {
          var channels = peaks;

          if (_this7.params.splitChannels) {
            _this7.setHeight(channels.length * _this7.params.height * _this7.params.pixelRatio);

            return channels.forEach(function (channelPeaks, i) {
              return _this7.prepareDraw(channelPeaks, i, start, end, fn);
            });
          }

          peaks = channels[0];
        } // calculate maximum modulation value, either from the barHeight
        // parameter or if normalize=true from the largest value in the peak
        // set


        var absmax = 1 / _this7.params.barHeight;

        if (_this7.params.normalize) {
          var max = util.max(peaks);
          var min = util.min(peaks);
          absmax = -min > max ? -min : max;
        } // Bar wave draws the bottom only as a reflection of the top,
        // so we don't need negative values


        var hasMinVals = [].some.call(peaks, function (val) {
          return val < 0;
        });
        var height = _this7.params.height * _this7.params.pixelRatio;
        var offsetY = height * channelIndex || 0;
        var halfH = height / 2;
        return fn({
          absmax: absmax,
          hasMinVals: hasMinVals,
          height: height,
          offsetY: offsetY,
          halfH: halfH,
          peaks: peaks
        });
      })();
    }
    /**
     * Draw the actual rectangle on a canvas
     *
     * @private
     * @param {Canvas2DContextAttributes} ctx
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     */

  }, {
    key: "fillRectToContext",
    value: function fillRectToContext(ctx, x, y, width, height) {
      if (!ctx) {
        return;
      }

      ctx.fillRect(x, y, width, height);
    }
    /**
     * Set the fill styles for a certain entry (wave and progress)
     *
     * @private
     * @param {CanvasEntry} entry
     */

  }, {
    key: "setFillStyles",
    value: function setFillStyles(entry) {
      entry.waveCtx.fillStyle = this.params.waveColor;

      if (this.hasProgressCanvas) {
        entry.progressCtx.fillStyle = this.params.progressColor;
      }
    } // REMOVED: Get image data of the waveform

    /**
     * Return image data of the waveform
     *
     * @param {string} type='image/png' An optional value of a format type.
     * @param {number} quality=0.92 An optional value between 0 and 1.
     * @return {string|string[]} images A data URL or an array of data URLs
     */

    /*
    getImage(type, quality) {
        const images = this.canvases.map(entry =>
            entry.wave.toDataURL(type, quality)
        );
        return images.length > 1 ? images : images[0];
    }
    */

    /**
     * Render the new progress
     *
     * @param {number} position X-Offset of progress position in pixels
     */

  }, {
    key: "updateProgress",
    value: function updateProgress(position) {
      this.style(this.progressWave, {
        width: position + 'px'
      });
    }
  }]);

  return MultiCanvas;
}(_drawer.default);

exports.default = MultiCanvas;
module.exports = exports.default;

/***/ }),

/***/ "./src/mediaelement.js":
/*!*****************************!*\
  !*** ./src/mediaelement.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var util = _interopRequireWildcard(__webpack_require__(/*! ./util */ "./src/util/index.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * MediaElement backend
 */
var MediaElement = /*#__PURE__*/function (_util$Observer) {
  _inherits(MediaElement, _util$Observer);

  var _super = _createSuper(MediaElement);

  /**
   * Construct the backend (extends WebAudio)
   *
   * @param {WavesurferParams} params
   */
  function MediaElement(params) {
    var _this;

    _classCallCheck(this, MediaElement);

    _this = _super.call(this, params);
    /** @private */

    _this.params = params; // Dummy media to catch errors

    /** @private */

    _this.media = {
      currentTime: 0,
      duration: 0 //paused: true,
      //playbackRate: 1,
      //play() {},
      //pause() {}
      //volume: 0

    };
    /** @private */

    _this.mediaType = params.mediaType.toLowerCase();
    /** @private */

    _this.elementPosition = params.elementPosition;
    /** @private */

    _this.peaks = null; // Removed playback rate variable

    /** @private */
    //this.playbackRate = 1;
    // Removed volume variable

    /** @private */
    //this.volume = 1;
    // Removed buffer variable

    /** @private */
    //this.buffer = null;

    /** @private */

    _this.onPlayEnd = null;
    return _this;
  }
  /**
   * Initialise the backend, called in `slimsurfer.createBackend()`
   */


  _createClass(MediaElement, [{
    key: "init",
    value: function init() {
      //this.setPlaybackRate(this.params.audioRate);
      //this.setPlaybackRate(this.playbackRate);
      this.createTimer();
    }
    /**
     * Create a timer to provide a more precise `audioprocess` event.
     *
     * @private
     */

  }, {
    key: "createTimer",
    value: function createTimer() {
      var _this2 = this;

      var onAudioProcess = function onAudioProcess() {
        if (_this2.isPaused()) {
          return;
        }

        _this2.fireEvent('audioprocess', _this2.getCurrentTime()); // Call again in the next frame


        var requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
        requestAnimationFrame(onAudioProcess);
      };

      this.on('play', onAudioProcess); // Update the progress one more time to prevent it from being stuck in case of lower framerates

      this.on('pause', function () {
        _this2.fireEvent('audioprocess', _this2.getCurrentTime());
      });
    }
    /**
     * Set pre-decoded peaks
     *
     * @param {number[]|number[][]} peaks
     * @param {?number} duration
     */

  }, {
    key: "setPeaks",
    value: function setPeaks(peaks, duration) {
      this.explicitDuration = duration;
      this.peaks = peaks;
    }
    /**
     * Create media element with url as its source,
     * and append to container element.
     *
     * @param {string} url Path to media file
     * @param {HTMLElement} container HTML element
     * @param {number[]|number[][]} peaks Array of peak data
     * @param {string} preload HTML 5 preload attribute value
     */
    //load(url, container, peaks, preload) {

  }, {
    key: "load",
    value: function load(container, peaks, duration) {
      var media = document.createElement(this.mediaType);
      media.controls = this.params.mediaControls; //media.autoplay = this.params.autoplay || false;
      //media.preload = preload == null ? 'auto' : preload;
      //media.src = url;
      // Addes custom styling

      media.style.width = '100%';
      media.style.height = '100%';
      var prevMedia = container.querySelector(this.mediaType);

      if (prevMedia) {
        container.removeChild(prevMedia);
      }

      container.appendChild(media);

      this._load(media, peaks);
    } // Removed loading of existing audio element using loadElt()

    /**
     * Load existing media element.
     *
     * @param {HTMLMediaElement} elt HTML5 Audio or Video element
     * @param {number[]|number[][]} peaks Array of peak data
     */

    /*
    loadElt(elt, peaks) {
        elt.controls = this.params.mediaControls;
        elt.autoplay = this.params.autoplay || false;
         this._load(elt, peaks);
    }
    */

    /**
     * Private method called by both load (from url)
     * and loadElt (existing media element).
     *
     * @param {HTMLMediaElement} media HTML5 Audio or Video element
     * @param {number[]|number[][]} peaks Array of peak data
     * @private
     */

  }, {
    key: "_load",
    value: function _load(media, peaks) {
      var _this3 = this;

      // load must be called manually on iOS, otherwise peaks won't draw
      // until a user interaction triggers load --> 'ready' event
      if (typeof media.load == 'function') {
        // Resets the media element and restarts the media resource. Any
        // pending events are discarded. How much media data is fetched is
        // still affected by the preload attribute.
        media.load();
      }

      media.addEventListener('error', function () {
        _this3.fireEvent('error', 'Error loading media element');
      });
      media.addEventListener('canplay', function () {
        _this3.fireEvent('canplay');
      });
      media.addEventListener('ended', function () {
        _this3.fireEvent('finish');
      }); // Listen to and relay play and pause events to enable
      // playback control from the external media element

      media.addEventListener('play', function () {
        _this3.fireEvent('play');
      });
      media.addEventListener('pause', function () {
        _this3.fireEvent('pause');
      });
      this.media = media;
      this.peaks = peaks;
      this.onPlayEnd = null; //this.buffer = null;
      //this.setPlaybackRate(this.playbackRate);
      //this.setVolume(this.volume);
    } // REMOVED isPaused()

    /**
     * Used by `slimsurfer.isPlaying()` and `slimsurfer.playPause()`
     *
     * @return {boolean}
     */

    /*
    isPaused() {
        return !this.media || this.media.paused;
    }
    */
    // TODO: Get explicitDuration (in seconds?) as number

    /**
     * Used by `slimsurfer.getDuration()`
     *
     * @return {number}
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      if (this.explicitDuration) {
        return this.explicitDuration;
      }

      var duration = (this.buffer || this.media).duration;

      if (duration >= Infinity) {
        // streaming audio
        duration = this.media.seekable.end(0);
      }

      return duration;
    } // TODO: Handle current time

    /**
     * Returns the current time in seconds relative to the audioclip's
     * duration.
     *
     * @return {number}
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.media && this.media.currentTime;
    } // TODO: Handle played percents

    /**
     * Get the position from 0 to 1
     *
     * @return {number}
     */

  }, {
    key: "getPlayedPercents",
    value: function getPlayedPercents() {
      return this.getCurrentTime() / this.getDuration() || 0;
    } // REMOVED getPlaybackRate()

    /**
     * Get the audio source playback rate.
     *
     * @return {number}
     */

    /*
    getPlaybackRate() {
        return this.playbackRate || this.media.playbackRate;
    }
    */
    // REMOVED setPlaybackRate()

    /**
     * Set the audio source playback rate.
     *
     * @param {number} value
     */

    /*
    setPlaybackRate(value) {
        this.playbackRate = value || 1;
        this.media.playbackRate = this.playbackRate;
    }
    */

    /**
     * Used by `slimsurfer.seekTo()`
     *
     * @param {number} start Position to start at in seconds
     */

  }, {
    key: "seekTo",
    value: function seekTo(start) {
      if (start != null) {
        this.media.currentTime = start;
      }

      this.clearPlayEnd();
    } // REMOVED playing of audio

    /**
     * Plays the loaded audio region.
     *
     * @param {number} start Start offset in seconds, relative to the beginning
     * of a clip.
     * @param {number} end When to stop, relative to the beginning of a clip.
     * @emits MediaElement#play
     * @return {Promise}
     */

    /*
    play(start, end) {
        this.seekTo(start);
        const promise = this.media.play();
        end && this.setPlayEnd(end);
         return promise;
    }
    */
    // REMOVED pausing audio

    /**
     * Pauses the loaded audio.
     *
     * @emits MediaElement#pause
     * @return {Promise}
     */

    /*
    pause() {
        let promise;
         if (this.media) {
            promise = this.media.pause();
        }
        this.clearPlayEnd();
         return promise;
    }
    */

    /** @private */

  }, {
    key: "setPlayEnd",
    value: function setPlayEnd(end) {
      var _this4 = this;

      this._onPlayEnd = function (time) {
        if (time >= end) {
          _this4.pause();

          _this4.seekTo(end);
        }
      };

      this.on('audioprocess', this._onPlayEnd);
    }
    /** @private */

  }, {
    key: "clearPlayEnd",
    value: function clearPlayEnd() {
      if (this._onPlayEnd) {
        this.un('audioprocess', this._onPlayEnd);
        this._onPlayEnd = null;
      }
    }
    /**
     * Compute the max and min value of the waveform when broken into
     * <length> subranges.
     *
     * @param {number} length How many subranges to break the waveform into.
     * @param {number} first First sample in the required range.
     * @param {number} last Last sample in the required range.
     * @return {number[]|number[][]} Array of 2*<length> peaks or array of
     * arrays of peaks consisting of (max, min) values for each subrange.
     */

  }, {
    key: "getPeaks",
    value: function getPeaks(length, first, last) {
      if (this.buffer) {
        return _get(_getPrototypeOf(MediaElement.prototype), "getPeaks", this).call(this, length, first, last);
      }

      return this.peaks || [];
    } // REMOVED setSinkId() since slimsurfer should not play audio

    /**
     * Set the sink id for the media player
     *
     * @param {string} deviceId String value representing audio device id.
     */

    /*
    setSinkId(deviceId) {
        if (deviceId) {
            if (!this.media.setSinkId) {
                return Promise.reject(
                    new Error('setSinkId is not supported in your browser')
                );
            }
            return this.media.setSinkId(deviceId);
        }
         return Promise.reject(new Error('Invalid deviceId: ' + deviceId));
    }
    */
    // REMOVED getting volume

    /**
     * Get the current volume
     *
     * @return {number} value A floating point value between 0 and 1.
     */

    /*
    getVolume() {
        return this.volume || this.media.volume;
    }
    */
    // REMOVED setting audio volume

    /**
     * Set the audio volume
     *
     * @param {number} value A floating point value between 0 and 1.
     */

    /*
    setVolume(value) {
        this.volume = value;
        this.media.volume = this.volume;
    }
    */

    /**
     * This is called when slimsurfer is destroyed
     *
     */

  }, {
    key: "destroy",
    value: function destroy() {
      //this.pause();
      this.unAll();

      if (this.params.removeMediaElementOnDestroy && this.media && this.media.parentNode) {
        this.media.parentNode.removeChild(this.media);
      }

      this.media = null;
    }
  }]);

  return MediaElement;
}(util.Observer);

exports.default = MediaElement;
module.exports = exports.default;

/***/ }),

/***/ "./src/slimsurfer.js":
/*!***************************!*\
  !*** ./src/slimsurfer.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var util = _interopRequireWildcard(__webpack_require__(/*! ./util */ "./src/util/index.js"));

var _drawer = _interopRequireDefault(__webpack_require__(/*! ./drawer.multicanvas */ "./src/drawer.multicanvas.js"));

var _mediaelement = _interopRequireDefault(__webpack_require__(/*! ./mediaelement */ "./src/mediaelement.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import PeakCache from './peakcache';

/*
 * This work is licensed under a BSD-3-Clause License.
 */

/*This library has been modified by Roman Dahm to only render pre-computed peaks with events.*/

/** @external {HTMLElement} https://developer.mozilla.org/en/docs/Web/API/HTMLElement */

/** @external {OfflineAudioContext} https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext */

/** @external {File} https://developer.mozilla.org/en-US/docs/Web/API/File */

/** @external {Blob} https://developer.mozilla.org/en-US/docs/Web/API/Blob */

/** @external {CanvasRenderingContext2D} https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D */

/** @external {MediaStreamConstraints} https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints */

/** @external {AudioNode} https://developer.mozilla.org/de/docs/Web/API/AudioNode */

/**
 * @typedef {Object} WavesurferParams
 * @property {AudioContext} audioContext=null Use your own previously
 * initialized AudioContext or leave blank.
 * @property {number} audioRate=1 Speed at which to play audio. Lower number is
 * slower.
 * @property {ScriptProcessorNode} audioScriptProcessor=null Use your own previously
 * initialized ScriptProcessorNode or leave blank.
 * @property {boolean} autoCenter=true If a scrollbar is present, center the
 * waveform around the progress
 * @property {string} backend='WebAudio' `'WebAudio'|'MediaElement'` In most cases
 * you don't have to set this manually. MediaElement is a fallback for
 * unsupported browsers.
 * @property {number} barHeight=1 The height of the wave
 * @property {number} barGap=null The optional spacing between bars of the wave,
 * if not provided will be calculated in legacy format.
 * @property {boolean} closeAudioContext=false Close and nullify all audio
 * contexts when the destroy method is called.
 * @property {!string|HTMLElement} container CSS selector or HTML element where
 * the waveform should be drawn. This is the only required parameter.
 * @property {string} cursorColor='#333' The fill color of the cursor indicating
 * the playhead position.
 * @property {number} cursorWidth=1 Measured in pixels.
 * @property {boolean} fillParent=true Whether to fill the entire container or
 * draw only according to `minPxPerSec`.
 * @property {boolean} forceDecode=false Force decoding of audio using web audio
 * when zooming to get a more detailed waveform.
 * @property {number} height=128 The height of the waveform. Measured in
 * pixels.
 * @property {boolean} hideScrollbar=false Whether to hide the horizontal
 * scrollbar when one would normally be shown.
 * @property {boolean} interact=true Whether the mouse interaction will be
 * enabled at initialization. You can switch this parameter at any time later
 * on.
 * @property {boolean} loopSelection=true (Use with regions plugin) Enable
 * looping of selected regions
 * @property {number} maxCanvasWidth=4000 Maximum width of a single canvas in
 * pixels, excluding a small overlap (2 * `pixelRatio`, rounded up to the next
 * even integer). If the waveform is longer than this value, additional canvases
 * will be used to render the waveform, which is useful for very large waveforms
 * that may be too wide for browsers to draw on a single canvas.
 * @property {boolean} mediaControls=false (Use with backend `MediaElement`)
 * this enables the native controls for the media element
 * @property {string} mediaType='audio' (Use with backend `MediaElement`)
 * `'audio'|'video'`
 * @property {number} minPxPerSec=20 Minimum number of pixels per second of
 * audio.
 * @property {boolean} normalize=false If true, normalize by the maximum peak
 * instead of 1.0.
 * @property {boolean} partialRender=false Use the PeakCache to improve
 * rendering speed of large waveforms
 * @property {number} pixelRatio=window.devicePixelRatio The pixel ratio used to
 * calculate display
 * @property {PluginDefinition[]} plugins=[] An array of plugin definitions to
 * register during instantiation, they will be directly initialised unless they
 * are added with the `deferInit` property set to true.
 * @property {string} progressColor='#555' The fill color of the part of the
 * waveform behind the cursor.
 * @property {boolean} removeMediaElementOnDestroy=true Set to false to keep the
 * media element in the DOM when the player is destroyed. This is useful when
 * reusing an existing media element via the `loadMediaElement` method.
 * @property {Object} renderer=MultiCanvas Can be used to inject a custom
 * renderer.
 * @property {boolean|number} responsive=false If set to `true` resize the
 * waveform, when the window is resized. This is debounced with a `100ms`
 * timeout by default. If this parameter is a number it represents that timeout.
 * @property {boolean} scrollParent=false Whether to scroll the container with a
 * lengthy waveform. Otherwise the waveform is shrunk to the container width
 * (see fillParent).
 * @property {number} skipLength=2 Number of seconds to skip with the
 * skipForward() and skipBackward() methods.
 * @property {boolean} splitChannels=false Render with seperate waveforms for
 * the channels of the audio
 * @property {string} waveColor='#999' The fill color of the waveform after the
 * cursor.
 * @property {object} xhr={} XHR options.
 */

/**
 * @typedef {Object} PluginDefinition
 * @desc The Object used to describe a plugin
 * @example slimsurfer.addPlugin(pluginDefinition);
 * @property {string} name The name of the plugin, the plugin instance will be
 * added as a property to the slimsurfer instance under this name
 * @property {?Object} staticProps The properties that should be added to the
 * slimsurfer instance as static properties
 * @property {?boolean} deferInit Don't initialise plugin
 * automatically
 * @property {Object} params={} The plugin parameters, they are the first parameter
 * passed to the plugin class constructor function
 * @property {PluginClass} instance The plugin instance factory, is called with
 * the dependency specified in extends. Returns the plugin class.
 */

/**
 * @interface PluginClass
 *
 * @desc This is the interface which is implemented by all plugin classes. Note
 * that this only turns into an observer after being passed through
 * `slimsurfer.addPlugin`.
 *
 * @extends {Observer}
 */
var PluginClass = /*#__PURE__*/function () {
  _createClass(PluginClass, [{
    key: "create",

    /**
     * Plugin definition factory
     *
     * This function must be used to create a plugin definition which can be
     * used by slimsurfer to correctly instantiate the plugin.
     *
     * @param  {Object} params={} The plugin params (specific to the plugin)
     * @return {PluginDefinition} an object representing the plugin
     */
    value: function create(params) {}
    /**
     * Construct the plugin
     *
     * @param {Object} ws The slimsurfer instance
     * @param {Object} params={} The plugin params (specific to the plugin)
     */

  }]);

  function PluginClass(ws, params) {
    _classCallCheck(this, PluginClass);
  }
  /**
   * Initialise the plugin
   *
   * Start doing something. This is called by
   * `slimsurfer.initPlugin(pluginName)`
   */


  _createClass(PluginClass, [{
    key: "init",
    value: function init() {}
    /**
     * Destroy the plugin instance
     *
     * Stop doing something. This is called by
     * `slimsurfer.destroyPlugin(pluginName)`
     */

  }, {
    key: "destroy",
    value: function destroy() {}
  }]);

  return PluginClass;
}();
/**
 * SlimSurfer core library class
 *
 * @extends {Observer}
 * @example
 * const params = {
 *   container: '#waveform',
 *   waveColor: 'violet',
 *   progressColor: 'purple'
 * };
 *
 * // initialise like this
 * const slimsurfer = SlimSurfer.create(params);
 *
 * // or like this ...
 * const slimsurfer = new SlimSurfer(params);
 * slimsurfer.init();
 *
 * // load audio file
 * slimsurfer.load('example/media/demo.wav');
 */


var SlimSurfer = /*#__PURE__*/function (_util$Observer) {
  _inherits(SlimSurfer, _util$Observer);

  var _super = _createSuper(SlimSurfer);

  _createClass(SlimSurfer, null, [{
    key: "create",

    /** @private */
    // Removed enum of both backends

    /** @private */

    /*
    backends = {MediaElement, WebAudio};
    */

    /**
     * Instantiate this class, call its `init` function and returns it
     *
     * @param {WavesurferParams} params
     * @return {Object} SlimSurfer instance
     * @example const slimsurfer = SlimSurfer.create(params);
     */
    value: function create(params) {
      var slimsurfer = new SlimSurfer(params);
      return slimsurfer.init();
    }
    /**
     * The library version number is available as a static property of the
     * SlimSurfer class
     *
     * @type {String}
     * @example
     * console.log('Using slimsurfer.js ' + SlimSurfer.VERSION);
     */

  }]);

  /**
   * Initialise slimsurfer instance
   *
   * @param {WavesurferParams} params Instantiation options for slimsurfer
   * @example
   * const slimsurfer = new SlimSurfer(params);
   * @returns {this}
   */
  function SlimSurfer(params) {
    var _this;

    _classCallCheck(this, SlimSurfer);

    _this = _super.call(this);
    /**
     * Extract relevant parameters (or defaults)
     * @private
     */

    _this.defaultParams = {
      //audioContext: null,
      audioRate: 1,
      autoCenter: true,
      //backend: 'MediaElement', //'WebAudio',
      barHeight: 1,
      barGap: null,
      container: null,
      cursorColor: '#333',
      cursorWidth: 1,
      dragSelection: true,
      fillParent: true,
      //forceDecode: false,
      height: 128,
      hideScrollbar: false,
      interact: true,
      loopSelection: true,
      maxCanvasWidth: 4000,
      mediaContainer: null,
      mediaControls: false,
      mediaType: 'audio',
      minPxPerSec: 20,
      normalize: false,
      //partialRender: false,
      pixelRatio: window.devicePixelRatio || screen.deviceXDPI / screen.logicalXDPI,
      plugins: [],
      progressColor: '#555',
      removeMediaElementOnDestroy: true,
      renderer: _drawer.default,
      responsive: false,
      scrollParent: false,
      skipLength: 2,
      splitChannels: false,
      waveColor: '#999' //xhr: {}

    };
    _this.util = util;
    _this.params = util.extend({}, _this.defaultParams, params);
    /** @private */

    _this.container = 'string' == typeof params.container ? document.querySelector(_this.params.container) : _this.params.container;

    if (!_this.container) {
      throw new Error('Container element not found');
    }

    if (_this.params.mediaContainer == null) {
      /** @private */
      _this.mediaContainer = _this.container;
    } else if (typeof _this.params.mediaContainer == 'string') {
      /** @private */
      _this.mediaContainer = document.querySelector(_this.params.mediaContainer);
    } else {
      /** @private */
      _this.mediaContainer = _this.params.mediaContainer;
    }

    if (!_this.mediaContainer) {
      throw new Error('Media Container element not found');
    }

    if (_this.params.maxCanvasWidth <= 1) {
      throw new Error('maxCanvasWidth must be greater than 1');
    } else if (_this.params.maxCanvasWidth % 2 == 1) {
      throw new Error('maxCanvasWidth must be an even number');
    } // Removed savedVolume variable

    /**
     * @private Used to save the current volume when muting so we can
     * restore once unmuted
     * @type {number}
     */
    //this.savedVolume = 0;
    // Removed isMuted status variable

    /**
     * @private The current muted state
     * @type {boolean}
     */
    //this.isMuted = false;

    /**
     * @private Will hold a list of event descriptors that need to be
     * cancelled on subsequent loads of audio
     * @type {Object[]}
     */


    _this.tmpEvents = []; // Removed currentAjax variable

    /**
     * @private Holds any running audio downloads
     * @type {Observer}
     */
    //this.currentAjax = null;
    // Removed array buffer variable

    /** @private */
    //this.arraybuffer = null;

    /** @private */

    _this.drawer = null;
    /** @private */

    _this.backend = null; // Removed peak cache variable

    /** @private */
    //this.peakCache = null;
    // cache constructor objects

    if (typeof _this.params.renderer !== 'function') {
      throw new Error('Renderer parameter is invalid');
    }
    /**
     * @private The uninitialised Drawer class
     */


    _this.Drawer = _this.params.renderer; // Removed uninitialised Backend class since we only use MediaElement

    /**
     * @private The uninitialised Backend class
     */

    /*
     this.Backend = this.backends[this.params.backend];
    */
    // this.Backend = MediaElement;

    /**
     * @private map of plugin names that are currently initialised
     */

    _this.initialisedPluginList = {};
    /** @private */

    _this.isDestroyed = false;
    /** @private */

    _this.isReady = false; // responsive debounced event listener. If this.params.responsive is not
    // set, this is never called. Use 100ms or this.params.responsive as
    // timeout for the debounce function.

    var prevWidth = 0;
    _this._onResize = util.debounce(function () {
      // console.log('debounced resize');
      _this.setHeight(_this.container.offsetHeight);

      if (prevWidth != _this.drawer.wrapper.clientWidth && !_this.params.scrollParent) {
        prevWidth = _this.drawer.wrapper.clientWidth;

        _this.drawer.fireEvent('redraw');
      }
    }, typeof _this.params.responsive === 'number' ? _this.params.responsive : 100);
    return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
  }
  /**
   * Initialise the wave
   *
   * @example
   * var slimsurfer = new SlimSurfer(params);
   * slimsurfer.init();
   * @return {this}
   */


  _createClass(SlimSurfer, [{
    key: "init",
    value: function init() {
      this.registerPlugins(this.params.plugins);
      this.createDrawer();
      this.createBackend(); //this.createPeakCache();

      return this;
    }
    /**
     * Add and initialise array of plugins (if `plugin.deferInit` is falsey),
     * this function is called in the init function of slimsurfer
     *
     * @param {PluginDefinition[]} plugins An array of plugin definitions
     * @emits {SlimSurfer#plugins-registered} Called with the array of plugin definitions
     * @return {this}
     */

  }, {
    key: "registerPlugins",
    value: function registerPlugins(plugins) {
      var _this2 = this;

      // first instantiate all the plugins
      plugins.forEach(function (plugin) {
        return _this2.addPlugin(plugin);
      }); // now run the init functions

      plugins.forEach(function (plugin) {
        // call init function of the plugin if deferInit is falsey
        // in that case you would manually use initPlugins()
        if (!plugin.deferInit) {
          _this2.initPlugin(plugin.name);
        }
      });
      this.fireEvent('plugins-registered', plugins);
      return this;
    }
    /**
     * Add a plugin object to slimsurfer
     *
     * @param {PluginDefinition} plugin A plugin definition
     * @emits {SlimSurfer#plugin-added} Called with the name of the plugin that was added
     * @example slimsurfer.addPlugin(SlimSurfer.minimap());
     * @return {this}
     */

  }, {
    key: "addPlugin",
    value: function addPlugin(plugin) {
      var _this3 = this;

      if (!plugin.name) {
        throw new Error('Plugin does not have a name!');
      }

      if (!plugin.instance) {
        throw new Error("Plugin ".concat(plugin.name, " does not have an instance property!"));
      } // staticProps properties are applied to slimsurfer instance


      if (plugin.staticProps) {
        Object.keys(plugin.staticProps).forEach(function (pluginStaticProp) {
          /**
           * Properties defined in a plugin definition's `staticProps` property are added as
           * staticProps properties of the SlimSurfer instance
           */
          _this3[pluginStaticProp] = plugin.staticProps[pluginStaticProp];
        });
      }

      var Instance = plugin.instance; // turn the plugin instance into an observer

      var observerPrototypeKeys = Object.getOwnPropertyNames(util.Observer.prototype);
      observerPrototypeKeys.forEach(function (key) {
        Instance.prototype[key] = util.Observer.prototype[key];
      });
      /**
       * Instantiated plugin classes are added as a property of the slimsurfer
       * instance
       * @type {Object}
       */

      this[plugin.name] = new Instance(plugin.params || {}, this);
      this.fireEvent('plugin-added', plugin.name);
      return this;
    }
    /**
     * Initialise a plugin
     *
     * @param {string} name A plugin name
     * @emits SlimSurfer#plugin-initialised
     * @example slimsurfer.initPlugin('minimap');
     * @return {this}
     */

  }, {
    key: "initPlugin",
    value: function initPlugin(name) {
      if (!this[name]) {
        throw new Error("Plugin ".concat(name, " has not been added yet!"));
      }

      if (this.initialisedPluginList[name]) {
        // destroy any already initialised plugins
        this.destroyPlugin(name);
      }

      this[name].init();
      this.initialisedPluginList[name] = true;
      this.fireEvent('plugin-initialised', name);
      return this;
    }
    /**
     * Destroy a plugin
     *
     * @param {string} name A plugin name
     * @emits SlimSurfer#plugin-destroyed
     * @example slimsurfer.destroyPlugin('minimap');
     * @returns {this}
     */

  }, {
    key: "destroyPlugin",
    value: function destroyPlugin(name) {
      if (!this[name]) {
        throw new Error("Plugin ".concat(name, " has not been added yet and cannot be destroyed!"));
      }

      if (!this.initialisedPluginList[name]) {
        throw new Error("Plugin ".concat(name, " is not active and cannot be destroyed!"));
      }

      if (typeof this[name].destroy !== 'function') {
        throw new Error("Plugin ".concat(name, " does not have a destroy function!"));
      }

      this[name].destroy();
      delete this.initialisedPluginList[name];
      this.fireEvent('plugin-destroyed', name);
      return this;
    }
    /**
     * Destroy all initialised plugins. Convenience function to use when
     * slimsurfer is removed
     *
     * @private
     */

  }, {
    key: "destroyAllPlugins",
    value: function destroyAllPlugins() {
      var _this4 = this;

      Object.keys(this.initialisedPluginList).forEach(function (name) {
        return _this4.destroyPlugin(name);
      });
    }
    /**
     * Create the drawer and draw the waveform
     *
     * @private
     * @emits SlimSurfer#drawer-created
     */

  }, {
    key: "createDrawer",
    value: function createDrawer() {
      var _this5 = this;

      this.drawer = new this.Drawer(this.container, this.params);
      this.drawer.init();
      this.fireEvent('drawer-created', this.drawer); // REMOVED Resize events only when responsive

      /*
      if (this.params.responsive !== false) {
          window.addEventListener('resize', this._onResize, true);
          window.addEventListener('orientationchange', this._onResize, true);
      }
      */
      // ADDED Resize events as defaults

      window.addEventListener('resize', this._onResize, true);
      window.addEventListener('orientationchange', this._onResize, true);
      this.drawer.on('redraw', function () {
        _this5.drawBuffer();

        _this5.drawer.progress(_this5.backend.getPlayedPercents());
      }); // REMOVED Click-to-seek functionality

      /*
      this.drawer.on('click', (e, progress) => {
          setTimeout(() => this.seekTo(progress), 0);
      });
      */
      // ADDED interaction event on click

      this.drawer.on('click', function (e, progress) {
        setTimeout(function () {
          return _this5.fireEvent('interaction', e, progress);
        }, 0);
      }); // Relay the scroll event from the drawer

      this.drawer.on('scroll', function (e) {
        if (_this5.params.partialRender) {
          _this5.drawBuffer();
        }

        _this5.fireEvent('scroll', e);
      });
    }
    /**
     * Create the backend
     *
     * @private
     * @emits SlimSurfer#backend-created
     */

  }, {
    key: "createBackend",
    value: function createBackend() {
      if (this.backend) {
        this.backend.destroy();
      } // Removed back compatibiliy stuff

      /* Back compat
      if (this.params.backend == 'AudioElement') {
          this.params.backend = 'MediaElement';
      }
      */
      // Removed switching between backends

      /*
      if (
          this.params.backend == 'WebAudio' &&
          !this.Backend.prototype.supportsWebAudio.call(null)
      ) {
          this.params.backend = 'MediaElement';
      }*/
      //this.backend = new this.Backend(this.params);


      this.backend = new _mediaelement.default(this.params);
      this.backend.init();
      this.fireEvent('backend-created', this.backend); // REMOVED event subscriptions from backend audio

      /*
      this.backend.on('finish', () => this.fireEvent('finish'));
      this.backend.on('play', () => this.fireEvent('play'));
      this.backend.on('pause', () => this.fireEvent('pause'));
      this.backend.on('audioprocess', time => {
          this.drawer.progress(this.backend.getPlayedPercents());
          this.fireEvent('audioprocess', time);
      });
      */
    } // Removed creation of a peak cache

    /**
     * Create the peak cache
     *
     * @private
     */

    /*
    createPeakCache() {
        if (this.params.partialRender) {
            this.peakCache = new PeakCache();
        }
    }
    */

    /**
     * Get the duration of the audio clip
     *
     * @example const duration = slimsurfer.getDuration();
     * @return {number} Duration in seconds
     */

  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.backend.getDuration();
    }
    /**
     * Get the current playback position
     *
     * @example const currentTime = slimsurfer.getCurrentTime();
     * @return {number} Playback position in seconds
     */

  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.backend.getCurrentTime();
    }
    /**
     * Set the current play time in seconds.
     *
     * @param {number} seconds A positive number in seconds. E.g. 10 means 10
     * seconds, 60 means 1 minute
     */

  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(seconds) {
      if (seconds >= this.getDuration()) {
        this.seekTo(1);
      } else {
        this.seekTo(seconds / this.getDuration());
      }
    } // REMOVED Play functionality

    /**
     * Starts playback from the current position. Optional start and end
     * measured in seconds can be used to set the range of audio to play.
     *
     * @param {?number} start Position to start at
     * @param {?number} end Position to end at
     * @emits SlimSurfer#interaction
     * @return {Promise}
     * @example
     * // play from second 1 to 5
     * slimsurfer.play(1, 5);
     */

    /*
    play(start, end) {
        // Disabled interaction event
        // this.fireEvent('interaction', () => this.play(start, end));
        return this.backend.play(start, end);
    }
    */
    // REMOVED Pause functionality

    /**
     * Stops playback
     *
     * @example slimsurfer.pause();
     * @return {Promise}
     */

    /*
    pause() {
        if (!this.backend.isPaused()) {
            return this.backend.pause();
        }
    }
    */
    // REMOVED toggling playback functionality

    /**
     * Toggle playback
     *
     * @example slimsurfer.playPause();
     * @return {Promise}
     */

    /*
    playPause() {
        return this.backend.isPaused() ? this.play() : this.pause();
    }
    */
    // REMOVED getting playback state

    /**
     * Get the current playback state
     *
     * @example const isPlaying = slimsurfer.isPlaying();
     * @return {boolean} False if paused, true if playing
     */

    /*
    isPlaying() {
        return !this.backend.isPaused();
    }
    */
    // REMOVED skipping backwards

    /**
     * Skip backward
     *
     * @param {?number} seconds Amount to skip back, if not specified `skipLength`
     * is used
     * @example slimsurfer.skipBackward();
     */

    /*
    skipBackward(seconds) {
        this.skip(-seconds || -this.params.skipLength);
    }
    */
    // REMOVED skipping forwards

    /**
     * Skip forward
     *
     * @param {?number} seconds Amount to skip back, if not specified `skipLength`
     * is used
     * @example slimsurfer.skipForward();
     */

    /*
    skipForward(seconds) {
        this.skip(seconds || this.params.skipLength);
    }
    */
    // REMOVED skipping

    /**
     * Skip a number of seconds from the current position (use a negative value
     * to go backwards).
     *
     * @param {number} offset Amount to skip back or forwards
     * @example
     * // go back 2 seconds
     * slimsurfer.skip(-2);
     */

    /*
    skip(offset) {
        const duration = this.getDuration() || 1;
        let position = this.getCurrentTime() || 0;
        position = Math.max(0, Math.min(duration, position + (offset || 0)));
        this.seekAndCenter(position / duration);
    }
    */

    /**
     * Seeks to a position and centers the view
     *
     * @param {number} progress Between 0 (=beginning) and 1 (=end)
     * @example
     * // seek and go to the middle of the audio
     * slimsurfer.seekTo(0.5);
     */

  }, {
    key: "seekAndCenter",
    value: function seekAndCenter(progress) {
      this.seekTo(progress);
      this.drawer.recenter(progress);
    }
    /**
     * Seeks to a position
     *
     * @param {number} progress Between 0 (=beginning) and 1 (=end)
     * @emits SlimSurfer#interaction
     * @emits SlimSurfer#seek
     * @example
     * // seek to the middle of the audio
     * slimsurfer.seekTo(0.5);
     */

  }, {
    key: "seekTo",
    value: function seekTo(progress) {
      // return an error if progress is not a number between 0 and 1
      if (typeof progress !== 'number' || !isFinite(progress) || progress < 0 || progress > 1) {
        return console.error('');
        /*'Error calling slimsurfer.seekTo, parameter must be a number between 0 and 1!'*/
      } // REMOVED interaction event
      // this.fireEvent('interaction', () => this.seekTo(progress));
      // REMOVED pausing before seeking

      /*
      const paused = this.backend.isPaused();
      // avoid draw wrong position while playing backward seeking
      if (!paused) {
          this.backend.pause();
      }
      */
      // avoid small scrolls while paused seeking


      var oldScrollParent = this.params.scrollParent;
      this.params.scrollParent = false;
      this.backend.seekTo(progress * this.getDuration());
      this.drawer.progress(progress); // REMOVED playing after seeking

      /*
      if (!paused) {
          this.backend.play();
      }
      */

      this.params.scrollParent = oldScrollParent;
      this.fireEvent('seek', progress);
    } // REMOVED Stop functionality

    /**
     * Stops and goes to the beginning.
     *
     * @example slimsurfer.stop();
     */

    /*
    stop() {
        this.pause();
        this.seekTo(0);
        this.drawer.progress(0);
    }
    */
    // Removed setting current volume device

    /**
     * Set the playback volume.
     *
     * @param {string} deviceId String value representing underlying output device
     */

    /*
    setSinkId(deviceId) {
        return this.backend.setSinkId(deviceId);
    }*/
    // Removed setting current volume

    /**
     * Set the playback volume.
     *
     * @param {number} newVolume A value between 0 and 1, 0 being no
     * volume and 1 being full volume.
     * @emits SlimSurfer#volume
     */

    /*
    setVolume(newVolume) {
        this.backend.setVolume(newVolume);
        this.fireEvent('volume', newVolume);
    }*/
    // Removed getting current volume

    /**
     * Get the playback volume.
     *
     * @return {number} A value between 0 and 1, 0 being no
     * volume and 1 being full volume.
     */

    /*
    getVolume() {
        return this.backend.getVolume();
    }
    */
    // Removed setting playback rate

    /**
     * Set the playback rate.
     *
     * @param {number} rate A positive number. E.g. 0.5 means half the normal
     * speed, 2 means double speed and so on.
     * @example slimsurfer.setPlaybackRate(2);
     */

    /*
    setPlaybackRate(rate) {
        this.backend.setPlaybackRate(rate);
    }
    */
    // Removed getting playback rate

    /**
     * Get the playback rate.
     *
     * @return {number}
     */

    /*
    getPlaybackRate() {
        return this.backend.getPlaybackRate();
    }
    */
    // Removed toggling volume

    /**
     * Toggle the volume on and off. It not currenly muted it will save the
     * current volume value and turn the volume off. If currently muted then it
     * will restore the volume to the saved value, and then rest the saved
     * value.
     *
     * @example slimsurfer.toggleMute();
     */

    /*
    toggleMute() {
        this.setMute(!this.isMuted);
    }
    */
    // Removed toggling mute

    /**
     * Enable or disable muted audio
     *
     * @param {boolean} mute
     * @emits SlimSurfer#volume
     * @emits SlimSurfer#mute
     * @example
     * // unmute
     * slimsurfer.setMute(false);
     */

    /*
    setMute(mute) {
        // ignore all muting requests if the audio is already in that state
        if (mute === this.isMuted) {
            this.fireEvent('mute', this.isMuted);
            return;
        }
         if (mute) {
            // If currently not muted then save current volume,
            // turn off the volume and update the mute properties
            this.savedVolume = this.backend.getVolume();
            this.backend.setVolume(0);
            this.isMuted = true;
            this.fireEvent('volume', 0);
        } else {
            // If currently muted then restore to the saved volume
            // and update the mute properties
            this.backend.setVolume(this.savedVolume);
            this.isMuted = false;
            this.fireEvent('volume', this.savedVolume);
        }
        this.fireEvent('mute', this.isMuted);
    }
    */
    // Removed getting mute status

    /**
     * Get the current mute status.
     *
     * @example const isMuted = slimsurfer.getMute();
     * @return {boolean}
     */

    /*
    getMute() {
        return this.isMuted;
    }
    */

    /**
     * Get the current ready status.
     *
     * @example const isReady = slimsurfer.isReady();
     * @return {boolean}
     */

  }, {
    key: "isReady",
    value: function isReady() {
      return this.isReady;
    } // Removed getting list of current filters bc we dont need filters

    /**
     * Get the list of current set filters as an array.
     *
     * Filters must be set with setFilters method first
     *
     * @return {array}
     */

    /*
    getFilters() {
        return this.backend.filters || [];
    }
    */

    /**
     * Toggles `scrollParent` and redraws
     *
     * @example slimsurfer.toggleScroll();
     */

  }, {
    key: "toggleScroll",
    value: function toggleScroll() {
      this.params.scrollParent = !this.params.scrollParent;
      this.drawBuffer();
    }
    /**
     * Toggle mouse interaction
     *
     * @example slimsurfer.toggleInteraction();
     */

  }, {
    key: "toggleInteraction",
    value: function toggleInteraction() {
      this.params.interact = !this.params.interact;
    }
    /**
     * Get the fill color of the waveform after the cursor.
     *
     * @return {string} A CSS color string.
     */

  }, {
    key: "getWaveColor",
    value: function getWaveColor() {
      return this.params.waveColor;
    }
    /**
     * Set the fill color of the waveform after the cursor.
     *
     * @param {string} color A CSS color string.
     * @example slimsurfer.setWaveColor('#ddd');
     */

  }, {
    key: "setWaveColor",
    value: function setWaveColor(color) {
      this.params.waveColor = color;
      this.drawBuffer();
    }
    /**
     * Get the fill color of the waveform behind the cursor.
     *
     * @return {string} A CSS color string.
     */

  }, {
    key: "getProgressColor",
    value: function getProgressColor() {
      return this.params.progressColor;
    }
    /**
     * Set the fill color of the waveform behind the cursor.
     *
     * @param {string} color A CSS color string.
     * @example slimsurfer.setProgressColor('#400');
     */

  }, {
    key: "setProgressColor",
    value: function setProgressColor(color) {
      this.params.progressColor = color;
      this.drawBuffer();
    }
    /**
     * Get the fill color of the cursor indicating the playhead
     * position.
     *
     * @return {string} A CSS color string.
     */

  }, {
    key: "getCursorColor",
    value: function getCursorColor() {
      return this.params.cursorColor;
    }
    /**
     * Set the fill color of the cursor indicating the playhead
     * position.
     *
     * @param {string} color A CSS color string.
     * @example slimsurfer.setCursorColor('#222');
     */

  }, {
    key: "setCursorColor",
    value: function setCursorColor(color) {
      this.params.cursorColor = color;
      this.drawer.updateCursor();
    }
    /**
     * Get the height of the waveform.
     *
     * @return {number} Height measured in pixels.
     */

  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.params.height;
    }
    /**
     * Set the height of the waveform.
     *
     * @param {number} height Height measured in pixels.
     * @example slimsurfer.setHeight(200);
     */

  }, {
    key: "setHeight",
    value: function setHeight(height) {
      this.params.height = height;
      this.drawer.setHeight(height * this.params.pixelRatio);
      this.drawBuffer();
    }
    /**
     * Get the correct peaks for current wave viewport and render wave
     *
     * @private
     * @emits SlimSurfer#redraw
     */

  }, {
    key: "drawBuffer",
    value: function drawBuffer() {
      // console.log('Drawing buffer');
      var nominalWidth = Math.round(this.getDuration() * this.params.minPxPerSec * this.params.pixelRatio);
      var parentWidth = this.drawer.getWidth();
      var width = nominalWidth;
      var start = this.drawer.getScrollX();
      var end = Math.max(start + parentWidth, width); // Fill container

      if (this.params.fillParent && (!this.params.scrollParent || nominalWidth < parentWidth)) {
        width = parentWidth;
        start = 0;
        end = width;
      }

      var peaks; // Removed chunked getPeaks for partialRender

      /*
      if (this.params.partialRender) {
          const newRanges = this.peakCache.addRangeToPeakCache(
              width,
              start,
              end
          );
          let i;
          for (i = 0; i < newRanges.length; i++) {
              peaks = this.backend.getPeaks(
                  width,
                  newRanges[i][0],
                  newRanges[i][1]
              );
              this.drawer.drawPeaks(
                  peaks,
                  width,
                  newRanges[i][0],
                  newRanges[i][1]
              );
          }
      }
      */
      //else {

      peaks = this.backend.getPeaks(width, start, end);
      this.drawer.drawPeaks(peaks, width, start, end); //}

      this.fireEvent('redraw', peaks, width);
    }
    /**
     * Horizontally zooms the waveform in and out. It also changes the parameter
     * `minPxPerSec` and enables the `scrollParent` option. Calling the function
     * with a falsey parameter will reset the zoom state.
     *
     * @param {?number} pxPerSec Number of horizontal pixels per second of
     * audio, if none is set the waveform returns to unzoomed state
     * @emits SlimSurfer#zoom
     * @example slimsurfer.zoom(20);
     */

  }, {
    key: "zoom",
    value: function zoom(pxPerSec) {
      if (!pxPerSec) {
        this.params.minPxPerSec = this.defaultParams.minPxPerSec;
        this.params.scrollParent = false;
      } else {
        this.params.minPxPerSec = pxPerSec;
        this.params.scrollParent = true;
      }

      this.drawBuffer();
      this.drawer.progress(this.backend.getPlayedPercents());
      this.drawer.recenter(this.getCurrentTime() / this.getDuration());
      this.fireEvent('zoom', pxPerSec);
    } // Removed decoding and loading audio buffer

    /**
     * Decode buffer and load
     *
     * @private
     * @param {ArrayBuffer} arraybuffer
     */

    /*
    loadArrayBuffer(arraybuffer) {
        this.decodeArrayBuffer(arraybuffer, data => {
            if (!this.isDestroyed) {
                this.loadDecodedBuffer(data);
            }
        });
    }
    */
    // Removed loading an audiobuffer directly

    /**
     * Directly load an externally decoded AudioBuffer
     *
     * @private
     * @param {AudioBuffer} buffer
     * @emits SlimSurfer#ready
     */

    /*
    loadDecodedBuffer(buffer) {
        this.backend.load(buffer);
        this.drawBuffer();
        this.fireEvent('ready');
        this.isReady = true;
    }
    */
    // Removed loading audio from blob or file object

    /**
     * Loads audio data from a Blob or File object
     *
     * @param {Blob|File} blob Audio data
     * @example
     */

    /*
    loadBlob(blob) {
        // Create file reader
        const reader = new FileReader();
        reader.addEventListener('progress', e => this.onProgress(e));
        reader.addEventListener('load', e =>
            this.loadArrayBuffer(e.target.result)
        );
        reader.addEventListener('error', () =>
            this.fireEvent('error', 'Error reading file')
        );
        reader.readAsArrayBuffer(blob);
        this.empty();
    }
    */

    /**
     * Loads audio and re-renders the waveform.
     *
     * @param {string|HTMLMediaElement} url The url of the audio file or the
     * audio element with the audio
     * @param {?number[]|number[][]} peaks Wavesurfer does not have to decode
     * the audio to render the waveform if this is specified
     * @param {?string} preload (Use with backend `MediaElement`)
     * `'none'|'metadata'|'auto'` Preload attribute for the media element
     * @param {?number} duration The duration of the audio. This is used to
     * render the peaks data in the correct size for the audio duration (as
     * befits the current minPxPerSec and zoom value) without having to decode
     * the audio.
     * @example
     * // using ajax or media element to load (depending on backend)
     * slimsurfer.load('http://example.com/demo.wav');
     *
     * // setting preload attribute with media element backend and supplying
     * peaks slimsurfer.load(
     *   'http://example.com/demo.wav',
     *   [0.0218, 0.0183, 0.0165, 0.0198, 0.2137, 0.2888],
     *   true,
     * );
     */
    //load(url, peaks, preload, duration) {

  }, {
    key: "load",
    value: function load(peaks, duration) {
      this.empty(); // Removed checks if preload is valid or not

      /*
      if (preload) {
          // check whether the preload attribute will be usable and if not log
          // a warning listing the reasons why not and nullify the variable
          const preloadIgnoreReasons = {
              "Preload is not 'auto', 'none' or 'metadata'":
                  ['auto', 'metadata', 'none'].indexOf(preload) === -1,
              'Peaks are not provided': !peaks,
              'Backend is not of type MediaElement':
                  this.params.backend !== 'MediaElement',
              'Url is not of type string': typeof url !== 'string'
          };
          const activeReasons = Object.keys(preloadIgnoreReasons).filter(
              reason => preloadIgnoreReasons[reason]
          );
          if (activeReasons.length) {
              console.warn(
                  'Preload parameter of slimsurfer.load will be ignored because:\n\t- ' +
                      activeReasons.join('\n\t- ')
              );
              // stop invalid values from being used
              preload = null;
          }
      }
      */
      //this.loadMediaElement(url, peaks, preload, duration);

      return this.loadMediaElement(peaks, duration); // Removed switching of the backend

      /*
      switch (this.params.backend) {
          case 'WebAudio':
              return this.loadBuffer(url, peaks, duration);
          case 'MediaElement':
              return this.loadMediaElement(url, peaks, preload, duration);
      }
      */
    } // Removed loading using web audio buffer backend

    /**
     * Loads audio using Web Audio buffer backend.
     *
     * @private
     * @param {string} url
     * @param {?number[]|number[][]} peaks
     * @param {?number} duration
     */

    /*
    loadBuffer(url, peaks, duration) {
        const load = action => {
            if (action) {
                this.tmpEvents.push(this.once('ready', action));
            }
            return this.getArrayBuffer(url, data => this.loadArrayBuffer(data));
        };
         if (peaks) {
            this.backend.setPeaks(peaks, duration);
            this.drawBuffer();
            this.tmpEvents.push(this.once('interaction', load));
        } else {
            return load();
        }
    }
    */

    /**
     * Either create a media element, or load an existing media element.
     *
     * @private
     * @param {string|HTMLMediaElement} urlOrElt Either a path to a media file, or an
     * existing HTML5 Audio/Video Element
     * @param {number[]|number[][]} peaks Array of peaks. Required to bypass web audio
     * dependency
     * @param {?boolean} preload Set to true if the preload attribute of the
     * audio element should be enabled
     * @param {?number} duration
     */
    //loadMediaElement(urlOrElt, peaks, preload, duration) {

  }, {
    key: "loadMediaElement",
    value: function loadMediaElement(peaks, duration) {
      // TODO: MediaElement.load function has to be altered
      //this.backend.load(this.mediaContainer, peaks, duration);
      // REMOVED loading audio from url or setting peaks for existing Elt

      /*
      let url = urlOrElt;
      if (typeof urlOrElt === 'string') {
          this.backend.load(url, this.mediaContainer, peaks, preload);
      } else {
          const elt = urlOrElt;
          this.backend.loadElt(elt, peaks);
           // If peaks are not provided,
          // url = element.src so we can get peaks with web audio
          url = elt.src;
      }
      */

      /*
      this.tmpEvents.push(
          this.backend.once('canplay', () => {
              this.drawBuffer();
              this.fireEvent('ready');
              this.isReady = true;
          }),
          this.backend.once('error', err => this.fireEvent('error', err))
      );
      */
      // If no pre-decoded peaks provided or pre-decoded peaks are
      // provided with forceDecode flag, attempt to download the
      // audio file and decode it with Web Audio.
      if (peaks) {
        this.backend.setPeaks(peaks, duration);
        this.drawBuffer();
        this.fireEvent('ready');
        this.isReady = true;
      } // Removed downloading audio file and decoding

      /*
      if (
          (!peaks || this.params.forceDecode) &&
          this.backend.supportsWebAudio()
      ) {
          this.getArrayBuffer(url, arraybuffer => {
              this.decodeArrayBuffer(arraybuffer, buffer => {
                  this.backend.buffer = buffer;
                  this.backend.setPeaks(null);
                  this.drawBuffer();
                  this.fireEvent('waveform-ready');
              });
          });
      }
      */

    } // Removed decoding of array buffer

    /**
     * Decode an array buffer and pass data to a callback
     *
     * @private
     * @param {Object} arraybuffer
     * @param {function} callback
     */

    /*
    decodeArrayBuffer(arraybuffer, callback) {
        this.arraybuffer = arraybuffer;
         this.backend.decodeArrayBuffer(
            arraybuffer,
            data => {
                // Only use the decoded data if we haven't been destroyed or
                // another decode started in the meantime
                if (!this.isDestroyed && this.arraybuffer == arraybuffer) {
                    callback(data);
                    this.arraybuffer = null;
                }
            },
            () => this.fireEvent('error', 'Error decoding audiobuffer')
        );
    }
    */
    // Removed loading via ajax

    /**
     * Load an array buffer by ajax and pass to a callback
     *
     * @param {string} url
     * @param {function} callback
     * @private
     */

    /*
    getArrayBuffer(url, callback) {
        const ajax = util.ajax({
            url: url,
            responseType: 'arraybuffer',
            xhr: this.params.xhr
        });
         this.currentAjax = ajax;
         this.tmpEvents.push(
            ajax.on('progress', e => {
                this.onProgress(e);
            }),
            ajax.on('success', (data, e) => {
                callback(data);
                this.currentAjax = null;
            }),
            ajax.on('error', e => {
                this.fireEvent('error', 'XHR error: ' + e.target.statusText);
                this.currentAjax = null;
            })
        );
         return ajax;
    }
    */
    // Removed loading progress event since there is no loading of file

    /**
     * Called while the audio file is loading
     *
     * @private
     * @param {Event} e
     * @emits SlimSurfer#loading
     */

    /*
    onProgress(e) {
        let percentComplete;
        if (e.lengthComputable) {
            percentComplete = e.loaded / e.total;
        } else {
            // Approximate progress with an asymptotic
            // function, and assume downloads in the 1-3 MB range.
            percentComplete = e.loaded / (e.loaded + 1000000);
        }
        this.fireEvent('loading', Math.round(percentComplete * 100), e.target);
    }
    */
    // Removed exporting pcm data as json array

    /**
     * Exports PCM data into a JSON array and opens in a new window.
     *
     * @param {number} length=1024 The scale in which to export the peaks. (Integer)
     * @param {number} accuracy=10000 (Integer)
     * @param {?boolean} noWindow Set to true to disable opening a new
     * window with the JSON
     * @param {number} start
     * @todo Update exportPCM to work with new getPeaks signature
     * @return {string} JSON of peaks
     */

    /*
    exportPCM(length, accuracy, noWindow, start) {
        length = length || 1024;
        start = start || 0;
        accuracy = accuracy || 10000;
        noWindow = noWindow || false;
        const peaks = this.backend.getPeaks(length, start);
        const arr = [].map.call(
            peaks,
            val => Math.round(val * accuracy) / accuracy
        );
        const json = JSON.stringify(arr);
        if (!noWindow) {
            window.open(
                'data:application/json;charset=utf-8,' +
                    encodeURIComponent(json)
            );
        }
        return json;
    }
    */
    // Removed saving waveform as image

    /**
     * Save waveform image as data URI.
     *
     * The default format is `image/png`. Other supported types are
     * `image/jpeg` and `image/webp`.
     *
     * @param {string} format='image/png'
     * @param {number} quality=1
     * @return {string} data URI of image
     */

    /*
    exportImage(format, quality) {
        if (!format) {
            format = 'image/png';
        }
        if (!quality) {
            quality = 1;
        }
         return this.drawer.getImage(format, quality);
    }
    */
    // Removed cancellation of ajax requests

    /**
     * Cancel any ajax request currently in progress
     */

    /*
    cancelAjax() {
        if (this.currentAjax) {
            this.currentAjax.xhr.abort();
            this.currentAjax = null;
        }
    }
    */

    /**
     * @private
     */

  }, {
    key: "clearTmpEvents",
    value: function clearTmpEvents() {
      this.tmpEvents.forEach(function (e) {
        return e.un();
      });
    } // TODO: Check arguments of this.drawer.drawPeaks()

    /**
     * Display empty waveform.
     */

  }, {
    key: "empty",
    value: function empty() {
      // REMOVED Check if backend is playing

      /*
      if (!this.backend.isPaused()) {
          this.stop();
          this.backend.disconnectSource();
      }
      */
      this.isReady = false; //this.cancelAjax();

      this.clearTmpEvents();
      this.drawer.progress(0);
      this.drawer.setWidth(0);
      this.drawer.drawPeaks({
        length: this.drawer.getWidth()
      }, 0);
    }
    /**
     * Remove events, elements and disconnect WebAudio nodes.
     *
     * @emits SlimSurfer#destroy
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.destroyAllPlugins();
      this.fireEvent('destroy'); //this.cancelAjax();

      this.clearTmpEvents();
      this.unAll();
      /*
      if (this.params.responsive !== false) {
          window.removeEventListener('resize', this._onResize, true);
          window.removeEventListener(
              'orientationchange',
              this._onResize,
              true
          );
      };
      */

      window.removeEventListener('resize', this._onResize, true);
      window.removeEventListener('orientationchange', this._onResize, true);
      this.backend.destroy();
      this.drawer.destroy();
      this.isDestroyed = true;
      this.isReady = false; //this.arraybuffer = null;
    }
  }]);

  return SlimSurfer;
}(util.Observer);

exports.default = SlimSurfer;
SlimSurfer.VERSION = "4.0.1";
SlimSurfer.util = util;
module.exports = exports.default;

/***/ }),

/***/ "./src/util/extend.js":
/*!****************************!*\
  !*** ./src/util/extend.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extend;

/**
 * Extend an object shallowly with others
 *
 * @param {Object} dest The target object
 * @param {Object[]} sources The objects to use for extending
 *
 * @return {Object} Merged object
 */
function extend(dest) {
  for (var _len = arguments.length, sources = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    sources[_key - 1] = arguments[_key];
  }

  sources.forEach(function (source) {
    Object.keys(source).forEach(function (key) {
      dest[key] = source[key];
    });
  });
  return dest;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/util/frame.js":
/*!***************************!*\
  !*** ./src/util/frame.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = frame;

var _requestAnimationFrame = _interopRequireDefault(__webpack_require__(/*! ./request-animation-frame */ "./src/util/request-animation-frame.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a function which will be called at the next requestAnimationFrame
 * cycle
 *
 * @param {function} func The function to call
 *
 * @return {func} The function wrapped within a requestAnimationFrame
 */
function frame(func) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _requestAnimationFrame.default)(function () {
      return func.apply(void 0, args);
    });
  };
}

module.exports = exports.default;

/***/ }),

/***/ "./src/util/get-id.js":
/*!****************************!*\
  !*** ./src/util/get-id.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getId;

/**
 * Get a random prefixed ID
 *
 * @returns {String} Random ID
 */
function getId() {
  return 'wavesurfer_' + Math.random().toString(32).substring(2);
}

module.exports = exports.default;

/***/ }),

/***/ "./src/util/index.js":
/*!***************************!*\
  !*** ./src/util/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getId", {
  enumerable: true,
  get: function get() {
    return _getId.default;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function get() {
    return _max.default;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function get() {
    return _min.default;
  }
});
Object.defineProperty(exports, "Observer", {
  enumerable: true,
  get: function get() {
    return _observer.default;
  }
});
Object.defineProperty(exports, "extend", {
  enumerable: true,
  get: function get() {
    return _extend.default;
  }
});
Object.defineProperty(exports, "style", {
  enumerable: true,
  get: function get() {
    return _style.default;
  }
});
Object.defineProperty(exports, "requestAnimationFrame", {
  enumerable: true,
  get: function get() {
    return _requestAnimationFrame.default;
  }
});
Object.defineProperty(exports, "frame", {
  enumerable: true,
  get: function get() {
    return _frame.default;
  }
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function get() {
    return _debounce.default;
  }
});
Object.defineProperty(exports, "preventClick", {
  enumerable: true,
  get: function get() {
    return _preventClick.default;
  }
});

var _getId = _interopRequireDefault(__webpack_require__(/*! ./get-id */ "./src/util/get-id.js"));

var _max = _interopRequireDefault(__webpack_require__(/*! ./max */ "./src/util/max.js"));

var _min = _interopRequireDefault(__webpack_require__(/*! ./min */ "./src/util/min.js"));

var _observer = _interopRequireDefault(__webpack_require__(/*! ./observer */ "./src/util/observer.js"));

var _extend = _interopRequireDefault(__webpack_require__(/*! ./extend */ "./src/util/extend.js"));

var _style = _interopRequireDefault(__webpack_require__(/*! ./style */ "./src/util/style.js"));

var _requestAnimationFrame = _interopRequireDefault(__webpack_require__(/*! ./request-animation-frame */ "./src/util/request-animation-frame.js"));

var _frame = _interopRequireDefault(__webpack_require__(/*! ./frame */ "./src/util/frame.js"));

var _debounce = _interopRequireDefault(__webpack_require__(/*! debounce */ "./node_modules/debounce/index.js"));

var _preventClick = _interopRequireDefault(__webpack_require__(/*! ./prevent-click */ "./src/util/prevent-click.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),

/***/ "./src/util/max.js":
/*!*************************!*\
  !*** ./src/util/max.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = max;

/**
 * Get the largest value
 *
 * @param   {Array} values Array of numbers
 * @returns {Number} Largest number found
 */
function max(values) {
  var largest = -Infinity;
  Object.keys(values).forEach(function (i) {
    if (values[i] > largest) {
      largest = values[i];
    }
  });
  return largest;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/util/min.js":
/*!*************************!*\
  !*** ./src/util/min.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = min;

/**
 * Get the smallest value
 *
 * @param   {Array} values Array of numbers
 * @returns {Number}       Smallest number found
 */
function min(values) {
  var smallest = Number(Infinity);
  Object.keys(values).forEach(function (i) {
    if (values[i] < smallest) {
      smallest = values[i];
    }
  });
  return smallest;
}

module.exports = exports.default;

/***/ }),

/***/ "./src/util/observer.js":
/*!******************************!*\
  !*** ./src/util/observer.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @typedef {Object} ListenerDescriptor
 * @property {string} name The name of the event
 * @property {function} callback The callback
 * @property {function} un The function to call to remove the listener
 */

/**
 * Observer class
 */
var Observer = /*#__PURE__*/function () {
  /**
   * Instantiate Observer
   */
  function Observer() {
    _classCallCheck(this, Observer);

    /**
     * @private
     * @todo Initialise the handlers here already and remove the conditional
     * assignment in `on()`
     */
    this.handlers = null;
  }
  /**
   * Attach a handler function for an event.
   *
   * @param {string} event Name of the event to listen to
   * @param {function} fn The callback to trigger when the event is fired
   * @return {ListenerDescriptor}
   */


  _createClass(Observer, [{
    key: "on",
    value: function on(event, fn) {
      var _this = this;

      if (!this.handlers) {
        this.handlers = {};
      }

      var handlers = this.handlers[event];

      if (!handlers) {
        handlers = this.handlers[event] = [];
      }

      handlers.push(fn); // Return an event descriptor

      return {
        name: event,
        callback: fn,
        un: function un(e, fn) {
          return _this.un(e, fn);
        }
      };
    }
    /**
     * Remove an event handler.
     *
     * @param {string} event Name of the event the listener that should be
     * removed listens to
     * @param {function} fn The callback that should be removed
     */

  }, {
    key: "un",
    value: function un(event, fn) {
      if (!this.handlers) {
        return;
      }

      var handlers = this.handlers[event];
      var i;

      if (handlers) {
        if (fn) {
          for (i = handlers.length - 1; i >= 0; i--) {
            if (handlers[i] == fn) {
              handlers.splice(i, 1);
            }
          }
        } else {
          handlers.length = 0;
        }
      }
    }
    /**
     * Remove all event handlers.
     */

  }, {
    key: "unAll",
    value: function unAll() {
      this.handlers = null;
    }
    /**
     * Attach a handler to an event. The handler is executed at most once per
     * event type.
     *
     * @param {string} event The event to listen to
     * @param {function} handler The callback that is only to be called once
     * @return {ListenerDescriptor}
     */

  }, {
    key: "once",
    value: function once(event, handler) {
      var _this2 = this;

      var fn = function fn() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        /*  eslint-disable no-invalid-this */
        handler.apply(_this2, args);
        /*  eslint-enable no-invalid-this */

        setTimeout(function () {
          _this2.un(event, fn);
        }, 0);
      };

      return this.on(event, fn);
    }
    /**
     * Manually fire an event
     *
     * @param {string} event The event to fire manually
     * @param {...any} args The arguments with which to call the listeners
     */

  }, {
    key: "fireEvent",
    value: function fireEvent(event) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (!this.handlers) {
        return;
      }

      var handlers = this.handlers[event];
      handlers && handlers.forEach(function (fn) {
        fn.apply(void 0, args);
      });
    }
  }]);

  return Observer;
}();

exports.default = Observer;
module.exports = exports.default;

/***/ }),

/***/ "./src/util/prevent-click.js":
/*!***********************************!*\
  !*** ./src/util/prevent-click.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preventClick;

function preventClickHandler(e) {
  e.stopPropagation();
  document.body.removeEventListener('click', preventClickHandler, true);
}

function preventClick(values) {
  document.body.addEventListener('click', preventClickHandler, true);
}

module.exports = exports.default;

/***/ }),

/***/ "./src/util/request-animation-frame.js":
/*!*********************************************!*\
  !*** ./src/util/request-animation-frame.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Returns the requestAnimationFrame function for the browser, or a shim with
 * setTimeout if none is found
 *
 * @return {function}
 */
var _default = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
  return setTimeout(callback, 1000 / 60);
}).bind(window);

exports.default = _default;
module.exports = exports.default;

/***/ }),

/***/ "./src/util/style.js":
/*!***************************!*\
  !*** ./src/util/style.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = style;

/**
 * Apply a map of styles to an element
 *
 * @param {HTMLElement} el The element that the styles will be applied to
 * @param {Object} styles The map of propName: attribute, both are used as-is
 *
 * @return {HTMLElement} el
 */
function style(el, styles) {
  Object.keys(styles).forEach(function (prop) {
    if (el.style[prop] !== styles[prop]) {
      el.style[prop] = styles[prop];
    }
  });
  return el;
}

module.exports = exports.default;

/***/ })

/******/ });
});
//# sourceMappingURL=slimsurfer.js.map