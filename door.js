class door {
    constructor(game, x, y, doorType) {
        Object.assign(this, { game, x, y, doorType});
        this.doorType = doorType;
        const REDDOOR = 8;
        const BLUEDOOR = 9;
        this.BB = new boundingbox(this.x, this.y + 40, 60, 60, "White");
        switch (this.doorType) {
            case REDDOOR:
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/doorRed.png");
                break;
            case BLUEDOOR:
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/doorBlue.png");
                break;
        }
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, 60, 100);
        //this.BB.draw(ctx);
    };
}