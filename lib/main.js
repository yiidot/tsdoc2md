"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var api_extractor_1 = require("./api-extractor");
var store_1 = require("./store");
var FS = __importStar(require("fs"));
var ClassWriter_1 = require("./output/ClassWriter");
var path = __importStar(require("path"));
var ClassParser_1 = require("./parser/ClassParser");
var VariableParser_1 = require("./parser/VariableParser");
var chalk = __importStar(require("chalk"));
var FunctionParser_1 = require("./parser/FunctionParser");
console.log(process.cwd());
try {
    var tsdoc2mdConfigJsonPath = path.join(process.cwd(), "tsdoc2md.json");
    var tsdoc2mdJsonString = FS.readFileSync(tsdoc2mdConfigJsonPath, "utf8");
    var tsdoc2mdJsonObject = JSON.parse(tsdoc2mdJsonString);
    // 生成 tsdoc model
    console.log(chalk.default.green("generating tsdoc tree ..."));
    var msApiExtractor = new api_extractor_1.MSApiExtractor(tsdoc2mdJsonObject);
    msApiExtractor.invoke();
    // 获取 *.api.json 的路径
    var apiFilePath = store_1.getApiFilePath();
    // 生成 markdown 文件
    var markdownName = apiFilePath
        .replace(/[\s\S]+\\temp\\/, "")
        .replace(".api.json", "");
    var markdownDir = path.join(process.cwd(), tsdoc2mdJsonObject.outDir);
    // outDir 不存在则创建
    if (!FS.existsSync(markdownDir)) {
        FS.mkdirSync(markdownDir);
    }
    var markdownFilePath_1 = path.join(markdownDir, markdownName + ".md");
    // 移除旧文件
    if (FS.existsSync(markdownFilePath_1)) {
        FS.unlinkSync(markdownFilePath_1);
    }
    var tsdocJsonString = FS.readFileSync(apiFilePath, "utf8");
    var tsdocJsonObject = JSON.parse(tsdocJsonString);
    var docNodes = tsdocJsonObject.members[0].members;
    var classes_1 = [];
    var functions_1 = [];
    var variables_1 = [];
    console.log(chalk.default.green("parsing tsdoc tree ..."));
    docNodes.forEach(function (docNode) {
        if (!docNode.docComment)
            return;
        switch (docNode.kind) {
            case "Class":
                classes_1.push(new ClassParser_1.ClassParser(docNode));
                break;
            case "Variable":
                variables_1.push(new VariableParser_1.VariableParser(docNode));
                break;
            case "Function":
                functions_1.push(new FunctionParser_1.FunctionParser(docNode));
                break;
            default:
                break;
        }
    });
    console.log(chalk.default.green("writing markdown ..."));
    classes_1.forEach(function (cp) {
        var cw = new ClassWriter_1.ClassWriter(cp);
        cw.writeTo(markdownFilePath_1);
    });
    // const variableListWriter = new VariableListWriter(variables)
    // variableListWriter.writeTo(markdownFilePath)
    // const functionListWriter = new FunctionListWriter(functions)
    // functionListWriter.writeTo(markdownFilePath)
    console.log(chalk.default.green("tsdoc2md finished!"));
    // 删除临时文件
    FS.unlinkSync(apiFilePath);
}
catch (err) {
    console.log(chalk.default.red(err));
}
