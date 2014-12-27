game.PlayScreen = me.ScreenObject.extend({
    onResetEvent: function(map) {
        $('.mapTooltip').remove();
        me.levelDirector.loadLevel(map || "tutorial01");

        if (me.game.world.getChildByName("Player").length > 0) {
            var player = me.game.world.getChildByName("Player")[0];
            player.pos.set(me.game.world.getChildByName("spawnPoint")[0].pos.x, me.game.world.getChildByName("spawnPoint")[0].pos.y-64);
            player.body.update();
            me.game.viewport.follow(player, me.game.viewport.AXIS.BOTH);
            player.changingLevels = false;
            player.alpha = 1;
        } else {
            me.game.world.addChild(me.pool.pull("Player", me.game.world.getChildByName("spawnPoint")[0].pos.x, me.game.world.getChildByName("spawnPoint")[0].pos.y-64));
        }

        me.event.publish(me.event.VIEWPORT_ONCHANGE, [me.game.viewport.pos]);
        game.Inventory.updateInventory();
        updateUI();
        updateWeapon();
    },

    onDestroyEvent: function() {
        me.game.world.removeChild(me.game.world.getChildByName("Player")[0]);
    }
});