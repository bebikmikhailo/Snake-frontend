import { UserService } from "../core/UserService.js";

export class LeaderboardPage {
    constructor() {
        this.userService = new UserService();

        this.leaderboardPage = document.querySelector(".js-leaderboard-page");
        this.playesTable = document.querySelector(".js-best-players-container");

        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelector(".js-leaderboard-page-back-button").addEventListener("click", () => {
            this.hideLeaderboardPage();
        });    
    }

    hideLeaderboardPage() {
        this.leaderboardPage.style.display = "none";
    }

    async displayLeaderboardPage() {
        const players = await this.userService.getBestPlayersByScore(25);
        this.loadDataToTable(players);
        this.leaderboardPage.style.display = "flex";
    }

    loadDataToTable(players) {
        let tableContent = "";
        let count = 1;
        players.forEach((player) => {
            tableContent += `
            <div class="content-item">
                <span>${count++}</span>
                <div class="table-avatar-username-conteiner">
                    <img src="${this.userService.getAvatarProperPath(player.user_avatar)}" alt="avatar" class="table-avatar">
                    <span class="table-username">${player.user_name}</span>
                </div>
                <span>${player.best_score}</span>
            </div>
            `
        });

        this.playesTable.innerHTML = tableContent;
    }
}
