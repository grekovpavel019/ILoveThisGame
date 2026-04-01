export default class KeyboardProcessor {

    // в этой мапе мы храним состояния системы:
    // в каждой из этих клавишь находятся образы функций 
    // executeDown, executeUp(не у всех)
    #keyMap = {
        KeyA: {
            isDown: false,
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

    // вызывая обработчик клавиши, мы делаем следующее
    onKeyDown(event) {
        // берем конкретную клавишу из мапы по ее коду (обращаемся к объекту)
        const button = this.#keyMap[event.code];

        // проверяем ее существование 
        if (button) {
            // проверяем наличие конкретного свойства у клавиши
            if (button.hasOwnProperty("executeDown")) {

                // если данное свойство имеется, то мы его вызовем 
                // но передадим туда контекст конкретного класса
                button.executeDown.call(this.#levelContext);
            }
            button.isDown = true;
        }

    }

    // вызывая обработчик клавиши, мы делаем следующее
    onKeyUp(event) {
        // берем конкретную клавишу из мапы по ее коду (обращаемся к объекту)
        const button = this.#keyMap[event.code];

        // проверяем ее существование 
        if (button) {
            // проверяем наличие конкретного свойства у клавиши
            if (button.hasOwnProperty("executeUp")) {
                // если данное свойство имеется, то мы его вызовем 
                // но передадим туда контекст конкретного класса
                button.executeUp.call(this.#levelContext);
            }
            button.isDown = false;

        }
    }

    isButtonPressed(keyName) {
        return this.#keyMap[keyName].isDown
    }
}