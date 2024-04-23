"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const classname_1 = __importDefault(require("./registers/classname"));
const cleanScss_1 = __importDefault(require("./registers/cleanScss"));
const fileSearch_1 = __importDefault(require("./registers/fileSearch"));
const fileTemplate_1 = __importDefault(require("./registers/fileTemplate"));
const pkgFileSearch_1 = __importDefault(require("./registers/pkgFileSearch"));
const viteClose_1 = __importDefault(require("./registers/viteClose"));
const viteStart_1 = __importDefault(require("./registers/viteStart"));
const autoClassname_1 = __importDefault(require("./registers/autoClassname"));
const proptype_1 = __importDefault(require("./registers/proptype"));
function activate(context) {
    let fem비트실행 = vscode.commands.registerCommand("fem-vite", async () => {
        const arr = ["실행", "끄기"];
        vscode.window
            .showQuickPick(arr, {
            placeHolder: "원하는 동작을 선택하세요.",
        })
            .then((selected) => {
            if (selected) {
                if (selected === "실행") {
                    return (0, viteStart_1.default)(context);
                }
                if (selected === "끄기") {
                    return (0, viteClose_1.default)();
                }
            }
        });
    });
    context.subscriptions.push(...[
        fileTemplate_1.default,
        classname_1.default,
        fileSearch_1.default,
        cleanScss_1.default,
        pkgFileSearch_1.default,
        fem비트실행,
        autoClassname_1.default,
        proptype_1.default
    ]);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map