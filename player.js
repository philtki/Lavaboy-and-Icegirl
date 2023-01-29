class player {
    constructor (game, isIceGirl) {
        this.game = game;
        this.isIceGirl = isIceGirl
        this.state = 0; // 0 = idle, 1 = falling, 2 = jumping, 3 = running
        this.moving = 0; // 0 = idle, 1 = left, 2 = right
        this.dead = false;
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;
        this.animations = [];
        this.loadAnimations();
        // this.animator = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 410, 214, 410, 5, 0.08);
    }

    loadAnimations() {
        if (!this.isIceGirl) {
        // Fireboy Idle
        this.animations[0] = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 410, 214, 410, 5, 0.08);
        // Fireboy Falling
        this.animations[1] = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 0, 214, 410, 5, 0.08);
        // Fireboy Jumping
        this.animations[2] = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 820, 214, 410, 5, 0.08);
        // Fireboy Running Right
        this.animations[3] = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 1230, 341, 270, 8, 0.06);
        } else {

        }
    }

    update() {
        // Running right
        if (this.game.FBRight && !this.game.FBLeft) {
            this.state = 3;
            this.moving = 1;
        // Running Left
        } else if (this.game.FBLeft && !this.game.FBRight) {
            this.state = 3;
            this.moving = 2;
        }

        // Jumping
        if (this.game.FBUp) {
            this.state = 2;
        // Falling
        } else if (this.game.FBDown) {
            this.state = 1;
        // Idle
        } else if (((!this.game.FBLeft && !this.game.FBRight) || (this.game.FBLeft && this.game.FBRight)) && !this.game.FBUp) {
            this.state = 0;
            this.moving = 0;
        }
        // console.log("State is: " + this.state);
        // console.log("Moving is: " + this.moving);
    };


    draw(ctx) {
        this.Xoffset = 0;
        this.Yoffset = 0;

        if (this.state == 3 && this.moving == 1) {
            this.Xoffset = -43;
            this.Yoffset = 42;
        } else if (this.state == 3 && this.moving == 2) {
            this.Xoffset = 105;
            this.Yoffset = 42;
        }
        
        if (this.moving == 0 || this.moving == 1) {
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, 500 + this.Xoffset, 500 + this.Yoffset, .3);
        } else {
            ctx.save();
            ctx.scale(-1, 1);
            this.animations[this.state].drawFrame(this.game.clockTick, ctx, -500 - this.Xoffset, 500 + this.Yoffset, .3);
            ctx.restore();
        }

        // this.animations[0].drawFrame(this.game.clockTick, ctx, 500, 500, .3);
        // this.animations[3].drawFrame(this.game.clockTick, ctx, 500  - 43, 500 + 42, .3);

        // ctx.drawImage(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 0);
    }
}
