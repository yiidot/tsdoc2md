import { MSApiExtractor } from "./api-extractor";
import { getApiFilePath } from "./store";
import * as FS from "fs";
import { ClassWriter } from "./output/ClassWriter";
import { DocNode, InputModel } from "./model";
import * as path from "path";
import { ClassParser } from "./parser/ClassParser";
import { VariableParser } from "./parser/VariableParser";
import * as chalk from "chalk";
import { FunctionParser } from "./parser/FunctionParser";
import { VariableListWriter } from "./output/VariableListWriter";
import { FunctionListWriter } from "./output/FunctionListWriter";

console.log(process.cwd());
try {
  const tsdoc2mdConfigJsonPath: string = path.join(
    process.cwd(),
    "tsdoc2md.json"
  );

  const tsdoc2mdJsonString = FS.readFileSync(tsdoc2mdConfigJsonPath, "utf8");
  const tsdoc2mdJsonObject: InputModel = JSON.parse(tsdoc2mdJsonString);

  // 生成 tsdoc model
  console.log(chalk.default.green(`generating tsdoc tree ...`));
  const msApiExtractor = new MSApiExtractor(tsdoc2mdJsonObject);
  msApiExtractor.invoke();

  // 获取 *.api.json 的路径
  const apiFilePath = getApiFilePath();

  // 生成 markdown 文件
  const markdownName = apiFilePath
    .replace(/[\s\S]+\\temp\\/, "")
    .replace(".api.json", "");
  const markdownDir = path.join(process.cwd(), tsdoc2mdJsonObject.outDir);
  // outDir 不存在则创建
  if (!FS.existsSync(markdownDir)) {
    FS.mkdirSync(markdownDir);
  }
  const markdownFilePath = path.join(markdownDir, `${markdownName}.md`);
  // 移除旧文件
  if (FS.existsSync(markdownFilePath)) {
    FS.unlinkSync(markdownFilePath)
  }

  const tsdocJsonString = FS.readFileSync(apiFilePath, "utf8");
  const tsdocJsonObject: DocNode = JSON.parse(tsdocJsonString);
  const docNodes = tsdocJsonObject.members[0].members;

  const classes: ClassParser[] = [];
  const functions: FunctionParser[] = [];
  const variables: VariableParser[] = [];

  console.log(chalk.default.green(`parsing tsdoc tree ...`));
  docNodes.forEach(docNode => {
    if (!docNode.docComment) return;
    switch (docNode.kind) {
      case "Class":
        classes.push(new ClassParser(docNode));
        break;
      case "Variable":
        variables.push(new VariableParser(docNode));
        break;
      case "Function":
        functions.push(new FunctionParser(docNode));
        break;
      default:
        break;
    }
  });

  console.log(chalk.default.green(`writing markdown ...`));
  classes.forEach((cp: ClassParser) => {
    const cw = new ClassWriter(cp);
    cw.writeTo(markdownFilePath);
  });

  // const variableListWriter = new VariableListWriter(variables)
  // variableListWriter.writeTo(markdownFilePath)

  // const functionListWriter = new FunctionListWriter(functions)
  // functionListWriter.writeTo(markdownFilePath)

  console.log(chalk.default.green(`tsdoc2md finished!`));

  // 删除临时文件
  FS.unlinkSync(apiFilePath);
} catch (err) {
  console.log(chalk.default.red(err));
}
