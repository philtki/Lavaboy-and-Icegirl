class button {
    constructor (game, x, y, ele) {
        Object.assign(this, { game, x, y, ele});
        this.h = 15;
        this.w = 40;
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/button.png");
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "Red");
        this.hasBB = true;
        this.removeFromWorld = false;
        this.playerStanding = false;
        this.depressedAmount = 0;
    };

    update() {
        this.collisionCheck();
        if (this.playerStanding) {
            this.depress();
        } else {
            this.raise();
        }
        if (this.depressedAmount == 14) {
            this.ele.setDown(true);
        }
        if (this.depressedAmount == 0) {
            this.ele.setDown(false);
        }
    };

    collisionCheck() {
        this.playerStanding = false;
        this.game.entities.forEach(entity => {
            if (entity instanceof player && this.BB.collide(entity.BB)) {
                this.playerStanding = true;
            }
        });
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
        console.log(this.h - this.depressedAmount);
        ctx.drawImage(offScreenCanvas, this.x, this.y + this.depressedAmount, this.w, this.h - this.depressedAmount);
        this.BB.draw(ctx);
        // console.log("Current angle: " + this.angle);
    };
}