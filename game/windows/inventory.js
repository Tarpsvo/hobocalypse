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
                .removeClass(); // Remove all classes
            if (item) {
                $("#"+index)
                    .text(item.logo)
                    .data("item", item) // Attach item info to slot
                    .addClass("equipped-item", item.rarity.toLowerCase()) // Add classes
                    .addClass(item.class);

            } else $("#"+index).text("-");
        });

        $('.inventory-item')
            .removeData("item")
            .removeClass()
            .text(function(index, currentContent) {
                $(this).addClass("inventory-item");
                if (items[index]) {
                    $(this)
                        .data("item", items[index])
                        .addClass(items[index].rarity.toLowerCase())
                        .addClass(items[index].class);
                    return  items[index].logo;
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
    "headgear": null,
    "primary": weapons.weapon2,
    "chestgear": chestgear.chest1,
    "secondary": weapons.weapon1,
    "left-acc": null,
    "pants": null,
    "right-acc": null
};

game.Backpack = [
    weapons.weapon1,
    weapons.weapon3,
    chestgear.chest2,
    chestgear.chest3
];