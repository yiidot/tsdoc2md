"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var doc_node_item_1 = require("../model/doc-node-item");
var _ = __importStar(require("lodash"));
var BaseParser = /** @class */ (function () {
    function BaseParser(docNode) {
        this._name = "";
        this._kind = "";
        this._title = new doc_node_item_1.DocNodeTitle();
        this._code = "";
        this._parameters = [];
        this._returns = new doc_node_item_1.DocNodeReturns();
        this._name = docNode.name;
    }
    BaseParser.prototype.parseDocComment = function (docNode) {
        var _this = this;
        var cacheCommentItem;
        var isLastLineEmpty = false;
        var comments = docNode.docComment.split(/\n/);
        comments.forEach(function (item) {
            if (["/**", "*/"].includes(item.trim())) {
                return;
            }
            else if (!cacheCommentItem) {
                isLastLineEmpty = false;
                // 标题
                var titleObj = {
                    kind: "Title",
                    content: "" + item.replace(/\*/g, "").trim()
                };
                cacheCommentItem = titleObj;
                _this._title = cacheCommentItem;
            }
            else if (_this.isParameter(item)) {
                isLastLineEmpty = false;
                cacheCommentItem = _this.parseParameter(docNode, item);
                if (!cacheCommentItem)
                    return;
                _this._parameters.push(cacheCommentItem);
            }
            else if (_this.isReturns(item)) {
                isLastLineEmpty = false;
                cacheCommentItem = _this.parseReturns(item);
                _this._returns = cacheCommentItem;
            }
            else if (_this.isExample(item)) {
                isLastLineEmpty = false;
                cacheCommentItem = _this.parseExample(item);
                _this._example = cacheCommentItem;
            }
            else if (_.startsWith(item.replace(/\*/g, "").trim(), "@")) {
                return;
            }
            else {
                var comment = item.replace(/\*/g, "");
                if (!comment.trim()) {
                    isLastLineEmpty = true;
                    return;
                }
                switch (cacheCommentItem.kind) {
                    case "Title":
                        if (cacheCommentItem.content.trim()) {
                            if (isLastLineEmpty) {
                                comment = "\n" + comment;
                            }
                            else {
                                comment = " " + comment;
                            }
                        }
                        cacheCommentItem.content += comment.trim();
                        isLastLineEmpty = false;
                        break;
                    case "Parameter":
                        if (cacheCommentItem.description.trim()) {
                            if (isLastLineEmpty) {
                                comment = "\n" + comment;
                            }
                            else {
                                comment = " " + comment;
                            }
                        }
                        cacheCommentItem.description += comment.trim();
                        isLastLineEmpty = false;
                        break;
                    case "Returns":
                        if (cacheCommentItem.content.trim()) {
                            if (isLastLineEmpty) {
                                comment = "\n" + comment;
                            }
                            else {
                                comment = " " + comment;
                            }
                        }
                        cacheCommentItem.content += comment.trim();
                        isLastLineEmpty = false;
                        break;
                    case "Example":
                        cacheCommentItem.content += "\n" + comment;
                        isLastLineEmpty = false;
                        break;
                    default:
                        break;
                }
            }
        });
    };
    BaseParser.prototype.isParameter = function (arg) {
        if (arg.indexOf("@param") === -1)
            return false;
        return _.startsWith(arg.replace(/\*/g, "").trim(), "@param");
    };
    BaseParser.prototype.parseParameter = function (docNode, arg) {
        arg = arg
            .replace(/\*/, "")
            .replace("@param", "")
            .trim();
        var matches = arg.match(/\w+\s+/);
        if (!matches)
            return;
        var paramName = matches[0].trim();
        var paramType = this.getParameterType(docNode, paramName);
        if (!paramType)
            return;
        return {
            kind: "Parameter",
            name: paramName,
            type: paramType,
            description: arg.replace(/\w+\s+-/, "").trim()
        };
    };
    BaseParser.prototype.getParameterType = function (docNode, paramName) {
        var cacheNodeParam = docNode.parameters.find(function (item) { return item.parameterName === paramName; });
        if (!cacheNodeParam)
            return;
        var startIndex = cacheNodeParam.parameterTypeTokenRange.startIndex;
        var endIndex = cacheNodeParam.parameterTypeTokenRange.endIndex;
        return docNode.excerptTokens
            .slice(startIndex, endIndex)
            .reduce(function (previousValue, currentValue) {
            return previousValue + currentValue.text;
        }, "");
    };
    BaseParser.prototype.isReturns = function (arg) {
        if (arg.indexOf("@returns") === -1)
            return false;
        return _.startsWith(arg.replace(/\*/g, "").trim(), "@returns");
    };
    BaseParser.prototype.parseReturns = function (arg) {
        var returnsObj = {
            kind: "Returns",
            content: arg
                .replace(/\*/, "")
                .replace("@returns", "")
                .trim()
        };
        return returnsObj;
    };
    BaseParser.prototype.isExample = function (arg) {
        if (arg.indexOf("@example") === -1)
            return false;
        return _.startsWith(arg.replace(/\*/g, "").trim(), "@example");
    };
    BaseParser.prototype.parseExample = function (arg) {
        var exampleObj = {
            kind: "Example",
            content: arg
                .replace(/\*/, "")
                .replace("@example", "")
                .trim()
        };
        return exampleObj;
    };
    Object.defineProperty(BaseParser.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseParser.prototype, "kind", {
        get: function () {
            return this._kind;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseParser.prototype, "title", {
        get: function () {
            return this._title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseParser.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseParser.prototype, "parameters", {
        get: function () {
            return this._parameters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseParser.prototype, "returns", {
        get: function () {
            return this._returns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseParser.prototype, "example", {
        get: function () {
            return this._example;
        },
        enumerable: true,
        configurable: true
    });
    return BaseParser;
}());
exports.BaseParser = BaseParser;
