game.TutorialScreen = me.ScreenObject.extend({
    onResetEvent: function(map) {
        me.levelDirector.loadLevel("tutorial01");

        me.game.world.addChild(me.pool.pull("Player", me.game.world.getChildByName("spawnPoint")[0].pos.x, me.game.world.getChildByName("spawnPoint")[0].pos.y-64));      
        
        this.player = me.game.world.getChildByName("Player")[0];

        me.game.viewport.follow(this.player, me.game.viewport.AXIS.BOTH);
        me.event.publish(me.event.VIEWPORT_ONCHANGE, [me.game.viewport.pos]);

        game.Inventory.updateInventory();
        updateUI();
        updateWeapon();

        this.tooltipNumber = 1;
        this.nextTooltip();
        this.tooltipNumber++;

        // Anonymous function stuff
        var tooltipNumber = this.tooltipNumber;
        var self = this;

        this.handler = me.event.subscribe(me.event.KEYDOWN, (function (action, keyCode, edge) {
            switch (self.tooltipNumber) {
                case 2:
                    if (self.player.pos.x < 1400) {
                        self.nextTooltip();
                        self.tooltipNumber++;
                    }
                break;

                case 3:
                    if (me.game.world.getChildByName("Enemy").length < 1) {
                        self.nextTooltip();
                        self.tooltipNumber++;
                    }

                break;

                case 4:
                    if (self.player.pos.x < 600) {
                        self.nextTooltip();
                        self.tooltipNumber++;
                    }

                break;
            }
            }));
    },

    onDestroyEvent: function() {
        me.game.world.removeChild(me.game.world.getChildByName("Player")[0]);
    },

    nextTooltip: function() {
        var tooltip1 = "<h1>Welcome to Hobocalypse</h1>"+
                        "<p><span>A</span> or <span>LEFT</span> to move left.</p>"+
                        "<p><span>D</span> or <span>RIGHT</span> to move right.</p>"+
                        "<p><span>W</span> or <span>UP</span> to jump.</p>";

        var tooltip2 = "<h1>Oh snap, it's a zombie</h1>"+
                        "<p>Press <span>SHIFT</span> to shoot the beast!</p>";

        var tooltip3 = "<h1>Great going</h1>"+
                        "<p>You can open your inventory with the <span>I</span> key.</p>"+
                        "<p>You can switch between your primary and secondary weapons with <span>Q</span>.</p>";

        var tooltip4 = "<h1>You're now ready</h1>"+
                        "<p>Keep going towards the left end of the street and you'll find further instructions.</p>";

        var tooltip;
        switch (this.tooltipNumber) {
            case 1:
                tooltip = "<div class='tutorialTooltip'>";
                tooltip += tooltip1;
                tooltip += "</div>";
                $("#game-content").prepend(tooltip);
                $(".tutorialTooltip").animate({'left': '300px'}, 1000);
            break;

            case 2:
            $(".tutorialTooltip").animate({'left': '960px'}, 1000, function() {this.remove();});
                tooltip = "<div class='tutorialTooltip'>";
                tooltip += tooltip2;
                tooltip += "</div>";
                $("#game-content").prepend(tooltip);
                $(".tutorialTooltip").animate({'left': '300px'}, 1000);
            break;

            case 3:
            $(".tutorialTooltip").animate({'left': '960px'}, 1000, function() {this.remove();});
                tooltip = "<div class='tutorialTooltip'>";
                tooltip += tooltip3;
                tooltip += "</div>";
                $("#game-content").prepend(tooltip);
                $(".tutorialTooltip").animate({'left': '300px'}, 1000);
            break;

            case 4:
            $(".tutorialTooltip").animate({'left': '960px'}, 1000, function() {this.remove();});
                tooltip = "<div class='tutorialTooltip'>";
                tooltip += tooltip4;
                tooltip += "</div>";
                $("#game-content").prepend(tooltip);
                $(".tutorialTooltip").animate({'left': '300px'}, 1000);
            break;
        }
    }
});