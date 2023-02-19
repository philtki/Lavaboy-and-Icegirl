class player {
    constructor (game, x, y, isIceGirl) {
        this.w = 50;
        this.h = 90;
        this.game = game;
        this.x = x;
        this.y = y;
        this.isIceGirl = isIceGirl;
        this.state = 0; // 0 = idle, 1 = falling, 2 = jumping, 3 = running
        this.moving = 0; // 0 = idle, 1 = left, 2 = right
        this.dead = false;
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;
        this.grounded = true;
        this.animations = [];
        this.loadAnimations();
        this.collidedUp = false;
        this.collidedDown = false;
        this.collidedLeft = false;
        this.collidedRight = false;
        this.removeFromWorld = false;
        if (this.isIceGirl) {
            this.name = "IG";
        } else {
            this.name = "FB";
        }
        this.BBx = this.x + 2;
        this.BBy = this.y + 12;
        this.BB = new boundingbox(this.BBx, this.BBy, this.w, this.h, "Yellow");
        this.leftBB = new boundingbox(this.BBx, this.BBy, 2, this.h, "Green");
        this.rightBB = new boundingbox(this.BBx + this.w - 2, this.BBy, 2, this.h, "Blue");
        this.topBB = new boundingbox(this.BBx, this.BBy, this.w, 2, "Purple");
        this.bottomBB = new boundingbox(this.BBx, this.BBy + this.h, this.w, 2, "Brown");
        this.lastBB = this.BB;
        this.updateBB();
    }

    loadAnimations() {
        if (!this.isIceGirl) {
            // Fireboy Idle
            this.animations[0] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 410, 214, 410, 5, 0.08);
            // Fireboy Falling
            this.animations[1] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 0, 214, 410, 5, 0.08);
            // Fireboy Jumping
            this.animations[2] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 820, 214, 410, 5, 0.08);
            // Fireboy Running Right
            this.animations[3] = new animator(ASSET_MANAGER.getAsset("./Assets/FireboySpriteSheet.png"), 0, 1230, 341, 270, 8, 0.06);
        } else {
            // Watergirl Idle
            this.animations[0] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 471, 205, 310, 11, 0.08);
            // Watergirl Falling
            this.animations[1] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 0, 202, 471, 11, 0.08);
            // Watergirl Jumping
            this.animations[2] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 781, 206, 310, 11, 0.08);
            // Watergirl Running Right
            this.animations[3] = new animator(ASSET_MANAGER.getAsset("./Assets/WatergirlSpriteSheet.png"), 0, 1091, 375, 291, 8, 0.08);
        }
    }

    update() {
        const IDLE = 0;
        const RIGHT = 1;
        const LEFT = 2;
        const JUMPING = 1;
        const FALLING = 2;
        const RUNNING = 3;
        const TICK = this.game.clockTick;
        const MIN_RUN = 5;
        const MAX_RUN = 250; //450
        const ACC_RUN = 200;
        const DEC_RUN = 40;
        const DEC_AIR = 40;
        const FALL = 10;
        const MAX_JUMP = 400;   //500

        // Running right
        this.left = this.game[this.name + "Left"];
        this.right = this.game[this.name + "Right"];
        this.up = this.game[this.name + "Up"];
        this.down = this.game[this.name + "Down"];
        
        if (this.grounded) {
            this.velocity.y = 0;
        }
        
        if(this.left && this.right) {
            this.state = IDLE;
            this.moving = IDLE;
        } else if (this.right) {
            this.state = RUNNING;
            this.moving = RIGHT;
            this.velocity.x = MAX_RUN;
        // Running Left
        } else if (this.left) {
            this.state = RUNNING;
            this.moving = LEFT;
            this.velocity.x = -MAX_RUN;
        }

        // Jumping
        if (this.up) {
            if (this.grounded) {
                this.velocity.y = -MAX_JUMP;
                this.grounded = false;
            }
        } else if (((!this.left && !this.right) || (this.left && this.right)) && !this.up) {
            this.state = IDLE;
            this.moving = IDLE;
            this.velocity.x = 0;
        }

        // If the player isn't on the ground
        if (!this.grounded) {
            if (this.velocity.y < 300) {
                this.velocity.y += 10;
            }
        }

        // If the player is no longer holding left, but is still moving in that direction
        if (!this.left && this.velocity.x < 0) {
            this.velocity.x = 0;
            if (this.moving == 2) {
                this.moving = IDLE;
            }
        }

        // If the player is no longer holding right, but is still moving in that direction
        if (!this.right && this.velocity.x > 0) {
            this.velocity.x = 0;
            if (this.moving == 1) {
                this.moving = IDLE;
            }
        }

        // 
        if (!this.right && !this.left) {
            if (this.velocity.y < 0) {
                this.state = FALLING;
            } else if (this.velocity.y > 0) {
                this.state = JUMPING;
            }
        }


        this.grounded = false;
        this.updateBB();
        this.collisionCheck();
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
    };

    updateBB() {
        this.BBx = this.x + 2;
        this.BBy = this.y + 12;
        this.lastBB = this.BB;
        this.BB = new boundingbox(this.BBx, this.BBy, this.w, this.h, "Yellow");
        this.leftBB = new boundingbox(this.BBx, this.BBy, 2, this.h, "Green");
        this.rightBB = new boundingbox(this.BBx + this.w - 2, this.BBy, 2, this.h, "Blue");
        this.topBB = new boundingbox(this.BBx + 2, this.BBy, this.w - 4, 2, "Purple");
        this.bottomBB = new boundingbox(this.BBx + 2, this.BBy + this.h, this.w - 4, 2, "Brown");
    }


    draw(ctx) {
        // Moving
        const IDLE = 0;
        const RIGHT = 1;
        const LEFT = 2;
        // State
        const JUMPING = 1;
        const FALLING = 2;
        const RUNNING = 3;

        if (this.isIceGirl) {
            this.Xoffset = 0;
            this.Yoffset = 26;
        } else {
            this.Xoffset = 0;
            this.Yoffset = 1;
        }
        // Jumping but not holding left or right
        if (this.state == FALLING && this.moving == IDLE) {
            if (this.isIceGirl) {
                this.Xoffset = 1;
                this.Yoffset = 31;
            } else {
                this.Xoffset = 2;
                this.Yoffset = 35;
            }
        // Running to the right    
        } else if (this.state == RUNNING && this.moving == RIGHT) {
            if (this.isIceGirl) {
                this.Xoffset = -45;
                this.Yoffset = 31;
            } else {
                this.Xoffset = -35;
                this.Yoffset = 35;
            }
        // Running to the left    
        } else if (this.state == RUNNING && this.moving == LEFT) {
            if (this.isIceGirl) {
                this.Xoffset = 93;
                this.Yoffset = 31;
            } else {
                this.Xoffset = 88;
                this.Yoffset = 35;
            }
        // Falling but not holding left or right    
        } else if (this.state == JUMPING && this.moving == IDLE) {
            if (this.isIceGirl) {
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
        // console.log("Player state: " + this.state);
        // console.log("Player moving: " + this.moving);
        //TODO idle position is diff from running
        //to draw bounding box
        // this.BB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        // this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
        }

    collisionCheck() {
        this.game.entities.forEach(entity => {
            // If the player is colliding with a ground tile
            if (entity instanceof ground && entity.BB) {
                if (this.bottomBB.collide(entity.topBB)) {
                    this.grounded = true;
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0;
                    }
                    // console.log("Player is on top of a block");
                }
                if (this.rightBB.collide(entity.leftBB)) {
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                        // console.log("Player has collided with the left side of a block");
                    }
                }
                if (this.leftBB.collide(entity.rightBB)) {
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                        // console.log("Player has collided with the right side of a block");
                    }
                }
                if (this.topBB.collide(entity.bottomBB)) {
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0;
                        // console.log("Player has collided with the bottom of a block");
                    }
                }
            }

            // If the player is colliding with a liquid tile
            //TODO maybe when player is walking on liquid they are slower
            // Also ask nathan if he wants to do the liquid bb on level or lower
            if (entity instanceof liquid && entity.BB) {
                if (this.bottomBB.collide(entity.BB)) {
                    if (!entity.isGreen) {
                        if (this.isIceGirl) {
                            if (entity.isLava) {
                                //this.die();
                            }
                            // if (this.velocity.y > 0) {
                            //     this.velocity.y = 0;
                            // }
                            this.grounded = true;
                        } else {
                            if (!entity.isLava) {
                                this.die();
                            }
                            // if (this.velocity.y > 0) {
                            //     this.velocity.y = 0;
                            // }
                            this.grounded = true;
                        }
                    } else {
                        this.die();
                    }
                    // console.log("Player collided with a liquid");
                }
            }
            //gem collision
            if (entity instanceof gem && entity.BB) {
                if (this.BB.collide(entity.BB)) {
                    if (this.isIceGirl) {
                        if (!entity.isRed) {
                            //entity.removeFromWorld = true;
                            //entity.el.goDown = true;
                            entity.el.setDown(true);
                        } else {
                            //entity.el.goDown = false;
                            entity.el.setDown(false);
                        }
                    } else {
                        if (entity.isRed) {
                            entity.removeFromWorld = true;
                        }
                    }
                    // console.log("Player collided with a gem" + entity.el.goDown);
                }


            }

            //elevator collision
            if (entity instanceof elevator && entity.BB) {
                if (this.BB.collide(entity.BB)) {
                    this.grounded = true;
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0;
                    }
                    // console.log("Player is on top of a block");
                }
            }
        });
    }

    //TODO add death animation smoke
    die() {
        // this.removeFromWorld = true;
        this.game.camera.loadTestLevel(levelOne2);
    }
}
