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
var ConstructorParser_1 = require("./ConstructorParser");
var PropertyParser_1 = require("./PropertyParser");
var MethodParser_1 = require("./MethodParser");
var ClassParser = /** @class */ (function (_super) {
    __extends(ClassParser, _super);
    function ClassParser(docNode) {
        var _this = _super.call(this, docNode) || this;
        _this._properties = [];
        _this._methods = [];
        _this.init(docNode);
        return _this;
    }
    ClassParser.prototype.init = function (docNode) {
        this.parseDocComment(docNode);
        this.traverseMembers(docNode);
    };
    ClassParser.prototype.traverseMembers = function (docNode) {
        var _this = this;
        var members = docNode.members;
        members.forEach(function (item) {
            if (!item.docComment)
                return;
            switch (item.kind) {
                case "Constructor":
                    _this._constructor = new ConstructorParser_1.ConstructorParser(item);
                    break;
                case "Property":
                    _this._properties.push(new PropertyParser_1.PropertyParser(item));
                    break;
                case "Method":
                    _this._methods.push(new MethodParser_1.MethodParser(item));
                    break;
                default:
                    break;
            }
        });
    };
    Object.defineProperty(ClassParser.prototype, "constructorP", {
        get: function () {
            return this._constructor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassParser.prototype, "properties", {
        get: function () {
            return this._properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClassParser.prototype, "methods", {
        get: function () {
            return this._methods;
        },
        enumerable: true,
        configurable: true
    });
    return ClassParser;
}(BaseParser_1.BaseParser));
exports.ClassParser = ClassParser;
