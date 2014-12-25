game.TitleScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        me.game.world.addChild(
            new me.Sprite(0,0, me.loader.getImage('title')),1);

            // Change to play state on press Enter or click/tap
            this.pressed = false;
            me.input.bindKey(me.input.KEY.ENTER, "enter", true);
            me.input.bindPointer(me.input.mouse.LEFT, me.input.KEY.ENTER);
            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge) {
                if (action === "enter" && !this.pressed) {
                    me.state.change(me.state.MENU);
                    this.pressed = true;
                }
            });
    },

    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
    }
});