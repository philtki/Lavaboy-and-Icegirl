class elevator {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.h = 32;
        this.w = 144;
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "White");
        this.topBB = new boundingbox(this.x, this.y, this.w, 2, "Green");
        this.bottomBB = new boundingbox(this.x, this.y + this.h, this.w, 2, "Brown");
        this.leftBB = new boundingbox(this.x, this.y, 2, this.h, "Yellow");
        this.rightBB = new boundingbox(this.x + this.w - 2, this.y, 2, 32, "Red");
        this.startingPosY = this.y;
        this.goDown = false;
        this.isMoving = false;
        this.hasBB = true;
        this.hasTopBB = true;
        this.hasBottomBB = true;
        this.hasLeftBB = true;
        this.hasRightBB = true;
        this.speed = 100;
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/elevator.png");
    };

    setDown(pos) {
        this.goDown = pos;
    }

    update() {
        // console.log("Elevator goes down: " + this.goDown + " isMoving: " + this.isMoving);
        // TODO uncomment this for switch type up and down mechanics
        if (this.goDown) {
            if (this.y <= this.startingPosY) {
                this.isMoving = true;
                this.speed = 100;

            } else if (this.y >= this.startingPosY + 144) {
                this.isMoving = false;
                this.speed = 0;
            }
        } else {
            if (this.y >= this.startingPosY + 144) {
                this.isMoving = true;
                this.speed = -100;
            } else if (this.y <= this.startingPosY) {
                this.isMoving = false;
                this.speed = 0;
            }
        }
        this.y += this.speed * this.game.clockTick;

        // TODO this is for loop up and down for win and lose scenario
        // if (this.y > this.startingPosY + 144) {
        //     this.isMoving = true;
        //     this.speed = -100;
        // } else if (this.y <= this.startingPosY) {
        //     this.isMoving = true;
        //     this.speed = 100;
        // }
        // this.y += this.speed * this.game.clockTick;

        this.updateBB();
    };

    updateBB() {
        this.BB = new boundingbox(this.x, this.y, this.w, this.h, "White");
        this.topBB = new boundingbox(this.x, this.y, this.w, 2, "Green");
        this.bottomBB = new boundingbox(this.x, this.y + this.h, this.w, 2, "Brown");
        this.leftBB = new boundingbox(this.x, this.y, 2, this.h, "Yellow");
        this.rightBB = new boundingbox(this.x + this.w - 2, this.y, 2, 32, "Red");
    }

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, this.w, this.h);
        this.BB.draw(ctx);
        this.topBB.draw(ctx);
        this.bottomBB.draw(ctx);
        this.leftBB.draw(ctx);
        this.rightBB.draw(ctx);
    };
}