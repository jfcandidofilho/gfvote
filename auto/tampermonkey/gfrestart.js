// ==UserScript==
// @name            gfrestart.js
// @namespace       http://github.com/jfcandidofilho/gfvote
// @version         1.3.0
// @description     A simple JavaScript script to vote for polls made with Google Forms.
// @author          J. F. Candido Filho | jfcandidofilho.xyz
// @match           https://docs.google.com/forms/*/formResponse*
// @grant           none
// @encoding        utf-8
// @downloadURL     https://raw.githubusercontent.com/jfcandidofilho/gfvote/master/auto/tampermonkey/gfrestart.js
// @updateURL       https://raw.githubusercontent.com/jfcandidofilho/gfvote/master/auto/tampermonkey/gfrestart.js
// @contributionURL https://github.com/jfcandidofilho/gfvote#donations
// @supportURL      https://github.com/jfcandidofilho/gfvote/issues
// ==/UserScript==

(function() {
    'use strict';

    // Executes gfrestart code
    function gfrestart(){

        // Declaring variables
        var restart_button = null;

        // Gets the button to restart the poll
        restart_button = document.querySelector(
            
            ".freebirdFormviewerViewResponseLinksContainer"
            
        );

        // Checks if the restart button is available
        if( restart_button.children.length > 0 ){

            // Restarts form
            restart_button.children[0].click();

        }

    }


    // Calls the code to be executed!
    gfrestart();
    
})();