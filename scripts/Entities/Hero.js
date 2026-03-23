import { Container, Graphics } from "../../pixi/pixi.mjs";

// Игровые состояния
const States = {
    stay: "stay",
    jump: "jump",
    flyDown: "flyDown",

}

export default class Hero extends Container {

    GRAVITY_FORCE = .1;
    SPEED = 2;
    JUMP_FORCE = 6;
    velocityY = 0;
    velocityX = 0;

    jumpCounts = 0;
    #maxJumps = 1;
    
    movement = {
        x: 0,
    }
    
    // контекст движение: если нажимали влево, то left -1, если вправо, то right 1
    directionContext = {
        left: 0,
        right: 0
    }
    
    state = States.state;
    
    constructor() {
        super();
        
        const view = new Graphics();
        view.lineStyle(1, 0xff0000);
        view.drawRect(0, 0, 50, 50);
        this.addChild(view);
    }

    update() {
        this.velocityX = this.movement.x * this.SPEED;
        this.x += this.velocityX;

        if (this.velocityY > 0 && this.isJumpState()) {
            this.state = States.flyDown
        }

        this.velocityY += this.GRAVITY_FORCE;
        this.y += this.velocityY;
    }

    stay() {
        this.state = States.stay;
        this.velocityY = 0;
    }

    jump() {
        if (this.state === States.jump || this.state === States.flyDown) {
            return;
        }

        this.velocityY = -this.JUMP_FORCE;
        this.state = States.jump;
    }

    isJumpState() {
        return this.state === States.jump;
    }

    startLeftMove() {
        this.directionContext.left = -1;

        if (this.directionContext.right > 0) {
            this.movement.x = 0;
            return;
        }

        this.movement.x = -1;
    }
    
    startRightMove() {
        this.directionContext.right = 1;

        if (this.directionContext.left < 0) {
            this.movement.x = 0;
            return;
        }

        this.movement.x = 1;
    }
    
    stopLeftMove() {
        this.directionContext.left = 0;
        this.movement.x = this.directionContext.right;
    }
    
    stopRightMove() {
        this.directionContext.right = 0;
        this.movement.x = this.directionContext.left;
    }

    stop() {
        this.movement.x = 0;
    }
}
