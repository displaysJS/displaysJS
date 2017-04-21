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

var hello = function hello() {
  console.log("Hello world");
};
module.exports = hello;

},{}],3:[function(require,module,exports){
"use strict";

var hello = function hello() {
  console.log("Hello world");
};
module.exports = hello;

},{}],4:[function(require,module,exports){
"use strict";

var hello = function hello() {
  console.log("Hello world");
};
module.exports = hello;

},{}]},{},[1])

//# sourceMappingURL=maps/displays.js.map
