import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { utilScssBackup } from "../template/initVite";
import { gitExec, terminalName, vscodeShowMsg } from "../util";
const root = vscode.workspace.rootPath as string;
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default async () => {
  const path백업패키지 = path.resolve(
    root,
    "services/fem/local-vite/package.json"
  );
  const pathGitIgnore = path.resolve(root, "services/fem/local-vite/gitignore");
  const path얀 = path.resolve(root, "services/fem/local-vite/yarn.lock");
  const path로컬비트폴더 = path.resolve(`${root}`, "services/fem/local-vite");
  const path인덱스 = path.resolve(`${root}`, "services/fem/index.html");

  const path비트설정 = path.resolve(`${root}`, "services/fem/vite.config.js");

  // util.scss복원
  fs.writeFileSync(
    path.resolve(`${root}`, "services/fem/src/assets/scss/spr/util.scss"),
    utilScssBackup
  );
  if (fs.existsSync(path백업패키지)) {
    const packages = await vscode.workspace.openTextDocument(path백업패키지);
    fs.writeFileSync(
      path.resolve(`${root}`, "services/fem/package.json"),
      packages.getText()
    );
  }

  if (fs.existsSync(path얀)) {
    const 얀 = await vscode.workspace.openTextDocument(path얀);
    fs.writeFileSync(path.resolve(`${root}`, "yarn.lock"), 얀.getText());
  }
  if (fs.existsSync(pathGitIgnore)) {
    const gitignore = await vscode.workspace.openTextDocument(pathGitIgnore);
    fs.writeFileSync(
      path.resolve(`${root}`, ".gitignore"),
      gitignore.getText()
    );
  }

  if (fs.existsSync(path인덱스)) {
    fs.rmSync(path인덱스);
  }
  if (fs.existsSync(path비트설정)) {
    fs.rmSync(path비트설정);
  }
  if (fs.existsSync(path.resolve(root, "@주의_vite실행꺼주세요"))) {
    fs.rmSync(path.resolve(root, "@주의_vite실행꺼주세요"));
  }
  gitExec(
    `git update-index --no-skip-worktree ${root}/services/fem/src/assets/scss/spr/util.scss ${root}/services/fem/package.json ${root}/yarn.lock`
  );
  await sleep(1000);
  if (fs.existsSync(path로컬비트폴더)) {
    fs.rmdirSync(path로컬비트폴더, {
      recursive: true,
    });
  }
  vscodeShowMsg(`🚀 Vite설정 껐습니다.`, 3000);
};
