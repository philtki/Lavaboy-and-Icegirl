class sceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        //this.loadLevel(levelOne)
        this.loadTestLevel(levelOne2);  //23x20
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });

    };

    openDoor(characterType) {
        const FIREBOY = 8;
        const WATERGIRL = 9;
        switch (characterType) {
            case WATERGIRL:
                this.blueDoorIsOpen = true;
                break;
            case FIREBOY:
                this.redDoorIsOpen = true;
                break;
        }
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
        this.redDoorIsOpen = false;
        this.blueDoorIsOpen = false;
        let myElevator = new elevator(this.game, -100, -100);
        this.clearEntities();
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 23; x++) {
                temp++;
                //TODO change for loop value to size, change liquid pixels, try 50x40
                const GROUND = 1;
                const LAVA = 2;
                const WATER = 3;
                const REDGEM = 4;
                const BLUEGEM = 5;
                const GREENGOO = 6;
                const ELEVATOR = 7;
                const FIREBOY = 8;
                const WATERGIRL = 9;
                const LEVER = 10;
                const FIREBOYDOOR = 11;
                const WATERGIRLDOOR = 12;
                const BOX = 13;


                if (this.level.data[temp] == GROUND) {
                    //console.log("x:" + x + " y:" + y);
                    //fix pixel difference when scaling x and y with bricks.png
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48));
                } else if (this.level.data[temp] == LAVA) {
                    gameEngine.addEntity(new liquid(this.game, x * 48, y * 47.6, LAVA));
                } else if (this.level.data[temp] == WATER) {
                    gameEngine.addEntity(new liquid(this.game, x * 48, y * 47.6, WATER));
                } else if (this.level.data[temp] == REDGEM) {
                    gameEngine.addEntity(new gem(this.game, x * 48.5, y * 48.5, REDGEM));
                } else if (this.level.data[temp] == BLUEGEM) {
                    gameEngine.addEntity(new gem(this.game, x * 48.5, y * 48.5, BLUEGEM));
                } else if (this.level.data[temp] == GREENGOO) {
                    gameEngine.addEntity(new liquid(this.game, x * 48, y * 47.6, GREENGOO));
                } else if (this.level.data[temp] == ELEVATOR) {
                    myElevator = new elevator(this.game, x * 24, y * 50);
                    gameEngine.addEntity(myElevator);
                } else if (this.level.data[temp] == FIREBOY) {
                    gameEngine.addEntity(new player(this.game, x * 47, y * 47.5, FIREBOY));
                } else if (this.level.data[temp] == WATERGIRL) {
                    gameEngine.addEntity(new player(this.game, x * 47, y * 47.5 - 5, WATERGIRL));
                } else if (this.level.data[temp] == LEVER) {
                    gameEngine.addEntity(new lever(this.game, x * 48.5, y * 48.5, myElevator))
                } else if (this.level.data[temp] == FIREBOYDOOR) {
                    gameEngine.addEntity(new door(this.game, x * 47.5, y * 31, FIREBOY));
                } else if (this.level.data[temp] == WATERGIRLDOOR) {
                    gameEngine.addEntity(new door(this.game, x * 47.5, y * 31, WATERGIRL));
                } else if (this.level.data[temp] == BOX) {
                    gameEngine.addEntity(new box(this.game, x * 48, y * 48 + 10));
                }

            }
        }
        gameEngine.addEntity(new background());
    };
}