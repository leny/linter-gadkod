"use babel";

import gadkod from "gadkod";

let fGadKodLinter = function() {
    return {
        "name": "gadkòd",
        "scope": "file",
        "grammarScopes": [ "*" ],
        "lintOnFly": true,
        lint( oTextEditor ) {
            let sFilePath = oTextEditor.getPath();

            if ( sFilePath ) {
                let iLineCount = oTextEditor.getLineCount(),
                    iCurrentLine = 0,
                    aResults = [];

                while ( iCurrentLine < iLineCount ) {
                    Array.prototype.push.apply( aResults, gadkod.parseLine( oTextEditor.lineTextForBufferRow( iCurrentLine ), iCurrentLine++ ) );
                }

                return aResults.map( ( { "line": iLine, "column": iColumn, "character": oCharacter } ) => {
                    return {
                        "type": "Warning",
                        "html": `Found a <em>${ oCharacter.source.name.toLowerCase() }</em>, should probably be a <em>${ oCharacter.replacement.name.toLowerCase() }</em> <kbd>${ oCharacter.replacement.character }</kbd>`,
                        "filePath": sFilePath,
                        "range": [
                            [ iLine, iColumn ],
                            [ iLine, iColumn + 1 ]
                        ]
                    };
                } );
            }
        }
    };
};

export default fGadKodLinter;
