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

        this.setKeys();
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

    getPlatformCollisionResult(aaRect, bbRect, prevPoint) {
        const collisionResult = {
            horizontal: false,
            vertical: false
        }

        if (!this.isCheckAABB(aaRect, bbRect)) {
            return collisionResult;
        }

        const currY = aaRect.y;
        
        if (bbRect.oneWay) {
            
            const isMovingDown = aaRect.y > prevPoint.y;
            if (!isMovingDown) {
                return collisionResult;
            }

            aaRect.y = prevPoint.y;

            if (!this.isCheckAABB(aaRect, bbRect)) {
                collisionResult.vertical = true;
                return collisionResult;
            }

            aaRect.y = currY;
            return collisionResult;
        };

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

    checkCollisionWithPlatforms() {
        const prev = {
            x: this.hero.x,
            y: this.hero.y,
        };
    
        this.hero.update();
        
        let onGround = false;
        
        for (let platform of this.platforms) {
            
            if (platform.oneWay) {
                if (this.hero.isJumpState()) {
                    continue;
                }
            }

            const collisionResult = this.getPlatformCollisionResult(this.hero, platform, prev)
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
