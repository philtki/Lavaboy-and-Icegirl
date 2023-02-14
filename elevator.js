class elevator {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.BB = new boundingbox(this.x, this.y, 144, 32, "White");
        this.startingPos = this.y;
        this.speed = .5;
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/elevator.png");
    };

    update() {
        this.y += this.speed + this.game.clockTick;
        if (this.y >= this.startingPos + 144) {
            //this.y = this.startingPos;
            this.y -= this.speed + this.game.clockTick;
        }
        this.updateBB();
    };

    updateBB() {
        this.BB = new boundingbox(this.x, this.y, 144, 32, "White");
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, 144, 32);
        //this.BB.draw(ctx);
    };
}