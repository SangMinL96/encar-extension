"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const vscode = __importStar(require("vscode"));
const sinon = __importStar(require("sinon"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const mocks_1 = require("../mocks");
suite("익스텐션 테스트", () => {
    test("파일 생성 테스트", async () => {
        // Execute the "encar-files" command
        const directory = fs.existsSync(path_1.default.join(__dirname, "Test"));
        if (directory) {
            fs.rmdirSync(path_1.default.join(__dirname, "Test"), { recursive: true });
            await new Promise((resolve) => setTimeout(resolve, 1000));
            fs.mkdirSync(path_1.default.join(__dirname, "Test"));
        }
        else {
            fs.mkdirSync(path_1.default.join(__dirname, "Test"));
        }
        const showInputBoxStub = sinon.stub(vscode.window, "showInputBox");
        showInputBoxStub.resolves("js");
        await vscode.commands.executeCommand("encar-files", {
            ...vscode.Uri.parse(path_1.default.join(__dirname, "Test/")),
            fsPath: path_1.default.join(__dirname, "Test"),
        });
        assert.strictEqual(fs.existsSync(path_1.default.join(__dirname, "Test/index.js")), true);
        assert.strictEqual(fs.existsSync(path_1.default.join(__dirname, "Test/Test.module.scss")), true);
        assert.strictEqual(fs.existsSync(path_1.default.join(__dirname, "Test/Test.js")), true);
        showInputBoxStub.restore();
    });
    test("클래스네임 바인드 교체 테스트", async () => {
        const fakeEditorMock = {
            document: {
                getText: sinon.stub().returns(mocks_1.mockComponent),
            },
            selection: new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(1000, 0)),
            edit: (callback) => {
                const fakeEditBuilder = {
                    replace: (selection, transforms) => (fakeEditorMock.document = {
                        getText: sinon.stub().returns(transforms),
                    }),
                };
                callback(fakeEditBuilder);
            },
        };
        const fakeEditor = sinon
            .stub(vscode.window, "activeTextEditor")
            .get(() => fakeEditorMock);
        await vscode.commands.executeCommand("classNames");
        const classnameLength = (snapshot, classNameRegex) => {
            const matches = snapshot.match(classNameRegex);
            return matches ? matches.length : 0;
        };
        const transformSnapshot = fakeEditorMock.document.getText();
        assert.strictEqual(classnameLength(mocks_1.mockComponent, /className=["'][^"']*["']/g), classnameLength(transformSnapshot, /className={cx\(["'][^"']*["']/g));
        fakeEditor.restore();
    });
});
//# sourceMappingURL=extension.test.js.map