export class IventListner {
    constructor(game) {
        this.game = game;
        this.keysPressed = [];
        this.isAnyKeyWasPressed = false;

        this.gameKeys = ["a", "w", "s", "d"];


        window.addEventListener("keydown", (ev) => {

            if (this.game.isGameEnding || !this.game.isRun) return;
            
            if (this.keysPressed.length < 2 &&
                !this.keysPressed.includes(ev.key) &&
                this.gameKeys.includes(ev.key)) {
                    
                this.keysPressed.push(ev.key);
            }
        })
    }

    getLastPressedKey() {
        const lastKeyPressed = this.keysPressed[0];
        this.keysPressed.splice(0, 1);
        return lastKeyPressed;
    }
}