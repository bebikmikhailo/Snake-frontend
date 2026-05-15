import { AccountMenuManager } from "./AccountMenuManager.js";
import { getUsernameFromJWT, checkAuth } from "../utils/utils.js";
import { LeaderboardPage } from "./LeaderboardPage.js";
import { SettingsPage } from "./SettingsPage.js";

export class MenuManager {
    constructor(hud, game) {
        this.hud = hud;
        this.game = game;
        this.accountMenuManager = new AccountMenuManager(hud, game);
        this.leaderboardPage = new LeaderboardPage();
        this.settingsPage = new SettingsPage(this, game);

        this.restartMenu = document.querySelector(".js-hud-menu");
        this.globalOverlay = document.querySelector(".js-global-overlay");
        this.authMenu = document.querySelector(".js-auth-menu");
        this.signUpFormWindow = document.querySelector(".js-sign-up-form-window");
        this.menuScore = document.querySelector(".js-menu-score");
        this.menuBestScore = document.querySelector(".js-menu-best-score");
        this.signInForm = document.querySelector(".js-sign-in-form");
        this.signUpForm = document.querySelector(".js-sign-up-form");
        this.signInMessageBlock = document.querySelector(".js-sign-in-message-block");
        this.signInMessageText = document.querySelector(".js-sign-in-message-block .js-message-text");
        this.signUpMessageBlock = document.querySelector(".js-sign-up-message-block");
        this.signUpMessageText = document.querySelector(".js-sign-up-message-block .js-message-text");
        this.menuAccountAvatar = document.querySelector(".js-menu-account-avatar");

        this.menuSignInButton = document.querySelector(".js-menu-sign-in-button");
        this.menuPlayerAccountButton = document.querySelector(".js-player-account-button");

        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelector(".js-menu-play-button").addEventListener("click", () => {
            this.hideMenu();
            this.game.isGameEnding ? this.game.restart() : this.game.start();
        });

        document.querySelector(".js-menu-sign-in-button").addEventListener("click", () => {
            this.hideMenuWithoutOverlay();
            this.authMenu.style.display = "block";

        });

        document.querySelector(".js-sign-in-back-button").addEventListener("click", () => {
            this.hideSignInForm();
            this.displayMenu();
        });

        document.querySelector(".js-create-acc-ref").addEventListener("click", () => {
            this.hideSignInMessageBlock();
            this.signUpFormWindow.style.display = "block";
        });

        document.querySelector(".js-sign-up-back-button").addEventListener("click", () => {
            this.hideSignUpForm();
        });

        document.querySelector(".js-sign-in-ref").addEventListener("click", () => {
            this.hideSignUpForm()
        });

        document.querySelector(".js-sign-in-close-message-button").addEventListener("click", () => {
            this.signInMessageBlock.style.display = "none";
        });

        document.querySelector(".js-sign-up-close-message-button").addEventListener("click", () => {
            this.signUpMessageBlock.style.display = "none";
        });

        this.menuPlayerAccountButton.addEventListener("click", () => {
            this.hideMenuWithoutOverlay();
            this.displayAccountMenu();
        });

        document.querySelector(".js-menu-leaderboard-button").addEventListener("click", () => {
            this.leaderboardPage.displayLeaderboardPage();
        });

        document.querySelector(".js-menu-settings-button").addEventListener("click", () => {
            this.hideMenuWithoutOverlay();
            this.settingsPage.displayPage();
        });
    }

    postGameDisplayMenu() {
        this.menuScore.textContent = String(this.game.score);
        this.globalOverlay.style.display = "block";
        setTimeout(() => {
            this.restartMenu.style.display = "grid";    
        }, 100);
    }

    checkAuthAndDisplayMenu() {
        this.setUserInfo();
        this.hud.loadReguralAndBestScore();
        this.displayMenu();
    }

    displayMenu() {
        this.menuScore.textContent = String(this.game.score);
        this.globalOverlay.style.display = "block";
        this.restartMenu.style.display = "grid";
    }

    hideMenuWithoutOverlay() {
        this.restartMenu.style.display = "none";
    }

    hideMenu() {
        this.menuScore.textContent = "0";
        this.restartMenu.style.display = "none";
        this.globalOverlay.style.display = "none";
    }

    hideSignInForm() {
        this.signUpForm.reset();
        this.signInForm.reset();
        this.authMenu.style.display = "none";
        this.hideSignInMessageBlock();
    }

    hideSignUpForm() {
        this.signUpFormWindow.style.display = "none";
        this.hideSignUpMessageBlock();
    }

    displaySignInMessageBlock(message, type) {
        this.signInMessageText.textContent = message;

        if (type === "error" && !this.signInMessageBlock.classList.contains("error")) {
            this.signInMessageBlock.classList.replace("message", "error");
        } else if (type == "message" && !this.signInMessageBlock.classList.contains("message")) {
            this.signInMessageBlock.classList.replace("error", "message");
        }

        this.signInMessageBlock.style.display = "block";
    }

    hideSignInMessageBlock() {
        this.signInMessageBlock.style.display = "none";
    }

    displaySignUpMessageBlock(message, type) {
        this.signUpMessageText.textContent = message;

        if (type === "error" && !this.signUpMessageBlock.classList.contains("error")) {
            this.signUpMessageBlock.classList.replace("message", "error");
        } else if (type == "message" && !this.signUpMessageBlock.classList.contains("message")) {
            this.signUpMessageBlock.classList.replace("error", "message");
        }

        this.signUpMessageBlock.style.display = "block";
    }

    hideSignUpMessageBlock() {
        this.signUpMessageBlock.style.display = "none";
    }

    setUserInfo() {
        this.hideAuthButtons();
        this.hidePlayerAccountButton();
        if (checkAuth()) {
            this.displayPlayerAccountButton();
            this.setAvatar();
            document.querySelector(".js-account-username").textContent = getUsernameFromJWT();
            document.querySelector(".js-account-menu-username").textContent = getUsernameFromJWT();
        } else {
            this.displayAuthButtons();
        }
    }

    hideAuthButtons() {
        this.menuSignInButton.style.display = "none";
    }

    displayAuthButtons() {
        this.menuSignInButton.style.display = "block";
    }

    displayPlayerAccountButton() {
        this.menuPlayerAccountButton.style.display = "block";
    }

    hidePlayerAccountButton() {
        this.menuPlayerAccountButton.style.display = "none";
    }    

    displayAccountMenu() {
        this.accountMenuManager.displayAccountMenu();
    }

    resetScore() {
        this.menuScore.textContent = 0;
    }

    loadBestScore(bestScore) {
        this.menuBestScore.textContent = bestScore;
    }

    async setAvatar() {
        const avatarPath = localStorage.getItem("avatarPath") || await this.game.userService.getAvatar();
        this.menuAccountAvatar.src = avatarPath;
        this.accountMenuManager.setAvatar(avatarPath);
    }
}