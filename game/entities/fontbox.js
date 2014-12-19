game.TextBox = me.Renderable.extend({
   init: function(type, text, x, y) {
      this._super(me.Renderable, 'init', [x, y, 50, 30]);

      // The types define the font size and color
      switch(type) {
         case "damage":
            this.font = new me.Font('Roboto', 16, '#FF0000');
            this.font.fillStyle = "rgba(255,0,0,1)";
         break;

         case "exp":
            this.font = new me.Font('Roboto', 14, '#FF0000');
            this.font.fillStyle = "rgba(255,255,90,1)";
            text = "+"+text+" exp";
         break;

         case "levelup":
            this.font = new me.Font('Roboto', 16, '#FF0000');
            this.font.fillStyle = "rgba(255,255,140,1)";
         break;
      }

      // Adjust the text position, so it appears to be directly above the sprite
      this.x = x+15;
      this.y = y-25;

      this.endy = this.y-50; // How high the text flies before disappearing

      // Create a canvas and draw text onto it
      this.canvas = me.video.createCanvas(100, 70);
      this.drawCanvas(text);
   },

   update: function(dt) {
      // Animates the text to move upwards, if it reaches endy, the object is removed
      if (this.y > this.endy) {
         this.y -= 1;
         return true;
      } else if (this.y <= this.endy) {
         me.game.world.removeChild(this);
         return false;
      }
   },

   draw: function(renderer) {
      // Draw the image onto the screen
      renderer.drawImage(this.canvas, this.x, this.y);
   },

   drawCanvas: function(text) {
      // Draw a text onto the created canvas (make an image with the text)
      var context = me.CanvasRenderer.getContext2d(this.canvas);
      this.font.draw(context, text, 0, 0);
   }
});


// Draw it to an image with me.Font, and attach the image to the entity.
// Create an image (canvas) : http://melonjs.github.io/docs/me.video.html#createCanvas
// Get the context, so you can draw to it: http://melonjs.github.io/docs/me.CanvasRenderer.html#getContext2d
// Then draw the image (canvas) to the renderer: http://melonjs.github.io/docs/me.CanvasRenderer.html#drawImage
// The first two steps need be done in the entity init. The me.Font.draw step should be infrequently, like only when the HP/XP changes.
// And the third is just done in the Entity draw method, as you might imagine.

// what i would do is to create a new renderable object
// that contains a small canvas
// and a function that allow to set the value to be displayed
// when that function is called it just clear the mini canvas and redraw the font inside that mini canvas
// the "damage" renderable draw function then draw that mini-canvas on the renderer
// then (bare with me)
// every entity define an instance of that damage renderable
// and the draw function will 1st call the entity draw function, and the damage renderable
// and that's it