"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FunctionWriter_1 = require("./FunctionWriter");
var FS = __importStar(require("fs"));
var FunctionListWriter = /** @class */ (function () {
    function FunctionListWriter(functions) {
        this._functions = [];
        this._functions = functions;
    }
    FunctionListWriter.prototype.writeTo = function (filePath) {
        FS.writeFileSync(filePath, "# Function\n", { flag: "a" });
        this._functions.forEach(function (fp) {
            var fw = new FunctionWriter_1.FunctionWriter(fp);
            fw.writeTo(filePath);
        });
    };
    return FunctionListWriter;
}());
exports.FunctionListWriter = FunctionListWriter;
