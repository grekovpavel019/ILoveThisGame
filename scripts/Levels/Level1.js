import Platform from "../Objects/Platforms/Platform.js";
import Level from "./Level.js";
import Hero from "../Entities/Hero.js";
import ExitTrigger from "../Objects/ExitTrigger.js";
import PlatformFactory from "../Objects/Platforms/PlatformFactory.js";

export default class Level1 extends Level {

    constructor() {
        super();
        
        this.hero = new Hero();
        this.hero.x = 100;
        this.hero.y = 100;
        this.addChild(this.hero);

        this.addPlatform(PlatformFactory.createPlatform(50, 300));
        this.addPlatform(PlatformFactory.createOneWayPlatform(100, 200))
        
        this.exitTrigger = new ExitTrigger();
        this.exitTrigger.x = 200;
        this.exitTrigger.y = 200;
        this.addChild(this.exitTrigger);
    }

}