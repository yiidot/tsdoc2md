import { BaseParser } from "../base/BaseParser";
import { DocNode } from "../model";

export class FunctionParser extends BaseParser {
  constructor(docNode: DocNode) {
    super(docNode);
    this.init(docNode);
  }
  init(docNode: DocNode) {
    this._code = this.getCode(docNode);
    this.parseDocComment(docNode);
  }
  getCode(docNode: DocNode) {
    const tokens = docNode.excerptTokens;
    let code = tokens.reduce((previousValue, currentValue, currentIndex) => {
      if (currentIndex === 0) {
        return previousValue;
      }
      return (previousValue += currentValue.text);
    }, "");
    code = code.replace(/import\([\s\S]+\)\.{1}/, "");
    return code;
  }
}
