import * as vscode from "vscode";
export default vscode.commands.registerCommand("encar-classNames", async () => {
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
});
