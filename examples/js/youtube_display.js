function YoutubeDisplay(args) {
  Display.call(this, args);
  this.text_canvas = document.createElement('div');
}

YoutubeDisplay.prototype = Object.create(Display.prototype);

YoutubeDisplay.prototype.name = "YoutubeDisplay";

YoutubeDisplay.prototype.showRichText = function(text){
  this.text_canvas.innerHTML = text;
}

YoutubeDisplay.prototype.showText = function(text){
  this.text_canvas.innerText = text;
}

YoutubeDisplay.prototype.clearText = function(){
  this.text_canvas.innerHTML = "";
}

YoutubeDisplay.prototype.setProperties = function(args) {
  this.text_canvas.setAttribute('id', args.canvas_id);
  this.text_canvas.setAttribute('class', args.canvas_class);
}

YoutubeDisplay.prototype.handleTick = function(){
  //normaly time would be available through the context.
  this.timeline.callTimeAction(this.context.time);
  if (this.isPrimaryDisplay()) {
    this.tick();
  }
}

YoutubeDisplay.prototype.prepareTimeline = function() {}

YoutubeDisplay.prototype.start = function(){}

YoutubeDisplay.prototype.render = function(){
  this.prepareTimeline();
  return this.text_canvas;
}
