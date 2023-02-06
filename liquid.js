class Lava {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.lava = new animator(ASSET_MANAGER.getAsset("./Assets/liquid.png"),
                                        9, 1359, 31, 20, 9, .04);

        this.BB = new boundingbox(this.x, this.y + 5, 31 * 1.6, 20, "White");
    };

    update() {
    };

    draw(ctx) {
        this.lava.drawFrame2(this.game.clockTick, ctx, this.x, this.y - 5, 1.6, 23);
        //this.BB.draw(ctx);
    };
}
//TODO make player gravity to fall into liquid if cant die
class Water {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.lava = new animator(ASSET_MANAGER.getAsset("./Assets/liquid.png"),
            375, 1660, 31, 20, 13, .04);

        this.BB = new boundingbox(this.x, this.y + 5, 31 * 1.6, 20, "White");
    };

    update() {
    };

    draw(ctx) {
        this.lava.drawFrame2(this.game.clockTick, ctx, this.x, this.y - 5, 1.6, 19);
        //this.BB.draw(ctx);
    };
}