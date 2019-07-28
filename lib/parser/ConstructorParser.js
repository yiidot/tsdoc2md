"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseParser_1 = require("../base/BaseParser");
var ConstructorParser = /** @class */ (function (_super) {
    __extends(ConstructorParser, _super);
    function ConstructorParser(docNode) {
        var _this = _super.call(this, docNode) || this;
        _this.init(docNode);
        return _this;
    }
    ConstructorParser.prototype.init = function (docNode) {
        this._code = this.getCode(docNode);
        this.parseDocComment(docNode);
    };
    ConstructorParser.prototype.getCode = function (docNode) {
        var tokens = docNode.excerptTokens;
        var code = tokens.reduce(function (previousValue, currentValue, currentIndex) {
            return (previousValue += currentValue.text);
        }, "");
        code = code.replace(/import\([\s\S]+\)\.{1}/, "");
        return code;
    };
    return ConstructorParser;
}(BaseParser_1.BaseParser));
exports.ConstructorParser = ConstructorParser;
