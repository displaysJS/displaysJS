"use strict";
const Timeline = require("./timeline.js")
const MODES = {NORMAL:0, USER:1};

class Display {
    constructor(args) {
        this.context = args.context || undefined;
        this.name = args.name || "undefined";
        this.timeline = new Timeline({name: this.name + "-timeline",
                                      treshold: args.timeline_treshold});
        this.is_primary_display = false;
        this.mode = MODES.NORMAL;
        this.m_ready = false;
    }
    toString() {
        return '(' + this.name + ')';
    }
    setContext(context) {
      this.context = context;
      this.context.emitter.on("tick", this.handleTick.bind(this));
      this.context.emitter.on("pause", this.handlePause.bind(this));
      this.context.emitter.on("continue", this.handleContinue.bind(this));
    }
    setAsReady() {
      this.m_ready = true;
      if (this.context != undefined) {
        this.context.emitter.emit("ready");
        //console.log(this.m_ready);
      }
    }
    ready() {return this.m_ready;}
    setAsPrimaryDisplay() {
      this.is_primary_display = true;
    }
    isPrimaryDisplay() {
      if (this.is_primary_display) {
        return true;
      } else {
        return false;
      }
    }
    tick(){
      if (this.isPrimaryDisplay()) {
        this.context.emitter.emit('tick');
        this.context.time += 1;
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
    handleTick() {
      this.timeline.callTimeAction(this.context.time);
    }
    handlePause() {}
    handleContinue() {}
    setup() {}
    render() {}
    play() {}
    pause() {}
    reset() {}
}
module.exports = Display;
