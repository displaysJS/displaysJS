var SliderDisplay =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _timeline = __webpack_require__(1);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// An object with modes available to a Display.
// MODES are used to track Display modes.
// Such as User Interaction Mode vs Normal Display Mode.
var MODES = { NORMAL: 0, USER: 1 };

/**
 * The Base class for all Displays.
 *
 * @param {Object} args An object with arguments to initialize the display.
 *
 * @param {String} args.name Name of Display Instance
 * @param {Number} args.timeline_treshold A treshold of error for picking a time action for the display
 *
 * @param {Object}  args.context (** optional**) Reference to DisplayCoordinator's context
 */

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

        /**
         * Set the context for the Display.
         *
         * @param {Object} context DisplayCoordinator's context
         */

    }, {
        key: "setContext",
        value: function setContext(context) {
            this.context = context;
            this.context.emitter.on("tick", this.handleTick.bind(this));
            this.context.emitter.on("pause", this.handlePause.bind(this));
            this.context.emitter.on("continue", this.handleContinue.bind(this));
        }

        /**
         * Set the the Display's ready state to True.
         *
         */

    }, {
        key: "setAsReady",
        value: function setAsReady() {
            this.m_ready = true;
            if (this.context != undefined) {
                this.context.emitter.emit("ready");
            }
        }

        /**
         * Check if Display is ready
         *
         * @return {Boolean} True if Ready, False otherwise
         */

    }, {
        key: "ready",
        value: function ready() {
            return this.m_ready;
        }

        /**
         * Set the Display as the Primary Display for a performance.
         */

    }, {
        key: "setAsPrimaryDisplay",
        value: function setAsPrimaryDisplay() {
            this.is_primary_display = true;
        }

        /**
         * Check if the Display is the PrimaryDisplay for the performance
         *
         * @return {Boolean} True if PrimaryDisplay, False otherwise
         */

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
         * This function is responsible for controling time flow for a performance
         * if the Display is the PrimaryDisplay in a performance.
         *
         * ** Note ** Your Display implementation may override this to properly handle
         * time tick as needed.
         * * By default, this function increments the time flow by 1 and emits it to all
         * listeners in the performance.
         * * Ensure that the Display is the PrimaryDisplay before controlling time.
         */

    }, {
        key: "tick",
        value: function tick() {
            if (this.isPrimaryDisplay()) {
                this.context.emitter.emit('tick');
                this.context.time += 1;
            }
        }

        /**
         * This function sets the Display mode to user mode.
         *
         * ** Note **
         * Only use this if user mode is needed
         */

    }, {
        key: "enableUserMode",
        value: function enableUserMode() {
            this.mode = MODES.USER;
        }

        /**
         * This function changes the Display mode to Normal mode.
         *
         */

    }, {
        key: "releaseUserMode",
        value: function releaseUserMode() {
            this.mode = MODES.NORMAL;
        }

        /**
         * Check if Display is in user mode
         * @return {Boolean} True if in user mode, False otherwise
         */

    }, {
        key: "isInUserMode",
        value: function isInUserMode() {
            if (this.mode == MODES.USER) {
                return true;
            }
            return false;
        }

        /**
         * Handles tick events for the Display.
         *
         * ** Note **
         * When a tick event is emitted in the performance, this function get's trigered.
         *
         * You may overwrite this function to better handle your Display implementation's
         * case.
         * * By default it calls the nearest TimeAction at the current performance time.
         */

    }, {
        key: "handleTick",
        value: function handleTick() {
            this.timeline.callTimeAction(this.context.time);
        }

        /**
         * This function handles any pause event triggered by in a performance.
         *
         * ** Note **
         * By default it calls the Display's pause function.
         * * This may be overwritten to handle pause events differently for the Display implementation.
         * @TODO Implement handlePause default action
         */

    }, {
        key: "handlePause",
        value: function handlePause() {}

        /**
         * This function handles any continue event triggered by in a performance. Ussually after a pause.
         *
         * ** Note **
         * By default it calls the Display's play function.
         *
         * * This may be overwritten to handle continue events differently for the Display implementation.
         * @TODO Implement handleContinue default action
         */

    }, {
        key: "handleContinue",
        value: function handleContinue() {}

        /**
         * This function is a placeholder to perform any setup the Display needs done..
         *
         * ** Note **
         * You **need** to overwrite this function to do handle anything the Display needs
         * to setup.
         *
         * It is a good idea to mark the Display as ready here. Or in render().
         *
         */

    }, {
        key: "setup",
        value: function setup() {}

        /**
         * This function is a placeholder to be overwritten to handle any rendering that
         * needs to performed at startup after setup in the performance.
         *
         * ** Note **
         * You **need** to overwrite this function to do handle anything the Display needs
         * to render.
         *
         * (** optional **) This can return a value to be appended to the DisplayCoordinator's Stage.
         */

    }, {
        key: "render",
        value: function render() {}

        /**
         * This function pauses the Display and does not respond to Ticks
         *
         * @TODO Implement pause default Action.
         */

    }, {
        key: "pause",
        value: function pause() {}

        /**
         * This function removes the Display from a pause state and performs the action
         * from the Display's timeline at the current performance time (context.time).
         *
         * ** Note **
         * You may overwrite this function to do what you'd prefer in your Display implementation.
         * @TODO Implement play default Action.
         */

    }, {
        key: "play",
        value: function play() {}

        /**
         * This function skips to a given time for the Display.
         *
         * @param  {Number} t The time to skip to.
         */

    }, {
        key: "seek",
        value: function seek(t) {
            this.timeline.callTimeAction(t);
        }

        /**
         * This function resets the Display's timeline back to 0
         *
         * ** Note **
         * You may overwrite this function to do what you'd prefer in your Display implementation.
         * @TODO Implement reset default Action.
         */

    }, {
        key: "reset",
        value: function reset() {}
    }]);

    return Display;
}();

;

module.exports = { Display: Display };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NOT_FOUND = "NOTFOUND";

/**
 * TimeAction is the class representing a time Action that can occur in a Timeline.
 *
 * @param {function} func Reference to a function to call on trigger
 * @param {Object} args A list of arguments to pass to the func on trigger.
 * @param {String} name (** optional **) A name for the TimeAction
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

        /**
         * Trigger an action by calling *func* and passing it *args* passed from initialization.
         */

    }, {
        key: "trigger",
        value: function trigger() {
            this.action.apply(this, this.args);
        }
    }]);

    return TimeAction;
}();

;

/**
 * Timeline with many actions
 *
 * @param {Object} args Object containing Timeline args.
 * @param {String} [args.name="undefined"] The name of the Timeline.
 * @param {Number} [args.treshold=5] The treshold for calling TimeActions
 */

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

        /**
         * Add a time action to the timeline.
         * @param {Number} time               The time value at which to perform the action
         * @param {function} action           The function to call when trigger
         * @param {Array}  [args=[]]          The args to pass to function on trigger
         * @param {String} [name="undefined"] The name of the TimeAction
         */

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

        /**
         * This function triggers the TimeAction on the Timeline at the given time if there is one.
         * @param  {Number} time The time value at which the action is at.
         */

    }, {
        key: "callTimeAction",
        value: function callTimeAction(time) {
            if (this.time_actions.hasOwnProperty(time)) {
                this.time_actions[time].trigger();
            }
        }

        /**
         * This function triggers the nearest TimeAction on the Timeline within the treshold
         *  of the Timeline.
         * @param  {Number} time The time value to call action within treshold for.
         */

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

        /**
         * This function is a helper to get the nearest time value within the Timeline's treshold
         * @param  {Number} time The time to look within Timeline treshold
         * @return {Number}      The value within treshold. "NOT_FOUND" if no value within treshold.
         */

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

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _display = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SliderDisplay = function (_Display) {
  _inherits(SliderDisplay, _Display);

  function SliderDisplay(args) {
    _classCallCheck(this, SliderDisplay);

    var _this = _possibleConstructorReturn(this, (SliderDisplay.__proto__ || Object.getPrototypeOf(SliderDisplay)).call(this, args));

    _this.slider = args.slider;
    _this.limit = args.range_limit;
    return _this;
  }

  _createClass(SliderDisplay, [{
    key: "tick",
    value: function tick() {
      if (this.isPrimaryDisplay()) {
        this.context.emitter.emit('tick');
        this.context.time = this.slider.val();
      }
    }
  }, {
    key: "play",
    value: function play() {
      $(this.slider).on('change', this.tick.bind(this));
      setInterval(function () {
        this.tick();
        var value = Math.floor(this.slider.val());
        this.slider.val(value + 1);
        if (this.slider.val() >= this.limit) {
          this.slider.val(1);
        }
      }.bind(this), 1000);
    }
  }]);

  return SliderDisplay;
}(_display.Display);

;

module.exports = SliderDisplay;

/***/ })
/******/ ]);