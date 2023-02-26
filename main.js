const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Assets/background.png");
ASSET_MANAGER.queueDownload("./Assets/FireboySpriteSheet.png");
ASSET_MANAGER.queueDownload("./Assets/WatergirlSpriteSheet.png");
ASSET_MANAGER.queueDownload("./Assets/bricksOG.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick0000.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick0110.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick0111.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick1110.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick1111.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick0010.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick0100.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick1000.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick0001.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick1100.png");
ASSET_MANAGER.queueDownload("./Assets/Bricks/brick0101.png");
ASSET_MANAGER.queueDownload("./Assets/leverBase.png");
ASSET_MANAGER.queueDownload("./Assets/leverHandle.png");
ASSET_MANAGER.queueDownload("./Assets/box.png");
ASSET_MANAGER.queueDownload("./Assets/liquid.png");
ASSET_MANAGER.queueDownload("./Assets/blueGem.png");
ASSET_MANAGER.queueDownload("./Assets/redGem.png");
ASSET_MANAGER.queueDownload("./Assets/doorRed.png");
ASSET_MANAGER.queueDownload("./Assets/doorBlue.png");
ASSET_MANAGER.queueDownload("./Assets/elevator.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	new sceneManager(gameEngine);

	gameEngine.init(ctx);

	gameEngine.start();
});
