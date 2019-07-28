import { DocNodeParameter } from "../model/doc-node-item";
import * as FS from "fs";
import { FunctionParser } from "../parser/FunctionParser";

export class FunctionWriter {
  public _document: FunctionParser | undefined;
  constructor(document: FunctionParser) {
    this._document = document;
  }
  writeTo(filePath: string) {
    if (!this._document) return;
    var str = "";
    // class name
    str += `## ${this._document.title.content}\n`;
    str += `\`\`\`ts\n${this._document.code}\n\`\`\`\n`;
    // param
    if (this._document.parameters.length) {
      str += `| Name | Type   | Description |\n`;
      str += `| ---- | ------ | ----------- |\n`;
      this._document.parameters.forEach((param: DocNodeParameter) => {
        str += `| ${param.name} | ${param.type}   | ${param.description} |\n`;
      });
    }
    // example
    if (this._document.example) {
      str += "#### Example\n";
      str += `${this._document.example.content}\n`;
    }
    // FS.writeFileSync(filePath, str, { flag: "a" });
    console.log(str);
  }
}
