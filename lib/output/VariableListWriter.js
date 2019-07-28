"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var VariableWriter_1 = require("./VariableWriter");
var FS = __importStar(require("fs"));
var VariableListWriter = /** @class */ (function () {
    function VariableListWriter(variables) {
        this._variables = [];
        this._variables = variables;
    }
    VariableListWriter.prototype.writeTo = function (filePath) {
        FS.writeFileSync(filePath, "# Variable\n", { flag: "a" });
        this._variables.forEach(function (vp) {
            var vw = new VariableWriter_1.VariableWriter(vp);
            vw.writeTo(filePath);
        });
    };
    return VariableListWriter;
}());
exports.VariableListWriter = VariableListWriter;
