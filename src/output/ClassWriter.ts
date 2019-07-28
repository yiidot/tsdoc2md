import { ClassParser } from "../parser/ClassParser";
import { DocNodeParameter } from "../model/doc-node-item";
import * as FS from "fs";

export class ClassWriter {
  public _document: ClassParser | undefined;
  constructor(document: ClassParser) {
    this._document = document;
  }
  writeTo(filePath: string) {
    if (!this._document) return;
    var str = "";
    // class name
    str += `# ${this._document.name}\n`;

    // constructor
    if (this._document.constructorP) {
      str += "## Constructor\n";
      str += `\`\`\`ts\n${this._document.constructorP.code}\n\`\`\`\n`;
      // example
      if (this._document.constructorP.example) {
        str += "#### Example\n";
        str += `${this._document.constructorP.example.content}\n`;
      }

      // property
      str += "## Properties\n";
      this._document.properties.forEach(item => {
        str += `### ${item.name}\n`;
        str += `#### ${item.title.content}\n`;
        str += `\`\`\`ts\n${item.code}\n\`\`\`\n`;
      });
      str += "## Methods\n";
      this._document.methods.forEach(item => {
        str += `### ${item.name}\n`;
        str += `#### ${item.title.content}\n`;
        str += `\`\`\`ts\n${item.code}\n\`\`\`\n`;
        // param
        if (item.parameters.length) {
          str += `| Name | Type   | Description |\n`;
          str += `| ---- | ------ | ----------- |\n`;
          item.parameters.forEach((param: DocNodeParameter) => {
            str += `| ${param.name} | ${param.type}   | ${
              param.description
            } |\n`;
          });
        }
        // example
        if (item.example) {
          str += "#### Example\n";
          str += `${item.example.content}\n`;
        }
      });
      FS.writeFileSync(filePath, str, { flag: "a" });
      // console.log(str);
    }
  }
}
