class Ground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks.png");

        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Red");
        this.leftBB = new boundingbox(this.x - 2, this.y, 51, 51, "Green")
        this.rightBB = new boundingbox(this.x + this.w - 49, this.y, 51, 51, "Blue")
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
        // this.BB.draw(ctx)
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
    };
}