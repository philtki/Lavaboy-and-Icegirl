class ground {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.h = 48
        this.w = 48
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks.png");
        //this.spritesheet = ASSET_MANAGER.getAsset("./Assets/op.png");

        this.BB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 8, this.y, PARAMS.BLOCKWIDTH * 3 / 4, PARAMS.BLOCKWIDTH, "Red");
        this.leftBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Green");
        this.rightBB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 2, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Blue");
        this.topBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Purple");
        this.bottomBB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Brown");
        this.removeFromWorld = false;

    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
        this.BB.draw(ctx);
        this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        // this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
    };
}