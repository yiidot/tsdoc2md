import { VariableParser } from "../parser/VariableParser";
import { VariableWriter } from "./VariableWriter";
import * as FS from "fs";

export class VariableListWriter {
    private _variables: VariableParser[] = []
    constructor(variables: VariableParser[]) {
        this._variables = variables
    }
    writeTo(filePath: string) {
        FS.writeFileSync(filePath, `# Variable\n`, { flag: "a" });
        this._variables.forEach((vp: VariableParser) => {
            const vw = new VariableWriter(vp)
            vw.writeTo(filePath)
        })
    }
}