class gem {
    constructor(game, x, y, gemColor) {
        Object.assign(this, { game, x, y, gemColor});
        this.h = 31;
        this.w = 27;
        this.BB = new boundingbox(this.x, this.y, this.h, this.w, "White");
        const REDGEM = 4;
        this.gemColor = gemColor;
        if (this.gemColor == REDGEM) {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/redGem.png");
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/blueGem.png");
        }
        this.removeFromWorld = false;
    };

    update() {
    };

    updateBB() {
        this.BB = new boundingbox(this.x, this.y, this.h, this.w, "White");
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
        //this.BB.draw(ctx);
    };
}