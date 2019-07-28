import { DocNodeParameter } from "../model/doc-node-item";
import * as FS from "fs";
import { VariableParser } from "../parser/VariableParser";

export class VariableWriter {
  public _document: VariableParser | undefined;
  constructor(document: VariableParser) {
    this._document = document;
  }
  writeTo(filePath: string) {
    if (!this._document) return;
    var str = "";
    // variable name
    str += `## ${this._document.title.content}\n`;
    str += `\`\`\`ts\n${this._document.code}\n\`\`\`\n`;
    // example
    if (this._document.example) {
      str += "#### Example\n";
      str += `${this._document.example.content}\n`;
    }
    // FS.writeFileSync(filePath, str, { flag: "a" });
    console.log(str);
  }
}
