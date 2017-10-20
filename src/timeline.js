"use strict";

const NOT_FOUND = "NOTFOUND";

/**
 * TimeAction is the class representing a time Action that can occur in a Timeline.
 *
 * @param {function} func Reference to a function to call on trigger
 * @param {Object} args A list of arguments to pass to the func on trigger.
 * @param {String} name (** optional **) A name for the TimeAction
 */
class TimeAction {
    constructor(func, args, name="undefined") {
        this.action = func;
        this.args = args;
        this.name = name;
    }
    toString() {
        return 'TimeAction:(' + this.name + ')';
    }

    /**
     * Trigger an action by calling *func* and passing it *args* passed from initialization.
     */
    trigger(){
      console.log(this, this.args);
      this.action.apply(this, this.args);
    }
};

/**
 * Timeline with many actions
 *
 * @param {Object} args Object containing Timeline args.
 * @param {String} [args.name="undefined"] The name of the Timeline.
 * @param {Number} [args.treshold=5] The treshold for calling TimeActions
 */
class Timeline {
    constructor(args) {
        this.time_actions = {};
        this.name = args.name || "undefined";
        this.treshold = args.treshold || 5;
    }
    toString() {
        return '(' + this.name + ')';
    }

    /**
     * Add a time action to the timeline.
     * @param {Number} time               The time value at which to perform the action
     * @param {function} action           The function to call when trigger
     * @param {Array}  [args=[]]          The args to pass to function on trigger
     * @param {String} [name="undefined"] The name of the TimeAction
     */
    addTimeAction(time, action, args=[], name="undefined"){
      if( !(Object.prototype.toString.call( args ) === '[object Array]') ) {
          args = [args];
      }
      this.time_actions[time] = new TimeAction(action, args, name);
    }

    /**
     * This function triggers the TimeAction on the Timeline at the given time if there is one.
     * @param  {Number} time The time value at which the action is at.
     */
    callTimeAction(time){
      if (this.time_actions.hasOwnProperty(time)) {
        this.time_actions[time].trigger()
      }
    }

    /**
     * This function triggers the nearest TimeAction on the Timeline within the treshold
     *  of the Timeline.
     * @param  {Number} time The time value to call action within treshold for.
     */
    callNearestTimeAction(time){
      var t;
      if (this.time_actions.hasOwnProperty(time)) {
        t = time;
      } else {
       t = this.getNearestTime(time);
      }

      if (!(t==NOT_FOUND) && this.time_actions.hasOwnProperty(t)) {
        this.time_actions[t].trigger()
      }
    }

    /**
     * This function is a helper to get the nearest time value within the Timeline's treshold
     * @param  {Number} time The time to look within Timeline treshold
     * @return {Number}      The value within treshold. "NOT_FOUND" if no value within treshold.
     */
    getNearestTime(time){
      for (var i = 1; i < this.treshold; i++) {
        if (this.time_actions.hasOwnProperty(time+i)) {
          return time+i;
        }else if (this.time_actions.hasOwnProperty(time-i)) {
          return time-i;
        }
      }
      return NOT_FOUND;
    }
};

module.exports = { Timeline, TimeAction };
