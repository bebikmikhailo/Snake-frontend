import { Segment } from './Segment.js';
import { Apple } from './Apple.js';
import { FOOD_LIMIT } from '../script.js';
import { MAP_WIDTH } from '../script.js';
import { MAP_HEIGHT } from '../script.js';
import { CELL_SIZE } from '../script.js';

export class FoodManager {
    constructor(game, foodClass) {
        this.game = game;
        this.food = [];
        this.foodLimit = FOOD_LIMIT;
        this.foodClass = foodClass;
    }


    setFoodClass(foodClass) {
        this.foodClass = foodClass;
    }

    //drows food
    draw(context) {
        this.food.forEach(food => {
            food.draw(context);
        })
    }

    // generates food
    update() {
        this.generateFood();
    }


    generateFood() {
        while (!this.isEnoughFoodOnMap() && this.game.board.hasAvailableSpace()) {
            const foodSegment = Segment.getRandomSegment(MAP_WIDTH, MAP_HEIGHT, CELL_SIZE);
            if (!this.game.snake.isColidesWithSnake(foodSegment) && !this.isSegmentColideFood(foodSegment)) {
                this.food.push(this.foodClass.getInstance(foodSegment, 0.6));
            }
        }

    }

    isEnoughFoodOnMap() {
        return this.food.length === this.foodLimit;
    }


    // I use to ckeck is new food has free segment to spawn
    isSegmentColideFood(segment) {
        return this.food.some(seg => {
            return Segment.isSegmentsColide(seg.segment, segment);
        });
    }


    // I use to ckeck weather the snake ate food, if it is the food deletes
    isFoodEaten(segment) {
        return this.food.some(food => {
            if (Segment.isSegmentsColide(segment, food.segment)) {
                const foodIndex = this.food.indexOf(food);
                this.food.splice(foodIndex, 1);
                return true;
            }
            return false;
        });
    }

}