export class IventListner {
    constructor(game) {
        this.game = game;
        this.keysPressed = [];
        this.isAnyKeyWasPressed = false;

        // a, w, s, d, a, ArrowLeft, ArrowUp, ArrowDown, ArrowRight
        this.gameKeys = [65, 87, 83, 68, 37, 38, 40, 39];



        window.addEventListener('keydown', function(e) {
            const keysToBlock = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            
            const target = e.target.tagName.toLowerCase();
            if (target === 'input' || target === 'textarea' || e.target.isContentEditable) {
                return;
            }

            if (keysToBlock.includes(e.key)) {
                e.preventDefault();
            }
        }, { passive: false });


        window.addEventListener("keydown", (ev) => {


            if (this.game.isGameEnding || !this.game.isRun) return;
            
            if (this.keysPressed.length < 3 &&
                !this.keysPressed.includes(ev.keyCode) &&
                this.gameKeys.includes(ev.keyCode)) {
                    
                this.keysPressed.push(ev.keyCode);
            }
        })
    }

    getLastPressedKey() {
        const lastKeyPressed = this.keysPressed[0];
        this.keysPressed.splice(0, 1);
        return lastKeyPressed;
    }
}