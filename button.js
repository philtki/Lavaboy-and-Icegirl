class button {
    constructor (game, x, y, ele, num) {
        Object.assign(this, { game, x, y, ele, num});
        this.h = 15;
        this.w = 40;
        this.index = num;
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/button.png");
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Red");
        this.hasBB = true;
        this.removeFromWorld = false;
        this.isPressed = false;
        this.depressedAmount = 0;
        this.ele.isLever = false;
    };

    update() {
        this.collisionCheck();
        if (this.depressedAmount == 14) {
            this.ele.setDown(true, this.index);
        } else if (this.depressedAmount == 0) {
            this.ele.setDown(false, this.index);
        }
    };

    collisionCheck() {
        this.isPressed = false;
        this.game.entities.forEach(entity => {
            if ((entity instanceof player || entity instanceof box) && this.BB.collide(entity.BB)) {
                this.isPressed = true;
                this.depress();
            }
        });
        if (!this.isPressed) {
            this.raise();
        }
    };

    depress() {
        if (this.depressedAmount < 14) {
            this.depressedAmount += 1;
        }
    };

    raise() {
        if (this.depressedAmount > 0) {
            this.depressedAmount -= 1;
        }
    };

    draw(ctx) {
        var offScreenCanvas = document.createElement('canvas');
        offScreenCanvas.width = this.w;
        offScreenCanvas.height = this.h - this.depressedAmount;
        var offScreenCtx = offScreenCanvas.getContext('2d');
        offScreenCtx.save();
        offScreenCtx.drawImage(this.spritesheet, 0, 0, this.w, this.h);
        offScreenCtx.restore();
        // console.log(this.h - this.depressedAmount);
        ctx.drawImage(offScreenCanvas, this.x, this.y + this.depressedAmount, this.w, this.h - this.depressedAmount);
        // this.BB.draw(ctx);
        // console.log("Current angle: " + this.angle);
    };
}