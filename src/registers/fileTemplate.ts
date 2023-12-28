import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

import { initIndex, initReact, initScss } from "../template/initFiles";
import { vscodeShowMsg } from "../util";
export default vscode.commands.registerCommand("encar-files", async (uri) => {
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
    const reactFilePath = path.join(componentPath, `${컴포넌트이름}.${확장자}`);
    fs.writeFileSync(indexFilePath, initIndex(컴포넌트이름));
    fs.writeFileSync(scssFilePath, initScss());
    fs.writeFileSync(reactFilePath, initReact(컴포넌트이름));
    vscodeShowMsg(`🚀 기본적인 셋팅이 된 템플릿이 만들어졌어요.`, 3000);
  }
});
