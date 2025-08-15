const vscode = require("vscode");

function activate(context) {
    let disposable = vscode.commands.registerCommand("shapeChecker.checkShape", async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        // Get the selected word or the word under the cursor
        const selection = editor.selection;
        let varName = editor.document.getText(selection);
        if (!varName) {
            const range = editor.document.getWordRangeAtPosition(selection.active);
            varName = editor.document.getText(range);
        }
        if (!varName) return;

        // Append `.shape` and send to the interactive window
        const codeToSend = `print(${varName}.shape)`;

        // This command is exposed by the Jupyter extension
        await vscode.commands.executeCommand("jupyter.execSelectionInteractive", codeToSend);
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
