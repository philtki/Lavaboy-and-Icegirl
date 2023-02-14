class gem {
    constructor(game, x, y, isRed) {
        Object.assign(this, { game, x, y, isRed});
        this.BB = new boundingbox(this.x, this.y, 31, 27, "White");
        this.startingPos = this.y;
        this.speed = 6;
        if (isRed) {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/redGem.png");
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./Assets/blueGem.png");
        }
        this.removeFromWorld = false;
    };

    update() {
        // this.y -= .2;
        this.goDown = false;
        // if (this.y <= this.startingPos - 10) {
        //     this.goDown = true;
        // } else if (this.y >= this.startingPos + 10) {
        //     this.goDown = false;
        // }
        // if (this.goDown) {
        //     this.y += .2;
        // } else {
        //     this.y -= .2;
        // }
        // this.y -= this.speed * this.game.clockTick;
        // if (this.y >= this.startingPos - 10 &&  this.y != this.startingPos) {
        //     this.y += this.speed * this.game.clockTick;
        // }

        if (this.y <= this.startingPos - 10) {
            this.goDown = true;
            console.log("go down")
        }
        if (this.y >= this.startingPos + 10){
            this.goDown = true;
            console.log("go up")
        }

        if (this.goDown) {
            this.y += this.speed * this.game.clockTick;
            //this.y = this.startingPos;
        } else {
            this.y -= this.speed * this.game.clockTick;
        }


    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, this.x, this.y, 31, 27);
        //this.BB.draw(ctx);
    };
}