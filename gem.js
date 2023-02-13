class gem {
    constructor(game, x, y, isRed) {
        Object.assign(this, { game, x, y, isRed});
        this.BB = new boundingbox(this.x, this.y, 31, 27, "White");
        if (isRed) {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/redGem.png");
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/blueGem.png");
        }
        this.removeFromWorld = false;
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, 31, 27);
        //this.BB.draw(ctx);
    };
}