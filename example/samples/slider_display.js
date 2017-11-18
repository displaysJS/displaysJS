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
    }
  }

  play(){
    $("#" + this.slider_id).on('change', function() {
      this.tick.bind(this);
      console.log("Function Call: ");
      console.log(this);
      console.log(this.slider);
    });
    console.log("Outside Function Call: ");
    console.log(this);
    console.log(this.slider);

    $(this.slider).on('change', function() {
      this.tick.bind(this);
      console.log("Function Call: ");
      console.log(this);
      console.log(this.slider);
    });

  }
};

module.exports = SliderDisplay;
