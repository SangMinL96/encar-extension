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
exports.default = vscode.commands.registerCommand("search-file", async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const match = document.uri.fsPath.match(/(.+\/src)/);
        const searchRootpath = match?.[1];
        const selection = editor.selection;
        const code = [
            `${document.getText(selection)}.ts`,
            `${document.getText(selection)}.tsx`,
            `${document.getText(selection)}.js`,
            `${document.getText(selection)}.jsx`,
        ];
        function 재귀탐색(fileName, rootPath) {
            let filePaths = [];
            function searchFiles(currentPath) {
                const files = fs.readdirSync(currentPath);
                for (const file of files) {
                    const filePath = path.join(currentPath, file);
                    const isDirectory = fs.statSync(filePath).isDirectory();
                    if (isDirectory) {
                        searchFiles(filePath);
                    }
                    else {
                        if (fileName.includes(path.basename(filePath))) {
                            filePaths.push(filePath);
                        }
                    }
                }
            }
            searchFiles(rootPath);
            return filePaths;
        }
        const 파일리스트 = 재귀탐색(code, `${searchRootpath}`);
        if (파일리스트.length > 0) {
            if (파일리스트.length === 1) {
                vscode.workspace.openTextDocument(파일리스트[0]).then((document) => {
                    vscode.window.showTextDocument(document);
                });
            }
            else {
                vscode.window
                    .showQuickPick(파일리스트.map((item) => item.replace(`${searchRootpath}/src/`, "")), {
                    placeHolder: "원하는 파일을 선택하세요",
                })
                    .then((selectedItem) => {
                    if (selectedItem) {
                        vscode.workspace
                            .openTextDocument(`${searchRootpath}/src/${selectedItem}`)
                            .then((document) => {
                            vscode.window.showTextDocument(document);
                        });
                    }
                });
            }
        }
    }
});
//# sourceMappingURL=fileSearch.js.map