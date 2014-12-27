game.MapScreen = me.ScreenObject.extend({
    onResetEvent: function() {
        me.levelDirector.loadLevel("worldmap");

        $('#bottom-gamebar').slideUp(500);
        $('.levelPopup').remove();
        $('.tutorialTooltip').remove();

        me.input.registerPointerEvent('pointermove', me.game.world, this.antiHover.bind(this));
    },

    antiHover: function() {
        if ($('.mapTooltip')) {
            if ($('.mapTooltip').css('display') == 'none') $('.mapTooltip').remove();
        }
        $('.mapTooltip').css('display', 'none');
    },

    onDestroyEvent: function() {
        me.input.releasePointerEvent('pointermove', me.game.world);
        for (var i = me.game.world.getChildByName("area").length - 1; i >= 0; i--) {
            me.input.releasePointerEvent('pointermove', me.game.world.getChildByName("area")[i]);
            me.input.releasePointerEvent('pointerdown', me.game.world.getChildByName("area")[i]);
            me.game.world.removeChild(me.game.world.getChildByName("area")[i]);
        }
    }
});

game.MapPoint = me.Entity.extend({
    init: function(x, y, settings) {
        settings.image = "waypoints";
        settings.spritewidth = settings.width = 50;
        settings.spriteheight = settings.height = 50;

        this._super(me.Entity, 'init', [x, y, settings]);
        this.s = settings;
        this.renderable.addAnimation("current",  [2]);
        this.renderable.addAnimation("next",  [0]);
        this.renderable.addAnimation("far",  [1]);


        var next = ((""+game.data.currentMap.next).indexOf(",") > -1) ? game.data.currentMap.next.split(',') : game.data.currentMap.next;
        if(this.s.id === game.data.currentMap.id) this.renderable.setCurrentAnimation("current");
        else if (next == this.s.id || $.inArray(this.s.id, next) > -1) this.renderable.setCurrentAnimation("next");
        else this.renderable.setCurrentAnimation("far");

        me.input.registerPointerEvent('pointermove', this, this.onHover.bind(this));
        me.input.registerPointerEvent('pointerdown', this, this.clicked.bind(this));
    },

    onHover: function(e) {
        if ($('.mapTooltip').length === 0) {
            var tooltip = this.createTooltip();
            $('#game-content').append(tooltip);
        }

        var offset = $(e.target).offset();
        $('.mapTooltip').css({'top':e.pageY-offset.top-70,'left':e.pageX-offset.left-50, 'display': 'block'});
    },

    createTooltip: function() {
        var tooltip;
        tooltip = "<div class='mapTooltip'>"+
                    "<h1>"+this.s.areaname+"</h1>";

            if (this.checkStatus(this) == 'current') tooltip += "<p>You are here.</p>";
            else if (this.checkStatus(this) == 'next') tooltip += "<p>You CAN travel here.</p>";
            else tooltip += "<p>Cannot travel here, too far.</p>";

        tooltip += "</div>";
        return tooltip;
    },

    // Returns: CURRENT or NEXT
    checkStatus: function (hoverArea) {
        var current = $.grep(me.game.world.getChildByName("area"), function(e) {return e.s.id === game.data.currentMap.id;})[0].s;
        var next = ((""+current.next).indexOf(",") > -1) ? current.next.split(',') : current.next;

        if(hoverArea.s.id === current.id) return 'current';
        else if (next == this.s.id || $.inArray(this.s.id, next) > -1) return 'next';
    },

    clicked: function() {
        if (this.checkStatus(this) === 'current') alert("You're already here.");
        else if (this.checkStatus(this) === 'next') {
            if (confirm('Are you sure you want to travel to '+this.s.name+'?')) {
                game.data.currentMap.id = this.s.id;
                game.data.currentMap.next = this.s.next;
                me.state.change(me.state.PLAY, "area01");
            } else {
                // Do nothing!
            }
        } else alert("You can't travel here, mofo!");
    },

    update: function(dt) {
        return false;
    }
});