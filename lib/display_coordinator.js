// TODO: We need to create a fucnction thats the clears the stage or reset
// TODO: Find how to undo stuff with javascript time wise
// Notes - Rewind, Reset, Skip, Replaying
// Replaying is doable but reweind and skip need research

"use strict";
const Timeline = require("./timeline.js");
const EventEmitter2 = require('eventemitter2').EventEmitter2;

class DisplayCoordinator {
    constructor(args) {
        this.context = {
            time: 0,
            duration: args.duration || 0,
            emitter: new EventEmitter2({
              maxListeners: 14 // might need to think this through more.
            })
          };
        this.stage = args.stage || { add: function(args) {} };
        this.name = args.name || "undefined";
        this.timeline = new Timeline({name: this.name + "-timeline",
                                      treshold: args.timeline_treshold});
        this.displays = args.displays;
        this.displays_not_ready = [];

        if (args.primary_display != undefined) {
          args.primary_display.setAsPrimaryDisplay();
        }

        for (var display in this.displays) {
          this.displays[display].setContext(this.context);
          if (!this.displays[display].ready()) {
            this.displays_not_ready.push(this.displays[display]);
          }
        }

        /** Handle case where a display is not in sync or
        needs all other displays to pause.**/
        this.context.emitter.on("tick", this.handleTick.bind(this));
        this.context.emitter.on("pause", this.pausePerformance.bind(this));
        this.context.emitter.on("continue", this.continuePerformance.bind(this));
        this.context.emitter.on("ready", this.checkAllReady.bind(this));
    }
    toString() {
        return '(' + this.name + ')';
    }
    checkAllReady() {
      for (var display in this.displays_not_ready) {
        if (this.displays_not_ready[display].ready()) {
          this.displays_not_ready.splice(display, 1);
        }
      }
      if (this.displays_not_ready.length == 0) {
        this.context.emitter.emit("all_ready");
      }
    }
    allReady() {
      if (this.displays_not_ready.length == 0) {
        return true;
      } else {
        return false;
      }
    }
    tick() {
      this.context.time +=1;
      this.context.emitter.emit('tick');
    }
    handleTick() {this.timeline.callTimeAction(this.context.time);}
    seek(t){
      this.context.time = t;
      this.context.emitter.emit('tick');
    }
    perform() {
      for (var display in this.displays) {
        this.displays[display].setup();
      }

      function startup() {
        for (var display in this.displays) {
          var rendering = this.displays[display].render();
          if (rendering != undefined) {
            this.stage.add(rendering);
          }
          this.displays[display].play();
        }
      }

      if (this.allReady()) {
        startup.bind(this)();
      } else {
        this.context.emitter.on("all_ready", startup.bind(this));
      }
    }
    continuePerformance() {
      for (var display in this.displays) {
        this.displays[display].play();
      }
    }
    pausePerformance() {
      for (var display in this.displays) {
        this.displays[display].pause();
      }
    }
    stopPerformance() {
      this.seek(0);
      for (var display in this.displays) {
        this.displays[display].reset();
      }
    }

}
module.exports = DisplayCoordinator;
