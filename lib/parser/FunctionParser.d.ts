import { BaseParser } from "../base/BaseParser";
import { DocNode } from "../model";
export declare class FunctionParser extends BaseParser {
    constructor(docNode: DocNode);
    init(docNode: DocNode): void;
    getCode(docNode: DocNode): string;
}
//# sourceMappingURL=FunctionParser.d.ts.map