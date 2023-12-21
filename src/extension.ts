import * as vscode from "vscode";

import * as fs from "fs";
import * as path from "path";
import { initIndex, initReact, initScss } from "./template";

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
  context.subscriptions.push(...[파일템플릿, 클래스바인딩포멧]);
}

// This method is called when your extension is deactivated
export function deactivate() {}
