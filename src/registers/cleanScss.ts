import * as vscode from "vscode";
export default vscode.commands.registerCommand("scss-file-clean", async () => {
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
});
