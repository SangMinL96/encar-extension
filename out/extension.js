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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const template_1 = require("./template");
function activate(context) {
    let 파일템플릿 = vscode.commands.registerCommand("encar-files", async (uri) => {
        const fp = uri.fsPath;
        const 확장자 = await vscode.window.showInputBox({
            placeHolder: "확장자 입력해주세요 예)js,ts",
            validateInput: (value) => {
                if (!value) {
                    return "확장자를 입력하지 않았어요";
                }
                return undefined;
            },
        });
        if (확장자) {
            const componentPath = path.join(fp);
            const 컴포넌트이름 = componentPath.split("/").at(-1);
            const indexFilePath = path.join(componentPath, `index.${확장자}`);
            const scssFilePath = path.join(componentPath, `${컴포넌트이름}.module.scss`);
            const reactFilePath = path.join(componentPath, `${컴포넌트이름}.${확장자}`);
            fs.writeFileSync(indexFilePath, (0, template_1.initIndex)(컴포넌트이름));
            fs.writeFileSync(scssFilePath, (0, template_1.initScss)());
            fs.writeFileSync(reactFilePath, (0, template_1.initReact)(컴포넌트이름));
            vscode.window.showInformationMessage(`해피해킹!!`);
        }
    });
    let 클래스바인딩포멧 = vscode.commands.registerCommand("classNames", async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            await vscode.commands.executeCommand("editor.action.selectAll");
            const document = editor.document;
            const selection = editor.selection;
            const code = document.getText(selection);
            const transforms = code.replace(/className=(["'])([^"']+)\1/g, 'className={cx("$2")}');
            editor.edit((editBuilder) => {
                editBuilder.replace(selection, transforms);
            });
        }
    });
    context.subscriptions.push(...[파일템플릿, 클래스바인딩포멧]);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map