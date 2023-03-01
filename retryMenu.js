class retryMenu {
    constructor(game, gems) {
        Object.assign(this, { game, gems});
    };

    update() {
        this.game.clockTick = false;
        this.retryGame = this.game["retryGame"];
        if (this.retryGame) {
            //console.log("pessed r");
            this.game.camera.loadTestLevel(levelOne2, false);
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
        ctx.fillText("Gems Collected: " + this.gems, 360, 520);
        ctx.fillText("Press R to Retry", 380, 650);
    };
}