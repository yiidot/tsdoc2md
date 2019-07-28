import { BaseParser } from "../base/BaseParser";
import { DocNode } from "../model";
import { ConstructorParser } from "./ConstructorParser";
import { PropertyParser } from "./PropertyParser";
import { MethodParser } from "./MethodParser";
export declare class ClassParser extends BaseParser {
    _constructor: ConstructorParser | undefined;
    _properties: PropertyParser[];
    _methods: MethodParser[];
    constructor(docNode: DocNode);
    init(docNode: DocNode): void;
    traverseMembers(docNode: DocNode): void;
    readonly constructorP: ConstructorParser | undefined;
    readonly properties: PropertyParser[];
    readonly methods: MethodParser[];
}
//# sourceMappingURL=ClassParser.d.ts.map