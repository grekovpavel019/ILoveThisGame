import KeyboardProcessor from "../KeyboardProcessor.js";
import { Container } from "../../pixi/pixi.mjs";

export default class Level extends Container {

    hero = null;
    exitTrigger = null;
    platforms = [];

    passed = false;

    keyboardProcessor;

    constructor() {
        super();

        this.keyboardProcessor = new KeyboardProcessor(this);
        this.keyboardProcessor.getButton("Space").executeDown = function() {
            this.hero.jump();
        }

        this.keyboardProcessor.getButton("KeyA").executeDown = function() {
            this.hero.startLeftMove();
        }

        this.keyboardProcessor.getButton("KeyA").executeUp = function() {
            this.hero.stopLeftMove();
        }

        this.keyboardProcessor.getButton("KeyD").executeDown = function() {
            this.hero.startRightMove();
        }

        this.keyboardProcessor.getButton("KeyD").executeUp = function() {
            this.hero.stopRightMove();
        }
    }
    
    update() {
        this.checkCollisionWithPlatforms();
        this.checkExit();
    }
    
    checkExit() {
        if (!this.exitTrigger) return;

        if(this.isCheckAABB(this.hero, this.exitTrigger)) {
            this.passed = true;
        }
    }

    getPlatformCollisionResult(character, platform, prev) {
        const collisionResult = {
            horizontal: false,
            vertical: false
        }

        if (!this.isCheckAABB(character, platform)) {
            return collisionResult;
        }

        const currY = character.y;
        character.y = prev.y;

        if (!this.isCheckAABB(character, platform)) {
            character.stay();
            collisionResult.vertical = true;
            return collisionResult;
        }

        character.y = currY;
        character.x = prev.x;

        collisionResult.horizontal = true;
        return collisionResult;
    }

    checkCollisionWithPlatforms() {
        const prev = {
            x: this.hero.x,
            y: this.hero.y,
        };
    
        this.hero.update();
        
        for (let i of this.platforms) {
            const collisionResult = this.getPlatformCollisionResult(this.hero, i, prev)
            
            if (collisionResult.vertical) {
                this.hero.stay();

            }
        }
    }

    addPlatform(platform) {
        this.platforms.push(platform);
        this.addChild(platform);
    }

    isCheckAABB(area1, area2) {
        return (
            area1.x < area2.x + area2.width &&
            area1.x + area1.width > area2.x &&
            area1.y < area2.y + area2.height &&
            area1.y + area1.height > area2.y
        )
    }

}
