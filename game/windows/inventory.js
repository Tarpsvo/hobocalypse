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


            player.weapons[0] = game.Equips['weapon-1'];
            player.weapons[1] = game.Equips['weapon-2'];
            if (player.weapons[0]) {
                player.currentWeapon = player.weapons[0];
            } else if (player.weapons[1]) {
                player.currentWeapon = player.weapons[1];
            } else {
                player.weapons[0] = weapons.weapon1;
                player.currentWeapon = player.weapons[0];
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


        switch (item.type) {
            case "weapon":
                if (target == "left") {
                    if (game.Equips['weapon-1']) game.Backpack[slot] = game.Equips['weapon-1']; else game.Backpack.splice(slot, 1);
                    game.Equips['weapon-1'] = item;

                    game.Inventory.updateInventory();
                } else {
                    if (game.Equips['weapon-2']) game.Backpack[slot] = game.Equips['weapon-2']; else game.Backpack.splice(slot, 1);
                    game.Equips['weapon-2'] = item;

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

game.Equips = {
    "headgear": null,
    "weapon-1": weapons.weapon1,
    "chestgear": null,
    "weapon-2": weapons.weapon2,
    "left-acc": null,
    "pants": null,
    "right-acc": null
};

game.Backpack = [
    weapons.weapon1,
    weapons.weapon3,
    weapons.weapon2
];