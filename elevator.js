class elevator {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.BB = new boundingbox(this.x, this.y, 144, 32, "White");
        this.startingPosY = this.y;
        this.goDown = false;
        this.speed = 100;
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/elevator.png");
    };

    setDown(pos) {
        this.goDown = pos;
    }

    update() {
        // this.y += this.speed * this.game.clockTick;
        // if (this.y >= this.startingPosY + 144) {
        //     this.speed = -100;
        // } else if (this.y <= this.startingPosY) {
        //     this.speed = 100;
        // }
        //TODO something wrong here for the order of the elevator to work with false
        console.log(this.goDown)
        if (!this.goDown) {
            if (this.y < this.startingPosY) {
                this.speed = 100;

            } else if (this.y >= this.startingPosY + 144) {
                this.speed = 0;
            }
        } else {
            if (this.y > this.startingPosY + 144) {
                this.speed = -100;
            } else if (this.y <= this.startingPosY) {
                this.speed = 0;
            }
        }
        this.y += this.speed * this.game.clockTick;
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