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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const vscode = __importStar(require("vscode"));
const initVite_1 = require("../template/initVite");
const util_1 = require("../util");
const root = vscode.workspace.rootPath;
const terminal = (0, util_1.terminalName)("vite");
exports.default = async (context) => {
    const state = context.globalState;
    const exists = fs.existsSync(path.resolve(root, "@주의_vite실행꺼주세요"));
    // 이미 적용되어있음
    if (exists) {
        (0, util_1.vscodeShowMsg)(`🚀 Vite 로컬 스타트를 이미 적용하셨어요! 초기화후 다시 실행해주세요`, 3000);
    }
    else {
        // 기존 패키지.json
        const packages = await vscode.workspace.openTextDocument(path.resolve(root, "services/fem/package.json"));
        // 기존 yarn.lock파일
        const yarn = await vscode.workspace.openTextDocument(path.resolve(root, "yarn.lock"));
        // 기존 yarn.lock파일
        const gitignore = await vscode.workspace.openTextDocument(path.resolve(root, ".gitignore"));
        // 백업 폴더생성
        fs.mkdirSync(path.resolve(root, "services/fem/local-vite"), {
            recursive: true,
        });
        // 기존 package.json백업
        fs.writeFileSync(path.resolve(`${root}`, "services/fem/local-vite/package.json"), packages.getText());
        // 기존 yarn.lock 백업
        fs.writeFileSync(path.resolve(`${root}`, "services/fem/local-vite/yarn.lock"), yarn.getText());
        // 기존 gitignore 백업
        fs.writeFileSync(path.resolve(`${root}`, "services/fem/local-vite/gitignore"), gitignore.getText());
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
        fs.writeFileSync(path.resolve(`${root}`, "@주의_vite실행꺼주세요"), "Y");
        const gitignore처리 = () => {
            fs.writeFileSync(path.resolve(`${root}`, ".gitignore"), initVite_1.gitIgnore);
            (0, util_1.gitExec)(`git update-index --skip-worktree ${root}/services/fem/src/assets/scss/spr/util.scss ${root}/services/fem/package.json ${root}/yarn.lock`);
        };
        gitignore처리();
        terminal.sendText("yarn install");
        terminal.show();
    }
};
//# sourceMappingURL=viteStart.js.map