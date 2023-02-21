class door {
    constructor(game, x, y, isRed) {
        Object.assign(this, { game, x, y, isRed});
        this.BB = new boundingbox(this.x, this.y + 40, 60, 60, "White");
        if (isRed) {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/doorRed.png");
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/doorBlue.png");
        }
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, 60, 100);
        //this.BB.draw(ctx);
    };
}