(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

var Timeline = require("./lib/timeline.js");
var DisplayCoordinator = require("./lib/display_coordinator.js");
var Display = require("./lib/display.js");

(function () {
  var root = (typeof self === "undefined" ? "undefined" : _typeof(self)) == 'object' && self.self === self && self || (typeof global === "undefined" ? "undefined" : _typeof(global)) == 'object' && global.global === global && global || this || {};
  var isBrowser = 'navigator' in root;

  if (isBrowser) {
    window.Timeline = Timeline;
    window.DisplayCoordinator = DisplayCoordinator;
    window.Display = Display;
  }
}).call(undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lib/display.js":2,"./lib/display_coordinator.js":3,"./lib/timeline.js":4}],2:[function(require,module,exports){
"use strict";

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Timeline = require("./timeline.js");
var MODES = { NORMAL: 0, USER: 1 };

var Display = function () {
  function Display(args) {
    _classCallCheck(this, Display);

    this.context = args.context || undefined;
    this.name = args.name || "undefined";
    this.timeline = new Timeline({ name: this.name + "-timeline",
      treshold: args.timeline_treshold });
    this.primary_display = args.primary_display || false;
    this.mode = MODES.NORMAL;
    this.m_ready = false;
    if (this.context != undefined) {
      this.context.emitter.on("tick", handleTick);
    }
  }

  _createClass(Display, [{
    key: "toString",
    value: function toString() {
      return '(' + this.name + ')';
    }
  }, {
    key: "ready",
    value: function ready() {
      this.m_ready;
    }
  }, {
    key: "setCoordinatorTicker",
    value: function setCoordinatorTicker(tick_func) {
      this.coordinator_ticker = tick_func;
    }
  }, {
    key: "isPrimaryDisplay",
    value: function isPrimaryDisplay() {
      if (this.primary_display) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "tick",
    value: function tick() {
      if (this.isPrimaryDisplay) {
        this.coordinator_ticker();
      }
    }
  }, {
    key: "enableUserMode",
    value: function enableUserMode() {
      return this.mode = MODES.USER;
    }
  }, {
    key: "releaseUserMode",
    value: function releaseUserMode() {
      return this.mode = MODES.NORMAL;
    }
  }, {
    key: "isInUserMode",
    value: function isInUserMode() {
      if (this.mode == MODES.USER) {
        return true;
      }
      return false;
    }
  }, {
    key: "handleTick",
    value: function handleTick() {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "pause",
    value: function pause() {}
  }]);

  return Display;
}();

module.exports = Display;

},{"./timeline.js":4}],3:[function(require,module,exports){
"use strict";

var hello = function hello() {
  console.log("Hello world");
};
module.exports = hello;

},{}],4:[function(require,module,exports){
"use strict";

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var NOT_FOUND = "NOTFOUND";

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
      this.action.apply(this, this.args);
    }
  }]);

  return TimeAction;
}();

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
          return time + 1;
        } else if (this.time_actions.hasOwnProperty(time - i)) {
          return time - 1;
        }
      }
      return NOT_FOUND;
    }
  }]);

  return Timeline;
}();

module.exports = Timeline;

},{}]},{},[1])

//# sourceMappingURL=maps/displays.js.map
