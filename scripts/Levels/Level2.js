import Level from "./Level.js";
import Hero from "../Entities/Hero.js";
import Platform from "../Objects/Platforms/Platform.js";
import ExitTrigger from "../Objects/ExitTrigger.js";

export default class Level2 extends Level {
    constructor() {
        super();

        this.hero = new Hero();
        this.hero.x = 0;
        this.hero.y = 0;
        this.addChild(this.hero);

        const floor = new Platform(0x0000ff, 400, 40);
        floor.x = 50;
        floor.y = 600;
        this.addPlatform(floor);

        // this.keyboardProcessor.getButton("KeyD").executeDown = function() {
        //     this.hero.startLeftMove();
        // }

        // this.keyboardProcessor.getButton("KeyD").executeUp = function() {
        //     this.hero.stopLeftMove();
        // }

        // this.keyboardProcessor.getButton("KeyA").executeDown = function() {
        //     this.hero.startRightMove();
        // }

        // this.keyboardProcessor.getButton("KeyA").executeUp = function() {
        //     this.hero.stopRightMove();
        // }
    }
}
