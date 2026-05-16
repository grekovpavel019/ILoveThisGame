import Platform from "../Objects/Platforms/Platform.js";
import Level from "./Level.js";
import Hero from "../Entities/Hero.js";
import ExitTrigger from "../Objects/ExitTrigger.js";
import PlatformFactory from "../Objects/Platforms/PlatformFactory.js";
import CommonTrampoline from "../Objects/Trampolines/CommonTrampoline.js";

export default class Level1 extends Level {

    constructor() {
        super();
        
        this.hero = new Hero();
        this.hero.x = 100;
        this.hero.y = 300;
        this.addChild(this.hero);

        this.addPlatform(PlatformFactory.createPlatform(50, 300));
        // this.addPlatform(PlatformFactory.createOneWayPlatform(100, 200));


        const trampoline = new CommonTrampoline(50, 10);
        trampoline.x = 300;
        trampoline.y = 290;
        this.addTrampoline(trampoline);
        
        // this.exitTrigger = new ExitTrigger();
        // this.exitTrigger.x = 200;
        // this.exitTrigger.y = 200;
        // this.addChild(this.exitTrigger);
    }

}