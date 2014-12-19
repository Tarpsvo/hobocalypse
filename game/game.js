var game = {
    data: {
    exp: 0,
    level: 1,
    nextLevel: 100
},

// Runs on page load
"onload" : function () {
    // Initialize the video
    // TODO Make width variable
    if (!me.video.init("game-content", me.video.CANVAS, 960, 480, true, 1)) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // If #debug, display debug panel
    if (document.location.hash === "#debug") {
        window.onReady(function () {
            me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
        });
    }

    // Set a callback to run when loading is complete
    me.loader.onload = this.loaded.bind(this);

    // Load the resources
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen
    me.state.change(me.state.LOADING);

    // THIS IS HERE TO DISPLAY THE INVENTORY BEFORE ACTUALLY LOADING INTO THE GAME
    game.Inventory.updateInventory();
    $('#main-center-wrap').on('contextmenu', function(e){ return false; });
},

// Run on game resources loaded
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());

        me.state.transition("fade", "#000000", 750);

        // Add the player and enemies
        me.pool.register("Player", game.Player);
        me.pool.register("enemySpawner", game.EnemySpawner);
        me.pool.register("Enemy", game.EnemyEntity);
        me.pool.register("bullet", game.Bullet, true);

        // UI objects
        me.pool.register("Popup", game.Popup, true);
        me.pool.register("texts", game.TextBox, true);
        me.pool.register("LevelChange", game.LevelChange);

        // Other objects
        me.pool.register("defaultPos", game.defaultPos);
        me.pool.register("spawn", game.playerSpawn);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.A,        "left");
        me.input.bindKey(me.input.KEY.D,        "right");
        me.input.bindKey(me.input.KEY.W,        "jump", true);
        me.input.bindKey(me.input.KEY.SHIFT,        "shoot");
        me.input.bindKey(me.input.KEY.SPACE,        "action", true);
        me.input.bindKey(me.input.KEY.Q,            "nextweapon", true);
        me.input.bindKey(me.input.KEY.I,            "inventory", true);

        // Enable arrow keys
        me.input.bindKey(me.input.KEY.LEFT,        "left");
        me.input.bindKey(me.input.KEY.RIGHT,        "right");
        me.input.bindKey(me.input.KEY.UP,        "jump", true);


        // Start the game.
        me.state.change(me.state.MENU);
    }
};
