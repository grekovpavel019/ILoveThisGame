import Platform from "./Platform.js";

export default class PlatformFactory{
    constructor() {

    }

    static createPlatform(x, y) {
        const platform = new Platform(0x0000ff, 400, 40, false);
        platform.x = x; // 50
        platform.y = y; // 300

        return platform;
    }

    static createOneWayPlatform(x, y) {
        const platform = new Platform(0x00ff00, 400, 20, true);
        platform.x = x;
        platform.y = y;

        return platform;
    }
}