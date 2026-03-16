import { Container, Graphics } from "../../pixi/pixi.mjs";

export default class ExitTrigger extends Container {
    
    constructor() {
        super();

        const view = new Graphics();
        view.lineStyle(1, "#ffff00");
        view.drawRect(0, 0, 50, 100);
        this.addChild(view);
    }
}