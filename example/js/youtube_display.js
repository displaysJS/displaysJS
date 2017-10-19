var Display = Displays.Display;

function YoutubeDisplay(args) {
  Display.call(this, args);
  this.script_tag =  document.createElement('script');
  this.script_tag.src = "https://www.youtube.com/iframe_api";
  this.player = document.createElement('div');
  this.player_id = args.player_id;
  this.t_ratio = args.t_ratio || 1000;
  this.video_id = args.video_id;

  this.stopVideo = function () {
    "Stoping"
    this.player.stopVideo();
    clearInterval(this.counter);
  }
}

YoutubeDisplay.prototype = Object.create(Display.prototype);

YoutubeDisplay.prototype.name = "YoutubeDisplay";

YoutubeDisplay.prototype.prepareTimeline = function() {}
YoutubeDisplay.prototype.handleTick = function () {
  this.timeline.callTimeAction(this.context.time);
  var th = this.timeline.treshold;
  var t = this.context.time;

}

YoutubeDisplay.prototype.setupPlayer = function(){
  this.player = new YT.Player(this.player_id, {
    height: '390',
    width: '640',
    videoId: this.video_id,
    events: {
      'onReady': this.setAsReady.bind(this)
    }
  });
}

YoutubeDisplay.prototype.setup = function(){
  this.prepareTimeline();
  this.firstScriptTag = document.getElementsByTagName('script')[0];
  this.firstScriptTag.parentNode.insertBefore(this.script_tag, this.firstScriptTag);
  window.onYouTubeIframeAPIReady = this.setupPlayer.bind(this);
}

YoutubeDisplay.prototype.render = function(){
  console.log("Rendered");
}

YoutubeDisplay.prototype.play = function() {
  console.log("called to play");
  this.player.playVideo();
  //Uses seconds as counter (every 1000 ms) for tick
  /*function tickit(){
    //console.log("ticked");
    this.tick();
  }*/
  this.counter = setInterval(this.tick.bind(this), this.t_ratio);
}
