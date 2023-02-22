class player {
    constructor (game, x, y, playerType) {
        this.w = 50;
        this.h = 90;
        this.game = game;
        this.x = x;
        this.y = y;
        this.playerType = playerType;
        const FIREBOY = 8;
        const WATERGIRL = 9;
        this.state = 0; // 0 = idle, 1 = falling, 2 = jumping, 3 = running
        this.moving = 0; // 0 = idle, 1 = left, 2 = right
        this.dead = false;
        this.velocity = { x: 0, y: 0 };
        this.maxHorizontal = 250;
        this.fallAcc = 562.5;
        this.grounded = true;
        this.animations = [];
        this.loadAnimations();
        this.collidedUp = false;
        this.collidedDown = false;
        this.collidedLeft = false;
        this.collidedRight = false;
        this.removeFromWorld = false;
        if (this.playerType == FIREBOY) {
            this.name = "FB";
        } else {
            this.name = "WG";
        }
        this.BBx = this.x + 4;
        this.BBy = this.y + 14;
        this.BB = new boundingbox(this.BBx, this.BBy, this.w, this.h, "Yellow");
        this.leftBB = new boundingbox(this.BBx, this.BBy, 2, this.h, "Green");
        this.rightBB = new boundingbox(this.BBx + this.w - 2, this.BBy, 2, this.h, "Blue");
        this.topBB = new boundingbox(this.BBx, this.BBy, this.w, 2, "Purple");
        this.bottomBB = new boundingbox(this.BBx, this.BBy + this.h, this.w, 2, "Brown");
        this.lastBB = this.BB;
        this.updateBB();
    };

    loadAnimations() {
        const IDLE = 0;
        const FALLING = 1;
        const JUMPING = 2;
        const RUNNING = 3;
        const FIREBOY = 8;
        const WATERGIRL = 9;

        if (this.playerType == FIREBOY) {
            this.animations[IDLE] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 410, 214, 410, 5, 0.08);
            this.animations[FALLING] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 0, 214, 410, 5, 0.08);
            this.animations[JUMPING] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 820, 214, 410, 5, 0.08);
            this.animations[RUNNING] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 1230, 341, 270, 8, 0.06);
        } else {
            this.animations[IDLE] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 471, 205, 310, 11, 0.08);
            this.animations[FALLING] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 0, 202, 471, 11, 0.08);
            this.animations[JUMPING] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 781, 206, 310, 11, 0.08);
            this.animations[RUNNING] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 1091, 375, 291, 8, 0.08);
        }
    };

    update() {
        // Moving
        const IDLE = 0;
        const FALLING = 1;
        const JUMPING = 2;
        const RUNNING = 3;
        // State
        const RIGHT = 1;
        const LEFT = 2;
        // Movement
        const TICK = this.game.clockTick;
        const MIN_RUN = 5;
        const MAX_RUN = 250; //450
        const ACC_RUN = 200;
        const DEC_RUN = 40;
        const DEC_AIR = 40;
        const FALL = 10;
        const MAX_JUMP = 600;   //500

        this.left = this.game[this.name + "Left"];
        this.right = this.game[this.name + "Right"];
        this.up = this.game[this.name + "Up"];
        this.down = this.game[this.name + "Down"];
        
        // Holding both left and right
        if((this.left && this.right) || (!this.left && !this.right)) {
            this.state = IDLE;
            this.moving = IDLE;
            if (this.velocity.y < 0) {
                this.state = JUMPING;
            } else if (this.velocity.y > 0) {
                this.state = FALLING;
            }
        // Holding just right
        } else if (this.right) {
            this.state = RUNNING;
            this.moving = RIGHT;
            this.velocity.x = this.maxHorizontal;
        // Holding just left
        } else if (this.left) {
            this.state = RUNNING;
            this.moving = LEFT;
            this.velocity.x = -this.maxHorizontal;
        }
        // Holding jump
        if (this.grounded) {
            // On the ground
            if (this.up) {
                this.velocity.y = -MAX_JUMP;
                this.grounded = false;
            } else {
                this.velocity.y = 0;
            }
            if((this.left && this.right) || (!this.left && !this.right)) {
                if (this.velocity.y < 0) {
                    this.state = JUMPING;
                } else if (this.velocity.y > 0) {
                    this.state = FALLING;
                }
            }
        // Not holding left or right or holding left and right and not holding up
        // Basically just checks if the player should be idle
        } else if (((!this.left && !this.right) || (this.left && this.right)) && !this.up) {
            this.state = IDLE;
            this.moving = IDLE;
            this.velocity.x = 0;
        }

        // If the player isn't on the ground
        if (!this.grounded) {
            // Player has been in the air for enough time, begin slowing them
            if (this.velocity.y < 300) {
                this.velocity.y += 10;
            }
        }

        // If the player is no longer holding left, but is still moving in that direction
        if (!this.left && this.velocity.x < 0) {
            this.velocity.x = 0;
            if (this.moving == LEFT) {
                this.moving = IDLE;
            }
        }

        // If the player is no longer holding right, but is still moving in that direction
        if (!this.right && this.velocity.x > 0) {
            this.velocity.x = 0;
            if (this.moving == RIGHT) {
                this.moving = IDLE;
            }
        }

        // Set grounded to false, this makes the player begin to fall
        // If they are still on the ground, collisionCheck will correct the grounded's state
        // Update bounding box
        this.updateBB();

        
        // Check for collisions
        this.maxHorizontal = 250;
        this.grounded = false;
        this.collisionCheck();
        // Update horizontal and vertical position based on velocity
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BBx = this.x + 4;
        this.BBy = this.y + 14;
        this.BB = new boundingbox(this.BBx, this.BBy, this.w, this.h, "Yellow");
        this.leftBB = new boundingbox(this.BBx, this.BBy + 2, 2, this.h - 4, "Green");
        this.rightBB = new boundingbox(this.BBx + this.w - 2, this.BBy + 2, 2, this.h - 4, "Blue");
        this.topBB = new boundingbox(this.BBx, this.BBy, this.w, 2, "Purple");
        this.bottomBB = new boundingbox(this.BBx, this.BBy + this.h, this.w, 2, "Brown");
    };


    draw(ctx) {
        // Moving
        const RIGHT = 1;
        const LEFT = 2;
        // State
        const IDLE = 0;
        const FALLING = 1;
        const JUMPING = 2;
        const RUNNING = 3;
        // Character type
        const WATERGIRL = 9;
        if (this.playerType == WATERGIRL) {
            this.Xoffset = 0;
            this.Yoffset = 26;
        } else {
            this.Xoffset = 0;
            this.Yoffset = 1;
        }
        if (this.state == JUMPING && this.moving == IDLE) {
            if (this.playerType == WATERGIRL) {
                this.Xoffset = 1;
                this.Yoffset = 31;
            } else {
                this.Xoffset = 2;
                this.Yoffset = 35;
            }
        // Running to the right    
        } else if (this.state == RUNNING && this.moving == RIGHT) {
            if (this.playerType == WATERGIRL) {
                this.Xoffset = -45;
                this.Yoffset = 31;
            } else {
                this.Xoffset = -35;
                this.Yoffset = 35;
            }
        // Running to the left    
        } else if (this.state == RUNNING && this.moving == LEFT) {
            if (this.playerType == WATERGIRL) {
                this.Xoffset = 93;
                this.Yoffset = 31;
            } else {
                this.Xoffset = 88;
                this.Yoffset = 35;
            }
        // Jumping but not holding left or right    
        } else if (this.state == FALLING && this.moving == IDLE) {
            if (this.playerType == WATERGIRL) {
                this.Xoffset = 1;
                this.Yoffset = -15;
            } else {
                this.Xoffset = 1;
                this.Yoffset = 1;
            }                
        }
        if (this.moving == IDLE || this.moving == RIGHT) {
            this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x + this.Xoffset, this.y + this.Yoffset, .25);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state].drawFrame(this.game.clockTick, ctx, -this.x - this.Xoffset, this.y + this.Yoffset, .25);
            ctx.restore();
        }
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        // this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
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
            // If the player is colliding with a ground tile
            if (entity instanceof ground && entity.BB) {
                if (this.bottomBB.collide(entity.topBB)) {
                    this.grounded = true;
                    this.y = entity.BB.top - this.h - 15;
                } else if (this.rightBB.collide(entity.leftBB)) {
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                    }
                } else if (this.leftBB.collide(entity.rightBB)) {
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                    }
                } else if (this.topBB.collide(entity.bottomBB)) {
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0;
                    }
                }
            // If the player is colliding with a liquid tile
            //TODO maybe when player is walking on liquid they are slower
            // Also ask nathan if he wants to do the liquid bb on level or lower
            }
            if (entity instanceof liquid && entity.BB) {
                if (this.bottomBB.collide(entity.BB)) {
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
                if (this.bottomBB.collide(entity.BB)) {
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
                if(this.leftBB.collide(entity.BB)) {
                    entity.rotateCounterClockwise();
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                    }
                    // if (this.velocity.x < -50) {
                    //     this.velocity.x = -50;
                    // }
                } else if (this.rightBB.collide(entity.BB)) {
                    entity.rotateClockwise();
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                    }
                    // if (this.velocity.x > 50) {
                    //     this.velocity.x = 50;
                    // }
                }
            }
            if (entity instanceof box && entity.BB) {
                if (this.bottomBB.collide(entity.topBB)) {
                    this.grounded = true;
                } else if (this.leftBB.collide(entity.rightBB)) {
                    entity.moveLeft();
                    this.maxHorizontal = 100
                } else if (this.rightBB.collide(entity.leftBB)) { 
                    entity.moveRight();
                    this.maxHorizontal = 100
                }
            }
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
