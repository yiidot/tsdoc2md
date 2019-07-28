"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = __importStar(require("path"));
var api_extractor_1 = require("@microsoft/api-extractor");
var FS = __importStar(require("fs"));
var store_1 = require("../store");
var MSApiExtractor = /** @class */ (function () {
    function MSApiExtractor(tsdoc2mdConfig) {
        this._customConfigJsonPath = "";
        this._tsdoc2mdConfig = tsdoc2mdConfig;
        this.init();
    }
    MSApiExtractor.prototype.init = function () {
        this._customConfigJsonPath = this.generateCustomConfigJsonFile();
    };
    MSApiExtractor.prototype.invoke = function () {
        var extractorConfig = api_extractor_1.ExtractorConfig.loadFileAndPrepare(this._customConfigJsonPath);
        // Invoke API Extractor
        var extractorResult = api_extractor_1.Extractor.invoke(extractorConfig, {
            localBuild: true,
            showVerboseMessages: true
        });
        if (extractorResult.succeeded) {
            console.error("API Extractor completed successfully");
            process.exitCode = 0;
        }
        else {
            console.error("API Extractor completed with " + extractorResult.errorCount + " errors" +
                (" and " + extractorResult.warningCount + " warnings"));
            process.exitCode = 1;
        }
    };
    MSApiExtractor.prototype.generateCustomConfigJsonFile = function () {
        var apiExtractorJsonPath = path.join(__dirname, "../../config/api-extractor.json");
        var _customConfigJsonPath = path.join(__dirname, "../../custom-config/api-extractor.json");
        var apiExtractorJsonString = FS.readFileSync(apiExtractorJsonPath, "utf8");
        var apiExtractorJsonObject = JSON.parse(apiExtractorJsonString);
        var markdownName;
        if (this._tsdoc2mdConfig) {
            if (this._tsdoc2mdConfig.entry &&
                Object.keys(this._tsdoc2mdConfig.entry).length) {
                markdownName = Object.keys(this._tsdoc2mdConfig.entry)[0];
                apiExtractorJsonObject.mainEntryPointFilePath = path.join(process.cwd(), this._tsdoc2mdConfig.entry[markdownName]);
            }
            if (this._tsdoc2mdConfig.outDir) {
                apiExtractorJsonObject.docModel.apiJsonFilePath = path.join(__dirname, "/temp/", markdownName + ".api.json");
                store_1.setApiFilePath(apiExtractorJsonObject.docModel.apiJsonFilePath);
            }
        }
        FS.writeFileSync(_customConfigJsonPath, JSON.stringify(apiExtractorJsonObject));
        return _customConfigJsonPath;
    };
    return MSApiExtractor;
}());
exports.MSApiExtractor = MSApiExtractor;
