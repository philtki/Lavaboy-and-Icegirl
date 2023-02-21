class elevator {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.BB = new boundingbox(this.x, this.y, 144, 32, "White");
        this.startingPosY = this.y;
        this.goDown = false;
        this.isMoving = false;
        this.speed = 100;
        this.spritesheet = ASSET_MANAGER.getAsset("./Assets/elevator.png");
    };

    setDown(pos) {
        this.goDown = pos;
    }

    update() {
        // console.log("Elevator goes down: " + this.goDown + " isMoving: " + this.isMoving);
        // TODO uncomment this for switch type up and down mechanics
        // if (this.goDown) {
        //     if (this.y <= this.startingPosY) {
        //         this.isMoving = true;
        //         this.speed = 100;
        //
        //     } else if (this.y >= this.startingPosY + 144) {
        //         this.isMoving = false;
        //         this.speed = 0;
        //     }
        // } else {
        //     if (this.y >= this.startingPosY + 144) {
        //         this.isMoving = true;
        //         this.speed = -100;
        //     } else if (this.y <= this.startingPosY) {
        //         this.isMoving = false;
        //         this.speed = 0;
        //     }
        // }
        // this.y += this.speed * this.game.clockTick;

        // TODO this is for loop up and down for win and lose scenario
        if (this.y > this.startingPosY + 144) {
            this.isMoving = true;
            this.speed = -100;
        } else if (this.y <= this.startingPosY) {
            this.isMoving = true;
            this.speed = 100;
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