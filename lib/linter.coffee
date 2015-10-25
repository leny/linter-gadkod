gadkod = require "gadkod"

module.exports = new class

  name: 'gadkòd'
  scope: "file"
  grammarScopes: [ "*" ]
  lintOnFly: yes

  # coffeelint: disable=no_unnecessary_fat_arrows
  # The fat arrow here is necessary
  lint: ( TextEditor ) =>
    # coffeelint: enable=no_unnecessary_fat_arrows
    oTextBuffer = TextEditor.getBuffer()

    sFilePath = TextEditor.getPath()
    if sFilePath
      sSource = TextEditor.getText()
      iLineCount = TextEditor.getLineCount()
      iCurrentLine = 0
      aResults = []
      while iCurrentLine < iLineCount
        Array.prototype.push.apply aResults, gadkod.parseLine ( TextEditor.lineTextForBufferRow iCurrentLine ), iCurrentLine++

      _format = ( { line: iLine, column: iColumn, character: oCharacter } ) ->
        {} =
          type: "Warning"
          html: "Found a <em>#{ oCharacter.source.name.toLowerCase() }</em>, should probably be a <em>#{ oCharacter.replacement.name.toLowerCase() }</em> <kbd>#{ oCharacter.replacement.character }</kbd>"
          filePath: sFilePath
          range: [ [ iLine, iColumn ], [ iLine, iColumn + 1 ] ]

      aResults.map _format
