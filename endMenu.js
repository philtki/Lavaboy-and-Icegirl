class endMenu {
    constructor(game, gems) {
        Object.assign(this, { game, gems});
    };

    update() {
        this.game.clockTick = false;
        this.startGame = this.game["startGame"];
        if (this.startGame) {
            //console.log("pessed r");
            //this.game.camera.loadLevel(this.game.camera.currentLevel, false, false);
            //this.game.clockTick = true;
            //this.dead = false;
            //this.loadTestLevel(levelOne2);
        }
    };

    draw(ctx) {
        ctx.drawImage(ASSET_MANAGER.getAsset("./Assets/titleBackground.png"), -397, 1, 1705, 960);
        ctx.drawImage(ASSET_MANAGER.getAsset("./Assets/deathScreen.png"), 230, 130, 620, 618);
        ctx.font = '70px "Trajan-Pro-Regular"';
        ctx.fillStyle = "rgb(241, 211, 41)";
        ctx.fillText("Congratulation", 330, 400);
        ctx.font = '50px "Trajan-Pro-Regular"';
        ctx.fillText("Gems Collected: " + this.gems + "/10", 320, 520);
        ctx.fillText("Refresh to Retry", 380, 650);
        ctx.drawImage()
    };
}