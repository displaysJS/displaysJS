"use strict";
import { Timeline } from "./timeline.js";

/**
* MODES is different modes a display may have
* Normal is the default Display mode
* User is a state where user is interacting with the Display instance
*       Note: Implementation depends on Display
**/
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
    /**
    * This function set's the Display instance as being ready.
    **/
    setAsReady() {
      this.m_ready = true;
      if (this.context != undefined) {
        this.context.emitter.emit("ready");
      }
    }
    /**
    * This is just a getter to check if the dislay ready.
    **/
    ready() {return this.m_ready;}
    /**
    * This set's the display as being the primary display.
    **/
    setAsPrimaryDisplay() {
      this.is_primary_display = true;
    }
    /**
    * This is a getter to check if a display is the primary display
    **/
    isPrimaryDisplay() {
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
    tick(){
      if (this.isPrimaryDisplay()) {
        this.context.emitter.emit('tick');
        this.context.time += 1;
      }
    }
    /**
    * Seek skips to a given time.
    * @t :  Time to skip to
    **/
    seek(t){
      this.timeline.callTimeAction(t);
    }
    /**
    ** Helper to enable user mode
    * Only use this if UserMode is needed
    *
    **/
    enableUserMode() { return this.mode = MODES.USER;}
    /**
    ** Helper to disable user mode
    * Only use this if UserMode is used
    *
    **/
    releaseUserMode() {return this.mode = MODES.NORMAL;}
    /**
    * Getter to check if in UserMode
    **/
    isInUserMode(){
      if (this.mode == MODES.USER) {
        return true;
      }
      return false;
    }
    /**
    * Listener for tick actions
    * Handles call to Timeline for current tick.
    **/
    handleTick() {
      this.timeline.callTimeAction(this.context.time);
    }
    /**
    * Listener for pause action
    * Handles call to Timeline for current tick.
    **/
    handlePause() {}
    handleContinue() {}
    setup() {}
    render() {}
    play() {}
    pause() {}
    reset() {}
};

module.exports = { Display };
