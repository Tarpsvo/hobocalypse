function updateUI() {
    if ($("#top-gamebar-content").css('display') == 'none') {
        $("#top-gamebar-content").fadeIn("slow");
    }

    // Updates the exp button
    $("#exp").width((game.data.exp/game.data.nextLevel)*100+"%");
    $("#playerLevel").text(game.data.level);
}

function updateWeapon() {
    if ($("#bottom-gamebar").css('display') == 'none') {
        $("#bottom-gamebar").slideDown("slow");
    }
    
    var currentWeapon = me.game.world.getChildByName("player")[0].currentWeapon;
    $("#weapon-name").html("<span class='"+currentWeapon.rarity.toLowerCase()+"'>"+currentWeapon.name+"</span>");
    $("#rof").text(currentWeapon.rof);
    $("#damage").text(currentWeapon.damage);
    $("#distance").text(currentWeapon.distance);
    $("#bul-spd").text(currentWeapon.speed);
    $("#weapon-picture span").text(currentWeapon.logo);
}