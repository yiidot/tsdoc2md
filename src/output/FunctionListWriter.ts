import { FunctionParser } from "../parser/FunctionParser";
import { FunctionWriter } from "./FunctionWriter";
import * as FS from "fs";

export class FunctionListWriter {
    private _functions: FunctionParser[] = []
    constructor(functions: FunctionParser[]) {
        this._functions = functions
    }
    writeTo(filePath: string) {
        FS.writeFileSync(filePath, `# Function\n`, { flag: "a" });
        this._functions.forEach((fp: FunctionParser) => {
            const fw = new FunctionWriter(fp)
            fw.writeTo(filePath)
        })
    }
}