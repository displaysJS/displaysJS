"use strict";
const Timeline = require("./timeline.js")
const MODES = {NORMAL:0, USER:1};

class Display {
    constructor(args) {
        this.context = args.context || undefined;
        this.name = args.name || "undefined";
        this.timeline = new Timeline({name: this.name + "-timeline",
                                      treshold: args.timeline_treshold});
        this.primary_display = args.primary_display || false;
        this.mode = MODES.NORMAL;
        this.m_ready = false;
    }
    toString() {
        return '(' + this.name + ')';
    }
    setContext(context) {
      this.context = context;
      this.context.emitter.on("tick", handleTick);
    }
    ready() {this.m_ready;}
    setCoordinatorTicker(tick_func) {
      this.coordinator_ticker = tick_func;
    }
    isPrimaryDisplay() {
      if (this.primary_display) {
        return true;
      } else {
        return false;
      }
    }
    tick(){
      if (this.isPrimaryDisplay) {
        this.coordinator_ticker();
      }
    }
    enableUserMode() { return this.mode = MODES.USER;}
    releaseUserMode() {return this.mode = MODES.NORMAL;}
    isInUserMode(){
      if (this.mode == MODES.USER) {
        return true;
      }
      return false;
    }
    handleTick() {}
    render() {}
    start() {}
    pause() {}
}
module.exports = Display;
