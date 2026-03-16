import Level1 from "./Levels/Level1.js";
import Level2 from "./Levels/Level2.js";

export default class Game {

    #myApp;
    levels = [];
    currentLevelIndex;

    constructor(myApp) {
        this.#myApp = myApp;
        this.levels = [Level1, Level2];

        this.loadLevel(0);
    }

    loadLevel(index) {
        if (this.currentLevel) {
            this.#myApp.stage.removeChild(this.currentLevel);
            this.currentLevel.destroy({ children: true });
        }

        this.currentLevelIndex = index;
        this.currentLevel = new this.levels[index]();
        this.#myApp.stage.addChild(this.currentLevel);
    }

    update() {
        this.currentLevel.update();

        if (this.currentLevel.passed) {
            this.loadLevel(this.currentLevelIndex + 1);
        }
    }

    onKeyDown(event) {
        this.currentLevel.keyboardProcessor.onKeyDown(event);
    }

    onKeyUp(event) {
        this.currentLevel.keyboardProcessor.onKeyUp(event);
    }
}
