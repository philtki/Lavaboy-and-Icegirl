const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./Assets/background.png");
ASSET_MANAGER.queueDownload("./Assets/Fireboy/SpriteSheet.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new fireboy(gameEngine));
	gameEngine.addEntity(new background());

	gameEngine.init(ctx);

	gameEngine.start();
});
