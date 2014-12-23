game.Inventory = {
    load: function() {
        // Load the inventory from some file
    },

    getEquips: function() {
        return game.Equips;
    },

    getItems: function() {
        return game.Backpack;
    },

    updateInventory: function() {
        var equips = this.getEquips();
        var items = this.getItems();
        var player = me.game.world.getChildByName("Player")[0];

        $.each(equips, function(index, item) {
            $("#"+index)
                .removeData("item") // Remove data attached to all slots
                .removeClass() // Remove all classes
                .css('background-image', ''); // Remove backgrounds

            var slot = $("#"+index);
            if (item) {

                slot
                    .data("item", item) // Attach item info to slot
                    .addClass(item.rarity.toLowerCase())
                    .addClass("equipped-item") // Add classes
                    .addClass(item.class)
                    .text('');

                if (slot.data("item").icon) {
                    slot.css('background-image', 'url(' + me.loader.getImage(slot.data("item").icon).src + ')');
                } else {
                    slot.text(item.logo);
                }

            } else slot.text("-");
        });

        $('.inventory-item')
            .removeData("item")
            .removeClass()
            .css('background-image', '')
            .text(function(index, currentContent) {
                $(this).addClass("inventory-item");
                if (items[index]) {
                    $(this)
                        .data("item", items[index])
                        .addClass(items[index].rarity.toLowerCase())
                        .addClass(items[index].class)
                        .text('');
                        
                    if ($(this).data("item").icon) {
                        $(this).css('background-image', 'url(' + me.loader.getImage($(this).data("item").icon).src + ')');
                    }
                    else return  items[index].logo;
                } else return "-";
            });


            // When inventory is closed, set proper weapon
            player.primary = game.Equips.primary;
            player.secondary = game.Equips.secondary;
            if (player.primary) {
                player.currentWeapon = player.primary;
            } else if (player.secondary) {
                player.currentWeapon = player.secondary;
            } else {
                player.currentWeapon = weapons.weapon1;
                alert("Unequipping both weapons safe-mode: defaulted to weapon1");
            }
            updateWeapon();
    },

    add: function(item) {
        game.Backpack.push(item);
    },

    remove: function(item) {
        game.Backpack.splice( $.inArray(item, game.Backpack), 1 );
    },

    equip: function(item, target, slot) {
        switch (item.class) {
            case "weapon":
                // If primary, equip to left slot, else to right slot
                if (target == "primary") {
                    // If we have a weapon in primary slot, switch items. Else add item to primary slot and remove from inventory. 
                    if (game.Equips.primary) game.Backpack[slot] = game.Equips.primary; else game.Backpack.splice(slot, 1);
                    game.Equips.primary = item;

                    game.Inventory.updateInventory();
                } else {
                    if (game.Equips.secondary) game.Backpack[slot] = game.Equips.secondary; else game.Backpack.splice(slot, 1);
                    game.Equips.secondary = item;

                    game.Inventory.updateInventory();
                }
            break;

            default:
                if (game.Equips[item.class]) game.Backpack[slot] = game.Equips[item.class]; else game.Backpack.splice(slot, 1);
                    game.Equips[item.class] = item;
                    game.Inventory.updateInventory();
            break;
        }
    },


    unequip: function(target) {
        game.Backpack.push(game.Equips[target]);
        game.Equips[target] = null;
        game.Inventory.updateInventory();
    }
};


/* DEFAULT ITEMS */
game.Equips = {
    "headgear": headgear.head1,
    "primary": weapons.weapon2,
    "armor": armor.armor2,
    "secondary": weapons.weapon1,
    "tool": null,
    "acc1": null,
    "acc2": null,
    "acc3": null,
    "acc4": null
};

game.Backpack = [
    weapons.weapon1,
    weapons.weapon3,
    armor.armor1,
    armor.armor3,
    headgear.head2,
];