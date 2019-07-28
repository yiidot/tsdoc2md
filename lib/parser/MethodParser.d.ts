import { BaseParser } from "../base/BaseParser";
import { DocNode } from "../model";
export declare class MethodParser extends BaseParser {
    constructor(docNode: DocNode);
    init(docNode: DocNode): void;
    getCode(docNode: DocNode): string;
}
//# sourceMappingURL=MethodParser.d.ts.map