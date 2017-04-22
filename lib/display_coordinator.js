"use strict";
const Timeline = require("./timeline.js");
const EventEmitter2 = require('eventemitter2').EventEmitter2;

class DisplayCoordinator {
    constructor(args) {
        this.context = {
            time: 0,
            emitter: new EventEmitter2({
              maxListeners: 14 // might need to think this through more.
            }),
            stage = args.stage || "undefined"
          };
        this.name = args.name || "undefined";
        this.timeline = new Timeline({name: this.name + "-timeline",
                                      treshold: args.timeline_treshold});
        this.displays = args.displays;
        this.primary_display = args.primary_display;

        /** Handle case where a display is not in sync or
        needs all other displays to pause.**/
        this.context.emitter.on("pause", this.pause);
    }
    toString() {
        return '(' + this.name + ')';
    }
    tick() {
      this.context.time +=1;
      this.context.emitter.emit('tick');
    }
    seek(t){
      this.context.time = t;
      this.context.emitter.emit('tick');
    }
    perform() {
      this.primary_display.setCoordinatorTicker(this.tick);
      for (var display in this.displays) {
        display.setContext(this.context);
        display.start();
      }
    }
    pause() {
      for (var display in this.displays) {
        display.pause();
      }
    }
    stop() {
      this.seek(0);
      this.pause();
    }

}
module.exports = DisplayCoordinator;
