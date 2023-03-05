class sceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.title = true;
        this.gems = 0;
        //this.loadLevel(levelOne)      //old
        this.loadLevel(levelOne2);  //23x20 also uncomment to skip title screen
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

    loadLevel(level, gameOver) {
        this.level = level;
        let temp = -1;
        this.redDoorIsOpen = false;
        this.blueDoorIsOpen = false;
        let myElevator = new elevator(this.game, -100, -100);
        let myElevator2 = new elevator(this.game, -100, -100);
        this.clearEntities();
        if (gameOver) {
            this.game.addEntity(new retryMenu(this.game, this.gems))
        }
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 23; x++) {
                temp++;
                const GROUND0000 = "A";
                const GROUND1111 = "B";
                const GROUND0110 = "C";
                const GROUND0111 = "D";
                const GROUND1110 = "E";
                const GROUND0010 = "F";
                const GROUND0100 = "G";
                const GROUND1000 = "H";
                const GROUND0001 = "I";
                const GROUND1100 = "J";
                const GROUND0101 = "K";
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
                const BUTTON = 14;


                if (this.level.data[temp] == GROUND0000) {
                    //console.log("x:" + x + " y:" + y);
                    //fix pixel difference when scaling x and y with bricks.png
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND0000));
                } else if(this.level.data[temp] == GROUND1111) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND1111));
                } else if(this.level.data[temp] == GROUND0110) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND0110));
                } else if(this.level.data[temp] == GROUND0111) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND0111));
                } else if(this.level.data[temp] == GROUND1110) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND1110));
                } else if(this.level.data[temp] == GROUND0010) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND0010));
                } else if(this.level.data[temp] == GROUND0100) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND0100));
                } else if(this.level.data[temp] == GROUND1000) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND1000));
                } else if(this.level.data[temp] == GROUND0001) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND0001));
                } else if(this.level.data[temp] == GROUND1100) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND1100));
                } else if(this.level.data[temp] == GROUND0101) {
                    gameEngine.addEntity(new ground(this.game, x * 48, y * 48, GROUND0101));
                } else if (this.level.data[temp] == LAVA) {
                    gameEngine.addEntity(new liquid(this.game, x * 48, y * 47.6, LAVA));
                } else if (this.level.data[temp] == WATER) {
                    gameEngine.addEntity(new liquid(this.game, x * 48, y * 47.6, WATER));
                } else if (this.level.data[temp] == GREENGOO) {
                    gameEngine.addEntity(new liquid(this.game, x * 48, y * 47.6, GREENGOO));
                } else if (this.level.data[temp] == REDGEM) {
                    gameEngine.addEntity(new gem(this.game, x * 48.5, y * 48.5, REDGEM));
                } else if (this.level.data[temp] == BLUEGEM) {
                    gameEngine.addEntity(new gem(this.game, x * 48.5, y * 48.5, BLUEGEM));
                } else if (this.level.data[temp] == ELEVATOR) {
                    myElevator = new elevator(this.game, x * 24, y * 50);
                    gameEngine.addEntity(myElevator);
                    myElevator2 = new elevator(this.game, x * 224, y * 50);
                    gameEngine.addEntity(myElevator2);
                } else if (this.level.data[temp] == FIREBOY) {
                    gameEngine.addEntity(new player(this.game, x * 47, y * 47.5 - 4, FIREBOY));
                } else if (this.level.data[temp] == WATERGIRL) {
                    gameEngine.addEntity(new player(this.game, x * 47, y * 47.5 - 5, WATERGIRL));
                // } else if (this.level.data[temp] == FIREBOY) {
                //     gameEngine.addEntity(new playerOld(this.game, x * 47, y * 47.5 - 4, false));
                // } else if (this.level.data[temp] == WATERGIRL) {
                // gameEngine.addEntity(new playerOld(this.game, x * 47, y * 57.5 - 5, true));
                } else if (this.level.data[temp] == LEVER) {
                    gameEngine.addEntity(new lever(this.game, x * 48.5, y * 48.5 + 5, myElevator2))
                } else if (this.level.data[temp] == FIREBOYDOOR) {
                    gameEngine.addEntity(new door(this.game, x * 47.5, y * 31, FIREBOY));
                } else if (this.level.data[temp] == WATERGIRLDOOR) {
                    gameEngine.addEntity(new door(this.game, x * 47.5, y * 31, WATERGIRL));
                } else if (this.level.data[temp] == BOX) {
                    gameEngine.addEntity(new box(this.game, x * 48, y * 48));
                } else if (this.level.data[temp] == BUTTON) {
                    //always add connected elevator first before adding buttons
                    //buttons different elevator reference than lever
                    gameEngine.addEntity(new button(this.game, x * 48, y * 48 + 32, myElevator, 1));
                    gameEngine.addEntity(new button(this.game, x * 48, y * 87 + 32, myElevator, 2));
                }

            }
        }
        gameEngine.addEntity(new background());
    };

    update() {
        this.startGame = this.game["startGame"];
        //this.retryGame = this.game["retryGame"];
        if (this.startGame && this.title) {
            this.title = false;
            console.log("pressed Q");
            this.loadLevel(levelOne2);
        }
    }

    draw(ctx) {
        if (this.title) {
            ctx.drawImage(ASSET_MANAGER.getAsset("./Assets/titleBackground.png"), -397, 1, 1705, 960);
            //gradient testing
            var grd = ctx.createLinearGradient(0, 0, 0, 500);
            grd.addColorStop(0, "red");
            grd.addColorStop(1, rgb(237, 161, 14));
            ctx.fillStyle = grd;
            //lavaboy & icegirl text
            ctx.font = '170px "Thayer-Street-NDP-Regular"';
            //ctx.fillStyle = "rgb(255, 0, 0)";
            ctx.fillText("lavaboy", 130, 290);
            ctx.font = '90px "Trajan-Pro-Regular"';
            ctx.fillStyle = "rgb(237, 161, 14)";
            ctx.fillText("&", 525, 290);
            ctx.font = '150px "Thayer-Street-NDP-Regular"';
            ctx.fillStyle = "rgb(102, 204, 255)";
            ctx.fillText("icegirl", 600, 290);

            //press q to play
            ctx.font = '90px "Trajan-Pro-Regular"';
            ctx.fillStyle = "rgb(237, 161, 14)";
            ctx.fillText("Press Q to Play", 275, 650);
        }
    }
}