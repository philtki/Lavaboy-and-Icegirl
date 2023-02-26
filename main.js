const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Assets/background.png");
ASSET_MANAGER.queueDownload("./Assets/FireboySpriteSheet.png");
ASSET_MANAGER.queueDownload("./Assets/WatergirlSpriteSheet.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/bricksOG.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick0000.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick0110.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick0111.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick1110.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick1111.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick0010.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick0100.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick1000.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick0001.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick1100.png");
ASSET_MANAGER.queueDownload("./Assets/bricks/brick0101.png");
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
