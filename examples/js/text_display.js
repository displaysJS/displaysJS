function TextDisplay(args) {
  Display.call(this, args);
  this.text_canvas = document.createElement('div');
}

TextDisplay.prototype = Object.create(Display.prototype);

TextDisplay.prototype.name = "TextDisplay";

TextDisplay.prototype.showRichText = function(text){
  this.text_canvas.innerHTML = text;
}

TextDisplay.prototype.showText = function(text){
  this.text_canvas.innerText = text;
}

TextDisplay.prototype.clearText = function(){
  this.text_canvas.innerHTML = "";
}

TextDisplay.prototype.setProperties = function(args) {
  this.text_canvas.setAttribute('id', args.canvas_id);
  this.text_canvas.setAttribute('class', args.canvas_class);
}

TextDisplay.prototype.handleTick = function(){
  //normaly time would be available through the context.
  this.timeline.callTimeAction(this.context.time);
}

TextDisplay.prototype.prepareTimeline = function() {}

TextDisplay.prototype.setup = function(){
  this.prepareTimeline();
}

TextDisplay.prototype.render = function(){
    return this.text_canvas;
}

TextDisplay.prototype.play = function(){}
