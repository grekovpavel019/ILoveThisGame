import { Container, Graphics } from "../../pixi/pixi.mjs";

// Игровые состояния
const States = {
    stay: "stay",
    jump: "jump",
    flyDown: "flyDown",
    throwDown: "throwDown",
}

export default class Hero extends Container {

    // сила гравитации (скорость по Y)
    GRAVITY_FORCE = .1;

    // скорость по X
    SPEED = 2;

    // сила прыжка
    JUMP_FORCE = 6;
    
    velocityY = 0; // 
    velocityX = 0;
    
    // направление: если нажимали влево, то left -1, если вправо, то right 1
    movement = {
        x: 0,
    }
    
    // состояние клавиш, используем ниже 
    directionContext = {
        left: 0,
        right: 0
    }
    
    constructor() {
        super();
        
        const view = new Graphics();
        view.lineStyle(1, 0xff0000);
        view.drawRect(0, 0, 50, 50);
        this.addChild(view);
    }

    update() {
        // с каждым апдейтом, velocityX будет сбрасываться, 
        // чтобы не возникал эффект льда
        this.velocityX = this.movement.x * this.SPEED;
        this.x += this.velocityX;

        // прыгнул и начал падать, находиться в состоянии падения
        if (this.velocityY > 0 && this.isJumpState()) {
            this.state = States.flyDown;
        }

        // тут же наоборот, velocityY должно накапливаться,
        // чтобы не было падения с одной скоростью
        this.velocityY += this.GRAVITY_FORCE;
        this.y += this.velocityY;
    }

    stay() {
        this.state = States.stay;
        this.velocityY = 0;
    }

    jump() {
        if (this.state === States.jump || this.state === States.flyDown || this.flyDown()) {
            return;
        }

        this.velocityY = -this.JUMP_FORCE;
        this.state = States.jump;
    }

    flyDown() {
        return this.velocityY > 0;
    }

    isJumpState() {
        return this.state === States.jump;
    }

    throwDown() {
        this.state = States.throwDown;
    }

    isThrowDown() {
        return this.state === States.throwDown;
    }

    startLeftMove() {
        this.directionContext.left = -1;

        // если мы в это время уже двигались вправо, то мы остановимся
        if (this.directionContext.right > 0) {
            this.movement.x = 0;
            return;
        }

        this.movement.x = -1;
    }
    
    startRightMove() {
        this.directionContext.right = 1;

        // если мы в это время уже двигались влево, то мы остановимся
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
