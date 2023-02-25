class player {
    constructor (game, x, y, playerType) {
        this.w = PARAMS.BLOCKWIDTH;
        this.h = PARAMS.BLOCKWIDTH * 1.9;
        this.game = game;
        this.x = x;
        this.y = y;
        this.playerType = playerType;
        this.state = 0; // 0 = idle, 1 = falling, 2 = jumping, 3 = running
        this.moving = 0; // 0 = idle, 1 = left, 2 = right
        this.dead = false;
        this.velocity = { x: 0, y: 0 };
        this.maxHorizontal = 250;
        this.grounded = true;
        this.animations = [];
        this.loadAnimations();
        this.removeFromWorld = false;
        const FIREBOY = 8;
        if (this.playerType == FIREBOY) {
            this.name = "FB";
        } else {
            this.name = "WG";
        }
        if (this.playerType == FIREBOY) {
            this.BBx = this.x + 3;
        } else {
            this.BBx = this.x;
        }
        this.BBy = this.y + 15;
        this.verticalOffset = 15;
        this.BB = new boundingbox(this.BBx, this.BBy, this.w, PARAMS.BLOCKWIDTH * 1.9, "Yellow");
        // this.leftBB = new boundingbox(this.BBx, this.BBy, 2, this.h, "Green");
        // this.rightBB = new boundingbox(this.BBx + this.w - 2, this.BBy, 2, this.h, "Blue");
        // this.topBB = new boundingbox(this.BBx, this.BBy, this.w, 2, "Purple");
        // this.bottomBB = new boundingbox(this.BBx, this.BBy + this.h, this.w, 2, "Brown");
        this.lastBB = this.BB;
        this.updateBB();
    };

    loadAnimations() {
        const FIREBOY = 8;
        const WATERGIRL = 9;

        if (this.playerType == FIREBOY) {
            this.animations[PARAMS.IDLE] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 410, 214, 410, 5, 0.08);
            this.animations[PARAMS.FALLING] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 0, 214, 410, 5, 0.08);
            this.animations[PARAMS.JUMPING] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 820, 214, 410, 5, 0.08);
            this.animations[PARAMS.RUNNING] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 1230, 341, 270, 8, 0.06);
        } else {
            this.animations[PARAMS.IDLE] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 471, 205, 310, 11, 0.08);
            this.animations[PARAMS.FALLING] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 0, 202, 471, 11, 0.08);
            this.animations[PARAMS.JUMPING] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 781, 206, 310, 11, 0.08);
            this.animations[PARAMS.RUNNING] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 1091, 375, 291, 8, 0.08);
        }
    };

    update() {
        const TICK = this.game.clockTick;
        const MAX_RUN = 450; //450
        const FALL_AIR = 10;
        const MAX_JUMP = 550;   //500

        this.left = this.game[this.name + "Left"];
        this.right = this.game[this.name + "Right"];
        this.up = this.game[this.name + "Up"];
        this.down = this.game[this.name + "Down"];
        
        if (this.left && !this.right) {
            this.velocity.x = -MAX_RUN;
        } else if (!this.left && this.right) {
            this.velocity.x = MAX_RUN;
        } else if (!this.left && !this.right) {
            this.velocity.x = 0;
        }
        if (this.up && this.grounded) {
            this.velocity.y = -MAX_JUMP;
        }

        this.updateBB();
        // this.maxHorizontal = 250;
        this.state = PARAMS.IDLE;
        this.moving = PARAMS.IDLE;
        if (this.left && !this.right) {
            this.moving = PARAMS.LEFT;
            this.state = PARAMS.RUNNING;
        } else if (!this.left && this.right) {
            this.moving = PARAMS.RIGHT;
            this.state = PARAMS.RUNNING;
        }
        // TODO if on elevator, will be in jumping animation
        if (!this.left && !this.right && !this.grounded) {
            if (this.velocity.y < 0) {
                this.state = PARAMS.JUMPING;
            } else if (this.velocity.y > 0) {
                this.state = PARAMS.FALLING;
            }
        }
        this.grounded = false;
        console.log("Y velocity: " + this.velocity.y);
        this.collisionCheck();
        if (!this.grounded) {
            if (this.velocity.y >= 0) {
                this.velocity.y += FALL_AIR;
            } else if (this.velocity.y < 0) {
                this.velocity.y += FALL_AIR / 1.25;
            }
        }
        // Update horizontal and vertical position based on velocity
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        // console.log("Current state: " + this.state);
        // console.log("Y velocity: " + this.state);
    };

    updateBB() {
        this.lastBB = this.BB;
        const FIREBOY = 8;
        if (this.playerType == FIREBOY) {
            this.BBx = this.x + 3;
        } else {
            this.BBx = this.x;
        }
        this.BBy = this.y + 15;
        this.BB = new boundingbox(this.BBx, this.BBy, this.w, PARAMS.BLOCKWIDTH * 1.9, "Yellow");
    };


    draw(ctx) {
        // Character type
        const WATERGIRL = 9;
        if (this.playerType == WATERGIRL) {
            this.Xoffset = 0;
            this.Yoffset = 26;
        } else {
            this.Xoffset = 0;
            this.Yoffset = 1;
        }
        if (this.state == PARAMS.JUMPING && this.moving == PARAMS.IDLE) {
            if (this.playerType == WATERGIRL) {
                this.Xoffset = 1;
                this.Yoffset = 31;
            } else {
                this.Xoffset = 2;
                this.Yoffset = 35;
            }
        // Running to the right    
        } else if (this.state == PARAMS.RUNNING && this.moving == PARAMS.RIGHT) {
            if (this.playerType == WATERGIRL) {
                this.Xoffset = -45;
                this.Yoffset = 31;
            } else {
                this.Xoffset = -35;
                this.Yoffset = 35;
            }
        // Running to the left    
        } else if (this.state == PARAMS.RUNNING && this.moving == PARAMS.LEFT) {
            if (this.playerType == WATERGIRL) {
                this.Xoffset = 93;
                this.Yoffset = 31;
            } else {
                this.Xoffset = 88;
                this.Yoffset = 35;
            }
        // Jumping but not holding left or right    
        } else if (this.state == PARAMS.FALLING && this.moving == PARAMS.IDLE) {
            if (this.playerType == WATERGIRL) {
                this.Xoffset = 1;
                this.Yoffset = -15;
            } else {
                this.Xoffset = 1;
                this.Yoffset = 1;
            }                
        }
        if (this.moving == PARAMS.IDLE || this.moving == PARAMS.RIGHT) {
            this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x + this.Xoffset, this.y + this.Yoffset, .25);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state].drawFrame(this.game.clockTick, ctx, -this.x - this.Xoffset, this.y + this.Yoffset, .25);
            ctx.restore();
        }
        this.BB.draw(ctx);
    }

    collisionCheck() {
        const LAVA = 2;
        const WATER = 3;
        const REDGEM = 4;
        const BLUEGEM = 5;
        const GREENGOO = 6;
        const FIREBOY = 8;
        const WATERGIRL = 9;
        this.game.entities.forEach(entity => {
            // Falling
            if (this.velocity.y > 0) {
                if (entity instanceof ground && this.BB.collide(entity.topBB) && this.BB.collide(entity.leftBB) && this.BB.collide(entity.rightBB)) {
                    this.y = entity.BB.top - PARAMS.BLOCKWIDTH * 1.9 - this.verticalOffset;
                    this.velocity.y === 0;
                    this.grounded = true;
                }
            }
            // Jumping
            if (this.velocity.y < 0) {
                if (entity instanceof ground && this.BB.collide(entity.bottomBB) && this.BB.collide(entity.leftBB) && this.BB.collide(entity.rightBB)) {
                    this.velocity.y = 0;
                }
            }
            if (entity instanceof ground && this.BB.collide(entity.topBB) && this.BB.collide(entity.bottomBB)) {
                if (this.BB.collide(entity.leftBB)) {
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                    }
                }
                if (this.BB.collide(entity.rightBB)) {
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                    }
                }  
            }
            // If the player is colliding with a liquid tile
            //TODO maybe when player is walking on liquid they are slower
            // Also ask nathan if he wants to do the liquid bb on level or lower
            if (entity instanceof liquid && entity.BB) {
                if (this.BB.collide(entity.BB)) {
                    if (entity.liquidType != GREENGOO) {
                        if (this.playerType == WATERGIRL) {
                            if (entity.liquidType == LAVA) {
                                this.die();
                            }
                            if (this.velocity.y < 0) {
                                this.velocity.y = 0;
                            }
                            this.grounded = true;
                        } else {
                            if (entity.liquidType == WATER) {
                                this.die();
                            }
                            if (this.velocity.y < 0) {
                                this.velocity.y = 0;
                            }
                            this.grounded = true;
                        }
                    } else {
                        this.die();
                    }
                }
            //gem collision
            }
            if (entity instanceof gem && entity.BB) {
                if (this.BB.collide(entity.BB)) {
                    if (this.playerType == WATERGIRL) {
                        if (entity.gemColor == BLUEGEM) {
                            entity.removeFromWorld = true;
                        }
                    } else {
                        if (entity.gemColor == REDGEM) {
                            entity.removeFromWorld = true;
                        }
                    }
                }
            //elevator collision
            }
            if (entity instanceof elevator && entity.BB) {
                if (this.BB.collide(entity.BB)) {
                    this.grounded = true;
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0;
                    }
                    if (this.grounded && entity.isMoving) {
                        this.y = entity.y - this.h - 10; //makes player move with the elevator
                    }
                }
            //door collision
            }
            if (entity instanceof door && entity.BB) {
                if (this.BB.collide(entity.BB) && entity.doorType == WATERGIRL && this.playerType == WATERGIRL) {
                    this.game.camera.openDoor(this.playerType)
                    if (this.game.camera.redDoorIsOpen) {
                        this.die();
                    }
                } else if (this.BB.collide(entity.BB) && entity.doorType == FIREBOY && this.playerType == FIREBOY) {
                    this.game.camera.openDoor(this.playerType)
                    if (this.game.camera.blueDoorIsOpen) {
                        this.die();
                    }
                } else {
                    this.game.camera.redDoorIsOpen = false;
                    this.game.camera.blueDoorIsOpen = false;
                }
            }
            if (entity instanceof lever && entity.BB) {
                // LeftBB
                if(this.BB.collide(entity.BB)) {
                    entity.rotateCounterClockwise();
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                    }
                    // if (this.velocity.x < -50) {
                    //     this.velocity.x = -50;
                    // }
                // RightBB    
                } else if (this.BB.collide(entity.BB)) {
                    entity.rotateClockwise();
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                    }
                    // if (this.velocity.x > 50) {
                    //     this.velocity.x = 50;
                    // }
                }
            }
            // if (entity instanceof box && entity.BB) {
            //     if (this.BB.collide(entity.topBB) ) {
            //         this.grounded = true;
            //     } else if (this.leftBB.collide(entity.rightBB)) {
            //         entity.moveLeft();
            //         this.maxHorizontal = 100
            //     } else if (this.rightBB.collide(entity.leftBB)) { 
            //         entity.moveRight();
            //         this.maxHorizontal = 100
            //     }
            // }
        });
    }

    //TODO add death animation smoke
    die() {
        // this.removeFromWorld = true;
        const start = Date.now();
        let now = start;
        while (now - start < 200) { //waits .2 secs before dying
            now = Date.now();
        }
        this.game.camera.loadTestLevel(levelOne2);
    }
}
