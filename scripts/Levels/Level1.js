import Platform from "../Objects/Platforms/Platform.js";
import Level from "./Level.js";
import Hero from "../Entities/Hero.js";
import ExitTrigger from "../Objects/ExitTrigger.js";
import PlatformFactory from "../Objects/Platforms/PlatformFactory.js";
import CommonTrampoline from "../Objects/BouncedPads/YellowPad.js";
import YellowPad from "../Objects/BouncedPads/YellowPad.js";

export default class Level1 extends Level {

    constructor() {
        super();
        
        this.hero = new Hero();
        this.hero.x = 100;
        this.hero.y = 200;
        this.addChild(this.hero);

        this.addPlatform(PlatformFactory.createPlatform({
            x: 50,
            y: 300,
            width: 400,
            height: 40
        }));
        
        this.addPlatform(PlatformFactory.createOneWayPlatform({
            x: 100,
            y: 220,
            width: 400,
            height: 20
        }));

        const yellowPad = new YellowPad(50, 10);
        yellowPad.x = 300;
        yellowPad.y = 290;
        this.addPad(yellowPad);
        
        this.exitTrigger = new ExitTrigger();
        this.exitTrigger.x = 200;
        this.exitTrigger.y = 200;
        this.addChild(this.exitTrigger);
    }

}