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
exports.gitExec = exports.vscodeShowMsg = exports.terminalName = void 0;
const vscode = __importStar(require("vscode"));
const child_process_1 = require("child_process");
const root = vscode.workspace.rootPath;
const terminalName = (name) => {
    const existingTerminal = vscode.window.terminals.find((terminal) => terminal.name === name);
    if (existingTerminal) {
        return existingTerminal;
    }
    else {
        return vscode.window.createTerminal(name);
    }
};
exports.terminalName = terminalName;
const vscodeShowMsg = (text, autoClose) => {
    const show = vscode.window.showInformationMessage(text);
    setTimeout(() => {
        if (show) {
            show.dispose(); // 메시지 닫기
        }
    }, autoClose);
};
exports.vscodeShowMsg = vscodeShowMsg;
const gitExec = async (text) => {
    const options = {
        cwd: root,
    };
    (0, child_process_1.exec)(text, options);
};
exports.gitExec = gitExec;
//# sourceMappingURL=index.js.map