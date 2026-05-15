import { getUsernameFromJWT } from "../utils/utils.js";

export class EditAccountPage {
    constructor(accountManager) {
        this.accountManager= accountManager;


        this.editAccountPage = document.querySelector(".js-edit-account-page");
        this.editUsernameInput = document.querySelector(".js-edit-username-input");
        this.editAvatarInput = document.querySelector(".js-avatar-input");

        this.messageBlock = document.querySelector(".js-edit-page-message-block");
        this.messageText = document.querySelector(".js-edit-page-message-block .js-message-text");

        this.previewImage64x64 = document.querySelector(".js-preview-avatar-64x64");
        this.previewImage40x40 = document.querySelector(".js-preview-avatar-40x40");
        this.initEventListeners();
    }

    initEventListeners() {
        document.querySelector(".js-edit-account-page-back-button").addEventListener("click", () => {
            this.hidePage();
        });

        document.querySelector(".js-edit-page-close-message-button").addEventListener("click", () => {
            this.hideMessageBlock();
        });

        document.querySelector(".js-avatar-input").addEventListener("change", () => {
            if (this.editAvatarInput.files && this.editAvatarInput.files[0]) {
                this.showAvatarPreview(this.editAvatarInput.files[0]);
            }
        });

        document.querySelector(".js-edit-account-save-button").addEventListener("click", async () => {
            const username = this.editUsernameInput.value;
            const avatar = this.editAvatarInput.files && this.editAvatarInput.files[0];
            const currentUsername = getUsernameFromJWT();
            if ((username != currentUsername) || avatar) {

                if (username != currentUsername && !avatar) {

                    this.saveAndSetUsername(username);

                } else if (username === currentUsername && avatar) {
                    this.saveAndSetAvatar(avatar);
                    this.editAvatarInput.value = "";


                } else {
                    this.saveAndSetUsername(username);
                    this.saveAndSetAvatar(avatar);

                    this.editAvatarInput.value = "";
                }

                this.hidePage();
            } else {
                this.displayMessageBlock("Nothing to save", "error");
            }

        });
    }

    async saveAndSetUsername(username) {
        const response = await this.accountManager.game.userService.saveUsername(username);

        if (response.message) {
            this.displayMessageBlock(response.message, "error");
        } else {
            localStorage.setItem("token", response.token);
            this.accountManager.game.hud.menuManager.setUserInfo();
        }
    }

    async saveAndSetAvatar(avatar) {
        await this.accountManager.game.userService.saveAvatar(avatar);
        setTimeout(async () => {
            const avatarPath = await this.accountManager.game.userService.getAvatar();
            localStorage.setItem("avatarPath", avatarPath);
            this.accountManager.game.hud.menuManager.setAvatar();
        }, 100);
    }

    showAvatarPreview(avatar) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const previewImage64x64 = document.querySelector(".js-preview-avatar-64x64");
            const previewImage40x40 = document.querySelector(".js-preview-avatar-40x40");
            previewImage64x64.src = e.target.result;
            previewImage40x40.src = e.target.result;
        }

        reader.readAsDataURL(avatar);

    }


    displayPage() {
        this.editAccountPage.style.display = "block";
        this.loadAccountData();
        this.accountManager.game.hud.menuManager.setAvatar();
    }

    hidePage() {
        this.hideMessageBlock();
        this.accountManager.displayAccountMenu();
        this.editAccountPage.style.display = "none";
    }

    loadAccountData() {
        this.editUsernameInput.value = getUsernameFromJWT();
    }

    displayMessageBlock(message, type) {
        this.messageText.textContent = message;

        if (type === "error" && !this.messageBlock.classList.contains("error")) {
            this.messageBlock.classList.replace("message", "error");
        } else if (type == "message" && !this.messageBlock.classList.contains("message")) {
            this.messageBlock.classList.replace("error", "message");
        }

        this.messageBlock.style.display = "block";
    }

    hideMessageBlock() {
        this.messageBlock.style.display = "none";
    }

    setAvatar(avatarPath) {
        this.previewImage64x64.src = avatarPath;
        this.previewImage40x40.src = avatarPath
    }
}