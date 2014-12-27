// Enemy entity
// TODO Go over the code and fix unnecessary details
game.EnemyEntity = me.Entity.extend({
    init: function(x, y, settings) {
        settings = {};
        settings.name = "Enemy";
        settings.image = "zombie1";
        settings.spritewidth = settings.width = 54;
        settings.spriteheight = settings.height = 72;

        // Call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        this.z = 10; // High enough for enemies to be rendered last (layers +1 for example)
        this.shot = false;

        // Add animations
        this.renderable.addAnimation("walk",  [0, 1, 2, 3], 200);
        this.renderable.addAnimation("stand",  [5, 6, 7, 8, 9], 200);
        
        this.alive = true;
        this.health = 100;
        this.walkLeft = false;
        this.alwaysUpdate = true;
        this.body.setVelocity(1, 0);
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));
    },

    // Manage enemy movements
    update: function(dt) {
        if (!this.player) {this.player = me.game.world.getChildByName("player")[0];}
        if (this.alive) {
            if (Math.abs(this.pos.x - this.player.pos.x) < 200 || this.shot) {
                if (this.player.pos.x > this.pos.x) {
                    this.walkLeft = false;
                    this.renderable.flipX(true);
                    if (!this.renderable.isCurrentAnimation("walk")) {
                    this.renderable.setCurrentAnimation("walk");
                    }
                } else if (this.player.pos.x < this.pos.x) {
                    this.walkLeft = true;
                    this.renderable.flipX(false);
                    if (!this.renderable.isCurrentAnimation("walk")) {
                        this.renderable.setCurrentAnimation("walk");
                    }
                }
                this.body.vel.x += (this.walkLeft) ? -this.body.accel.x * me.timer.tick : this.body.accel.x * me.timer.tick;
            } else {
            if (!this.renderable.isCurrentAnimation("stand")) {
                this.renderable.setCurrentAnimation("stand");
            }
            this.body.vel.x = 0;
            }
        }

        this.body.update(dt);
        me.collision.check(this);

        // Return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0);
    },

    onCollision : function (response, other) {
        if (response.b.body.collisionType !== me.collision.types.WORLD_SHAPE) {
            if (this.alive && (response.overlapV.y > 0) && response.a.body.falling) {
                this.renderable.flicker(750);
            }
            return false;
        } else if (other.type) return false;
        return true; // All other objects are solid
    },

    gotHit: function(damage) {
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        this.health -= damage;
        this.renderable.flicker(250);
        this.shot = true;

        var damText = me.pool.pull("texts", "damage", damage, this.pos.x, this.pos.y);
        me.game.world.addChild(damText);

        if (this.health <= 0) {
            var exp = 15;
            addExp(exp);
            this.alive = false;
            this.deathTime = me.timer.getTime();
            me.game.world.removeChild(this);
        }
    }
});