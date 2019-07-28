import { DocNode } from "../model";
import {
  DocNodeTitle,
  BaseItem,
  DocNodeReturns,
  DocNodeExample,
  DocNodeParameter
} from "../model/doc-node-item";
import * as _ from "lodash";

export class BaseParser {
  public _name: string = "";
  public _kind: string = "";
  public _title: DocNodeTitle = new DocNodeTitle();
  public _code: string = "";
  public _parameters: DocNodeParameter[] = [];
  public _returns: DocNodeReturns = new DocNodeReturns();
  public _example: DocNodeExample | undefined;
  constructor(docNode: DocNode) {
    this._name = docNode.name
  }
  parseDocComment(docNode: DocNode) {
    let cacheCommentItem: BaseItem | undefined;
    let isLastLineEmpty = false;
    const comments = docNode.docComment.split(/\n/);
    comments.forEach(item => {
      if (["/**", "*/"].includes(item.trim())) {
        return;
      } else if (!cacheCommentItem) {
        isLastLineEmpty = false;
        // 标题
        const titleObj = {
          kind: "Title",
          content: `${item.replace(/\*/g, "").trim()}`
        };
        cacheCommentItem = titleObj;
        this._title = cacheCommentItem as DocNodeTitle;
      } else if (this.isParameter(item)) {
        isLastLineEmpty = false;
        cacheCommentItem = this.parseParameter(docNode, item);
        if (!cacheCommentItem) return;
        this._parameters.push(cacheCommentItem as DocNodeParameter);
      } else if (this.isReturns(item)) {
        isLastLineEmpty = false;
        cacheCommentItem = this.parseReturns(item);
        this._returns = cacheCommentItem as DocNodeReturns;
      } else if (this.isExample(item)) {
        isLastLineEmpty = false;
        cacheCommentItem = this.parseExample(item);
        this._example = cacheCommentItem as DocNodeExample;
      } else if (_.startsWith(item.replace(/\*/g, "").trim(), "@")) {
        return;
      } else {
        let comment = item.replace(/\*/g, "");
        if (!comment.trim()) {
          isLastLineEmpty = true;
          return;
        }
        switch (cacheCommentItem.kind) {
          case "Title":
            if ((cacheCommentItem as DocNodeTitle).content.trim()) {
              if (isLastLineEmpty) {
                comment = `\n${comment}`;
              } else {
                comment = ` ${comment}`;
              }
            }
            (cacheCommentItem as DocNodeTitle).content += comment.trim();
            isLastLineEmpty = false;
            break;
          case "Parameter":
            if ((cacheCommentItem as DocNodeParameter).description.trim()) {
              if (isLastLineEmpty) {
                comment = `\n${comment}`;
              } else {
                comment = ` ${comment}`;
              }
            }
            (cacheCommentItem as DocNodeParameter).description += comment.trim();
            isLastLineEmpty = false;
            break;
          case "Returns":
            if ((cacheCommentItem as DocNodeReturns).content.trim()) {
              if (isLastLineEmpty) {
                comment = `\n${comment}`;
              } else {
                comment = ` ${comment}`;
              }
            }
            (cacheCommentItem as DocNodeReturns).content += comment.trim();
            isLastLineEmpty = false;
            break;
          case "Example":
            (cacheCommentItem as DocNodeExample).content += `\n${comment}`;
            isLastLineEmpty = false;
            break;
          default:
            break;
        }
      }
    });
  }
  isParameter(arg: string) {
    if (arg.indexOf("@param") === -1) return false;
    return _.startsWith(arg.replace(/\*/g, "").trim(), "@param");
  }
  parseParameter(docNode: DocNode, arg: string): DocNodeParameter | undefined {
    arg = arg
      .replace(/\*/, "")
      .replace("@param", "")
      .trim();
    const matches = arg.match(/\w+\s+/);
    if (!matches) return;
    const paramName = matches[0].trim();
    const paramType = this.getParameterType(docNode, paramName);
    if (!paramType) return;
    return {
      kind: "Parameter",
      name: paramName,
      type: paramType,
      description: arg.replace(/\w+\s+-/, "").trim()
    };
  }
  getParameterType(docNode: DocNode, paramName: string) {
    const cacheNodeParam = docNode.parameters.find(
      item => item.parameterName === paramName
    );
    if (!cacheNodeParam) return;
    const startIndex = cacheNodeParam.parameterTypeTokenRange.startIndex;
    const endIndex = cacheNodeParam.parameterTypeTokenRange.endIndex;
    return docNode.excerptTokens
      .slice(startIndex, endIndex)
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.text;
      }, "");
  }
  isReturns(arg: string) {
    if (arg.indexOf("@returns") === -1) return false;
    return _.startsWith(arg.replace(/\*/g, "").trim(), "@returns");
  }
  parseReturns(arg: string) {
    const returnsObj = {
      kind: "Returns",
      content: arg
        .replace(/\*/, "")
        .replace("@returns", "")
        .trim()
    };
    return returnsObj;
  }
  isExample(arg: string) {
    if (arg.indexOf("@example") === -1) return false;
    return _.startsWith(arg.replace(/\*/g, "").trim(), "@example");
  }
  parseExample(arg: string) {
    const exampleObj = {
      kind: "Example",
      content: arg
        .replace(/\*/, "")
        .replace("@example", "")
        .trim()
    };
    return exampleObj;
  }
  get name() {
      return this._name
  }
  get kind() {
      return this._kind
  }
  get title() {
      return this._title
  }
  get code() {
      return this._code
  }
  get parameters() {
      return this._parameters
  }
  get returns() {
      return this._returns
  }
  get example() {
      return this._example
  }
}
