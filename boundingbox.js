class boundingbox {

    constructor(x, y, width, height, color) {
        Object.assign(this, { x, y, width, height });
        this.color = color;
        this.left = x;
        this.top = y;
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    };

    collide(oth) {
        if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top) {
            return true;
        }
        return false;
    };

    draw(ctx){
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.strokeRect(this.left,this.top,this.width,this.height);
    }
};