import { Segment } from './Segment.js';
import { SnakeSprite } from './SnakeSprite.js';

import { MAP_WIDTH } from '../script.js';
import { MAP_HEIGHT } from '../script.js';
import { CELL_SIZE } from '../script.js';
import { DECREASE_INTERVAL_VALUE } from '../script.js';

export class Snake {
    constructor(game) {
        this.game = game;
        this.height = CELL_SIZE;
        this.width = CELL_SIZE;
        this.speed = CELL_SIZE;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.body = [

            new Segment(CELL_SIZE * 4, CELL_SIZE * 8),
            new Segment(CELL_SIZE * 3, CELL_SIZE * 8),
            new Segment(CELL_SIZE * 2, CELL_SIZE * 8)
        ];
        this.sprite = new SnakeSprite(this, 200, 100, 0.45);
        this.moveDirection = "Right";
    }

    reset() {
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.body = [

            new Segment(CELL_SIZE * 4, CELL_SIZE * 8),
            new Segment(CELL_SIZE * 3, CELL_SIZE * 8),
            new Segment(CELL_SIZE * 2, CELL_SIZE * 8)
        ];
        this.sprite.reset();
        this.moveDirection = "Right";
    }

    update() {
        this.chooseMoveDirection();

        const preChangeHeadClone = this.body[0].clone();

        // head
        this.body[0].oldX = this.body[0].x;
        this.body[0].oldY = this.body[0].y;
        this.body[0].x += this.xSpeed;
        this.body[0].y += this.ySpeed;

        const postChangeHeadClone = this.body[0].clone();

        if (this.checkHeadColisionWithBody() || this.checkColisionWithMap())  {
            this.game.soundManager.playSnakeColideSound();
            this.body[0] = preChangeHeadClone;
            this.colideAnimation();
            this.game.isGameEnding = true;
            return;
        }

        this.body[0] = preChangeHeadClone.clone();


        if (this.xSpeed !== 0 || this.ySpeed !== 0) {
            for (let i = this.body.length - 1; i > 0; i--) {
                this.body[i].oldX = this.body[i].x;
                this.body[i].oldY = this.body[i].y;
                this.body[i].x = this.body[i - 1].x;
                this.body[i].y = this.body[i - 1].y;
            }
        } 
        // body

        this.body[0] = postChangeHeadClone.clone();



        // this.body[0] is snake's head and I check weather snake's head colides with food or not
        if (this.game.foodManager.isFoodEaten(this.body[0])) {
            this.game.soundManager.playAppleCrunchSound();
            this.game.score++;
            this.grow();
            this.increaseSpeed();
        }
    }

    draw(context, progress) {
        this.sprite.draw(context, progress);
    }


    // checks weather snake colides with map, if yes restarts game
    checkColisionWithMap() {
        return this.body.some(segment => {
            if ((segment.x + this.width > MAP_WIDTH || segment.x < 0) ||
                (segment.y + this.height > MAP_HEIGHT || segment.y < 0)) {

                    return true;
                }
        });
    }

    chooseMoveDirection() {
        const lastKeyPressed = this.game.listner.getLastPressedKey();

        if (lastKeyPressed === "w" && this.moveDirection !== "Down") {
            this.game.soundManager.playSnakeMoveForwardSound();
            this.moveDirection = "Up";
            this.ySpeed = -this.speed;
            this.xSpeed = 0;
        }
        else if (lastKeyPressed === "s" && this.moveDirection !== "Up") {
            this.game.soundManager.playSnakeMoveBackwardSound();
            this.moveDirection = "Down";
            this.ySpeed = this.speed;
            this.xSpeed = 0;
        }
        else if(lastKeyPressed === "d" && this.moveDirection !== "Left") {
            this.game.soundManager.playSnakeMoveRightSound();
            this.moveDirection = "Right";
            this.xSpeed = this.speed;
            this.ySpeed = 0;
        }   
        else if(lastKeyPressed === "a" && this.moveDirection !== "Right") {
            this.game.soundManager.playSnakeMoveLeftSound();
            this.moveDirection = "Left";
            this.xSpeed = -this.speed;
            this.ySpeed = 0;
        }
    }

    isColidesWithSnake(segment) {
        return this.body.some(seg => {
            return Segment.isSegmentsColide(seg, segment);
        }); 
    }

    // to grow snake
    // adding a new segment as a new tail on position of old tail
    grow() {
        const oldTail = this.body[this.body.length - 1];
        const newTail = new Segment(oldTail.x, oldTail.y);

        newTail.oldX = oldTail.oldX;
        newTail.oldY = oldTail.oldY;

        this.body.push(newTail);
    }


    // checks weather snake's head colides with it's body, if yes restarts game
    checkHeadColisionWithBody() {
        const bodyWithOutHead = this.body.slice(1, this.body.length);
        const headSegment = this.body[0];

        return bodyWithOutHead.some(segment => {
            if (Segment.isSegmentsColide(headSegment, segment)) {
                return true;
            }
        })
    }

    increaseSpeed() {
        this.game.decreaseInterval(DECREASE_INTERVAL_VALUE);
    }

    colideAnimation() {
        [this.xSpeed, this.ySpeed] = [-this.xSpeed, -this.ySpeed];

        for (let i = 0; i < this.body.length - 1; i++) {
            const currSeg = this.body[i];
            const nextSeg = this.body[i + 1];

            [currSeg.x, currSeg.oldX] = [nextSeg.x, currSeg.x];
            [currSeg.y, currSeg.oldY] = [nextSeg.y, currSeg.y];

        }

        const lastSeg = this.body[this.body.length - 1];

        [lastSeg.x, lastSeg.oldX] = [lastSeg.oldX, lastSeg.x];
        [lastSeg.y, lastSeg.oldY] = [lastSeg.oldY, lastSeg.y];

    

        this.body = this.body.reverse();
        this.sprite.head = this.body[this.body.length - 1];
        this.sprite.tail = this.body[0];

    }

    applyStyle(style) {
        this.sprite.applyStyle(style);
    }
 }
