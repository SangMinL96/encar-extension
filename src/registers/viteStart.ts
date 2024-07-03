import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import {
  gitIgnore,
  utilScss,
  viteConfig,
  viteHtml,
} from "../template/initVite";
import { gitExec, terminalName, vscodeShowMsg } from "../util";

const root = vscode.workspace.rootPath as string;
const terminal = terminalName("vite");
export default async (context: any) => {
  const state = context.globalState;
  const exists = fs.existsSync(path.resolve(root, "@주의_vite실행꺼주세요"));
  // 이미 적용되어있음
  if (exists) {
    vscodeShowMsg(
      `🚀 Vite 로컬 스타트를 이미 적용하셨어요! 초기화후 다시 실행해주세요`,
      3000
    );
  } else {
    // 기존 패키지.json
    const packages = await vscode.workspace.openTextDocument(
      path.resolve(root, "services/fem/package.json")
    );
    // 기존 yarn.lock파일
    const yarn = await vscode.workspace.openTextDocument(
      path.resolve(root, "yarn.lock")
    );

    // 기존 yarn.lock파일
    const gitignore = await vscode.workspace.openTextDocument(
      path.resolve(root, ".gitignore")
    );
    // 백업 폴더생성
    fs.mkdirSync(path.resolve(root, "services/fem/local-vite"), {
      recursive: true,
    });
    // 기존 package.json백업
    fs.writeFileSync(
      path.resolve(`${root}`, "services/fem/local-vite/package.json"),
      packages.getText()
    );
    // 기존 yarn.lock 백업
    fs.writeFileSync(
      path.resolve(`${root}`, "services/fem/local-vite/yarn.lock"),
      yarn.getText()
    );
    // 기존 gitignore 백업
    fs.writeFileSync(
      path.resolve(`${root}`, "services/fem/local-vite/gitignore"),
      gitignore.getText()
    );
    // 비트에 필요한 파일 생성
    const 디펜던시추가 =
      '"@vitejs/plugin-react": "^4.2.1","sass": "^1.55.0","vite": "^4.1.4","@babel/plugin-transform-react-jsx-development": "^7.22.5","vite-plugin-eslint": "^1.8.1"';
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
    fs.writeFileSync(path.resolve(root, "services/fem/index.html"), viteHtml);
    fs.writeFileSync(
      path.resolve(`${root}`, "services/fem/src/assets/scss/spr/util.scss"),
      utilScss
    );

    fs.writeFileSync(path.resolve(`${root}`, "@주의_vite실행꺼주세요"), "Y");
    const gitignore처리 = () => {
      fs.writeFileSync(path.resolve(`${root}`, ".gitignore"), gitIgnore);
      gitExec(
        `git update-index --skip-worktree ${root}/services/fem/src/assets/scss/spr/util.scss ${root}/services/fem/package.json ${root}/yarn.lock`
      );
    };
    gitignore처리();
    terminal.sendText("yarn install");
    terminal.show();
  }
};
