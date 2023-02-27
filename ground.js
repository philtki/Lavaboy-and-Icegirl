class ground {
    constructor(game, x, y, side) {
        Object.assign(this, { game, x, y, side});
        this.h = PARAMS.BLOCKWIDTH;
        this.w = PARAMS.BLOCKWIDTH;
        switch (side) {
            case "A":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0000.png");
                break;
            case "B":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1111.png");
                break;
            case "C":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0110.png");
                break;
            case "D":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0111.png");
                break;
            case "E":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1110.png");
                break;
            case "F":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0010.png");
                break;
            case "G":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0100.png");
                break;
            case "H":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1000.png");
                break;
            case "I":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0001.png");
                break;
            case "J":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1100.png");
                break;
            case "K":
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0101.png");
        }
        this.BB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, "Red");
        this.leftBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Green");
        this.rightBB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 2, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Blue");
        this.topBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Yellow");
        this.bottomBB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "brown");
        this.removeFromWorld = false;

    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
        ctx.draw
        this.BB.draw(ctx);
        this.leftBB.draw(ctx);
        this.rightBB.draw(ctx);
        this.topBB.draw(ctx);
        this.bottomBB.draw(ctx);
    };
}