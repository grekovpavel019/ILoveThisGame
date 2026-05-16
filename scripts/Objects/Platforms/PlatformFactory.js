import Platform from "./Platform.js";
import OneWayPlatform from "./OneWayPlatform.js";

export default class PlatformFactory{
    constructor() {

    }

    static createPlatform(obj) {
        const { x, y, width, height } = obj;

        const platform = new Platform(0x0000ff, obj.width, obj.height);
        platform.x = x; // 50
        platform.y = y; // 300

        return platform;
    }

    static createOneWayPlatform(obj) {
        const { x, y, width, height } = obj;

        const platform = new OneWayPlatform(0x00ff00, obj.width, obj.height);
        platform.x = x;
        platform.y = y;

        return platform;
    }
}