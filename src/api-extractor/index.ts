import * as path from "path";
import {
  Extractor,
  ExtractorConfig,
  ExtractorResult
} from "@microsoft/api-extractor";

import * as FS from "fs";

import { InputModel } from "../model";
import { setApiFilePath } from "../store";

export class MSApiExtractor {
  private _customConfigJsonPath: string = "";
  private _tsdoc2mdConfig: InputModel | undefined;
  constructor(tsdoc2mdConfig: InputModel) {
    this._tsdoc2mdConfig = tsdoc2mdConfig;
    this.init();
  }
  init() {
    this._customConfigJsonPath = this.generateCustomConfigJsonFile();
  }
  invoke() {
    const extractorConfig: ExtractorConfig = ExtractorConfig.loadFileAndPrepare(
      this._customConfigJsonPath
    );

    // Invoke API Extractor
    const extractorResult: ExtractorResult = Extractor.invoke(extractorConfig, {
      localBuild: true,
      showVerboseMessages: true
    });

    if (extractorResult.succeeded) {
      console.error(`API Extractor completed successfully`);
      process.exitCode = 0;
    } else {
      console.error(
        `API Extractor completed with ${extractorResult.errorCount} errors` +
          ` and ${extractorResult.warningCount} warnings`
      );
      process.exitCode = 1;
    }
  }
  private generateCustomConfigJsonFile() {
    const apiExtractorJsonPath: string = path.join(
      __dirname,
      "../../config/api-extractor.json"
    );
    const _customConfigJsonPath: string = path.join(
      __dirname,
      "../../custom-config/api-extractor.json"
    );

    const apiExtractorJsonString = FS.readFileSync(
      apiExtractorJsonPath,
      "utf8"
    );
    const apiExtractorJsonObject = JSON.parse(apiExtractorJsonString);
    let markdownName;
    if (this._tsdoc2mdConfig) {
      if (
        this._tsdoc2mdConfig.entry &&
        Object.keys(this._tsdoc2mdConfig.entry).length
      ) {
        markdownName = Object.keys(this._tsdoc2mdConfig.entry)[0];
        apiExtractorJsonObject.mainEntryPointFilePath = path.join(
          process.cwd(),
          this._tsdoc2mdConfig.entry[markdownName]
        );
      }
      if (this._tsdoc2mdConfig.outDir) {
        apiExtractorJsonObject.docModel.apiJsonFilePath = path.join(
          __dirname,
          `/temp/`,
          `${markdownName}.api.json`
        );
        setApiFilePath(apiExtractorJsonObject.docModel.apiJsonFilePath);
      }
    }
    FS.writeFileSync(
      _customConfigJsonPath,
      JSON.stringify(apiExtractorJsonObject)
    );
    return _customConfigJsonPath;
  }
}
