class sceneManager {
    constructor(game) {
        this.game = game;

        this.loadLevel(levelOne);
    };

    loadLevel(level) {
        this.level = level;
        let temp = -1;
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 20; x++) {
                temp++;
                if (this.level.data[temp] == 5) {
                    gameEngine.addEntity(new player(this.game, x * 46.9, y * 38.2 - 2, false));
                    gameEngine.addEntity(new player(this.game, x * 46.9 + 400, y * 38.2 - 2, true));
                }
                if (this.level.data[temp] == 3) {
                    //console.log("x:" + x + " y:" + y);
                    //fix pixel difference when scaling x and y with bricks.png
                    gameEngine.addEntity(new Ground(this.game, x * 50, y * 40, 51, 51));
                }
                if (this.level.data[temp] == 1) {
                    gameEngine.addEntity(new Lava(this.game, x * 50, y * 40));
                }
                if (this.level.data[temp] == 2) {
                    gameEngine.addEntity(new Water(this.game, x * 50, y * 40));
                }
            }
        }
        gameEngine.addEntity(new background());
    }
}