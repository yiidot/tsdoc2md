import { DocNode } from "../model";
import { DocNodeTitle, DocNodeReturns, DocNodeExample, DocNodeParameter } from "../model/doc-node-item";
export declare class BaseParser {
    _name: string;
    _kind: string;
    _title: DocNodeTitle;
    _code: string;
    _parameters: DocNodeParameter[];
    _returns: DocNodeReturns;
    _example: DocNodeExample | undefined;
    constructor(docNode: DocNode);
    parseDocComment(docNode: DocNode): void;
    isParameter(arg: string): boolean;
    parseParameter(docNode: DocNode, arg: string): DocNodeParameter | undefined;
    getParameterType(docNode: DocNode, paramName: string): string | undefined;
    isReturns(arg: string): boolean;
    parseReturns(arg: string): {
        kind: string;
        content: string;
    };
    isExample(arg: string): boolean;
    parseExample(arg: string): {
        kind: string;
        content: string;
    };
    readonly name: string;
    readonly kind: string;
    readonly title: DocNodeTitle;
    readonly code: string;
    readonly parameters: DocNodeParameter[];
    readonly returns: DocNodeReturns;
    readonly example: DocNodeExample | undefined;
}
//# sourceMappingURL=BaseParser.d.ts.map