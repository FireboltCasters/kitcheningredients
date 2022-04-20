"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lorem_ipsum_1 = require("lorem-ipsum");
// const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const lorem = new lorem_ipsum_1.LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4
    },
    wordsPerSentence: {
        max: 16,
        min: 4
    }
});
class TextGenerator {
    static getVeryLongText() {
        let output = "";
        for (let i = 1; i < 10; i++) { //chapters
            output += i + ": " + lorem.generateWords(2); //title
            output += lorem.getLineEnding();
            output += " ";
            output += lorem.getLineEnding();
            output += lorem.generateParagraphs(14);
            output += lorem.getLineEnding();
            output += " ";
            output += lorem.getLineEnding();
            output += " ";
            output += lorem.getLineEnding();
        }
        return output;
    }
}
exports.default = TextGenerator;
