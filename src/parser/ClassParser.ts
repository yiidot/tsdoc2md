import { BaseParser } from "../base/BaseParser";
import { DocNode } from "../model";
import { ConstructorParser } from "./ConstructorParser";
import { PropertyParser } from "./PropertyParser";
import { MethodParser } from "./MethodParser";

export class ClassParser extends BaseParser {
  public _constructor: ConstructorParser | undefined;
  public _properties: PropertyParser[] = [];
  public _methods: MethodParser[] = [];
  constructor(docNode: DocNode) {
    super(docNode);
    this.init(docNode);
  }
  init(docNode: DocNode) {
    this.parseDocComment(docNode);
    this.traverseMembers(docNode);
  }
  traverseMembers(docNode: DocNode) {
    const members = docNode.members;
    members.forEach(item => {
      if (!item.docComment) return;
      switch (item.kind) {
        case "Constructor":
          this._constructor = new ConstructorParser(item);
          break;
        case "Property":
          this._properties.push(new PropertyParser(item));
          break;
        case "Method":
          this._methods.push(new MethodParser(item));
          break;
        default:
          break;
      }
    });
  }

  get constructorP() {
      return this._constructor
  }
  get properties() {
      return this._properties
  }
  get methods() {
      return this._methods
  }
}
