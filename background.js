class background {
    constructor() {
        this.backgroundImage = ASSET_MANAGER.getAsset("./Assets/background.png");
    };

    update() {

    };

    draw(ctx) {
        //ctx.drawImage(this.backgroundImage, 1, 1, 1104, 960);
        ctx.drawImage(this.backgroundImage, 1, 1, 1656, 1440);
    };
}