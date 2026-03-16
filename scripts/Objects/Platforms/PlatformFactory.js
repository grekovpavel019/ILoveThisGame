import Platform from "./Platform.js";

export default class PlatformFactory{
    constructor() {

    }

    static createPlatform(x, y) {
        const platform = new Platform(0x0000ff, 400, 40);
        platform.x = x; // 50
        platform.y = y; // 300

        return platform;
    }
}