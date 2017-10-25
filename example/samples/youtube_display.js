"use strict";
import { Display } from "../../src/display.js";


class YoutubeDisplay extends Display {

  constructor(args) {
    super(args);
    this.player = document.createElement("div");
    this.player_id = args.player_id;
    this.script_tag =  document.createElement('script');
    this.script_tag.src = "https://www.youtube.com/iframe_api";
  }


};


module.exports = YoutubeDisplay;
