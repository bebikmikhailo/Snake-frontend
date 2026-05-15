export class Segment {
    constructor(x, y, oldX = x, oldY = y) {
        this.x = x;
        this.y = y;
        this.oldX = oldX;
        this.oldY = oldY;
    }

    static getRandomSegment(width, height, cellSize) {
        const x = Math.floor(Math.random() * (width / cellSize)) * cellSize;
        const y = Math.floor(Math.random() * (height / cellSize)) * cellSize;
        return new Segment(x, y);
    }

    static isSegmentsColide(segment1, segment2) {
        return (segment1.x === segment2.x && segment1.y === segment2.y);
    }

    clone() {
        return new Segment(this.x, this.y, this.oldX, this.oldY);
    }
}