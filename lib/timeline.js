"use strict";
const NOT_FOUND = "NOTFOUND";

class TimeAction {
    constructor(func, args, name="undefined") {
        this.action = func;
        this.args = args;
        this.name = name;
    }
    toString() {
        return 'TimeAction:(' + this.name + ')';
    }
    //TODO - no log
    trigger(){
      //console.log(this, this.args);
      this.action.apply(this, this.args);
    }
}

class Timeline {
    constructor(args) {
        this.time_actions = {};
        this.name = args.name || "undefined";
        this.treshold = args.treshold || 5;
    }
    toString() {
        return '(' + this.name + ')';
    }
    addTimeAction(time, action, args=[], name="undefined"){
      if( !(Object.prototype.toString.call( args ) === '[object Array]') ) {
          args = [args];
      }
      this.time_actions[time] = new TimeAction(action, args, name);
    }
    callTimeAction(time){
      if (this.time_actions.hasOwnProperty(time)) {
        this.time_actions[time].trigger()
      }
    }
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
}
module.exports = {Timeline, TimeAction};
