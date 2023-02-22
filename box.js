class box {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.h = 38
        this.w = 38
        this.BB = new boundingbox(this.x, this.y, this.h, this.w, "Red");
        this.removeFromWorld = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./Asset/box.png");
    };

    update() {

    };

    draw() {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
    };
}    