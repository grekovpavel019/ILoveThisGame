

export default class KeyboardProcessor {

    #keyMap = {
        KeyA: {
            isDown: false
        },
        KeyD: {
            isDown: false
        },
        Space: {
            isDown: false
        },
        KeyS: {
            isDown: false
        }

    }

    #levelContext;
    constructor(levelContext) {
        this.#levelContext = levelContext;
    }

    getButton(keyName) {
        return this.#keyMap[keyName];
    }

    onKeyDown(event) {
        const button = this.#keyMap[event.code];

        if (button) {
            if (button.hasOwnProperty("executeDown")) {
                button.executeDown.call(this.#levelContext);
            }
            button.isDown = true;
        }

    }

    onKeyUp(event) {
        const button = this.#keyMap[event.code];

        if (button) {
            if (button.hasOwnProperty("executeUp")) {
                button.executeUp.call(this.#levelContext);
            }
            button.isDown = false;

        }
    }

    isButtonPressed(keyName) {
        return this.#keyMap[keyName].isDown
    }
}