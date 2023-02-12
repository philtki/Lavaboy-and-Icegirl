class liquid {
    constructor(game, x, y, isLava) {
        Object.assign(this, { game, x, y, isLava});
        this.BB = new boundingbox(this.x, this.y + 10, 31 * 1.6, 20, "White");
        this.bottomBB = new boundingbox(this.x, this.y + 40, 31 * 1.6, 2, "Brown");
        if (isLava) {
            this.frames = 23;
            this.animation = new animator(ASSET_MANAGER.getAsset("./Assets/liquid.png"), 9, 1359, 31, 20, 9, .04);
        } else {
            this.frames = 19;
            this.animation = new animator(ASSET_MANAGER.getAsset("./Assets/liquid.png"), 375, 1660, 31, 20, 13, .04);
        }
        this.removeFromWorld = false;
    };

    update() {
    };

    draw(ctx) {
        this.animation.drawFrame2(this.game.clockTick, ctx, this.x, this.y - 5, 1.6, this.frames);
        this.BB.draw(ctx);
        this.bottomBB.draw(ctx);
    };
}