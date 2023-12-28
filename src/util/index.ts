import * as vscode from "vscode";
import { exec } from "child_process";
const root = vscode.workspace.rootPath as string;
export const terminalName = (name: string) => {
  const existingTerminal = vscode.window.terminals.find(
    (terminal) => terminal.name === name
  );
  if (existingTerminal) {
    return existingTerminal;
  } else {
    return vscode.window.createTerminal(name);
  }
};

export const vscodeShowMsg = (text: string, autoClose?: number) => {
  const show = vscode.window.showInformationMessage(text) as any;
  setTimeout(() => {
    if (show) {
      show.dispose(); // 메시지 닫기
    }
  }, autoClose);
};

export const gitExec = async (text: string) => {
  const options = {
    cwd: root,
  };
  exec(text, options);
};
