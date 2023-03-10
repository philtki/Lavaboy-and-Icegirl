// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(options) {
        // What you will use to draw
        // Documentation: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
        this.ctx = null;

        // Everything that will be updated and drawn each frame
        this.entities = [];
        
        this.WGLeft = false;
        this.WGRight = false;
        this.WGUp = false;
        this.WGDown = false;
        this.FBLeft = false;
        this.FBRight = false;
        this.FBUp = false;
        this.FBDown = false;

        // Information on the input
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.keys = {};

        // Options and the Details
        this.options = options || {
            debugging: false,
        };
    };

    init(ctx) {
        this.ctx = ctx;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        this.running = true;
        const gameLoop = () => {
            this.loop();
            requestAnimFrame(gameLoop, this.ctx.canvas);
        };
        gameLoop();
    };

    startInput() {
        var that = this;
        this.ctx.canvas.addEventListener("keydown", function (e) {
            switch (e.code) {
                case "ArrowLeft" :
                    that.FBLeft = true;
                    break;
                case "ArrowRight" :
                    that.FBRight = true;
                    break;
                case "ArrowUp" :
                    that.FBUp = true;
                    break;
                case "ArrowDown" :
                    that.FBDown = true;
                    break;
                case "KeyA" :
                    that.WGLeft = true;
                    break;
                case "KeyD" :
                    that.WGRight = true;
                    break;
                case "KeyW" :
                    that.WGUp = true;
                    break;
                case "KeyS" :
                    that.WGDown = true;
                    break;
                case "KeyQ" :
                    that.startGame = true;
                    break;
                case "KeyR" :
                    that.retryGame = true;
                    break;
            }
        })

        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft" :
                    that.FBLeft = false;
                    break;
                case "ArrowRight" :
                    that.FBRight = false;
                    break;
                case "ArrowUp" :
                    that.FBUp = false;
                    break;
                case "ArrowDown" :
                    that.FBDown = false;
                    break;
                case "KeyA" :
                    that.WGLeft = false;
                    break;
                case "KeyD" :
                    that.WGRight = false;
                    break;
                case "KeyW" :
                    that.WGUp = false;
                    break;
                case "KeyS" :
                    that.WGDown = false;
                    break;
                case "KeyQ" :
                    that.startGame = false;
                    break;
                case "KeyR" :
                    that.retryGame = false;
                    break;
            }
        })
    };

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        // Clear the whole canvas with transparent color (rgba(0, 0, 0, 0))
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw latest things first
        for (let i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].draw(this.ctx, this);
        }
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (let i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };

};
