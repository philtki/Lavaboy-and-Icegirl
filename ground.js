class ground {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.h = 48
        this.w = 48
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./Assets/op.png");

        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Red");
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Yellow");
        this.leftBB = new boundingbox(this.x, this.y + 2, 2, this.h - 4, "Green");
        this.rightBB = new boundingbox(this.x + this.w - 2, this.y + 2, 2, this.h - 4, "Blue");
        this.topBB = new boundingbox(this.x, this.y, this.w, 2, "Purple");
        this.bottomBB = new boundingbox(this.x, this.y + this.h, this.w, 2, "Brown");
        this.removeFromWorld = false;

    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
        // this.BB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        // this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
    };
}