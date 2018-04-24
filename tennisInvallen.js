// ==UserScript==
// @name         TcDeUithof Level Filter
// @namespace    https://tcdeuithof.nl/
// @version      0.1
// @description  Filter out the levels that are below or above the preferred level
// @author       Yorick
// @match        https://tcdeuithof.nl/tennis/invallen.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var rowsToDelete = [];
    var rows = document.getElementsByTagName("table")[0].rows;
    var oldLevelString = ""; //Keep track of previous levelString

    // Mark deletable rows
    for (var i = 0; i < rows.length; i++) {
        var levelString = rows[i].cells[2].innerText;

        // Mark if this group is the same as the previous group
        if (i > 0 && levelString === oldLevelString) {
            rowsToDelete.push(i);
            oldLevelString = levelString;
            continue;
        }
        oldLevelString = levelString;
        var indexOfNiveau = levelString.indexOf("Niveau");
        var level = levelString.substring(indexOfNiveau + "Niveau".length).trim();
        if (!level.includes("7")){
            rowsToDelete.push(i);
        }
    }

    // Remove rows
    for (var j = 0; j < rowsToDelete.length; j++) {
        rows[rowsToDelete[j] - j].remove();
    }
})();