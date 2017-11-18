"use strict";
import { Display } from "../../src/display.js";

class SliderDisplay extends Display {

  constructor(args) {
    super(args);
    this.slider = args.slider;
    this.slider_id = args.slider_id;
  }

  tick() {
    if (this.isPrimaryDisplay()) {
      this.context.emitter.emit('tick');
      this.context.time = this.slider.val();
      console.log("Tick was here");
    }
  }

  play(){
    $(this.slider).on('change', this.tick.bind(this));
  }
};

module.exports = SliderDisplay;
