class Ground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h });

        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks.png");

        this.bb = new BoundingBox(this.x, this.y, this.w, this.h);
    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
        //this.bb.draw(ctx)
    };
}