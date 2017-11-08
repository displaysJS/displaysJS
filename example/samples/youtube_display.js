"use strict";
import { Display } from "../../src/display.js";

class YoutubeDisplay extends Display {

  constructor(args) {
    super(args);

    this.player = document.createElement("div");
    this.player_id = args.player_id;

    this.script_tag =  document.createElement('script');
    this.script_tag.src = "https://www.youtube.com/iframe_api";

    this.t_ratio = args.t_ratio || 1000;
    this.video_id = args.video_id;
  }

  stopVideo(){
    //What is the "Stoping" for
    this.player.stopVideo();
    clearInterval(this.counter);
  }

  handleTick(){
    var th = this.timeline.treshold;
    var t = this.context.time;
    this.timeline.callTimeAction(this.context.time);
  }

  //Controll the size yourself you bums
  setupPlayer(){
    this.player = new YT.Player(this.player_id, {
      height: '390',
      width: '640',
      videoId: this.video_id,
      events: {
        'onReady': this.setAsReady.bind(this)
      }
    });
  }

  tick() {
    if (this.isPrimaryDisplay()) {
      this.context.emitter.emit('tick');
      //Replaced tick with the youtube based time
      this.context.time = Math.round(this.player.getCurrentTime());
      console.log(this.context.time);
    }
  }

  setup(){
    this.firstScriptTag = document.getElementsByTagName('script')[0];
    this.firstScriptTag.parentNode.insertBefore(this.script_tag, this.firstScriptTag);
    window.onYouTubeIframeAPIReady = this.setupPlayer.bind(this);
  }

  render(){
    console.log("Please Render...Ok Rendering");
  }

  play(){
    this.player.playVideo();
    this.counter = setInterval(this.tick.bind(this), this.t_ratio);
  }
};

module.exports = YoutubeDisplay;
