var TextDisplay =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _display = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class representing a TextDisplay.
 * @extends Display
 */
var TextDisplay = function (_Display) {
  _inherits(TextDisplay, _Display);

  /**
   * Create a TextDisplay.
   */
  function TextDisplay(args) {
    _classCallCheck(this, TextDisplay);

    var _this = _possibleConstructorReturn(this, (TextDisplay.__proto__ || Object.getPrototypeOf(TextDisplay)).call(this, args));

    _this.text_canvas = document.createElement('div');
    return _this;
  }

  /**
   * Show Rich Text.
   * Adds html text to the text_canvas
   */


  _createClass(TextDisplay, [{
    key: "showRichText",
    value: function showRichText(text) {
      this.text_canvas.innerHTML = text;
    }

    /**
     * Show Regular Text.
     * Adds text to the text_canvas
     */

  }, {
    key: "showText",
    value: function showText(text) {
      this.text_canvas.innerText = text;
    }
    /**
     * Clear the text canvas.
     */

  }, {
    key: "clearText",
    value: function clearText() {
      this.text_canvas.innerText = "";
    }
    /**
     * Clear the text canvas.
     */

  }, {
    key: "setProperties",
    value: function setProperties(args) {
      this.text_canvas.setAttribute('id', args.canvas_id);
      this.text_canvas.setAttribute('class', args.canvas_class);
    }
    /**
     * Handle Time Ticks.
     */

  }, {
    key: "handleTick",
    value: function handleTick() {
      this.timeline.callTimeAction(this.context.time);
    }
    /**
     * prepareTimeline is placeholder for how a TextDisplay  instance loads
     * time actions to it's timeline.
     */

  }, {
    key: "prepareTimeline",
    value: function prepareTimeline() {}

    /**
     * Setup is called by the display coordinator
     * On Setup we call prepareTimeline.
     */

  }, {
    key: "setup",
    value: function setup() {
      this.prepareTimeline();
    }

    /**
     * Suppose to draw the canvas onto the stage
     * It returns the canvas instance to the drawn unto the stage by
     * the displayCoordinator
     */

  }, {
    key: "render",
    value: function render() {
      return this.text_canvas;
    }
  }]);

  return TextDisplay;
}(_display.Display);

;

module.exports = TextDisplay;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _timeline = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* MODES is different modes a display may have
* Normal is the default Display mode
* User is a state where user is interacting with the Display instance
*       Note: Implementation depends on Display
**/
var MODES = { NORMAL: 0, USER: 1 };

var Display = function () {
  function Display(args) {
    _classCallCheck(this, Display);

    this.context = args.context || undefined;
    this.name = args.name || "undefined";
    this.timeline = new _timeline.Timeline({ name: this.name + "-timeline",
      treshold: args.timeline_treshold });
    this.is_primary_display = false;
    this.mode = MODES.NORMAL;
    this.m_ready = false;
  }

  _createClass(Display, [{
    key: "toString",
    value: function toString() {
      return '(' + this.name + ')';
    }
  }, {
    key: "setContext",
    value: function setContext(context) {
      this.context = context;
      this.context.emitter.on("tick", this.handleTick.bind(this));
      this.context.emitter.on("pause", this.handlePause.bind(this));
      this.context.emitter.on("continue", this.handleContinue.bind(this));
    }
    /**
    * This function set's the Display instance as being ready.
    **/

  }, {
    key: "setAsReady",
    value: function setAsReady() {
      this.m_ready = true;
      if (this.context != undefined) {
        this.context.emitter.emit("ready");
      }
    }
    /**
    * This is just a getter to check if the dislay ready.
    **/

  }, {
    key: "ready",
    value: function ready() {
      return this.m_ready;
    }
    /**
    * This set's the display as being the primary display.
    **/

  }, {
    key: "setAsPrimaryDisplay",
    value: function setAsPrimaryDisplay() {
      this.is_primary_display = true;
    }
    /**
    * This is a getter to check if a display is the primary display
    **/

  }, {
    key: "isPrimaryDisplay",
    value: function isPrimaryDisplay() {
      if (this.is_primary_display) {
        return true;
      } else {
        return false;
      }
    }
    /**
    * Note: Tick should dependent per display.
    *       By default it ticks by 1 however it can be overwritten
    *       by a display implementation.
    *       *** Only Primary Display should tick.
    **/

  }, {
    key: "tick",
    value: function tick() {
      if (this.isPrimaryDisplay()) {
        this.context.emitter.emit('tick');
        this.context.time += 1;
      }
    }
    /**
    * Seek skips to a given time.
    * @t :  Time to skip to
    **/

  }, {
    key: "seek",
    value: function seek(t) {
      this.timeline.callTimeAction(t);
    }
    /**
    ** Helper to enable user mode
    * Only use this if UserMode is needed
    *
    **/

  }, {
    key: "enableUserMode",
    value: function enableUserMode() {
      return this.mode = MODES.USER;
    }
    /**
    ** Helper to disable user mode
    * Only use this if UserMode is used
    *
    **/

  }, {
    key: "releaseUserMode",
    value: function releaseUserMode() {
      return this.mode = MODES.NORMAL;
    }
    /**
    * Getter to check if in UserMode
    **/

  }, {
    key: "isInUserMode",
    value: function isInUserMode() {
      if (this.mode == MODES.USER) {
        return true;
      }
      return false;
    }
    /**
    * Listener for tick actions
    * Handles call to Timeline for current tick.
    **/

  }, {
    key: "handleTick",
    value: function handleTick() {
      this.timeline.callTimeAction(this.context.time);
    }
    /**
    * Listener for pause action
    * Handles call to Timeline for current tick.
    **/

  }, {
    key: "handlePause",
    value: function handlePause() {}
  }, {
    key: "handleContinue",
    value: function handleContinue() {}
  }, {
    key: "setup",
    value: function setup() {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "play",
    value: function play() {}
  }, {
    key: "pause",
    value: function pause() {}
  }, {
    key: "reset",
    value: function reset() {}
  }]);

  return Display;
}();

;

module.exports = { Display: Display };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOT_FOUND = "NOTFOUND";

/**
 * Class representing a time action.
 */

var TimeAction = function () {
  function TimeAction(func, args) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "undefined";

    _classCallCheck(this, TimeAction);

    this.action = func;
    this.args = args;
    this.name = name;
  }

  _createClass(TimeAction, [{
    key: "toString",
    value: function toString() {
      return 'TimeAction:(' + this.name + ')';
    }
  }, {
    key: "trigger",
    value: function trigger() {
      console.log(this, this.args);
      this.action.apply(this, this.args);
    }
  }]);

  return TimeAction;
}();

;

var Timeline = function () {
  function Timeline(args) {
    _classCallCheck(this, Timeline);

    this.time_actions = {};
    this.name = args.name || "undefined";
    this.treshold = args.treshold || 5;
  }

  _createClass(Timeline, [{
    key: "toString",
    value: function toString() {
      return '(' + this.name + ')';
    }
  }, {
    key: "addTimeAction",
    value: function addTimeAction(time, action) {
      var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var name = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "undefined";

      if (!(Object.prototype.toString.call(args) === '[object Array]')) {
        args = [args];
      }
      this.time_actions[time] = new TimeAction(action, args, name);
    }
  }, {
    key: "callTimeAction",
    value: function callTimeAction(time) {
      if (this.time_actions.hasOwnProperty(time)) {
        this.time_actions[time].trigger();
      }
    }
  }, {
    key: "callNearestTimeAction",
    value: function callNearestTimeAction(time) {
      var t;
      if (this.time_actions.hasOwnProperty(time)) {
        t = time;
      } else {
        t = this.getNearestTime(time);
      }

      if (!(t == NOT_FOUND) && this.time_actions.hasOwnProperty(t)) {
        this.time_actions[t].trigger();
      }
    }
  }, {
    key: "getNearestTime",
    value: function getNearestTime(time) {
      for (var i = 1; i < this.treshold; i++) {
        if (this.time_actions.hasOwnProperty(time + i)) {
          return time + i;
        } else if (this.time_actions.hasOwnProperty(time - i)) {
          return time - i;
        }
      }
      return NOT_FOUND;
    }
  }]);

  return Timeline;
}();

;

module.exports = { Timeline: Timeline, TimeAction: TimeAction };

/***/ })
/******/ ]);