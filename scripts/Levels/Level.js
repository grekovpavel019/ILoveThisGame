import KeyboardProcessor from "../KeyboardProcessor.js";
import { Container } from "../../pixi/pixi.mjs";

export default class Level extends Container {

    hero = null;
    exitTrigger = null;
    platforms = [];

    #passed = false;

    keyboardProcessor;

    constructor() {
        super();
        this.setKeys();
    }
    
    update() {
        this.checkCollisionWithPlatforms();
        this.checkExit();
    }
    
    checkExit() {
        if (!this.exitTrigger) return;

        if(this.isCheckAABB(this.hero, this.exitTrigger)) {
            this.#passed = true;
        }
    }

    isPassed() {
        return this.#passed;
    }

    getDefaultPlatformCollisionResult(aaRect, bbRect, prevPoint) {
        const collisionResult = {
            horizontal: false,
            vertical: false
        }

        if (!this.isCheckAABB(aaRect, bbRect)) {
            return collisionResult;
        }

        const currY = aaRect.y;
        aaRect.y = prevPoint.y;

        if (!this.isCheckAABB(aaRect, bbRect)) {
            collisionResult.vertical = true;
            return collisionResult;
        }

        aaRect.y = currY;
        aaRect.x = prevPoint.x;

        collisionResult.horizontal = true;
        return collisionResult;
    }

    getOneWayPlatformCollisionResult(aaRect, bbRect, prevPoint) {
        if (bbRect.oneWay) {
            if (aaRect.isJumpState()) {
                return true;
            }

            if (prevPoint.y + aaRect.height > bbRect.y) {
                return true;
            }

            if (aaRect.isThrowDown()) {
                return true;
            }

        }

        return false;
    }

    checkCollisionWithPlatforms() {
        const prev = {
            x: this.hero.x,
            y: this.hero.y,
        };
    
        this.hero.update();
        
        let onGround = false;
        for (let platform of this.platforms) {
            
            const oneWayCollisionResult = this.getOneWayPlatformCollisionResult(this.hero, platform, prev);
            if (oneWayCollisionResult) {
                continue;
            }

            const collisionResult = this.getDefaultPlatformCollisionResult(this.hero, platform, prev);
            if (collisionResult.vertical) {
                onGround = true;
            }

        }
        
        if (onGround) {
            this.hero.stay();
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

    setKeys() {
        this.keyboardProcessor = new KeyboardProcessor(this);

        // берем кнопку и навешиваем на нее поведение
        // данные из кеймапы + поведение из level
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

        this.keyboardProcessor.getButton("KeyS").executeDown = function() {
            this.hero.throwDown();
        }
    }
}
