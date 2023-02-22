class box {
    constructor(game, x, y, h, w) {
        Object.assign(this, { game, x, y, h, w});
        this.BB = new boundingbox(this.x, this.y, h, w, "White");
        this.startingPosY = this.y;
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./Asset/box.png");
    };

    update() {

    };

    draw() {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
    };
}    