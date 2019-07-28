"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VariableWriter = /** @class */ (function () {
    function VariableWriter(document) {
        this._document = document;
    }
    VariableWriter.prototype.writeTo = function (filePath) {
        if (!this._document)
            return;
        var str = "";
        // variable name
        str += "## " + this._document.title.content + "\n";
        str += "```ts\n" + this._document.code + "\n```\n";
        // example
        if (this._document.example) {
            str += "#### Example\n";
            str += this._document.example.content + "\n";
        }
        // FS.writeFileSync(filePath, str, { flag: "a" });
        console.log(str);
    };
    return VariableWriter;
}());
exports.VariableWriter = VariableWriter;
