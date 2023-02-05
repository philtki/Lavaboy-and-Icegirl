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
        this.animations = [];
        this.loadAnimations();
        if (this.isIceGirl) {
            this.BB = new boundingbox(this.x + 10, this.y + 15, 40, 90, "Yellow");
            this.name = "IG";
        } else {
            this.BB = new boundingbox(this.x + 10, this.y + 15, 40, 90, "Yellow");
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
        const MAX_FALL = 270;

        // Running right
        eval("this.left = this.game." + this.name + "Left;");
        eval("this.right = this.game." + this.name + "Right;");
        eval("this.up = this.game." + this.name + "Up;");
        eval("this.down = this.game." + this.name + "Down;");
        if(this.left && this.right) {
            this.state = 0;
            this.moving = 0;
        } else if (this.right) {
            console.log("hello");
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
            this.state = 2;
        // Falling
        } else if (this.down) {
            this.state = 1;
        // Idle
        } else if (((!this.left && !this.right) || (this.left && this.right)) && !this.up) {
            this.state = 0;
            this.moving = 0;
            this.velocity.x = 0;
        }
        
        // if (!this.state == 1 && !this.state == 2) {
        //     if (this.state == 3 && this.moving == 1) {
        //         console.log("hello");
        //         this.velocity.x = MAX_RUN;
        //     }
        // }

        this.x += this.velocity.x * TICK;


        //TODO collison bug

        this.updateBB();
        this.collisionCheck();


        // console.log("State is: " + this.state);
        // console.log("Moving is: " + this.moving);
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new boundingbox(this.x + 3, this.y + 15, 47, 88, "Yellow");
    }


    draw(ctx) {
        if (this.isIceGirl) {
            this.Xoffset = 0;
            this.Yoffset = 26;
        } else {
            this.Xoffset = 0;
            this.Yoffset = 1;
        }
        if (this.state == 2) {
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
        // this.BB.draw(ctx)

        // this.animations[0].drawFrame(this.game.clockTick, ctx, 500, 500, .3);
        // this.animations[3].drawFrame(this.game.clockTick, ctx, 500  - 43, 500 + 42, .3);

        // ctx.drawImage(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 0);
    }

    collisionCheck() {
        this.game.entities.forEach(entity => {
            if (entity.BB && this.BB.collide(entity.BB)) {
                // Jumping
                if (this.velocity.y > 0) {
                    // Landing on the ground
                    if (entity instanceof Ground && this.lastBB.bottom <= entity.BB.top) {
                        this.y = entity.BB.top - 51;
                        this.velocity.y = 0;
                    }
                }
                // Falling
                if (this.velocity.y < 0) {
                    // Hitting ceiling
                    if (entity instanceof Ground && this.lastBB.top >= entity.BB.bottom) {
                        this.y = entity.BB.top + 51;
                        this.velocity.y = 0;
                    }
                }
                // Collides with left side of the ground
                if (entity instanceof Ground && this.BB.collide(entity.leftBB)) {
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                    }
                    this.x = entity.leftBB.left - 50;
                }
                // Collides with the right side of the ground
                if (entity instanceof Ground && this.BB.collide(entity.rightBB)) {
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                    }
                    this.x = entity.rightBB.right - 3;
                }
            }
        });
    }
}
