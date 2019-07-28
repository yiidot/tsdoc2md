"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FunctionWriter = /** @class */ (function () {
    function FunctionWriter(document) {
        this._document = document;
    }
    FunctionWriter.prototype.writeTo = function (filePath) {
        if (!this._document)
            return;
        var str = "";
        // class name
        str += "## " + this._document.title.content + "\n";
        str += "```ts\n" + this._document.code + "\n```\n";
        // param
        if (this._document.parameters.length) {
            str += "| Name | Type   | Description |\n";
            str += "| ---- | ------ | ----------- |\n";
            this._document.parameters.forEach(function (param) {
                str += "| " + param.name + " | " + param.type + "   | " + param.description + " |\n";
            });
        }
        // example
        if (this._document.example) {
            str += "#### Example\n";
            str += this._document.example.content + "\n";
        }
        // FS.writeFileSync(filePath, str, { flag: "a" });
        console.log(str);
    };
    return FunctionWriter;
}());
exports.FunctionWriter = FunctionWriter;
