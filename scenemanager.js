class sceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        //this.loadLevel(levelOne)
        this.loadTestLevel(levelOne2);  //23x20
    };

    loadLevel(level) {
        this.level = level;
        let temp = -1;
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 20; x++) {
                temp++;
                if (this.level.data[temp] == 5) {
                    gameEngine.addEntity(new player(this.game, x * 46.9, y * 38.2 - 2, false));
                    gameEngine.addEntity(new player(this.game, x * 46.9 + 300, y * 38.2 - 2, true));
                }
                if (this.level.data[temp] == 1) {
                    //console.log("x:" + x + " y:" + y);
                    //fix pixel difference when scaling x and y with bricks.png
                    gameEngine.addEntity(new ground(this.game, x * 50, y * 40, 51, 51));
                }
                if (this.level.data[temp] == 2) {
                    gameEngine.addEntity(new liquid(this.game, x * 50, y * 40, true));
                }
                if (this.level.data[temp] == 3) {
                    gameEngine.addEntity(new liquid(this.game, x * 50, y * 40, false));
                }
            }
        }
        gameEngine.addEntity(new background());
    }

    loadTestLevel(level) {
        this.level = level;
        let temp = -1;
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 23; x++) {
                temp++;
                //TODO change for loop value to size, change liquid pixels, try 50x40
                //////philips testing
                // if (this.level.data[temp] == 5) {
                //     gameEngine.addEntity(new player(this.game, x * 25, y * 18, false));
                //     gameEngine.addEntity(new player(this.game, x * 25 + 100, y * 18, true));
                // }
                // if (this.level.data[temp] == 1) {
                //     //console.log("x:" + x + " y:" + y);
                //     //fix pixel difference when scaling x and y with bricks.png
                //     gameEngine.addEntity(new ground(this.game, x * 19, y * 20, 20, 20));
                // }
                // if (this.level.data[temp] == 2) {
                //     gameEngine.addEntity(new liquid(this.game, x * 19, y * 20, true));
                // }
                // if (this.level.data[temp] == 3) {
                //     gameEngine.addEntity(new liquid(this.game, x * 19, y * 20, false));
                // }

                if (this.level.data[temp] == 8) {
                    gameEngine.addEntity(new player(this.game, x * 47, y * 47.5, false));
                }
                if (this.level.data[temp] == 9) {
                    gameEngine.addEntity(new player(this.game, x * 47, y * 47.5, true));
                }
                if (this.level.data[temp] == 1) {
                    //console.log("x:" + x + " y:" + y);
                    //fix pixel difference when scaling x and y with bricks.png
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, 51, 51));
                }
                if (this.level.data[temp] == 2) {
                    gameEngine.addEntity(new liquid(this.game, x * 48, y * 47.6, true, false));
                }
                if (this.level.data[temp] == 3) {
                    gameEngine.addEntity(new liquid(this.game, x * 48, y * 47.6, false, false));
                }
                if (this.level.data[temp] == 6) {
                    gameEngine.addEntity(new liquid(this.game, x * 48, y * 47.6, false, true));
                }
                if (this.level.data[temp] == 4) {
                    gameEngine.addEntity(new gem(this.game, x * 48.5, y * 48.5, true));
                }
                if (this.level.data[temp] == 5) {
                    gameEngine.addEntity(new gem(this.game, x * 48.5, y * 48.5, false));
                }
                if (this.level.data[temp] == 7) {
                    gameEngine.addEntity(new elevator(this.game, x * 24, y * 50));
                }
            }
        }
        gameEngine.addEntity(new background());
    }
}