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
                .removeData("item")
                .removeClass("common uncommon unique");
            if (item) {
                $("#"+index)
                    .text(item.logo)
                    .data("item", item)
                    .addClass(item.rarity.toLowerCase());

            } else $("#"+index).text("-");
        });

        $('.inventory-item')
            .removeData("item")
            .removeClass("common uncommon unique")
            .text(function(index, currentContent) {
                if (items[index]) {
                    $(this).data("item", items[index]);
                    $(this).addClass(items[index].rarity.toLowerCase());
                    return  items[index].logo;
                } else return "-";
            });


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
    "chestgear": null,
    "secondary": weapons.weapon1,
    "left-acc": null,
    "pants": null,
    "right-acc": null
};

game.Backpack = [
    weapons.weapon1,
    weapons.weapon3,
];