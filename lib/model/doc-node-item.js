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
var BaseItem = /** @class */ (function () {
    function BaseItem() {
        this.kind = "";
    }
    return BaseItem;
}());
exports.BaseItem = BaseItem;
var DocNodeTitle = /** @class */ (function (_super) {
    __extends(DocNodeTitle, _super);
    function DocNodeTitle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = "";
        return _this;
    }
    return DocNodeTitle;
}(BaseItem));
exports.DocNodeTitle = DocNodeTitle;
var DocNodeParameter = /** @class */ (function (_super) {
    __extends(DocNodeParameter, _super);
    function DocNodeParameter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = "";
        _this.type = "";
        _this.description = "";
        return _this;
    }
    return DocNodeParameter;
}(BaseItem));
exports.DocNodeParameter = DocNodeParameter;
var DocNodeReturns = /** @class */ (function (_super) {
    __extends(DocNodeReturns, _super);
    function DocNodeReturns() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = "";
        return _this;
    }
    return DocNodeReturns;
}(BaseItem));
exports.DocNodeReturns = DocNodeReturns;
var DocNodeExample = /** @class */ (function (_super) {
    __extends(DocNodeExample, _super);
    function DocNodeExample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = "";
        return _this;
    }
    return DocNodeExample;
}(BaseItem));
exports.DocNodeExample = DocNodeExample;
