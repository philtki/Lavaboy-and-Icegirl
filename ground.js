class ground {
    constructor(game, x, y, side) {
        Object.assign(this, { game, x, y, side});
        this.h = PARAMS.BLOCKWIDTH;
        this.w = PARAMS.BLOCKWIDTH;
        this.underLiquid = false;
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
            case "F2":
                this.underLiquid = true;
                this.hasBottomBB = true;
                this.hasLeftBB = true;
                this.hasRightBB = true;
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
                break;
            case "L":
                this.hasLeftBB = true;
                this.hasBottomBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1010.png");
                break;
            case "M":
                this.hasRightBB = true;
                this.hasBottomBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick0011.png");
                break;
            case "N":
                this.hasLeftBB = true;
                this.hasRightBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1001.png");
                break;
            case "O":
                this.hasLeftBB = true;
                this.hasBottomBB = true;
                this.hasRightBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1011.png");
                break;
            case "P":
                this.hasLeftBB = true;
                this.hasTopBB = true;
                this.hasRightBB = true;
                this.spritesheet = ASSET_MANAGER.getAsset("./Assets/bricks/brick1101.png");
        }
        if (this.hasBB) {
            if (this.underLiquid) {
                this.BB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, "Red");
            } else {
                this.BB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, "Red");
            }
        }
        if (this.hasTopBB) {
            this.topBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "Yellow");
        }
        if (this.hasBottomBB) {
            if (this.underLiquid) {
                this.bottomBB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH * 2.6, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2.8, "Black");
            } else {
                this.bottomBB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH / 2, "brown");
            }
        }
        if (this.hasLeftBB) {
            if (this.underLiquid) {
                this.leftBB = new boundingbox(this.x, this.y + PARAMS.BLOCKWIDTH * 2.7, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH / 2.8, "green");
            } else {
                this.leftBB = new boundingbox(this.x, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Green");
            }
        }
        if (this.hasRightBB) {
            if (this.underLiquid) {
                this.rightBB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 2, this.y + PARAMS.BLOCKWIDTH * 2.7, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH / 2.8, "Blue");
            } else {
                this.rightBB = new boundingbox(this.x + PARAMS.BLOCKWIDTH / 2, this.y, PARAMS.BLOCKWIDTH / 2, PARAMS.BLOCKWIDTH, "Blue");
            }
        }
        this.removeFromWorld = false;

    };

    update() {
    };

    draw(ctx) {
        if (this.underLiquid) {
            ctx.drawImage(this.spritesheet, this.x, this.y + 48 * 2.6, this.w, this.h / 2.8);
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + 48 * 2.6);
            ctx.lineTo(this.x + this.w, this.y + 48 * 2.6);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + 48 * 2.96);
            ctx.lineTo(this.x + this.w, this.y + 48 * 2.96);
            ctx.stroke();
        } else {
            ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
            ctx.draw;
        }

        // if (this.hasBB) {
        //     this.BB.draw(ctx);
        // }
        // if (this.hasTopBB) {
        //     this.topBB.draw(ctx);
        // }
        // if (this.hasBottomBB) {
        //     this.bottomBB.draw(ctx);
        // }
        // if (this.hasLeftBB) {
        //     this.leftBB.draw(ctx);
        // }
        // if (this.hasRightBB) {
        //     this.rightBB.draw(ctx);
        // }
        // this.BB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
        //this.topBB.draw(ctx);
        // this.bottomBB.draw(ctx);
    };
}