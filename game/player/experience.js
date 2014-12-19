function addExp(amount) {
    var player = me.game.world.getChildByName("player")[0];
    var expText;
    game.data.exp += amount;

    // If level up
    if (game.data.exp >= game.data.nextLevel) {
        game.data.level++;
        game.data.exp = game.data.nextLevel-game.data.exp;
        game.data.nextLevel = game.data.nextLevel*game.data.level;

        expText = me.pool.pull("texts", "levelup", "Level up to "+game.data.level, player.pos.x, player.pos.y);
        me.game.world.addChild(expText);
    } else {
        expText = me.pool.pull("texts", "exp", amount, player.pos.x, player.pos.y);
        me.game.world.addChild(expText);
    }


    updateUI();
}