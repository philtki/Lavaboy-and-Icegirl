class box {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.h = PARAMS.BLOCKWIDTH;
        this.w = PARAMS.BLOCKWIDTH;
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Yellow");
        this.lastBB = this.BB;
        this.removeFromWorld = false; 
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/box.png");
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

        if (this.moving == IDLE) {
            this.velocity.x = 0;
        } else if (this.moving == RIGHT) {
            this.velocity.x = 100;
        } else if (this.moving == LEFT) {
            this.velocity.x = -100;
        }
        if (!this.grounded) {
            this.velocity.y += 10;
        } else {
            this.velocity.y = 0;
        }
        this.updateBB();
        this.grounded = false;
        this.collisionCheck();
        this.x += this.velocity.x * TICK;
        this.y += this.velocity.y * TICK;
        this.moving = IDLE;
    };

    moveRight() {
        this.moving = 1;
    };

    moveLeft() {
        this.moving = 2;
    };

    updateBB() {
        this.lastBB = this.BB;
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Yellow");
    };

    collisionCheck() {
        this.game.entities.forEach(entity => {
            if (entity instanceof ground && entity.BB) {
                if (entity.BB.left - 5 <= this.BB.left + this.w / 2 <= entity.BB.right + 5 && this.lastBB.bottom <= entity.BB.top) {
                    this.y = entity.BB.top - this.h;
                    this.velocity.y === 0;
                    this.grounded = true;
                }
                // Box should never collide with the underside of a block unless maybe it's on an elevator?
                if (this.velocity.x > 0) {
                    if (entity.BB.bottom <= this.BB.bottom <= entity.BB.top && this.lastBB.right <= entity.BB.left) {
                        this.velocity.x = 0;
                    }
                }
                if (this.velocity.x < 0) {
                    if (entity.BB.bottom <= this.BB.bottom <= entity.BB.top && this.lastBB.left >= entity.BB.right) {
                        this.velocity.x = 0;
                    }  
                }
            }
        });
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
        this.BB.draw(ctx);
    };
}    