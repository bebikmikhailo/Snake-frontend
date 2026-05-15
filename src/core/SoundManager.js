export class SoundManager {
    constructor() {
        this.soundsPath = "assets/sounds/";
        this.appleCrunch = new Audio(`${this.soundsPath}apple-crunch1-200.mp3`);
        this.snakeMove = new Audio(`${this.soundsPath}do-the-second.mp3`);
        this.snakeColide = new Audio(`${this.soundsPath}gunshot-quicker.mp3`);
        this.snakeMoveW = new Audio(`${this.soundsPath}c-note-sound.mp3`);
        this.snakeMoveA = new Audio(`${this.soundsPath}do-the-second.mp3`);
        this.snakeMoveS = new Audio(`${this.soundsPath}fa-note-sound.mp3`);
        this.snakeMoveD = new Audio(`${this.soundsPath}note-do.mp3`);
    }

    applyVolume(volume) {
        this.snakeMoveW.volume = volume;
        this.snakeMoveA.volume = volume;
        this.snakeMoveS.volume = volume;
        this.snakeMoveD.volume = volume;
        this.snakeMove.volume = volume;
        this.appleCrunch.volume = volume;
        this.snakeColide.volume = volume;
    }

    playAppleCrunchSound() {
        this.appleCrunch.currentTime = 0;
        this.appleCrunch.play();
    }

    playSnakeMoveSound() {
        this.snakeMove.currentTime = 0;
        this.snakeMove.play();
    }

    playSnakeColideSound() {
        this.snakeColide.currentTime = 0;
        this.snakeColide.play();
    }

    playSnakeMoveForwardSound() {
        this.snakeMoveW.currentTime = 0;
        //this.snakeMoveW.play();
    }

    playSnakeMoveBackwardSound() {
        this.snakeMoveS.currentTime = 0;
        //this.snakeMoveS.play();
    }

    playSnakeMoveRightSound() {
        this.snakeMoveD.currentTime = 0;
        //this.snakeMoveD.play();
    }

    playSnakeMoveLeftSound() {
        this.snakeMoveA.currentTime = 0;
        //this.snakeMoveA.play();
    }

}