game.EnemySpawner = me.Rect.extend({
    init: function(x, y, settings) {
        this.x = x;
        this.y = y;
        this.spawn();
    },

    spawn: function(x, y) {
        this.enemy = me.pool.pull("enemy", this.x, this.y);
        me.game.world.addChild(this.enemy);
    },

    update: function() {
        if (!this.enemy.alive && me.timer.getTime()-this.enemy.deathTime > 30000) {
            this.spawn();
        }
        return false;
    }
});