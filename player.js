class player {
    constructor (game, x, y, isIceGirl) {
        this.game = game;
        this.x = x;
        this.y = y + 7;
        this.isIceGirl = isIceGirl;
        this.state = 0; // 0 = idle, 1 = falling, 2 = jumping, 3 = running
        this.moving = 0; // 0 = idle, 1 = left, 2 = right
        this.dead = false;
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;
        this.grounded = true;
        this.animations = [];
        this.loadAnimations();
        if (this.isIceGirl) {
            this.BB = new boundingbox(this.x + 10, this.y + 10, 40, 90, "Yellow");
            this.name = "IG";
        } else {
            this.BB = new boundingbox(this.x + 10, this.y + 10, 40, 90, "Yellow");
            this.name = "FB";
        }
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
        const MAX_RUN = 150;
        const ACC_RUN = 200;
        const DEC_RUN = 40;
        const DEC_AIR = 40;
        const MAX_FALL = 270;
        const MAX_JUMP = 300;

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
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;


        //TODO collison bug

        this.updateBB();
        this.collisionCheck();


        // console.log("State is: " + this.state);
        // console.log("Moving is: " + this.moving);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new boundingbox(this.x + 5, this.y + 12, 40, 90, "Yellow");
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
                this.Xoffset = 2;
                this.Yoffset = 35;
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

        // this.animations[0].drawFrame(this.game.clockTick, ctx, 500, 500, .3);
        // this.animations[3].drawFrame(this.game.clockTick, ctx, 500  - 43, 500 + 42, .3);

        // ctx.drawImage(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 0);
    }

    collisionCheck() {
        this.game.entities.forEach(entity => {
            if (entity.BB && this.BB.collide(entity.BB)) {
                if (this.velocity.y > 0) {
                    // Landing on the ground
                    this.grounded = false;
                    if (entity instanceof Ground && this.lastBB.bottom < entity.BB.top && this.BB.collide(entity.topBB)) {
                        this.velocity.y = 0;
                        this.grounded = true;
                        console.log("Player has collided with the top of a block");
                    } else if (entity instanceof Ground && this.BB.collide(entity.topBB)) {
                        this.grounded = true;
                    }
                // Jumping
                } else if (this.velocity.y < 0) {
                    // Hitting ceiling
                    if (entity instanceof Ground && this.lastBB.top >= entity.BB.bottom) {
                        // this.y = entity.bottomBB.bottom - 2;
                        this.velocity.y = 0;
                        console.log("Player has collided with the bottom of a block");
                    }
                }
                
                // Collides with left side of the ground
                if (entity instanceof Ground && this.lastBB.right <= entity.BB.left && this.lastBB.bottom - 2 > entity.BB.top && this.BB.collide(entity.leftBB)) {
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                    }w
                    this.x = entity.leftBB.left - 50;
                    console.log("Player has collided with the left side of a block");
                // Collides with the right side of the ground
                } else if (entity instanceof Ground && this.lastBB.left >= entity.BB.right && this.lastBB.bottom - 2 > entity.BB.top && this.BB.collide(entity.rightBB)) {
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                    }
                    this.x = entity.rightBB.right - 2;
                    console.log("Player has collided with the right side of a block");
                }
            }
        });
    }
}
