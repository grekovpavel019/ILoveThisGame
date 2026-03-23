import { Container, Graphics } from "../../../pixi/pixi.mjs";

export default class Platform extends Container {

    oneWay = false;

    constructor(color, width, height, oneWay) {
        super();

        const view = new Graphics();
        view.lineStyle(1, color);
        view.drawRect(0, 0, width, height);
        this.oneWay = oneWay;
        this.addChild(view);
    }
}
