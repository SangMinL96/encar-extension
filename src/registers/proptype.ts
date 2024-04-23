import * as vscode from "vscode";
import * as path from "path";

export default vscode.commands.registerCommand(
    "encar-prop-type",
    async (uri) => {
        const editor = vscode.window.activeTextEditor;
        if (!uri) {
            uri = vscode.window.activeTextEditor?.document.uri;
        }
        if (editor) {
            // 현재 편집 중인 문서 가져오기
            const document = editor.document;
            const fp = uri.fsPath;
            const componentPath = path.join(fp);
            const 컴포넌트이름 = componentPath.split("/").at(-1)?.split(".")[0] as string;
            // 문서의 끝 위치에 "안녕하세요" 추가
            const lastLine = document.lineAt(document.lineCount - 1);
            const range = new vscode.Range(
                lastLine.range.end,
                lastLine.range.end
            );
            const edit = new vscode.TextEdit(range, `
            \nimport PropTypes from 'prop-types';\n${컴포넌트이름}.propTypes = {};\n${컴포넌트이름}.defaultProps = {};`);
            const workEdit = new vscode.WorkspaceEdit();
            workEdit.set(document.uri, [edit]);

            // 변경사항 적용
            await vscode.workspace.applyEdit(workEdit);
        }
    }
);
