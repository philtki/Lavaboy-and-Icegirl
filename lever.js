class lever {
    constructor (game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });

        this.spritesheet = [];
        this.base = ASSET_MANAGER.getAsset("./Assets/leverBase.png");
        this.handle = ASSET_MANAGER.getAsset("./Assets/leverHandle.png");
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Red");
        this.removeFromWorld = false;
        this.currentAngle = 0;
    };

    update() {

    };

    draw(ctx) {
        var offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = 64;
        offScreenCanvas.height = 64;
        var offScreenCtx = offScreenCanvas.getContext('2d');
        offScreenCtx.save();
        offScreenCtx.translate(32, 32);
        offScreenCtx.rotate(Math.PI / 4);
        offScreenCtx.translate(-32, -32);
        offScreenCtx.drawImage(this.handle, 26.5, 0, 11, 32);
        offScreenCtx.restore();

        ctx.drawImage(offScreenCanvas, this.x + this.w / 2 - 35, this.y + 0, 64, 64);
        ctx.drawImage(this.base, this.x, this.y + (42 - this.h), this.w, this.h);
    }
}