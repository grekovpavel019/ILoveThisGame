export default class Retry {
    constructor() {
        this.buttons = document.querySelectorAll(".restart__retry");
        this.restartMenu = document.querySelector("#restart_menu");
        
        this.onRestart = null;

        this.buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                this.onRestart();
            });
        });

    }

    showRestartMenu() {
        this.restartMenu.style.display = "flex";
    }

    hideRestartMenu() {
        this.restartMenu.style.display = "none";
    }
}