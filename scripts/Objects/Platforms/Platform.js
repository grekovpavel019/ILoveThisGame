import { Container, Graphics } from "../../../pixi/pixi.mjs";

export default class Platform extends Container {
    constructor(color, width, height) {
        super();

        const view = new Graphics();
        view.lineStyle(1, color);
        view.drawRect(0, 0, width, height);
        this.addChild(view);
    }
}
