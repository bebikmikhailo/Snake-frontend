import { Apple } from "../core/Apple.js";

export const MAP_HUD_PRESETS = {
    light_purple: {
        map: {
            primary: "#a787ff",
            secondary: "#b0a7ff",
        },

        hud: "purple"
    },

    light_green: {
        map: {
            primary: "#4ade80",
            secondary: "#86efac",
        },

        hud: "green"
    },

    light_red: {
        map: {
            primary: "#f87171",
            secondary: "#fca5a5",
        },
        
        hud: "darkred"
    },

    light_orange: {
        map: {
            primary: "#fb923c",
            secondary: "#fdba74",
        },
        
        hud: "#8B4000"
    },

    light_grey: {
        map: {
            primary: "#9ca3af",
            secondary: "#d1d5db",
        },
        
        hud: "grey"
    }
};

export const SNAKE_COLOR_PRESETS = {
    light_blue: {
        color: "200",
        saturation: "100"
    },

    green: {
        color: "100",
        saturation: "50"
    },

    orange: {
        color: "400",
        saturation: "100"
    },

    purple: {
        color: "280",
        saturation: "100"
    },

    red: {
        color: "0",
        saturation: "100"
    }
};

export const FOOD_PRESETS = {
    "apple": Apple
};