(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Timeline"] = factory();
	else
		root["Timeline"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })

/******/ });
});