import { formatDate } from "../utils/utils.js";

export class StatisticPage {
    constructor() {
        this.games = document.querySelector(".js-stat-games");
        this.eatenFood = document.querySelector(".js-stat-eaten-food");
        this.bestScore = document.querySelector(".js-stat-best-score");
        this.lastGameAt = document.querySelector(".js-stat-last-game-at");
    }

    loadStatistic(user) {
        this.games.textContent = user.games_count;
        this.eatenFood.textContent = user.total_eaten_food_count;
        this.bestScore.textContent = user.best_score;
        this.lastGameAt.textContent = formatDate(user.last_game_at);
    }
}