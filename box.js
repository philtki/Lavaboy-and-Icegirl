class box {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.h = 38
        this.w = 38
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Yellow");
        this.leftBB = new boundingbox(this.x, this.y + 2, 2, this.h - 4, "Green");
        this.rightBB = new boundingbox(this.x + this.w - 2, this.y + 2, 2, this.h - 4, "Blue");
        this.topBB = new boundingbox(this.x, this.y, this.w, 2, "Purple");
        this.bottomBB = new boundingbox(this.x, this.y + this.h, this.w, 2, "Brown");
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
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Yellow");
        this.leftBB = new boundingbox(this.x, this.y + 2, 2, this.h - 4, "Green");
        this.rightBB = new boundingbox(this.x + this.w - 2, this.y + 2, 2, this.h - 4, "Blue");
        this.topBB = new boundingbox(this.x, this.y, this.w, 2, "Purple");
        this.bottomBB = new boundingbox(this.x, this.y + this.h, this.w, 2, "Brown");
    };

    collisionCheck() {
        this.game.entities.forEach(entity => {
            if (entity instanceof ground && entity.BB) {
                if (this.bottomBB.collide(entity.topBB)) {
                    this.grounded = true;
                    this.velocity.y = 0;
                }
            }
        });
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
        // this.BB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        // this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
    };
}    