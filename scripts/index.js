import { Application } from "../pixi/pixi.mjs";
import Game from "./Game.js";

const container = document.querySelector(".container");

const app = new Application({
    background: "#121212",
    resizeTo: container,
});

container.appendChild(app.view);

const game = new Game(app);

// обрабатываем нажатие на кнопку
document.addEventListener("keydown", event => {
    game.onKeyDown(event);
});

// обрабатываем отпускание кнопки
document.addEventListener("keyup", event => {
    game.onKeyUp(event);
});

app.ticker.add(game.update, game);