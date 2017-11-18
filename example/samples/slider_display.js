"use strict";
import { Display } from "../../src/display.js";

class SliderDisplay extends Display {

  constructor(args) {
    super(args);
    this.slider = args.slider;
    this.limit  = args.range_limit;
  }

  tick() {
    if (this.isPrimaryDisplay()) {
      this.context.emitter.emit('tick');
      this.context.time = this.slider.val();
    }
  }

  play(){
    $(this.slider).on('change', this.tick.bind(this));
    setInterval(function() {
        this.tick();
        var value = Math.floor(this.slider.val());
        this.slider.val(value+1);
        if(this.slider.val() >= this.limit) {
            this.slider.val(1);
        }
    }.bind(this), 1000);
  }
};

module.exports = SliderDisplay;
