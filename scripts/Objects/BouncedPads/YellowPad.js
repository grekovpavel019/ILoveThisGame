import { Container, Graphics } from "../../../pixi/pixi.mjs";

export default class YellowPad extends Container {
    color;

    constructor(width, height) {
        super();
        this.color = "#ffa500";

        const view = new Graphics();
        view.lineStyle(1, this.color);
        view.drawRect(0, 0, width, height);

        this.addChild(view);
    }

    activate(hero) {
        if (hero.isThrowDown()) {
            return;
        }

        hero.velocityY = -6.5;
    }
}