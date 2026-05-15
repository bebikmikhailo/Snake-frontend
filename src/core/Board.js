import { MAP_HEIGHT } from "../script.js";
import { MAP_WIDTH } from "../script.js";
import { CELL_SIZE } from "../script.js";

export class Board {
    constructor(game) {
        this.game = game;
        this.lightColor = "#b0a7ff";
        this.darkColor = "#a787ff";
    }

    draw(context) {
        let isOdd = ((MAP_WIDTH / CELL_SIZE) % 2 === 0);
        let swtch = false;
        let y = 0;
        for (let j = 0; j < MAP_HEIGHT / CELL_SIZE; j++) {
            let x = 0;
            for (let i = 0; i < MAP_WIDTH / CELL_SIZE; i++) {
                context.fillStyle = (swtch) ? this.lightColor : this.darkColor;
                context.fillRect(x, y, CELL_SIZE, CELL_SIZE);
                swtch = !swtch;
                x += CELL_SIZE;
            }
            y += CELL_SIZE;
            if (isOdd) {
                swtch = !swtch;
            }
        }
    }

    hasAvailableSpace() {
        const totalMapSegments = (MAP_WIDTH / CELL_SIZE) * (MAP_HEIGHT / CELL_SIZE);
        return totalMapSegments > (this.game.snake.body.length - 1 +
                                    this.game.foodManager.food.length);
    }

    applyStyle(style) {
        this.lightColor = style.secondary;
        this.darkColor = style.primary;
    }


}