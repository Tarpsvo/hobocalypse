game.PlayScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        me.levelDirector.loadLevel("area01");
        me.game.world.addChild(me.pool.pull("Player", me.game.world.getChildByName("spawnPoint")[0].pos.x, me.game.world.getChildByName("spawnPoint")[0].pos.y-64));

        me.event.publish(me.event.VIEWPORT_ONCHANGE, [me.game.viewport.pos]);
        game.Inventory.updateInventory();
        updateUI();
        updateWeapon();
    },

    onDestroyEvent: function() {
        // On close
    }
});