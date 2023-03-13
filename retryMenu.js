class retryMenu {
    constructor(game, gems, maxGems) {
        Object.assign(this, { game, gems, maxGems});
    };

    update() {
        this.game.clockTick = false;
        if (this.game.startGame) {
            //console.log("pessed r");
            this.game.camera.loadLevel(this.game.camera.currentLevel, false, false);
            this.game.camera.retryMenuRemoved();
            //this.game.clockTick = true;
            //this.dead = false;
            //this.loadTestLevel(levelOne2);
        }
    };

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Assets/deathScreen.png"), 230, 130, 620, 618);
        ctx.font = '70px "Trajan-Pro-Regular"';
        ctx.fillStyle = "rgb(241, 211, 41)";
        ctx.fillText("GAME OVER", 330, 400);
        ctx.font = '50px "Trajan-Pro-Regular"';
        ctx.fillText("Gems Collected: " + this.gems +  " / " + this.maxGems, 320, 520);
        ctx.fillText("Press Q to Retry", 380, 650);
    };
}