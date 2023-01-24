class fireboy {
    constructor (game) {
        this.game = game;
        this.animator = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 410, 214, 410, 5, 0.08);
    }

    update() {

    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, 500, 500, .3);
        // ctx.drawImage(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 0);
    }
}