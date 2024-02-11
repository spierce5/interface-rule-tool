// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// The module 'azdata' contains the Azure Data Studio extensibility API
// This is a complementary set of APIs that add SQL / Data-specific functionality to the app
// Import the module and reference it with the alias azdata in your code below

// Note: uncomment when you want to use Azure Data Studio APIs. Commenting now to avoid strict linting issues
const azdata = require("azdata");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "interface-rule-tool" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  context.subscriptions.push(
    vscode.commands.registerCommand("interface-rule-tool.helloWorld", () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World! Mwuahaha");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "interface-rule-tool.showCurrentConnection",
      () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        azdata.connection.getCurrentConnection().then(
          (connection) => {
            let connectionId = connection
              ? connection.connectionId
              : "No connection found!";
            vscode.window.showInformationMessage(connectionId);
          },
          (error) => {
            console.info(error);
          }
        );
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("interface-rule-tool.removeXML", () => {
      const activeEditor = vscode.window.activeTextEditor;
      if (!activeEditor) {
        vscode.window.showInformationMessage("activeEditor not found");
      } else {
        const newEditorContent = parseSQLFromXML(activeEditor);
        newTextEditor()
          .then(() => {
            const newTextEditor = vscode.window.activeTextEditor;
            newTextEditor.insertSnippet(
              new vscode.SnippetString(newEditorContent)
            );
          })
          .then(() => {
            vscode.commands.executeCommand("editor.action.formatDocument");
          });
      }
    })
  );
}

async function newTextEditor() {
  return await vscode.commands.executeCommand("newQuery");
}

function parseSQLFromXML(activeEditor) {
  const { text } = getText(activeEditor);
  const dom = new JSDOM(text, {
    contentType: "text/xml",
  });
  let sqlTags = Array.from(dom.window.document.getElementsByTagName("sql"));
  let sqlQueries = sqlTags.map((tag) => tag.textContent);
  let sqlContent = sqlQueries.join("\n\n");
  vscode.window.showInformationMessage(
    // dom.window.document.querySelector("sql").textContent
    sqlContent
  );
  return sqlContent;
}

function getText(activeEditor) {
  const { document } = activeEditor;
  const text = document.getText();

  return {
    text,
  };
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
