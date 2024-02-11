const vscode = require("vscode");
const azdata = require("azdata");

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function activate(context) {
  console.log(
    'Congratulations, your extension "interface-rule-tool" is now active!'
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("interface-rule-tool.helloWorld", () => {
      vscode.window.showInformationMessage("Hello World! Mwuahaha");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "interface-rule-tool.showCurrentConnection",
      () => {
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
    vscode.commands.registerCommand(
      "interface-rule-tool.extractSQLFromXML",
      () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
          vscode.window.showInformationMessage("Active editor not found");
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
      }
    )
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
  let statementTags = Array.from(
    dom.window.document.getElementsByTagName("statement")
  );
  let sqlQueries = statementTags.map((tag) => {
    let query = tag.getElementsByTagName("sql")[0].textContent;
    const tableName = tag.getElementsByTagName("tablename")[0].textContent;
    const relation = tag.getElementsByTagName("relation");
    let queryHeader = `/*\n * Table: ${tableName}`;
    if (relation.length > 0) {
      queryHeader += `\n * Relation: ${relation[0].textContent}`;
    }
    query = `${queryHeader}\n */\n${query}`;
    return query;
  });
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
