class lever {
    constructor (game, x, y, ele) {
        Object.assign(this, { game, x, y, ele});
        this.baseH = 17;
        this.baseW = 45;
        this.handleH = 32;
        this.handleW = 11;
        this.h = 5;
        this.w = 5;
        this.spritesheet = [];
        this.base = ASSET_MANAGER.getAsset("./Assets/leverBase.png");
        this.handle = ASSET_MANAGER.getAsset("./Assets/leverHandle.png");
        this.BB = new boundingbox(this.x + this.baseW / 2, this.y + (42 - this.baseH), 10, 10, "Red");
        this.leftBB = new boundingbox(this.x + this.baseW / 2, this.y + (42 - this.baseH), 2, 10, "Yellow");
        this.rightBB = new boundingbox(this.x + this.baseW / 2 + 8, this.y + (42 - this.baseH), 2, 10, "Green");
        this.hasBB = true;
        this.hasLeftBB = true;
        this.hasRightBB = true;
        this.removeFromWorld = false;
        this.currentAngle = 0;
        this.angle = (7 * Math.PI) / 4;
        console.log(this.angle);
        this.lastRotate = 0; // 0 for clockwise, 1 for counterclockwise
        // this.angle = 0;
    };

    update() {
        if (this.lastRotate == 0 && this.angle > 0 && this.angle < Math.PI / 4) {
            this.rotateClockwise();
        } else if (this.lastRotate == 1 && this.angle > (7 * Math.PI) / 4 && this.angle < 2 * Math.PI) {
            this.rotateCounterClockwise()
        }
        if (this.angle == Math.PI / 4) {
            // console.log("Lever is all the way to the right");
            this.ele.setDown(true, 3);
        } else if (this.angle == (7 * Math.PI) / 4) {
            // console.log("Lever is all the way to the left");
            this.ele.setDown(false, 3);
        }
        this.updateBB();
    };

    updateBB() {
        this.xOffset = 16 * Math.sin(Math.PI * 2 * (this.angle * (180 / Math.PI)) / 360);
        this.yOffset = 16 * Math.cos(Math.PI * 2 * (this.angle * (180 / Math.PI)) / 360);
        this.BB = new boundingbox(this.x + this.baseW / 2 + this.xOffset, this.y + (42 - this.baseH) - this.yOffset, 10, 10, "Red");
        this.leftBB = new boundingbox(this.x + this.baseW / 2 + this.xOffset, this.y + (42 - this.baseH) - this.yOffset, 2, 10, "Yellow");
        this.rightBB = new boundingbox(this.x + this.baseW / 2 + this.xOffset + 8, this.y + (42 - this.baseH) - this.yOffset, 2, 10, "Green");
    };

    rotateClockwise() {
        if (this.angle + 0.01 <= Math.PI / 4 || this.angle + 0.01 >= (7 * Math.PI) / 4) {
            this.angle += 0.01;
            if (this.angle > 2 * Math.PI) {
                this.angle = 0;
            }
        } else {
            this.angle = Math.PI / 4;
        }
        this.lastRotate = 0;
    };

    rotateCounterClockwise() {
        if (this.angle - 0.01 <= Math.PI / 4 || this.angle - 0.01 >= (7 * Math.PI) / 4) {
            this.angle -= 0.01;
            if (this.angle < 0) {
                this.angle = 2 * Math.PI;
            }
        } else {
            this.angle = (7 * Math.PI) / 4;
        }
        this.lastRotate = 1;
    };

    draw(ctx) {
        var offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = this.handleH * 2;
        offScreenCanvas.height = this.handleH * 2;
        var offScreenCtx = offScreenCanvas.getContext('2d');
        offScreenCtx.save();
        offScreenCtx.translate(this.handleH, this.handleH);
        offScreenCtx.rotate(this.angle);
        offScreenCtx.translate(-this.handleH, -this.handleH);
        offScreenCtx.drawImage(this.handle, this.handleH - this.handleW / 2, 0, this.handleW, this.handleH);
        offScreenCtx.restore();

        ctx.drawImage(offScreenCanvas, this.x + this.baseW / 2 - 30, this.y, this.handleH * 2, this.handleH * 2);
        ctx.drawImage(this.base, this.x, this.y + (42 - this.baseH), this.baseW, this.baseH);
        // this.BB.draw(ctx);
        // this.leftBB.draw(ctx);
        // this.rightBB.draw(ctx);
    }
}