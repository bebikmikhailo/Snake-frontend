import { MAP_HUD_PRESETS, SNAKE_COLOR_PRESETS, FOOD_PRESETS } from "../utils/presets.js"

export class SettingsPage {
    constructor(menuManager, game) {
        this.menuManager= menuManager;
        this.game = game;

        this.settingsPage = document.querySelector(".js-settings-page");
        this.volumeInput = document.querySelector(".js-volume-input");
        this.volumeValueContainer = document.querySelector(".js-volume-value-container");
        this.volumeIcon = document.querySelector(".js-volume-icon");
        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelector(".js-menu-settings-back-button").addEventListener("click", () => {
            this.hidePage();
        });    

        document.querySelector(".js-settings-apply-button").addEventListener("click", () => {
            const settings = this.gatherSettings();
            this.applySettings(settings);
            this.hidePage();
        });

        this.initIcons();

        this.volumeInput.addEventListener("input", (event) => {
            const value = event.target.value;
            this.volumeValueContainer.textContent = `${Math.round(value * 100)}%`;

            if (Number(value) === 0) {
                this.volumeIcon.src = "../client/assets/images/volume-off-icon.svg"
            } else {
                this.volumeIcon.src = "../client/assets/images/volume-icon.svg"
            }
        });
    }


    displayPage() {
        this.settingsPage.style.display = "grid";
    }

    hidePage() {
        this.menuManager.displayMenu();
        this.settingsPage.style.display = "none";

    }

    initIcons() {
        const icons = document.querySelectorAll(".js-movable-icon");

        icons.forEach((icon) => {
            icon.addEventListener("click", () => {

                const categoryRow = icon.closest(".js-category-row");

                const allRowIcons = categoryRow.querySelectorAll(".js-movable-icon");

                allRowIcons.forEach((rowIcon) => {
                    rowIcon.classList.remove("selected");
                });

                icon.classList.add("selected");
            });

        });
    }

    gatherSettings() {
        const settings = {};

        const selectedElmnts = document.querySelectorAll(".selected");

        selectedElmnts.forEach((element) => {
            const sectionName = element.closest(".js-category-row").dataset.section;

            const value = element.dataset.value;
            settings[sectionName] = value;
        });

        settings["game_sounds_volume"] = this.volumeInput.value;

        return settings;
    }

    configureSettings(settings) {
        const confSettings = {};

        confSettings["map_hud"] = MAP_HUD_PRESETS[settings.map_hud];
        confSettings["snake_color"] = SNAKE_COLOR_PRESETS[settings.snake_color];
        confSettings["food_type"] = FOOD_PRESETS[settings.food_type];
        confSettings["game_sounds_volume"] = settings.game_sounds_volume;

        return confSettings;
    }

    applySettings(settings) {
        const configuratedSettings = this.configureSettings(settings);
        this.game.applySettings(configuratedSettings);
    }

}