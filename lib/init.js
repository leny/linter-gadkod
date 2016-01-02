"use babel";

import { install } from "atom-package-deps";
import GadkodLinter from "./linter";

let fActivate;

fActivate = function() {
    return install( "linter-gadkod" );
};

export {
    fActivate as activate,
    GadkodLinter as provideLinter
};
