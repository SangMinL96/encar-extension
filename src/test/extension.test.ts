import * as assert from "assert";
import * as vscode from "vscode";
import * as sinon from "sinon";
import * as fs from "fs";
import path from "path";
import { mockComponent } from "../mocks";
suite("익스텐션 테스트", () => {
  test("파일 생성 테스트", async () => {
    // Execute the "encar-files" command
    const directory = fs.existsSync(path.join(__dirname, "Test"));

    if (directory) {
      fs.rmdirSync(path.join(__dirname, "Test"), { recursive: true });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      fs.mkdirSync(path.join(__dirname, "Test"));
    } else {
      fs.mkdirSync(path.join(__dirname, "Test"));
    }
    const showInputBoxStub = sinon.stub(vscode.window, "showInputBox");
    showInputBoxStub.resolves("js");
    await vscode.commands.executeCommand("encar-files", {
      ...vscode.Uri.parse(path.join(__dirname, "Test/")),
      fsPath: path.join(__dirname, "Test"),
    });

    assert.strictEqual(
      fs.existsSync(path.join(__dirname, "Test/index.js")),
      true
    );
    assert.strictEqual(
      fs.existsSync(path.join(__dirname, "Test/Test.module.scss")),
      true
    );
    assert.strictEqual(
      fs.existsSync(path.join(__dirname, "Test/Test.js")),
      true
    );
    showInputBoxStub.restore();
  });

  test("클래스네임 바인드 교체 테스트", async () => {
    const fakeEditorMock: any = {
      document: {
        getText: sinon.stub().returns(mockComponent),
      } as any,
      selection: new vscode.Selection(
        new vscode.Position(0, 0),
        new vscode.Position(1000, 0)
      ),
      edit: (callback: any) => {
        const fakeEditBuilder: vscode.TextEditorEdit = {
          replace: (selection: any, transforms: string) =>
            (fakeEditorMock.document = {
              getText: sinon.stub().returns(transforms),
            }),
        } as any;
        callback(fakeEditBuilder);
      },
    };

    const fakeEditor = sinon
      .stub(vscode.window, "activeTextEditor")
      .get(() => fakeEditorMock);
    await vscode.commands.executeCommand("classNames");

    const classnameLength = (snapshot: string, classNameRegex: any) => {
      const matches = snapshot.match(classNameRegex);
      return matches ? matches.length : 0;
    };
    const transformSnapshot = fakeEditorMock.document.getText();
    assert.strictEqual(
      classnameLength(mockComponent, /className=["'][^"']*["']/g),
      classnameLength(transformSnapshot, /className={cx\(["'][^"']*["']/g)
    );
    fakeEditor.restore();
  });
  test("FEM(vite)실행켜기", async () => {
    fs.mkdirSync(path.join(__dirname, "services/fem"), { recursive: true });
    await vscode.commands.executeCommand("fem-vite-open", {
      ...vscode.Uri.parse(path.join(__dirname)),
      isTest: true,
    });
  });
});
