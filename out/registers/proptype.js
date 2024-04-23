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
const path = __importStar(require("path"));
exports.default = vscode.commands.registerCommand("encar-prop-type", async (uri) => {
    const editor = vscode.window.activeTextEditor;
    if (!uri) {
        uri = vscode.window.activeTextEditor?.document.uri;
    }
    if (editor) {
        // 현재 편집 중인 문서 가져오기
        const document = editor.document;
        const fp = uri.fsPath;
        const componentPath = path.join(fp);
        const 컴포넌트이름 = componentPath.split("/").at(-1)?.split(".")[0];
        // 문서의 끝 위치에 "안녕하세요" 추가
        const lastLine = document.lineAt(document.lineCount - 1);
        const range = new vscode.Range(lastLine.range.end, lastLine.range.end);
        const edit = new vscode.TextEdit(range, `
            \nimport PropTypes from 'prop-types';\n${컴포넌트이름}.propTypes = {};\n${컴포넌트이름}.defaultProps = {};`);
        const workEdit = new vscode.WorkspaceEdit();
        workEdit.set(document.uri, [edit]);
        // 변경사항 적용
        await vscode.workspace.applyEdit(workEdit);
    }
});
//# sourceMappingURL=proptype.js.map