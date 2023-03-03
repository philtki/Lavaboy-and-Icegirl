class box {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.h = PARAMS.BLOCKWIDTH;
        this.w = PARAMS.BLOCKWIDTH;
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Yellow");
        this.topBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Yellow");
        this.bottomBB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "brown");
        this.leftBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Green");
        this.rightBB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 2, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Blue");
        this.lastBB = this.BB;
        this.removeFromWorld = false; 
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/box.png");
        this.hasBB = true;
        this.hasTopBB = true;
        this.hasBottomBB = true;
        this.hasLeftBB = true;
        this.hasRightBB = true;
        this.movingLeft = false;
        this.movingLeft = false;
        this.state = 0;
        this.moving = 0;
        this.grounded = true;
        this.velocity = { x: 0, y: 0 };
    };

    update() {
        const IDLE = 0;
        const RIGHT = 1;
        const LEFT = 2;
        const FALLING = 3;
        const TICK = this.game.clockTick;

        if ((!this.movingLeft && !this.movingRight) || (this.movingLeft && this.movingRight)) {
            this.velocity.x = 0;
        } else if (!this.movingLeft && this.movingRight) {
            this.velocity.x = 150;
        } else if (this.movingLeft && !this.movingRight) {
            this.velocity.x = -150;
        }
        if (!this.grounded) {
            this.velocity.y += 10;
        } else {
            this.velocity.y = 0;
        }
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;

        this.updateBB();
        this.collisionCheck();
        this.movingLeft = false;
        this.movingRight = false;
    };

    moveRight() {
        this.movingRight = true;
    };

    moveLeft() {
        this.movingLeft = true;
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Yellow");
        this.topBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Yellow");
        this.bottomBB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Brown");
        this.leftBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Green");
        this.rightBB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 2, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Blue");
    };

    collisionCheck() {
        this.grounded = false;
        this.game.entities.forEach(entity => {
            if (entity.hasBB && this.BB.collide(entity.BB)) {    
                if (entity.hasTopBB && ((entity.BB.left <= this.BB.left && this.BB.left <= entity.BB.right) ||  (entity.BB.left <= this.BB.right && this.BB.right <= entity.BB.right)) && this.BB.bottom - 5 <= entity.BB.top) {
                    if (entity instanceof ground) {
                        this.grounded = true;
                        if (this.velocity.y < 0 && this.lastBB.bottom <= entity.BB.top) {
                            this.y = entity.BB.top - PARAMS.BLOCKWIDTH * 1.9 - this.verticalOffset;
                            this.velocity.y === 0;
                        }
                    }
                }
                // Jumping
                if (this.velocity.y < 0 && entity.hasBottomBB) {
                    if (entity instanceof ground) {
                        if (((entity.BB.left <= this.BB.left && this.BB.left <= entity.BB.right) ||  (entity.BB.left <= this.BB.right && this.BB.right <= entity.BB.right)) && this.lastBB.top >= entity.BB.bottom ) {
                            this.velocity.y = 0;
                        }
                    }
                }
                // Left Right
                if ((entity.BB.top - (this.h - entity.h) < this.BB.top && this.BB.top < entity.BB.bottom - 5) || (entity.BB.top + 5 < this.BB.bottom && this.BB.bottom < entity.BB.bottom + (this.h - entity.h))) {
                    if (entity instanceof ground) {
                        if (entity.hasLeftBB && this.BB.collide(entity.leftBB)) {
                            console.log("Box has collided with the left side of a block");
                            this.x = entity.BB.left - PARAMS.BLOCKWIDTH;
                            if (this.velocity.x > 0) {
                                this.velocity.x = 0;
                            }
                        } else if (entity.hasRightBB && this.BB.collide(entity.rightBB)) {
                            console.log("Box has collided with the right side of a block");
                            this.x = entity.BB.right;
                            if (this.velocity.x < 0) {
                                this.velocity.x = 0;
                            }
                        }
                    }
                }
            } 
        });
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
        this.BB.draw(ctx);
        this.topBB.draw(ctx);
        this.bottomBB.draw(ctx);
        this.leftBB.draw(ctx);
        this.rightBB.draw(ctx);
    };
}    