# README

## Getting Started with Interface Rule Tool

Interface Rule Tool offers several commands that streamline working with Interface Extract Rules.

An interface rule is stored as XML. Extract rules contain queries and information about how the queries interact with each other within `<statement> ` tags. The query itself is in a `<sql>` tag that is a child of the statement tag. To work with XML, the query must also be escaped (e.g. a < b → a \&lt; b).

It can become tedious to repeatedly copy rules from a database, copy the queries to a query editor, unescape the query, and finally format it for readability. This extension aims to do this for you in one step.

- [Extract SQL From XML](#extract-sql-from-xml)
- [Convert SQL To XML](#convert-sql-to-xml)

### Extract SQL From XML

To use the Extract SQL From XML command, paste your xml in to a query editor and run the command. You can use the shortcut `Ctrl`+`Alt`+`Shift`+`Q`.

The queries will be extracted to a new query editor and your default SQL formatter will be triggered.

### Convert SQL To XML

To use the Convert SQL To XML command, write or paste your query in to a query editor and run the command. You can use the shortcut `Ctrl`+`Alt`+`Shift`+`W`.

The query will be escaped and placed in a `<sql>` tag within a new query editor.

### For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
