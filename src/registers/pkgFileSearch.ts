import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
const root = vscode.workspace.rootPath as string;

export default vscode.commands.registerCommand("pkg-search-file", async () => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const document = editor.document;
    const selection = editor.selection;
    const code = [
      `${document.getText(selection)}.ts`,
      `${document.getText(selection)}.tsx`,
      `${document.getText(selection)}.js`,
      `${document.getText(selection)}.jsx`,
    ];
    function 재귀탐색(fileName: string[], rootPath: string) {
      let filePaths: any[] = [];

      function searchFiles(currentPath: string) {
        const files = fs.readdirSync(currentPath);
        for (const file of files) {
          const filePath = path.join(currentPath, file);
          const isDirectory = fs.statSync(filePath).isDirectory();
          if (isDirectory) {
            searchFiles(filePath);
          } else {
            if (fileName.includes(path.basename(filePath))) {
              filePaths.push(filePath);
            }
          }
        }
      }
      searchFiles(rootPath);
      return filePaths;
    }
    const 파일리스트 = 재귀탐색(code, `${root}/packages`);
    if (파일리스트.length > 0) {
      if (파일리스트.length === 1) {
        vscode.workspace.openTextDocument(파일리스트[0]).then((document) => {
          vscode.window.showTextDocument(document);
        });
      } else {
        vscode.window
          .showQuickPick(
            파일리스트.map((item) => item.replace(`${root}/packages`, "")),
            {
              placeHolder: "원하는 파일을 선택하세요",
            }
          )
          .then((selectedItem) => {
            if (selectedItem) {
              vscode.workspace
                .openTextDocument(`${root}/packages/${selectedItem}`)
                .then((document) => {
                  vscode.window.showTextDocument(document);
                });
            }
          });
      }
    }
  }
});
