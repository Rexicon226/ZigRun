import * as vscode from 'vscode';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.buildAndRunZigProgram', () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showErrorMessage('No active file open in editor');
            return;
        }
        const fileName = activeEditor.document.fileName;
        if (!fileName.endsWith('.zig')) {
            vscode.window.showErrorMessage('Active file is not a Zig file');
            return;
        }

        const terminal = vscode.window.createTerminal({ name: 'Zig Build and Run' });
        terminal.show(true);

        terminal.sendText(`zig build-exe ${fileName}`);
        terminal.sendText(`.\\${fileName.replace('.zig', '.exe')}`);
    });

    context.subscriptions.push(disposable);

    const buildAndRunButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    buildAndRunButton.command = 'extension.buildAndRunZigProgram';
    buildAndRunButton.text = '$(play) Build and Run Zig';
    buildAndRunButton.show();
    context.subscriptions.push(buildAndRunButton);
}

export function deactivate() {}
