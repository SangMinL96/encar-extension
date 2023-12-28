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
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const initVite_1 = require("../template/initVite");
const util_1 = require("../util");
const root = vscode.workspace.rootPath;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.default = async () => {
    const path백업패키지 = path.resolve(root, "services/fem/local-vite/package.json");
    const pathGitIgnore = path.resolve(root, "services/fem/local-vite/gitignore");
    const path얀 = path.resolve(root, "services/fem/local-vite/yarn.lock");
    const path로컬비트폴더 = path.resolve(`${root}`, "services/fem/local-vite");
    const path인덱스 = path.resolve(`${root}`, "services/fem/index.html");
    const path비트설정 = path.resolve(`${root}`, "services/fem/vite.config.js");
    // util.scss복원
    fs.writeFileSync(path.resolve(`${root}`, "services/fem/src/assets/scss/spr/util.scss"), initVite_1.utilScssBackup);
    if (fs.existsSync(path백업패키지)) {
        const packages = await vscode.workspace.openTextDocument(path백업패키지);
        fs.writeFileSync(path.resolve(`${root}`, "services/fem/package.json"), packages.getText());
    }
    if (fs.existsSync(path얀)) {
        const 얀 = await vscode.workspace.openTextDocument(path얀);
        fs.writeFileSync(path.resolve(`${root}`, "yarn.lock"), 얀.getText());
    }
    if (fs.existsSync(pathGitIgnore)) {
        const gitignore = await vscode.workspace.openTextDocument(pathGitIgnore);
        fs.writeFileSync(path.resolve(`${root}`, ".gitignore"), gitignore.getText());
    }
    if (fs.existsSync(path인덱스)) {
        fs.rmSync(path인덱스);
    }
    if (fs.existsSync(path비트설정)) {
        fs.rmSync(path비트설정);
    }
    if (fs.existsSync(path.resolve(root, "@주의_vite실행꺼주세요"))) {
        fs.rmSync(path.resolve(root, "@주의_vite실행꺼주세요"));
    }
    (0, util_1.gitExec)(`git update-index --no-skip-worktree ${root}/services/fem/src/assets/scss/spr/util.scss ${root}/services/fem/package.json ${root}/yarn.lock`);
    await sleep(1000);
    if (fs.existsSync(path로컬비트폴더)) {
        fs.rmdirSync(path로컬비트폴더, {
            recursive: true,
        });
    }
    (0, util_1.vscodeShowMsg)(`🚀 Vite설정 껐습니다.`, 3000);
};
//# sourceMappingURL=viteClose.js.map