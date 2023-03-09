class elevator {
    constructor(game, x, y, low) {
        Object.assign(this, { game, x, y, low});
        this.h = 32;
        this.w = 144;
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "White");
        this.lastBB = this.BB;
        this.topBB = new boundingbox(this.x, this.y, this.w, 2, "Green");
        this.bottomBB = new boundingbox(this.x, this.y + this.h, this.w, 2, "Brown");
        this.leftBB = new boundingbox(this.x, this.y, 2, this.h, "Yellow");
        this.rightBB = new boundingbox(this.x + this.w - 2, this.y, 2, 32, "Red");
        this.startingPosY = this.y;
        this.goDown = [false, false, false, false];
        this.isMoving = false;
        this.hasBB = true;
        this.hasTopBB = true;
        this.hasBottomBB = true;
        this.hasLeftBB = true;
        this.hasRightBB = true;
        this.canMove = true;
        this.speed = 100;
        this.isLever = true;
        this.buttonPressed = false; //if the first tick button is pressed
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/elevator.png");
        this.maxLowered = 195;
        if (this.game.camera.currentLevel === level2) {
            this.maxLowered = low; // acting as max highest
        }
    };

    setDown(pos, num) {
        this.goDown[num] = pos
    }


    update() {
        // console.log("this.goDown[1] = " + this.goDown[1]);
        // console.log("this.goDown[2] = " + this.goDown[2]);

        if (this.canMove && this.game.camera.currentLevel === level1) {
            if (this.isLever) {
                // console.log("Elevator goes down: " + this.goDown + " isMoving: " + this.isMoving);
                // TODO uncomment this for switch type up and down mechanics
                if (this.goDown[3]) {
                    if (this.y <= this.startingPosY + this.maxLowered) {
                        this.isMoving = true;
                        this.speed = 100;
                    } else {
                        this.isMoving = false;
                        this.speed = 0;
                    }
                } else {
                    if (this.y >= this.startingPosY + this.maxLowered) {
                        this.isMoving = true;
                        this.speed = -100;
                    } else if (this.y <= this.startingPosY) {
                        this.isMoving = false;
                        this.speed = 0;
                    }
                }
                this.y += this.speed * this.game.clockTick;
            } else {
                // if (this.y >= this.startingPosY + this.maxLowered) {
                //     this.isMoving = true;
                //     this.speed = -100;
                // } else if (this.y <= this.startingPosY) {
                //     this.isMoving = false;
                //     this.speed = 0;
                // }
                if (this.goDown[1] || this.goDown[2]) {
                    if (this.y <= this.startingPosY + this.maxLowered) {
                        this.speed = 100;
                        this.moving = true;
                    } else {
                        this.speed = 0;
                        this.moving = false;
                    }
                } else {
                    if (this.y >= this.startingPosY) {
                        this.speed = -100;
                        this.moving = true;
                    } else {
                        this.speed = 0;
                        this.moving = false;
                    }
                }
                this.y += this.speed * this.game.clockTick;
            }
            this.updateBB();
        }

        if (this.canMove && this.game.camera.currentLevel === level2) {
            if (this.goDown[1] || this.goDown[2]) {
                if (this.y >= this.maxLowered) {
                    this.speed = -100;
                    this.moving = true;
                } else {
                    this.speed = 0;
                    this.moving = false;
                }
            } else {
                if (this.y <= this.startingPosY) {
                    this.speed = 100;
                    this.moving = true;
                } else {
                    this.speed = 0;
                    this.moving = false;
                }
            }
            this.y += this.speed * this.game.clockTick;
        }

        this.collisionCheck();
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "White");
        this.topBB = new boundingbox(this.x, this.y, this.w, 2, "Green");
        this.bottomBB = new boundingbox(this.x, this.y + this.h, this.w, 2, "Brown");
        this.leftBB = new boundingbox(this.x, this.y, 2, this.h, "Yellow");
        this.rightBB = new boundingbox(this.x + this.w - 2, this.y, 2, 32, "Red");
    }

    collisionCheck() {
        this.canMove = true;
        this.game.entities.forEach(entity => {
            if (entity.hasBB && this.BB.collide(entity.BB)) {    
                if (entity instanceof player && this.bottomBB.collide(entity.BB) && this.isMoving) {
                    this.y = this.lastBB.top;
                    this.canMove = false;
                }
            }    
        });
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
        // this.BB.draw(ctx);
        // this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
    };
}