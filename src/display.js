"use strict";

import { Timeline } from "./timeline.js";

// An object with modes available to a Display.
// MODES are used to track Display modes.
// Such as User Interaction Mode vs Normal Display Mode.
const MODES = {NORMAL:0, USER:1};

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

    /**
     * Set the context for the Display.
     *
     * @param {Object} context DisplayCoordinator's context
     */
    setContext(context) {
      this.context = context;
      this.context.emitter.on("tick", this.handleTick.bind(this));
      this.context.emitter.on("pause", this.handlePause.bind(this));
      this.context.emitter.on("continue", this.handleContinue.bind(this));
    }

    /**
     * Set the the Display's ready state to True.
     *
     */
    setAsReady() {
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
    ready() {return this.m_ready;}

    /**
     * Set the Display as the Primary Display for a performance.
     */
    setAsPrimaryDisplay() {
      this.is_primary_display = true;
    }

    /**
     * Check if the Display is the PrimaryDisplay for the performance
     *
     * @return {Boolean} True if PrimaryDisplay, False otherwise
     */
    isPrimaryDisplay() {
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
    tick(){
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
    enableUserMode() { this.mode = MODES.USER;}

    /**
     * This function changes the Display mode to Normal mode.
     *
     */
    releaseUserMode() {this.mode = MODES.NORMAL;}

    /**
     * Check if Display is in user mode
     * @return {Boolean} True if in user mode, False otherwise
     */
    isInUserMode(){
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
    handleTick() {
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
    handlePause() {}

    /**
     * This function handles any continue event triggered by in a performance. Ussually after a pause.
     *
     * ** Note **
     * By default it calls the Display's play function.
     *
     * * This may be overwritten to handle continue events differently for the Display implementation.
     * @TODO Implement handleContinue default action
     */
    handleContinue() {}


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
    setup() {}

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
    render() {}

    /**
     * This function pauses the Display and does not respond to Ticks
     *
     * @TODO Implement pause default Action.
     */
    pause() {}

    /**
     * This function removes the Display from a pause state and performs the action
     * from the Display's timeline at the current performance time (context.time).
     *
     * ** Note **
     * You may overwrite this function to do what you'd prefer in your Display implementation.
     * @TODO Implement play default Action.
     */
    play() {}


    /**
     * This function skips to a given time for the Display.
     *
     * @param  {Number} t The time to skip to.
     */
    seek(t){
      this.timeline.callTimeAction(t);
    }

    /**
     * This function resets the Display's timeline back to 0
     *
     * ** Note **
     * You may overwrite this function to do what you'd prefer in your Display implementation.
     * @TODO Implement reset default Action.
     */
    reset() {}
};

module.exports = { Display };
