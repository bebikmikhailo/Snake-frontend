import { getUsernameFromJWT } from "../utils/utils.js";
import { StatisticPage } from "./StatisticPage.js";
import { EditAccountPage } from "./EditAccountPage.js";

export class AccountMenuManager {
    constructor(hud, game) {
        this.hud = hud;
        this.game = game;

        this.statisticPage = new StatisticPage();
        this.editAccountPage = new EditAccountPage(this);

        this.accountMenu = document.querySelector(".js-account-menu");
        this.statsPage = document.querySelector(".js-stats-page");

        this.accountAvatar = document.querySelector(".js-profile-account-avatar");
        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelector(".js-account-menu-back-button").addEventListener("click", () => {
            this.hideAccMenuAndDisplayMainMenu();
        });


        document.querySelector(".js-account-menu-logout-button").addEventListener("click", () => {
            this.unauthorizeUser();
            this.hideAccMenuAndDisplayMainMenu();
        });

        document.querySelector(".js-account-menu-stats-button").addEventListener("click", () => {
            this.hideAccountMenu();
            this.displayStatsPage();
        });

        document.querySelector(".js-stats-page-back-button").addEventListener("click", () => {
            this.hideStatsPage();
            this.displayAccountMenu();
        });

        document.querySelector(".js-account-menu-edit-profile-button").addEventListener("click", () => {
            this.hideAccountMenu();
            this.editAccountPage.displayPage();
        });
    }

    hideAccountMenu() {
        this.accountMenu.style.display = "none";
    }

    displayAccountMenu() {
        document.querySelector(".js-account-menu-username").textContent = getUsernameFromJWT();
        this.accountMenu.style.display = "grid";
    }

    hideAccMenuAndDisplayMainMenu() {
        this.hideAccountMenu();
        this.hud.menuManager.displayMenu();
    }

    unauthorizeUser() {
        localStorage.removeItem("token");
        localStorage.removeItem("bestScore");
        localStorage.removeItem("avatarPath");
        this.hud.menuManager.setUserInfo();
        this.hud.loadReguralAndBestScore();
    }

    displayStatsPage() {
        this.statsPage.style.display = "block";
        this.loadAccountStatistic();
    }

    hideStatsPage() {
        this.statsPage.style.display = "none";
    }

    async loadAccountStatistic() {
        const user = await this.game.userService.getStatistic();
        this.statisticPage.loadStatistic(user);
    }

    setAvatar(avatarPath) {
        this.accountAvatar.src = avatarPath;
        this.editAccountPage.setAvatar(avatarPath);
    }


    
}