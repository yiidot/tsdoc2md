export interface InputModel {
    entry: any;
    outDir: string;
}
export interface DocNode {
    name: string;
    kind: string;
    releaseTag: string;
    docComment: string;
    excerptTokens: {
        text: string;
    }[];
    parameters: {
        parameterName: string;
        parameterTypeTokenRange: {
            startIndex: number;
            endIndex: number;
        };
    }[];
    members: DocNode[];
}
//# sourceMappingURL=index.d.ts.map