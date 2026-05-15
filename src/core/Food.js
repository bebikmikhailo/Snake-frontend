export class Food {
    constructor(score, speedBoost, segment) {
        this.score = score;
        this.speedBoost = speedBoost;
        this.segment = segment;
    }

    draw(context) {
        throw new Error("draw() is abstract method of Food class")
    }

    static getInstance(...args) {
        return new this(...args);
    }
}