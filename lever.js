class lever {
    constructor (game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });

        this.spritesheet = [];
        this.base = ASSET_MANAGER.getAsset("./Assets/leverBase.png");
        this.handle = ASSET_MANAGER.getAsset("./Assets/leverHandle.png");
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Red");
        this.removeFromWorld = false;
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.handle, this.x + this.w / 2 - 3, this.y + 0, 11, 32);
        ctx.drawImage(this.base, this.x, this.y + (42 - this.h), this.w, this.h);
    }
}