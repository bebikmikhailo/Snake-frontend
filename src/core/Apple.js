import { Food } from './Food.js';
import { CELL_SIZE } from '../script.js';

export class Apple extends Food{
    constructor(segment, size) {
        super(1, 1, segment);
        this.size = size;
    }

    draw(context) {
        // context.beginPath();
        // context.fillStyle = "red";
        // context.arc(this.segment.x + (CELL_SIZE / 2), this.segment.y + (CELL_SIZE / 2), this.radius, 0, 2 * Math.PI);
        // context.fill();
        const s = this.size;
        const x = this.segment.x + (CELL_SIZE / 2);
        const y = this.segment.y + (CELL_SIZE / 2);

        // shades

        context.save();
        context.shadowColor = 'rgba(0, 0, 0, 0.25)';
        context.shadowOffsetY = 10;

        // red body
        context.beginPath();
        context.fillStyle = "red";
        context.arc(x, y, 50 * s, 0, 2 * Math.PI);
        context.fill();
        context.closePath();

        context.restore();

        // glare
        context.beginPath();
        context.fillStyle = "#FF7074";
        context.ellipse(x - 20 * s, y - 25 * s, 17 * s, 12 * s, 90, 0, 2 * Math.PI);
        context.fill();
        context.closePath();

        // branch
        context.beginPath();
        context.fillStyle = "brown";
        context.fillRect(x - 5 * s, y - 65 * s, 10 * s, 30 * s);
        context.closePath();

        // leaf
        context.beginPath();
        context.fillStyle = "green";
        context.ellipse(x + 15 * s, y - 55 * s, 20 * s, 8 * s, 100, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }
}