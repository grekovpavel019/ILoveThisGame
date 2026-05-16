import Platform from "./Platform.js";

export default class OneWayPlatform extends Platform {
    oneWay = true;

    constructor(color, width, height) {
        super(color, width, height);
    }
}