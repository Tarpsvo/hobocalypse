game.LevelChange = me.LevelEntity.extend({
    init: function (x, y, area, areaPos) {
        // Settings
        settings = {};
        settings.width = settings.height = 64;
        this.to = settings.to = area;
        this.areaPos = areaPos;
        this.fade = settings.fade = "#FFFFFF";
        this.duration = settings.duration = 400;

        // Save player stats
        this.player = me.game.world.getChildByName("player")[0];
        this.oldGun = this.player.currentWeapon;

        this._super(me.LevelEntity, "init", [x, y, settings]);
        this.body.collisionType = me.collision.types.ACTION_OBJECT;
    },


    onFadeComplete: function() {
        // Load the level and fade out
        me.levelDirector.loadLevel(this.to);
        me.event.publish(me.event.VIEWPORT_ONCHANGE, [me.game.viewport.pos]);
        me.game.viewport.fadeOut(this.fade, this.duration);
        me.game.viewport.follow(this.player, me.game.viewport.AXIS.BOTH);

        // Remove popups that stayed from the previous level
        $(".levelPopup").remove();

        // Change the weapon to the same the player was using
        this.player.currentWeapon = this.oldGun;
        this.player.changingLevels = false;

        // Update user interface contents
        updateUI();
        updateWeapon();


        var match = false;
        var target = me.game.world.getChildByName(this.areaPos+"_")[0];
        if (target) {
            this.player.pos.set(target.pos.x, target.pos.y);
            match = true;
        }

        if (!match) {
            var defaultPos = me.game.world.getChildByName("defaultPos")[0];
            this.player.pos.set(defaultPos.pos.x, defaultPos.pos.y);
            this.player.body.update();
        }
    },

    onCollision : function () {
        return false;
    }
});