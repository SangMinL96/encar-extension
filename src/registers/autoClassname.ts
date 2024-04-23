import * as vscode from "vscode";

export default vscode.languages.registerCompletionItemProvider(
    { scheme: "file", language: "typescriptreact" },
    {
        provideCompletionItems(document, position) {
            const linePrefix = document
                .lineAt(position)
                .text.substr(0, position.character);
            // 정규식 패턴 사용하여 className 검사
            if (/\bclassName\s*=\s*{?"[^"}]*"?}$/.test(linePrefix)) {
                return [
                    new vscode.CompletionItem(
                        'className={cx("")}',
                        vscode.CompletionItemKind.Snippet
                    ),
                ];
            }
            return [];
        },
    }
);
