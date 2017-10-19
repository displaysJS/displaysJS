"use strict";
import { Display } from "../../src/display.js";

/**
 * Class representing a TextDisplay.
 * @extends Display
 */
class TextDisplay extends Display {
    /**
     * Create a TextDisplay.
     */
    constructor(args) {
      super(args);
      this.text_canvas = document.createElement('div');
    }

    /**
     * Show Rich Text.
     * Adds html text to the text_canvas
     */
    showRichText(text) {
        this.text_canvas.innerHTML = text;
    }

    /**
     * Show Regular Text.
     * Adds text to the text_canvas
     */
    showText(text) {
      this.text_canvas.innerText = text;
    }
    /**
     * Clear the text canvas.
     */
    clearText() {
      this.text_canvas.innerText = "";
    }
    /**
     * Clear the text canvas.
     */
    setProperties(args) {
      this.text_canvas.setAttribute('id', args.canvas_id);
      this.text_canvas.setAttribute('class', args.canvas_class);
    }
    /**
     * Handle Time Ticks.
     */
    handleTick() {
      this.timeline.callTimeAction(this.context.time);
    }
    /**
     * prepareTimeline is placeholder for how a TextDisplay  instance loads
     * time actions to it's timeline.
     */
    prepareTimeline() {}

    /**
     * Setup is called by the display coordinator
     * On Setup we call prepareTimeline.
     */
    setup() { this.prepareTimeline(); }

    /**
     * Suppose to draw the canvas onto the stage
     * It returns the canvas instance to the drawn unto the stage by
     * the displayCoordinator
     */
    render() { return this.text_canvas; }
};

module.exports = TextDisplay;
