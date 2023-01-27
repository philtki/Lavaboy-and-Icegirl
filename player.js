class player {
    constructor (game, isIceGirl) {
        this.game = game;
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
        // Fireboy Idle
        this.animations[0] = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 410, 214, 410, 5, 0.08);
        // Fireboy Falling
        this.animations[1] = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 0, 214, 410, 5, 0.08);
        // Fireboy Jumping
        this.animations[2] = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 820, 214, 410, 5, 0.08);
        // Fireboy Running Right
        this.animations[3] = new animator(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 1230, 341, 270, 8, 0.06);
    }

    update() {
        // Running right
        if (this.game.FBRight && !this.game.FBLeft) {
            this.state = 3;
            this.moving = 2;
        // Running Left
        } else if (this.game.FBLeft && !this.game.FBRight) {
            this.state = 3;
            this.moving = 1;
        // Jumping
        } else if (this.game.FBUp && !this.game.FBDown && !this.game.FBLeft && !this.game.FBRight) {
            this.state = 2;
            this.moving = 0;
        // Falling
        } else if (this.game.FBDown && !this.game.FBUp && !this.game.FBLeft && !this.game.FBRight) {
            this.state = 1;
            this.moving = 0;
        // Idle
        } else {
            this.state = 0;
            this.moving = 0;
        }
    };


    draw(ctx) {
 
        this.animations[this.state].drawFrame(this.game.clockTick, ctx, 500, 500, .3);
        // ctx.drawImage(ASSET_MANAGER.getAsset("./Assets/Fireboy/SpriteSheet.png"), 0, 0);
    }
}