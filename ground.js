class ground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./Assets/op.png");

        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Red");
        this.leftBB = new boundingbox(this.x, this.y, 2, this.h, "Green");
        this.rightBB = new boundingbox(this.x + this.w - 2, this.y, 2, this.h, "Blue");
        this.topBB = new boundingbox(this.x + 2, this.y, this.w - 4, 2, "Purple");
        this.bottomBB = new boundingbox(this.x + 2, this.y + this.h, this.w - 4, 2, "Brown");
        this.removeFromWorld = false;

    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, 48, 48);
        // this.BB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        // this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
    };
}