game.TitleScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        me.game.world.addChild(
            new me.Sprite(0,0, me.loader.getImage('title')), 1);

            // Disabled spamming
            this.pressed = false;

            // Change to play state on press Enter or click/tap
            me.input.bindKey(me.input.KEY.ENTER, "enter", true);
            me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
                if (action === "enter" && !this.pressed) {
                    me.state.change(me.state.PLAY+1);
                    this.pressed = true;
                }
            });
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindPointer(me.input.mouse.LEFT);
        //me.event.unsubscribe(this.handler);
    }
});