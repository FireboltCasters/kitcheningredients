"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomFloaters {
    static floaters = [];
    static add(floater) {
        CustomFloaters.floaters.push(floater);
    }
    static getFloaters() {
        return CustomFloaters.floaters;
    }
}
exports.default = CustomFloaters;
