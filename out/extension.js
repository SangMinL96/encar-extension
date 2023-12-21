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
const initFiles_1 = require("./template/initFiles");
const initVite_1 = require("./template/initVite");
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
            fs.writeFileSync(indexFilePath, (0, initFiles_1.initIndex)(컴포넌트이름));
            fs.writeFileSync(scssFilePath, (0, initFiles_1.initScss)());
            fs.writeFileSync(reactFilePath, (0, initFiles_1.initReact)(컴포넌트이름));
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
    let fem비트로컬실행 = vscode.commands.registerCommand("fem-vite-start", async () => {
        const root = vscode.workspace.rootPath;
        const exists = fs.existsSync(path.resolve(root, "services/fem/local-vite"));
        if (exists) {
            vscode.window.showInformationMessage(`Vite 로컬 스타트를 이미 적용하셨어요! 초기화후 다시 실행해주세요`);
            const terminal = await vscode.window.createTerminal();
            terminal.sendText("yarn install");
            terminal.show();
        }
        else {
            const packages = await vscode.workspace.openTextDocument(path.resolve(root, "services/fem/package.json"));
            // 초기셋
            fs.mkdirSync(path.resolve(root, "services/fem/local-vite"), {
                recursive: true,
            });
            fs.writeFileSync(path.resolve(`${root}`, "services/fem/local-vite/package.json"), packages.getText());
            // 비트에 필요한 파일 생성
            const 디펜던시추가 = '"@vitejs/plugin-react": "^4.2.1","sass": "^1.55.0","vite": "^4.1.4"';
            const 스타트스크립트변경 = '"start": "vite"';
            const transformsPackage = packages
                .getText()
                .replace(/("devDependencies":\s*{\s*)/, `$1${디펜던시추가},`)
                .replace(/("start":\s*".*")/, 스타트스크립트변경);
            fs.writeFileSync(path.resolve(root, "services/fem/package.json"), transformsPackage);
            fs.writeFileSync(path.resolve(root, "services/fem/vite.config.js"), (0, initVite_1.viteConfig)());
            fs.writeFileSync(path.resolve(root, "services/fem/index.html"), initVite_1.viteHtml);
            fs.writeFileSync(path.resolve(`${root}`, "services/fem/src/assets/scss/spr/util.scss"), initVite_1.utilScss);
            await vscode.window.createTerminal();
        }
    });
    context.subscriptions.push(...[파일템플릿, 클래스바인딩포멧, fem비트로컬실행]);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map