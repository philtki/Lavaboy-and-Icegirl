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

        const TICK = this.game.clockTick;
        const MIN_RUN = 5;
        const MAX_RUN = 250; //450
        const ACC_RUN = 200;
        const DEC_RUN = 40;
        const DEC_AIR = 40;
        const MAX_FALL = 270;
        const MAX_JUMP = 400;   //500

        // Running right
        eval("this.left = this.game." + this.name + "Left;");
        eval("this.right = this.game." + this.name + "Right;");
        eval("this.up = this.game." + this.name + "Up;");
        eval("this.down = this.game." + this.name + "Down;");
        
        if (this.grounded) {
            this.velocity.y = 0;
        }
        
        if(this.left && this.right) {
            this.state = 0;
            this.moving = 0;
        } else if (this.right) {
            this.state = 3;
            this.moving = 1;
            this.velocity.x = MAX_RUN;
        // Running Left
        } else if (this.left) {
            this.state = 3;
            this.moving = 2;
            this.velocity.x = -MAX_RUN;
        }

        // Jumping
        if (this.up) {
            if (this.grounded) {
                this.velocity.y = -MAX_JUMP;
                this.grounded = false;
            }
        } else if (((!this.left && !this.right) || (this.left && this.right)) && !this.up) {
            this.state = 0;
            this.moving = 0;
            this.velocity.x = 0;
        }

        if (!this.grounded) {
            if (this.velocity.y < 200) {
                this.velocity.y += 10;
            }
        }
        
        // if (!this.state == 1 && !this.state == 2) {
        //     if (this.state == 3 && this.moving == 1) {
        //         console.log("hello");
        //         this.velocity.x = MAX_RUN;
        //     }
        // }
        if (!this.right && !this.left) {
            if (this.velocity.y < 0) {
                this.state = 2;
            } else if (this.velocity.y > 0) {
                this.state = 1;
            }
        }


        //TODO collison bugs
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
        if (this.isIceGirl) {
            this.Xoffset = 0;
            this.Yoffset = 26;
        } else {
            this.Xoffset = 0;
            this.Yoffset = 1;
        }
        if (this.state == 2 && this.moving == 0) {
            if (this.isIceGirl) {
                this.Xoffset = 1;
                this.Yoffset = 31;
            } else {
                this.Xoffset = 2;
                this.Yoffset = 35;
            }
        } else if (this.state == 3 && this.moving == 1) {
            if (this.isIceGirl) {
                this.Xoffset = -45;
                this.Yoffset = 31;
            } else {
                this.Xoffset = -35;
                this.Yoffset = 35;
            }
        } else if (this.state == 3 && this.moving == 2) {
            if (this.isIceGirl) {
                this.Xoffset = 93;
                this.Yoffset = 31;
            } else {
                this.Xoffset = 88;
                this.Yoffset = 35;
            }
        } else if (this.state == 1 && this.moving == 0) {
            if (this.isIceGirl) {
                this.Xoffset = 1;
                this.Yoffset = -15;
            } else {
                this.Xoffset = 1;
                this.Yoffset = 1;
            }                
        }
        if (this.moving == 0 || this.moving == 1) {
            this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x + this.Xoffset, this.y + this.Yoffset, .25);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state].drawFrame(this.game.clockTick, ctx, -this.x - this.Xoffset, this.y + this.Yoffset, .25);
            ctx.restore();
        }

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
                    console.log("Player is on top of a block");
                }
                if (this.rightBB.collide(entity.leftBB)) {
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                        console.log("Player has collided with the left side of a block");
                    }
                }
                if (this.leftBB.collide(entity.rightBB)) {
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                        console.log("Player has collided with the right side of a block");
                    }
                }
                if (this.topBB.collide(entity.bottomBB)) {
                    if (this.velocity.y < 0) {
                        this.velocity.y = 0;
                        console.log("Player has collided with the bottom of a block");
                    }
                }
            }

            // If the player is colliding with a liquid tile
            //TODO maybe when player is walking on liquid they are slower
            //Also ask nathan if he wants to do the liquid bb on level or lower
            if (entity instanceof liquid && entity.BB) {
                if (this.bottomBB.collide(entity.BB)) {
                    if (!entity.isGreen) {
                        if (this.isIceGirl) {
                            if (entity.isLava) {
                                this.die();
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
                    console.log("Player collided with a liquid");
                }
            }
            //gem collision
            if (entity instanceof gem && entity.BB) {
                if (this.BB.collide(entity.BB)) {
                    if (this.isIceGirl) {
                        if (!entity.isRed) {
                            entity.removeFromWorld = true;
                        }
                    } else {
                        if (entity.isRed) {
                            entity.removeFromWorld = true;
                        }
                    }
                    console.log("Player collided with a gem");
                }
            }

            //elevator collision
            if (entity instanceof elevator && entity.BB) {
                if (this.BB.collide(entity.BB)) {
                    this.grounded = true;
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0;
                    }
                    console.log("Player is on top of a block");
                }
            }
        });
    }

    //TODO add death animation smoke
    die() {
        this.removeFromWorld = true;
        location.reload();
    }
}
