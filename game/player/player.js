game.Player = me.Entity.extend({
    init: function(x, y, settings) {
        settings = {};
        settings.image = "character1";
        settings.spriteheight = settings.height = 67;
        settings.spritewidth = settings.width = 48;
        settings.name = this.name = "Player";

        this._super(me.Entity, 'init', [x, y, settings]);

        // MelonJS configuration
        this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));
        this.body.setVelocity(7, 10);
        me.game.viewport.follow(this, me.game.viewport.AXIS.BOTH);
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
        this.alwaysUpdate = true;
        this.isPersistent = true;

        // Animations
        this.renderable.addAnimation("walk",  [0, 1, 2, 3], 200);
        this.renderable.addAnimation("stand",  [5, 6, 7, 8, 9], 200);
        this.renderable.addAnimation("shoot",  [2, 2], 100);
        this.renderable.setCurrentAnimation("stand");

        // Helpful variables to make stuff function
        this.dLeft = true;                  // If the player is facing left
        this.time = me.timer.getTime();     // Initialize timer that is used for shooting cooldown
        this.changingLevels = false;        // Stops level change spamming

        // Weapon info
        this.primary = undefined;
        this.secondary = undefined;
        this.currentWeapon = undefined;
    },

    update: function(dt) {
        // Movement actions
        if (me.input.isKeyPressed('left')) {
            this.renderable.flipX(false);
            this.dLeft = true;
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("walk") && !this.shooting) this.renderable.setCurrentAnimation("walk");
            this.insidePopupArea = false;
        } else if (me.input.isKeyPressed('right')) {
            this.renderable.flipX(true);
            this.dLeft = false;
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            if (!this.renderable.isCurrentAnimation("walk") && !this.shooting) this.renderable.setCurrentAnimation("walk");
            this.insidePopupArea = false;
        } else {
            this.body.vel.x = 0;
            if (!this.renderable.isCurrentAnimation("stand") && !this.shooting) this.renderable.setCurrentAnimation("stand");
        }

        if (me.input.isKeyPressed('jump')) {
            if (!this.body.jumping && !this.body.falling)  {
                // Set current velocity to the maximum defined value. Gravity will do the rest.
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }
        }

        if (me.input.isKeyPressed('shoot')) {
            this.cooldown = 60000/this.currentWeapon.rof;
            if (me.timer.getTime() - this.time > this.cooldown) {
                this.shoot();
                this.time = me.timer.getTime();
                this.shooting = true;
                if (!this.renderable.isCurrentAnimation("shoot")) {
                  this.renderable.setCurrentAnimation("shoot", (function(){this.shooting = false;}).bind(this));
               }
            }
        }

        if (me.input.isKeyPressed('nextweapon')) {
            if (this.currentWeapon == this.primary && this.secondary) {this.currentWeapon = this.secondary;}
            else if (this.currentWeapon == this.secondary && this.primary) {this.currentWeapon = this.primary;}
            updateWeapon();
        }

        this.body.update(dt);
        me.collision.check(this);

        if(!this.insidePopupArea && this.popup) {
            this.popup.destroy();
            delete this.popup;
        }

        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    // Fire key pressed
    shoot: function() {
        bullet = me.pool.pull("bullet", this.pos.x, this.pos.y, this.dLeft, this.currentWeapon);
        me.game.world.addChild(bullet, this.z);
    },

    onCollision: function (response, other) {
        switch (response.b.body.collisionType) {
            case me.collision.types.WORLD_SHAPE:
                var pos;

                if (other.type === "travel") {
                    this.insidePopupArea = true;
                    this.createPopup(response.b, "travel");

                    if (!this.changingLevels && me.input.isKeyPressed('action')) {
                        this.changingLevels = true;

                        if (response.b.name === 'end') {
                            me.state.change(me.state.MENU);
                        } else {
                            var target = this.locationDetails(response.b);
                            levelSpot = me.pool.pull("LevelChange", response.b.pos.x, response.b.pos.y, target.target, target.targetPos);
                            levelSpot.goTo();
                        }
                    }

                    return false;
                } else if (other.type === "house") {
                    this.insidePopupArea = true;
                    this.createPopup(response.b, "house");

                    return false;
                }
            break;

            case me.collision.types.ENEMY_OBJECT:
                if ((response.overlapV.y>0) && !this.body.jumping) {
                    // bounce (force jump)
                    this.body.falling = false;
                    this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                    // set the jumping flag
                    this.body.jumping = true;
                }
                else {
                    this.renderable.flicker(250);
                }
                return false;
            break;

            default:
                return false;
        }

        return true;
    },

    createPopup: function(entity, type) {
        if (!this.popup) {
            switch(type) {
                case "travel":
                    var text = (entity.name === 'end') ? 'Leave map' : "Move to "+entity.name.split("_")[1];
                    pos = me.game.viewport.worldToLocal(entity.pos.x+entity.width/2, entity.pos.y);
                    this.popup = me.pool.pull("popup", pos.x, pos.y, text, "travel");
                break;

                case "house":
                    pos = me.game.viewport.worldToLocal(entity.pos.x+entity.width/2, entity.pos.y);
                    this.popup = me.pool.pull("popup", pos.x, pos.y, "Scavenge house", "search");
                break;
            }
        }
    },

    locationDetails: function(entity) {
        var pieces = entity.name.split("_");
        return {
            "pos": pieces[0],
            "target": pieces[1],
            "targetPos": pieces[2]
        };
    }


});