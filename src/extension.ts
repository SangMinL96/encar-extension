import * as vscode from "vscode";

import * as fs from "fs";
import * as path from "path";
import { initIndex, initReact, initScss } from "./template/initFiles";
import {
  utilScss,
  utilScssBackup,
  viteConfig,
  viteHtml,
} from "./template/initVite";

export function activate(context: vscode.ExtensionContext) {
  let 파일템플릿 = vscode.commands.registerCommand(
    "encar-files",
    async (uri) => {
      const fp = uri.fsPath;
      const 확장자 = await vscode.window.showInputBox({
        placeHolder: "확장자 입력해주세요 예)js,ts",
        validateInput: (value: string) => {
          if (!value) {
            return "확장자를 입력하지 않았어요";
          }
          return undefined;
        },
      });
      if (확장자) {
        const componentPath = path.join(fp);
        const 컴포넌트이름 = componentPath.split("/").at(-1) as string;
        const indexFilePath = path.join(componentPath, `index.${확장자}`);
        const scssFilePath = path.join(
          componentPath,
          `${컴포넌트이름}.module.scss`
        );
        const reactFilePath = path.join(
          componentPath,
          `${컴포넌트이름}.${확장자}`
        );
        fs.writeFileSync(indexFilePath, initIndex(컴포넌트이름));
        fs.writeFileSync(scssFilePath, initScss());
        fs.writeFileSync(reactFilePath, initReact(컴포넌트이름));
        vscode.window.showInformationMessage(`해피해킹!!`);
      }
    }
  );
  let 클래스바인딩포멧 = vscode.commands.registerCommand(
    "classNames",
    async () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        await vscode.commands.executeCommand("editor.action.selectAll");
        const document = editor.document;
        const selection = editor.selection;
        const code = document.getText(selection);
        const transforms = code.replace(
          /className=(["'])([^"']+)\1/g,
          'className={cx("$2")}'
        );
        editor.edit((editBuilder) => {
          editBuilder.replace(selection, transforms);
        });
      }
    }
  );
  let fem비트로컬켜기 = vscode.commands.registerCommand(
    "fem-vite-open",
    async () => {
      const root = vscode.workspace.rootPath as string;
      const exists = fs.existsSync(
        path.resolve(root, "services/fem/local-vite/package.json")
      );
      if (exists) {
        vscode.window.showInformationMessage(
          `Vite 로컬 스타트를 이미 적용하셨어요! 초기화후 다시 실행해주세요`
        );
      } else {
        const packages = await vscode.workspace.openTextDocument(
          path.resolve(root, "services/fem/package.json")
        );
        // 초기셋
        fs.mkdirSync(path.resolve(root, "services/fem/local-vite"), {
          recursive: true,
        });
        fs.writeFileSync(
          path.resolve(`${root}`, "services/fem/local-vite/package.json"),
          packages.getText()
        );

        // 비트에 필요한 파일 생성
        const 디펜던시추가 =
          '"@vitejs/plugin-react": "^4.2.1","sass": "^1.55.0","vite": "^4.1.4"';
        const 스타트스크립트변경 = '"start": "vite"';
        const transformsPackage = packages
          .getText()
          .replace(/("devDependencies":\s*{\s*)/, `$1${디펜던시추가},`)
          .replace(/("start":\s*".*")/, 스타트스크립트변경);
        fs.writeFileSync(
          path.resolve(root, "services/fem/package.json"),
          transformsPackage
        );
        fs.writeFileSync(
          path.resolve(root, "services/fem/vite.config.js"),
          viteConfig()
        );
        fs.writeFileSync(
          path.resolve(root, "services/fem/index.html"),
          viteHtml
        );
        fs.writeFileSync(
          path.resolve(`${root}`, "services/fem/src/assets/scss/spr/util.scss"),
          utilScss
        );
        // if (isTest) return;
        const terminal = await vscode.window.createTerminal();
        terminal.sendText("yarn install");
        terminal.show();
      }
    }
  );
  let fem비트로컬끄기 = vscode.commands.registerCommand(
    "fem-vite-close",
    async () => {
      const root = vscode.workspace.rootPath as string;
      const exists = fs.existsSync(
        path.resolve(root, "services/fem/local-vite/package.json")
      );
      if (exists) {
        const packages = await vscode.workspace.openTextDocument(
          path.resolve(root, "services/fem/local-vite/package.json")
        );
        fs.writeFileSync(
          path.resolve(`${root}`, "services/fem/package.json"),
          packages.getText()
        );
      }
      fs.writeFileSync(
        path.resolve(`${root}`, "services/fem/src/assets/scss/spr/util.scss"),
        utilScssBackup
      );
      if (fs.existsSync(path.resolve(`${root}`, "services/fem/local-vite"))) {
        fs.rmdirSync(path.resolve(`${root}`, "services/fem/local-vite"), {
          recursive: true,
        });
      }
      if (fs.existsSync(path.resolve(`${root}`, "services/fem/index.html"))) {
        fs.rmSync(path.resolve(`${root}`, "services/fem/index.html"));
      }
      if (
        fs.existsSync(path.resolve(`${root}`, "services/fem/vite.config.js"))
      ) {
        fs.rmSync(path.resolve(`${root}`, "services/fem/vite.config.js"));
      }
      vscode.window.showInformationMessage(`FEM(vite)로컬 초기화 했습니다`);
    }
  );
  let 파일찾기 = vscode.commands.registerCommand("search-file", async () => {
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
      const 파일리스트 = 재귀탐색(code, `${searchRootpath}`);
      if (파일리스트.length > 0) {
        if (파일리스트.length === 1) {
          vscode.workspace.openTextDocument(파일리스트[0]).then((document) => {
            vscode.window.showTextDocument(document);
          });
        } else {
          vscode.window
            .showQuickPick(
              파일리스트.map((item) =>
                item.replace(`${searchRootpath}/src/`, "")
              ),
              {
                placeHolder: "원하는 파일을 선택하세요",
              }
            )
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
  let 패키지파일찾기 = vscode.commands.registerCommand(
    "pkg-search-file",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const root = vscode.workspace.rootPath as string;
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
            vscode.workspace
              .openTextDocument(파일리스트[0])
              .then((document) => {
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
    }
  );
  let scss파일정리 = vscode.commands.registerCommand(
    "scss-file-clean",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        await vscode.commands.executeCommand("editor.action.selectAll");
        const document = editor.document;
        const selection = editor.selection;
        const code = document.getText(selection);
        const transforms = code.replace(/:\s*/g, ":").replace(/;}/g, "}");

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, transforms);
        });
      }
    }
  );
  context.subscriptions.push(
    ...[
      파일템플릿,
      클래스바인딩포멧,
      fem비트로컬켜기,
      fem비트로컬끄기,
      파일찾기,
      scss파일정리,
      패키지파일찾기,
    ]
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
