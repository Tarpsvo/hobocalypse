game.Bullet = me.Entity.extend({
    init: function(x, y, dLeft, weapon) {
        // Create the settings array
        var settings = {};
        settings.image = "bulletImage";
        settings.width = settings.spritewidth = 7;
        settings.height = settings.spriteheight = 3;

        // Set start position to match the character sprite
        if (dLeft) {
            y += 35;
        } else {
            x += 60;
            y += 35;
        }

        // Helpful variables
        this.dLeft = dLeft;

        // Weapon details
        distance = weapon.distance;
        speed = weapon.speed;
        // Damage has a factor of +- 30%
        this.damage = Math.round(weapon.damage*((Math.floor(Math.random() * 60) + 70)/100));

        // MelonJS required info
        this._super(me.Entity, 'init', [x, y, settings]);
        this.body.gravity = 0; // No shell drop
        this.body.setVelocity(speed, 0);
        this.body.collisionType = me.collision.types.PROJECTILE_OBJECT;
        this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));

        // If moving left, subtract, else add the fly distance
        this.endX   = (dLeft) ? this.pos.x - distance : this.pos.x + distance;
        this.updateBounds();

    },

    update: function(dt) {
        if (this.dLeft) {
            this.renderable.flipX(false);
          this.body.vel.x -= this.body.accel.x * me.timer.tick;
        } else {
            this.renderable.flipX(true);
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }

        // Remove entity if past max range
        if (!this.dLeft && this.pos.x > this.endX) {
            me.game.world.removeChild(this);
        } else if (this.dLeft && this.pos.x < this.endX) {
            me.game.world.removeChild(this);
        }

        this.body.update(dt);
        me.collision.check(this);

        // Return true if we moved or if the renderable was updated
        if (this.body.vel.x !== 0) {
          this._super(me.Entity, 'update', [dt]);
          return true;
        }
        else {
          return false;
        }
    },

    onCollision: function(response) {
        if (response.a.body.collisionType !== me.collision.types.PLAYER_OBJECT) {
            if (response.a.body.collisionType === me.collision.types.ENEMY_OBJECT) {
                me.game.world.removeChild(response.b);
                response.a.gotHit(this.damage);
                return true;
            }
        }
        return false;
    }
});