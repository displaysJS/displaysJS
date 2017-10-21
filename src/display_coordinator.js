"use strict";

import { Timeline } from "./timeline.js";
import { EventEmitter2 } from 'eventemitter2';

/**
 * The DisplayCoordinator is reponsible for coordinating and starting a performance
 *
 * Creates a context for the performance and passes it the Display instances.
 * Sets up EventListeners for DisplayCoordinator
 *
 * @param {Object} args Initialization arguments for the DisplayCoordinator
 * @param {String} [args.name="undefined"] The of the DisplayCoordinator or the performance.
 * @param {Number} [args.duration=0] The length of the Perfomance
 * @param {Object} [args.stage={add:function(args) {}}] A stage to add Display render to if available.
 *
 * ** Note **
 * Stage is not needed unless you have a specific type of Stage you want to append your Display renders to.
 * Otherwise you can just render where you need it when the DisplayCoordinator calls render on the Display.
 *
 * @param {Array} args.displays A list of Display instances to add to performance.
 * @param {Number} args.timeline_treshold  A treshold to use for DisplayCoordinator's (performance) Timeline.
 * @param {Display} args.primary_display  The PrimaryDisplay for the performance. It controls the time flow.
 *
 *
 */
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

        // Setup event listeners for DisplayCoordinator
        this.context.emitter.on("tick", this.handleTick.bind(this));
        this.context.emitter.on("pause", this.pausePerformance.bind(this));
        this.context.emitter.on("continue", this.continuePerformance.bind(this));
        this.context.emitter.on("ready", this.checkAllReady.bind(this));
    }
    toString() {
        return '(' + this.name + ')';
    }

    /**
     * Checks if all Display instances are ready.
     * Emits 'all_ready' if All Displays are ready.
     *
     * @TODO Change checkAllReady to performWhenAllReady.
     * @body Keeps waiting until all Displays are ready and starts the performance.
     */
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

    /**
     *  Helper to check if All Displays are ready to start performance.
     *
     * @return {Boolean} true if all Displays are ready, false Otherwise
     * @TODO Change ready vs not ready logic.
     * @body Make this checkAllReady instead of allReady
     */
    allReady() {
      if (this.displays_not_ready.length == 0) {
        return true;
      } else {
        return false;
      }
    }

    /**
     * The DisplayCoordinator's tick function.
     * Handles tick and emits it to all listeners in the performance.
     * Increases time by 1 unit.
     *
     *  ** Note ** The PrimaryDisplay should be doing this, not the DisplayCoordinator
     */
    tick() {
      this.context.time +=1;
      this.context.emitter.emit('tick');
    }

    /**
     * Handler for Tick events for the DisplayCoordinator.
     * Calls Time actions on the DisplayCoordinator's timeline
     *
     * ** Note **
     * Overwrite if you think your DisplayCoordinator should have more control.
     */
    handleTick() {this.timeline.callTimeAction(this.context.time);}

    /**
     * Skips time to a given time t for the performance.
     * And emits 'tick' for all listeners
     *
     * ** Note ** The PrimaryDisplay should be doing this, not the DisplayCoordinator
     * But You may use at your own risk.
     *
     * @param  {Number} t The time to skip to.
     */
    seek(t){
      this.context.time = t;
      this.context.emitter.emit('tick');
    }

    /**
     * Starts the performance.
     * * Calls Setup on all display instances
     * * Then calls Render on them and appends them to stage if anything is returned.
     * * Checks that all Displays are ready then Starts all Displays.
     *
     * @TODO Adjust start of performance logic
     */
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

    /**
     * Continues the performance where if paused
     */
    continuePerformance() {
      for (var display in this.displays) {
        this.displays[display].play();
      }
    }

    /**
     * Pauses the performance
     */
    pausePerformance() {
      for (var display in this.displays) {
        this.displays[display].pause();
      }
    }

    /**
     * Resets all displays and stops the performance.
     */
    stopPerformance() {
      this.seek(0);
      for (var display in this.displays) {
        this.displays[display].reset();
      }
    }
};

module.exports = { DisplayCoordinator };
