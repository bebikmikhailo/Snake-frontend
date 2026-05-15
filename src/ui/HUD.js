import { checkAuth } from "../utils/utils.js";
import { AuthManager } from "./AuthManager.js";
import { MenuManager } from "./MenuManager.js";

export class HUD {
    constructor(game) {
        this.game = game;
        this.authManager = new AuthManager(this);
        this.menuManager = new MenuManager(this, this.game);
        
        this.hudBar = document.querySelector(".js-hud-bar");
        this.hudBarScore = document.querySelector(".js-hud-bar-score");
        this.hudBarBestScore = document.querySelector(".js-hud-bar-best-score");


        document.addEventListener("DOMContentLoaded", () => {
            this.menuManager.setUserInfo();
            this.loadBestScore();
        });
    }

    draw(context) {
        this.updateScore();
    }

    displayMenu() {
        this.menuManager.postGameDisplayMenu();
    }

    hideMenu() {
        this.menuManager.hideMenu();
    }

    updateScore() {
        this.hudBarScore.textContent = String(this.game.score);
    }

    resetScore() {
        this.game.resetScore();
        this.hudBarScore.textContent = 0;
        this.menuManager.resetScore();
    }

    async loadBestScore() {
        let bestScore = 0

        if (checkAuth()) {
            bestScore = await this.game.userService.getBestScore() || 0;
        } else {
            bestScore = Number(localStorage.getItem("bestScore"));
        }

        this.hudBarBestScore.textContent = bestScore;
        this.menuManager.loadBestScore(bestScore);
    }

    async updateBestScore() {
        const isAuth = checkAuth();
        let bestScore = 0;

        if (isAuth) {
            bestScore = await this.game.userService.getBestScore() || 0;
        } else {
            bestScore = Number(localStorage.getItem("bestScore"));
        }

        if (this.game.score > bestScore) {
            this.hudBarBestScore.textContent = this.game.score;
            this.menuManager.loadBestScore(this.game.score);

            if (!isAuth) {
                localStorage.setItem("bestScore", String(this.game.score));
            }
        }
    }

    loadReguralAndBestScore() {
        this.resetScore();
        this.loadBestScore();
    }

    applyStyle(style) {
        this.hudBar.style.backgroundColor = style;
    }

    
}