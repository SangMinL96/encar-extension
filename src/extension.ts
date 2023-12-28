import * as vscode from "vscode";
import classname from "./registers/classname";
import cleanScss from "./registers/cleanScss";
import fileSearch from "./registers/fileSearch";
import fileTemplate from "./registers/fileTemplate";
import pkgFileSearch from "./registers/pkgFileSearch";
import viteClose from "./registers/viteClose";
import viteStart from "./registers/viteStart";

export function activate(context: vscode.ExtensionContext) {
  let fem비트실행 = vscode.commands.registerCommand("fem-vite", async () => {
    const arr = ["실행", "끄기"];
    vscode.window
      .showQuickPick(arr, {
        placeHolder: "원하는 동작을 선택하세요.",
      })
      .then((selected) => {
        if (selected) {
          if (selected === "실행") {
            return viteStart(context);
          }
          if (selected === "끄기") {
            return viteClose();
          }
        }
      });
  });
  context.subscriptions.push(
    ...[
      fileTemplate,
      classname,
      fileSearch,
      cleanScss,
      pkgFileSearch,
      fem비트실행,
    ]
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
