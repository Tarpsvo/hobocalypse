$(function() {
    $('#inventory-button').click(function () {game.Windows.inventory();});
    $('#inventory-title').click(function () {game.Windows.inventory();});

    $('.equipped-item, .inventory-item')
                .mouseenter(function() {
                    if ($(this).text() !== '-' || !$(this).text()) {
                        game.Windows.createTooltip($(this).data("item"));
                    }
                })
                .bind('mousemove', function(e){
                    var offset = $(this).parent().parent().parent().offset();
                    var height = $('.itemTooltip').height();
                    var width = (e.pageX > 850) ? $('.itemTooltip').width() : 0;
                    $('.itemTooltip').css({'top':e.pageY-offset.top-height-10,'left':e.pageX-offset.left-width});
                })
                .mouseleave(function() {
                    $('.itemTooltip').remove();
                });
});

game.Windows = {
    inventory: function() {
        if ($('#inventory').css('display') == 'none') {
            me.state.pause(true);
            $('#inventory').stop().animate({height: "toggle", width: "toggle"}, 500);
            $(".levelPopup").remove();
        } else {
            me.state.resume(true);
            $('#inventory').stop().animate({height: "toggle", width: "toggle"}, 500);
        }
    },

    createTooltip: function(item) {
        var tooltip;
        switch (item.type) {
            case "weapon":
                tooltip = "<div class='itemTooltip'>"+
                            "<h1 class='item-title'>"+item.name+"</h1>"+
                            "<ul class='info-list'>"+
                                "<li><span>Rarity: </span>"+item.rarity+"</li>"+
                                "<li><span>Damage: </span>"+item.damage+"</li>"+
                                "<li><span>Rate of fire: </span>"+item.rof+"</li>"+
                                "<li><span>Bullet speed: </span>"+item.speed+"</li>"+
                                "<li><span>Effective distance: </span>"+item.distance+"</li>"+
                            "<ul>"+
                        "</div>";
                item.tooltip = tooltip;
                $('#inventory').append(tooltip).fadeIn("fast");
            break;
        }
    }
};