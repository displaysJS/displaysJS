"use strict";

const Timeline = require("./lib/timeline.js");
const DisplayCoordinator = require("./lib/display_coordinator.js");
const Display = require("./lib/display.js");

(function() {
  var root = typeof self == 'object' && self.self === self && self ||
            typeof global == 'object' && global.global === global && global ||
            this ||
            {};
  var isBrowser = ('navigator' in root);

  if (isBrowser) {
    window.Timeline = Timeline;
    window.DisplayCoordinator = DisplayCoordinator;
    window.Display = Display;
  }
}).call(this);
