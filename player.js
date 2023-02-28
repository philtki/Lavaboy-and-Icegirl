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
        this.maxHorizontal = 450;
        this.grounded = false;
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
        this.BB = new boundingbox(this.BBx, this.BBy, this.w, this.h, "Yellow");
        // this.leftBB = new boundingbox(this.BBx, this.BBy, 2, this.h, "Green");
        // this.rightBB = new boundingbox(this.BBx + this.w - 2, this.BBy, 2, this.h, "Blue");
        // this.topBB = new boundingbox(this.BBx, this.BBy, this.w, 2, "Purple");
        // this.bottomBB = new boundingbox(this.BBx, this.BBy + this.h, this.w, 2, "Brown");
        this.lastBB = this.BB;
        this.lastlastBB = this.lastBB;
        this.noLeft = false;
        this.noRight = false;
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
        const FALL_AIR = 5;
        const MAX_JUMP = 400;   //500

        this.left = this.game[this.name + "Left"];
        this.right = this.game[this.name + "Right"];
        this.up = this.game[this.name + "Up"];
        this.down = this.game[this.name + "Down"];
        // this.gameStart = this.game["gameStart"];
        //
        // if (this.gameStart) {
        //     console.log("pressed Q");
        // }

        if (this.left && !this.right) {
            this.velocity.x = -MAX_RUN;
        } else if (!this.left && this.right) {
            this.velocity.x = MAX_RUN;
        } else if (!this.left && !this.right) {
            this.velocity.x = 0;
        }
        if (this.up && this.grounded) {
            this.velocity.y = -MAX_JUMP;
            this.grounded = false;
        }

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
        if (!this.left && !this.right && this.grounded) {
            if (this.velocity.y < 0) {
                this.state = PARAMS.JUMPING;
            } else if (this.velocity.y > 30) {
                this.state = PARAMS.FALLING;
            }
        }
        // console.log("Grounded: " + this.grounded);
        if (!this.grounded) {
            if (0 <= this.velocity.y < MAX_JUMP) {
                if (this.velocity.y < MAX_JUMP) {
                    this.velocity.y += FALL_AIR;
                }
            } else if (this.velocity.y < 0) {
                this.velocity.y += FALL_AIR / 1.25;
            }
        } else {
            this.velocity.y = 0;
        }
        if (this.velocity.x <= -this.maxHorizontal) {
            this.velocity.x = -this.maxHorizontal;
        } else if (this.velocity.x >= this.maxHorizontal) {
            this.velocity.x = this.maxHorizontal;
        }
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.updateBB();
        this.collisionCheck();
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
        ///////////instruction text////////////////
        //ctx.clearRect(20, 550, 450, 250);
        if (this.x > 20 && this.x < 400 && this.y > 550) {
            ctx.font = '22px "Trajan-Pro-Regular"';
            ctx.fillStyle = "rgb(241, 211, 41)";
            ctx.fillText("USE A,W,D TO MOVE", 100, 610);
            ctx.fillText("USE ARROW KEYS TO MOVE", 100, 800);
        }
        if(this.x > 400 && this.y > 520) {
            ctx.font = '22px "Trajan-Pro-Regular"';
            ctx.fillStyle = "rgb(241, 211, 41)";
            ctx.fillText("NEVER MIX LAVA AND WATER!", 600, 860);
        }
        //ctx.clearRect(600, 300, 270, 350);
        if(this.x > 600 && this.x < 870 && this.y > 300 && this.y < 650) {
            ctx.font = '22px "Trajan-Pro-Regular"';
            ctx.fillStyle = "rgb(241, 211, 41)";
            ctx.fillText("NEVER MIX ANYTHING", 640, 540);
            ctx.fillText("WITH GREEN GOO!", 660, 570);
        }
        //////////////////////////////////////////////
        this.BB.draw(ctx);
        this.lastBB.draw(ctx);
    }

    collisionCheck() {
        const LAVA = 2;
        const WATER = 3;
        const REDGEM = 4;
        const BLUEGEM = 5;
        const GREENGOO = 6;
        const FIREBOY = 8;
        const WATERGIRL = 9;
        this.grounded = false;
        this.maxHorizontal = 450;
        this.leftIndex = 0;
        this.rightIndex = 0;
        this.game.entities.forEach(entity => {
            if (entity.hasBB && this.BB.collide(entity.BB)) {
                // Falling
                if (entity.hasTopBB && ((entity.BB.left <= this.BB.left && this.BB.left <= entity.BB.right) ||  (entity.BB.left <= this.BB.right && this.BB.right <= entity.BB.right)) && this.BB.bottom - 5 <= entity.BB.top) {
                    if (entity instanceof ground || entity instanceof box) {
                        this.grounded = true;
                        if (this.velocity.y < 0 && this.lastBB.bottom <= entity.BB.top) {
                            this.y = entity.BB.top - PARAMS.BLOCKWIDTH * 1.9 - this.verticalOffset;
                            this.velocity.y === 0;
                        }
                    }
                    if (entity instanceof liquid && entity.BB) {
                        if (entity.liquidType != GREENGOO) {
                            if (this.playerType == WATERGIRL) {
                                if (entity.liquidType == LAVA) {
                                    this.die();
                                } else if (this.velocity.y < 0) {
                                    this.y = entity.BB.top - PARAMS.BLOCKWIDTH * 1.9 - this.verticalOffset;
                                    this.velocity.y = 0;
                                }
                                this.grounded = true;
                            } else {
                                if (entity.liquidType == WATER) {
                                    this.die();
                                } else if (this.velocity.y < 0) {
                                    this.y = entity.BB.top - PARAMS.BLOCKWIDTH * 1.9 - this.verticalOffset;
                                    this.velocity.y = 0;
                                }
                                this.grounded = true;
                            }
                        } else {
                            this.die();
                        }
                    }
                // Jumping
                }
                if (this.velocity.y < 0 && entity.hasBottomBB) {
                    if (entity instanceof ground) {
                        if (((entity.BB.left <= this.BB.left && this.BB.left <= entity.BB.right) ||  (entity.BB.left <= this.BB.right && this.BB.right <= entity.BB.right)) && this.lastBB.top >= entity.BB.bottom ) {
                            this.velocity.y = 0;
                            console.log("Player has collided with the underside of a block");
                        }
                    }
                }
                // Left Right
                if ((entity.hasLeftBB || entity.hasRightBB) && (entity.BB.top - (this.h - entity.h) < this.BB.top && this.BB.top < entity.BB.bottom - 5) || (entity.BB.top + 5 < this.BB.bottom && this.BB.bottom < entity.BB.bottom + (this.h - entity.h))) {
                    if (entity instanceof ground) {
                        if (entity.hasLeftBB && this.BB.collide(entity.leftBB)) {
                            this.x = entity.BB.left - PARAMS.BLOCKWIDTH;
                            if (this.velocity.x > 0) {
                                this.velocity.x = 0;
                            }
                        } else if (entity.hasRightBB && this.BB.collide(entity.rightBB)) {
                            this.x = entity.BB.right;
                            if (this.velocity.x < 0) {
                                this.velocity.x = 0;
                            }
                        }
                    }
                    if (entity instanceof box && entity.BB) {
                        if (this.BB.collide(entity.leftBB)) {
                            this.maxHorizontal = 150;
                            entity.moveRight();
                            // this.x = entity.BB.left - PARAMS.BLOCKWIDTH;
                        } else if (this.BB.collide(entity.rightBB)) {
                            // this.x = entity.BB.right;
                            this.maxHorizontal = -150;
                            entity.moveLeft();
                        }  
                    }
                } 
            }
            // //gem collision
            // }
            // if (entity instanceof gem && entity.BB) {
            //     if (this.BB.collide(entity.BB)) {
            //         if (this.playerType == WATERGIRL) {
            //             if (entity.gemColor == BLUEGEM) {
            //                 entity.removeFromWorld = true;
            //             }
            //         } else {
            //             if (entity.gemColor == REDGEM) {
            //                 entity.removeFromWorld = true;
            //             }
            //         }
            //     }
            // //elevator collision
            // }
            // if (entity instanceof elevator && entity.BB) {
            //     if (this.BB.collide(entity.BB)) {
            //         this.grounded = PARAMS.MAXGROUNDED;
            //         if (this.velocity.y > 0) {
            //             this.velocity.y = 0;
            //         }
            //         if (this.grounded > 0 && entity.isMoving) {
            //             this.y = entity.y - this.h - 10; //makes player move with the elevator
            //         }
            //     }
            // //door collision
            // }
            // if (entity instanceof door && entity.BB) {
            //     if (this.BB.collide(entity.BB) && entity.doorType == WATERGIRL && this.playerType == WATERGIRL) {
            //         this.game.camera.openDoor(this.playerType)
            //         if (this.game.camera.redDoorIsOpen) {
            //             this.die();
            //         }
            //     } else if (this.BB.collide(entity.BB) && entity.doorType == FIREBOY && this.playerType == FIREBOY) {
            //         this.game.camera.openDoor(this.playerType)
            //         if (this.game.camera.blueDoorIsOpen) {
            //             this.die();
            //         }
            //     } else {
            //         this.game.camera.redDoorIsOpen = false;
            //         this.game.camera.blueDoorIsOpen = false;
            //     }
            // }
            // if (entity instanceof lever && entity.BB) {
            //     // LeftBB
            //     if(this.BB.collide(entity.BB)) {
            //         entity.rotateCounterClockwise();
            //         if (this.velocity.x < 0) {
            //             this.velocity.x = 0;
            //         }
            //         // if (this.velocity.x < -50) {
            //         //     this.velocity.x = -50;
            //         // }
            //     // RightBB    
            //     } else if (this.BB.collide(entity.BB)) {
            //         entity.rotateClockwise();
            //         if (this.velocity.x > 0) {
            //             this.velocity.x = 0;
            //         }
            //         // if (this.velocity.x > 50) {
            //         //     this.velocity.x = 50;
            //         // }
            //     }
            // }
            // if (entity instanceof box && entity.BB) {
            //     if (this.BB.collide(entity.topBB) ) {
            //         d = true;
            //     } else if (this.leftBB.collide(entity.rightBB)) {
            //         entity.moveLeft();
            //         this.maxHorizontal = 100
            //     } else if (this.rightBB.collide(entity.leftBB)) { 
            //         entity.moveRight();
            //         this.maxHorizontal = 100
            //     }
            // }
        });
        if (this.leftIndex == 0) {
            this.noLeft = false;
        }
        if (this.rightIndex == 0) {
            this.noRight = false;
        }
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
