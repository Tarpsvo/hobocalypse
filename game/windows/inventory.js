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

        $('#character-part li').text('-');
        $.each(equips, function(index, item) {
            if (item) {
                $("#"+index)
                    .text(item.logo)
                    .data("item", item);

            }
        });

        $('.inventory-item')
            .text(function(index, currentContent) {
                if (items[index]) {
                    $(this).data("item", items[index]);
                    return  items[index].logo;
                } else return "-";
            });
    },

    add: function(item) {

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
    weapons.weapon2,
    weapons.weapon3,
    weapons.weapon2
];