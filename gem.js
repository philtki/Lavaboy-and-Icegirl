class gem {
    constructor(game, x, y, isRed, el) {
        Object.assign(this, { game, x, y, isRed, el});
        this.BB = new boundingbox(this.x, this.y, 31, 27, "White");
        this.startingPosY = this.y;
        this.speed = 6;
        if (isRed) {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/redGem.png");
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/blueGem.png");
        }
        this.removeFromWorld = false;
    };

    update() {
        this.y += this.speed * this.game.clockTick;
        if (this.y >= this.startingPosY + 5) {
            this.speed = -6;
        } else if (this.y <= this.startingPosY - 5) {
            this.speed = 6;
        }
        this.updateBB();
    };

    updateBB() {
        this.BB = new boundingbox(this.x, this.y, 31, 27, "White");
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, 31, 27);
        //this.BB.draw(ctx);
    };
}