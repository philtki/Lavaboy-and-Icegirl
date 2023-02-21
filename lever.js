class lever {
    constructor (game, x, y, w, h, ele) {
        Object.assign(this, { game, x, y, w, h, ele});

        this.spritesheet = [];
        this.base = ASSET_MANAGER.getAsset("./Assets/leverBase.png");
        this.handle = ASSET_MANAGER.getAsset("./Assets/leverHandle.png");
        this.BB = new boundingbox(this.x, this.y + this.h + 2, this.w, this.h, "Red");
        this.removeFromWorld = false;
        this.currentAngle = 0;
        this.angle = (7 * Math.PI) / 4;
        console.log("Math.PI / 4: " + Math.PI / 4);
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
            this.ele.setDown(true);
        } else if (this.angle == (7 * Math.PI) / 4) {
            // console.log("Lever is all the way to the left");
            this.ele.setDown(false);
        }
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
    }

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
    }

    draw(ctx) {
        var offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = 64;
        offScreenCanvas.height = 64;
        var offScreenCtx = offScreenCanvas.getContext('2d');
        offScreenCtx.save();
        offScreenCtx.translate(32, 32);
        offScreenCtx.rotate(this.angle);
        offScreenCtx.translate(-32, -32);
        offScreenCtx.drawImage(this.handle, 26.5, 0, 11, 32);
        this.fakeBB = new boundingbox(26.5, 0, 11, 32, "Blue");
        // this.fakeBB.draw(offScreenCtx);
        offScreenCtx.restore();

        ctx.drawImage(offScreenCanvas, this.x + this.w / 2 - 30, this.y, 64, 64);
        ctx.drawImage(this.base, this.x, this.y + (42 - this.h), this.w, this.h);
        // this.BB.draw(ctx);
        console.log("Current angle: " + this.angle);
    }
}