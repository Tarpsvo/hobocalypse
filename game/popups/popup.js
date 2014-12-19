game.Popup = me.Renderable.extend({
    init: function (x, y, title, action) {
        this.$tooltip = $('<div class="levelPopup">'+
            '<h1>'+title+'</h1>'+
            '<h2>Press <span>SPACE</span> to '+action+'.</h2></div>');

        this.$tooltip.css({
            "left" : x-64,
            "top" : y-64,
            "width": 128
        });

        $(me.video.getWrapper()).append(this.$tooltip.hide());
        this.$tooltip.fadeIn("fast");
    },

    destroy: function () {
        this.$tooltip.fadeOut("fast", function() {
            this.remove();
        });
    }
});