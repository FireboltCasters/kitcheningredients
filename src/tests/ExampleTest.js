"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Example_1 = __importDefault(require("../Example"));
test('Example Test', async () => {
    expect(Example_1.default.multiply(3, 4)).toBe(12);
});
