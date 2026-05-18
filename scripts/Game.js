import Level1 from "./Levels/Level1.js";
import Level2 from "./Levels/Level2.js";
import Retry from "./Retry.js";

export default class Game {

    #myApp;
    levels = [];
    currentLevelIndex;

    constructor(myApp) {
        this.#myApp = myApp;
        this.levels = [Level1, Level2];

        this.retry = new Retry();
        this.retry.onRestart = () => {
            this.retry.hideRestartMenu();
            this.loadLevel(this.currentLevelIndex);
        };

        this.loadLevel(0);
    }

    loadLevel(index) {
        if (this.currentLevel) {
            this.#myApp.stage.removeChild(this.currentLevel);
            this.currentLevel.destroy({ children: true });
        }

        this.currentLevelIndex = index;
        this.currentLevel = new this.levels[index](this.retry);

        this.currentLevel.onRestart = () => {
            this.retry.showRestartMenu();
        };

        this.#myApp.stage.addChild(this.currentLevel);
    }

    update() {
        
        // if (this.state !== "playing") return;       

        this.currentLevel.update();

        if (this.currentLevel.isPassed()) {
            this.loadLevel(this.currentLevelIndex + 1);
        }
    }

    // т. к. Game.js не обязан следить за конкретным назначением клавиш
    // и их обработчиков, то мы передадим эту проблему на решение 
    // keyboardProcessor конкретного уровня (дальше смотреть в keyboardProcessor)
    onKeyDown(event) {
        this.currentLevel.keyboardProcessor.onKeyDown(event);
    }

    // аналогично с верхним
    onKeyUp(event) {
        this.currentLevel.keyboardProcessor.onKeyUp(event);
    }
}
