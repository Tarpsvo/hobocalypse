$(function() {
    $('#inventory-button').click(function () {game.Windows.inventory();});
    $('#inventory-title').click(function () {game.Windows.inventory();});

    $('.equipped-item, .inventory-item')
                .mouseenter(function() {
                    if ($(this).data("item")) {
                        var tooltip = game.Windows.createTooltip($(this).data("item"));
                        $('#inventory').append(tooltip);
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
            $('#unequip').click(function() {
                // If weapon, check if the player is not unequipping both, cause he needs at least one
                if ($(e.target).data("item").class === 'weapon') {
                    var player = me.game.world.getChildByName('Player')[0];
                    if (!player.secondary || !player.primary) alert("You need at least one weapon.");
                    else game.Inventory.unequip(e.target.id);
                } else game.Inventory.unequip(e.target.id);});
        }
    });

    $('.inventory-item').on('contextmenu', function(e){
        $('.contextTooltip').remove();
        if($(e.target).data("item")) {
            var menu = "<div class='contextTooltip'><ul>";
            var offset = $(this).parent().parent().parent().offset();
            var addedMenu;
            if($(e.target).data("item").class === 'weapon') {
                if ($(e.target).data("item").type == 'primary') menu += "<li id='e-primary'>Equip primary</li>";
                else menu += "<li id='e-secondary'>Equip secondary</li>";
                menu += "</ul></div>";

                addedMenu = $('#inventory').append(menu);
                $('.contextTooltip').css({'top':e.pageY-offset.top+10,'left':e.pageX-offset.left+10});
                $('#e-primary').click(function() {game.Inventory.equip($(e.target).data("item"), "primary", $('.inventory-item').index($(e.target)));});
                $('#e-secondary').click(function() {game.Inventory.equip($(e.target).data("item"), "secondary", $('.inventory-item').index($(e.target)));});
            } else {
                menu = "<div class='contextTooltip'><ul>";
                menu += "<li id='e-equip'>Equip</li>";
                menu += "</ul></div>";
                addedMenu = $('#inventory').append(menu);
                $('.contextTooltip').css({'top':e.pageY-offset.top+10,'left':e.pageX-offset.left+10});
                $('#e-equip').click(function() {game.Inventory.equip($(e.target).data("item"), "primary", $('.inventory-item').index($(e.target)));});
            }
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
        if (item.modifiers) {
            var tooltip;
            tooltip = "<div class='itemTooltip'>"+
                            "<h1 class='item-title "+item.rarity.toLowerCase()+"'>"+item.name+"</h1>"+
                            "<ul class='info-list'>";


            for (var i = 0; i < item.modifiers.length; i++) {
                tooltip += "<li><span>"+item.modifiers[i]+": </span>"+item[item.modifiers[i].toLowerCase()]+"</li>";
            }

            tooltip += "</ul><h1 class='keywords'>"+this.createKeywords(item)+"</h1></div>";
            return tooltip;

        } else console.log("Incorrectly marked down item: no modifier array");
    },

    createKeywords: function(item) {
        if (!item.modifier) {
            return "<span class='"+item.rarity.toLowerCase()+"''>"+item.rarity+"</span>";
        } else {
            return "<span class='"+item.rarity.toLowerCase()+"''>"+item.rarity+"</span> <span class='modifier'>"+item.modifier+"</span>";
        }
    }
};