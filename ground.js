class Ground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks.png");

        this.BB = new boundingbox(this.x - 3, this.y - 3, this.w + 3, this.h + 3, "Red");
        this.leftBB = new boundingbox(this.x - 3, this.y - 3, 2, this.h + 3, "Green");
        this.rightBB = new boundingbox(this.x + this.w - 2, this.y - 3, 2, this.h + 3, "Blue");
        this.topBB = new boundingbox(this.x - 3, this.y - 3, this.w + 3, 2, "Purple");
        this.bottomBB = new boundingbox(this.x - 3, this.y + this.h, this.w + 3, 2, "Brown");

    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
        // this.BB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        // this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
    };
}