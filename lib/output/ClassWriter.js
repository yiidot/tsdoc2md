"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FS = __importStar(require("fs"));
var ClassWriter = /** @class */ (function () {
    function ClassWriter(document) {
        this._document = document;
    }
    ClassWriter.prototype.writeTo = function (filePath) {
        if (!this._document)
            return;
        var str = "";
        // class name
        str += "# " + this._document.name + "\n";
        // constructor
        if (this._document.constructorP) {
            str += "## Constructor\n";
            str += "```ts\n" + this._document.constructorP.code + "\n```\n";
            // example
            if (this._document.constructorP.example) {
                str += "#### Example\n";
                str += this._document.constructorP.example.content + "\n";
            }
            // property
            str += "## Properties\n";
            this._document.properties.forEach(function (item) {
                str += "### " + item.name + "\n";
                str += "#### " + item.title.content + "\n";
                str += "```ts\n" + item.code + "\n```\n";
            });
            str += "## Methods\n";
            this._document.methods.forEach(function (item) {
                str += "### " + item.name + "\n";
                str += "#### " + item.title.content + "\n";
                str += "```ts\n" + item.code + "\n```\n";
                // param
                if (item.parameters.length) {
                    str += "| Name | Type   | Description |\n";
                    str += "| ---- | ------ | ----------- |\n";
                    item.parameters.forEach(function (param) {
                        str += "| " + param.name + " | " + param.type + "   | " + param.description + " |\n";
                    });
                }
                // example
                if (item.example) {
                    str += "#### Example\n";
                    str += item.example.content + "\n";
                }
            });
            FS.writeFileSync(filePath, str, { flag: "a" });
            // console.log(str);
        }
    };
    return ClassWriter;
}());
exports.ClassWriter = ClassWriter;
