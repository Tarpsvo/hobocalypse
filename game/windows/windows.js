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


    $('.equipped-item').on('contextmenu', function(e) {
        $('.contextTooltip').remove();
        if($(e.target).data("item")) {
            var menu = "<div class='contextTooltip'>"+
                            "<ul>"+
                                "<li id='unequip'>Unequip</li>"+
                            "</ul>"+
                        "</div>";
            var addedMenu = $('#inventory').append(menu);
            var offset = $(this).parent().parent().parent().offset();
            $('.contextTooltip').css({'top':e.pageY-offset.top+10,'left':e.pageX-offset.left+10});
            $('#unequip').click(function() {game.Inventory.unequip(e.target.id)});
        }
    });

    $('.inventory-item').on('contextmenu', function(e){
        $('.contextTooltip').remove();
        if($(e.target).data("item")) {
            var menu = "<div class='contextTooltip'>"+
                            "<ul>"+
                                "<li id='e-left'>Equip left</li>"+
                                "<li id='e-right'>Equip right</li>"+
                            "</ul>"+
                        "</div>";
            var addedMenu = $('#inventory').append(menu);
            var offset = $(this).parent().parent().parent().offset();
            $('.contextTooltip').css({'top':e.pageY-offset.top+10,'left':e.pageX-offset.left+10});
            $('#e-left').click(function() {game.Inventory.equip($(e.target).data("item"), "left", $(e.target).index())});
            $('#e-right').click(function() {game.Inventory.equip($(e.target).data("item"), "right", $(e.target).index())});
        }
    });

    $('body').click(function(){$('.contextTooltip').remove();});
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
        var modifier = (!item.modifier) ? "<span>"+item.modifier+"</span>" : " ";



        switch (item.type) {
            case "weapon":
                tooltip = "<div class='itemTooltip'>"+
                            "<h1 class='item-title "+item.rarity.toLowerCase()+"'>"+item.name+"</h1>"+
                            "<ul class='info-list'>"+
                                "<li><span>Damage: </span>"+item.damage+"</li>"+
                                "<li><span>Rate of fire: </span>"+item.rof+"</li>"+
                                "<li><span>Bullet speed: </span>"+item.speed+"</li>"+
                                "<li><span>Eff. distance: </span>"+item.distance+"</li>"+
                            "<ul>"+
                            "<h1 class='keywords'>"+this.createKeywords(item)+"</h1>"+
                        "</div>";

                $('#inventory').append(tooltip).fadeIn("fast");
            break;
        }
    },

    createKeywords: function(item) {
        if (!item.modifier) {
            return "<span class='"+item.rarity.toLowerCase()+"''>"+item.rarity+"</span>";
        } else {
            return "<span class='"+item.rarity.toLowerCase()+"''>"+item.rarity+"</span> <span class='modifier'>"+item.modifier+"</span>";
        }
    }
};