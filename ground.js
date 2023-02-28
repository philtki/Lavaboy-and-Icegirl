class ground {
    constructor(game, x, y, side) {
        Object.assign(this, { game, x, y, side});
        this.h = PARAMS.BLOCKWIDTH;
        this.w = PARAMS.BLOCKWIDTH;
        this.hasBB = true;
        this.hasTopBB = false;
        this.hasBottomBB = false;
        this.hasLeftBB = false;
        this.hasRightBB = false;
        switch (side) {
            case "A":
                this.hasBB = false;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0000.png");
                break;
            case "B":
                this.hasTopBB = true;
                this.hasBottomBB = true;
                this.hasLeftBB = true;
                this.hasRightBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1111.png");
                break;
            case "C":
                this.hasTopBB = true;
                this.hasBottomBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0110.png");
                break;
            case "D":
                this.hasTopBB = true;
                this.hasBottomBB = true;
                this.hasRightBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0111.png");
                break;
            case "E":
                this.hasTopBB = true;
                this.hasBottomBB = true;
                this.hasLeftBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1110.png");
                break;
            case "F":
                this.hasBottomBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0010.png");
                break;
            case "G":
                this.hasTopBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0100.png");
                break;
            case "H":
                this.hasLeftBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1000.png");
                break;
            case "I":
                this.hasRightBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0001.png");
                break;
            case "J":
                this.hasTopBB = true;
                this.hasLeftBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1100.png");
                break;
            case "K":
                this.hasTopBB = true;
                this.hasRightBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0101.png");
        }
        if (this.hasBB) {
            this.BB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, "Red");
        }
        if (this.hasTopBB) {
            this.topBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Yellow");
        }
        if (this.hasBottomBB) {
            this.bottomBB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "brown");
        }
        if (this.hasLeftBB) {
            this.leftBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Green");
        }
        if (this.hasRightBB) {
            this.rightBB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 2, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Blue");
        }
        this.removeFromWorld = false;

    };

    update() {
    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.h, this.w);
        ctx.draw
        if (this.hasBB) {
            this.BB.draw(ctx);
        }
        if (this.hasTopBB) {
            this.topBB.draw(ctx);
        }
        if (this.hasBottomBB) {
            this.bottomBB.draw(ctx);
        }
        if (this.hasLeftBB) {
            this.leftBB.draw(ctx);
        }
        if (this.hasRightBB) {
            this.rightBB.draw(ctx);
        }
        // this.BB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        // this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
    };
}