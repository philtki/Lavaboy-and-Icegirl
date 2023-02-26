class ground {
    constructor(game, x, y, side) {
        Object.assign(this, { game, x, y, side});
        this.h = 48
        this.w = 48
        //this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/bricksOG.png");
        // if (side == "0000") {
        //     this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick0000.png");
        // }
        switch (side) {
            case "A":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick0000.png");
                break;
            case "B":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick1111.png");
                break;
            case "C":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick0110.png");
                break;
            case "D":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick0111.png");
                break;
            case "E":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick1110.png");
                break;
            case "F":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick0010.png");
                break;
            case "G":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick0100.png");
                break;
            case "H":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick1000.png");
                break;
            case "I":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick0001.png");
                break;
            case "J":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick1100.png");
                break;
            case "K":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/Bricks/brick0101.png");
                break;
        }
        this.BB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 8, this.y, PARAMS.BLOCKWIDTH * 3 / 4, PARAMS.BLOCKWIDTH, "Red");
        this.leftBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Green");
        this.rightBB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 2, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Blue");
        this.topBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Blue");
        this.bottomBB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Brown");
        this.removeFromWorld = false;

    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
        ctx.draw
        // this.BB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        //this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
    };
}