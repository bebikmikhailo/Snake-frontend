import { Game } from './core/Game.js';

const canvas = document.querySelector(".canvas-window");
const dpr = window.devicePixelRatio || 1;

const baseWidth = 640;
export const SCALE = canvas.width / (baseWidth * dpr);

export const X_OFFSET = 0;
export const Y_OFFSET = 0;

const ROWS = 17;
const COLUMNS = 15;
export const CELL_SIZE = 75; //25

canvas.width = CELL_SIZE * ROWS + X_OFFSET; // 425
canvas.height = CELL_SIZE * COLUMNS + Y_OFFSET; // 375

const ctx = canvas.getContext("2d");

export const MAP_WIDTH = canvas.width - X_OFFSET; // map width
export const MAP_HEIGHT = canvas.height - Y_OFFSET; // map height
export const FOOD_LIMIT = 1;
export const INTERVAL = 140;
export const DECREASE_INTERVAL_VALUE = 0.1;


const game = new Game();

let lastTime = 0;

function animation(timeStamp = 0) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    if (game.isRun) {
        game.timer += deltaTime;

        if (game.isGameEnding) {
            if (game.timer >= game.interval) {
                game.isRun = false;
                setTimeout(() => {
                    game.doAfterGameEnds();
                }, 1000);

            }
        }
        else {
            if (game.timer > game.interval) {
                game.update();    
                game.timer = 0;
            }
        }
    }

    const progress = (game.interval === 0) ? 0 : game.timer / game.interval;

    ctx.clearRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

    ctx.save();
    ctx.translate(X_OFFSET, Y_OFFSET);

    game.draw(ctx, progress);

    ctx.restore();

    requestAnimationFrame(animation);
}

animation();
