// ==UserScript==
// @name            gfvote.js
// @namespace       http://github.com/jfcandidofilho/gfvote
// @version         1.3.0
// @description     A simple JavaScript script to vote for polls made with Google Forms.
// @author          J. F. Candido Filho | jfcandidofilho.xyz
// @match           https://docs.google.com/forms/*/viewform*
// @grant           none
// @encoding        utf-8
// @downloadURL     https://raw.githubusercontent.com/jfcandidofilho/gfvote/master/auto/tampermonkey/gfvote.js
// @updateURL       https://raw.githubusercontent.com/jfcandidofilho/gfvote/master/auto/tampermonkey/gfvote.js
// @contributionURL https://github.com/jfcandidofilho/gfvote#donations
// @supportURL      https://github.com/jfcandidofilho/gfvote/issues
// ==/UserScript==

(function() {
    'use strict';

    /*
    Selects the state of the code running
    "DEV" -> tests for development
    "DEBUG" -> Debugging the error
    "PROD" -> Production code
    */
    var STATE = "DEV";

    // A collection of the entities that represents the options
    var OPTIONS = document.querySelectorAll(
                    
        ".appsMaterialWizToggleRadiogroupEl"
        
    );


    // Sets number of options a given poll has, polls separated by comma
    var options_per_category = [

        6, 7, 8, 7, 7, 7, 7, 7, 7, 7, 
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 
        7, 7, 7, 7, 7, 7, 7

    ];

    // Your vote for each poll, each vote for each poll separated by a comma
    var vote_list = [

        0, 6, 5, 1, 3, 5, 5, 3, 3, 3, 
        6, 0, 2, 6, 1, 3, 5, 0, 6, 6, 
        3, 1, 3, 4, 2, 6, 3

    ];


    // Returns the sum of the # of options of each previous poll.
    function toopp( option_list, current_index ){

        // PS: "toopp" stands for "total options of previous polls"

        var count = 0;

        for( var i = 0; i < current_index; i++ ){

            count += option_list[ i ];

        }

        return count;

    }

    // Sends form
    function send_form(){

        // Get send button
        var send_form = document.querySelectorAll(
            
            ".appsMaterialWizButtonPaperbuttonContent.exportButtonContent"
            
        );

        // Send form by clicking on it
        send_form[ 
            
            send_form.length + ( send_form.length > 0 ? -1 : 0 )

        ].click();

    }


    // Executes gfvote code
    function gfvote( options_list, vote_list ){

        // Select each poll to vote for
        for( var poll = 0; poll < options_list.length; poll++ ){

            // Select the proper element in a list of elements to vote for
            var vote = toopp( options_list, poll ) + vote_list[ poll ];

            // Verifies the vote selected
            if( STATE == "DEV" ){ 
                
                console.log( 
                
                    "POLL: " + (poll + 1),
                    
                    "VOTE: " + OPTIONS[ vote ].dataset.value
        
                );

            }

            // Votes for the selected option in the poll
            if( STATE == "PROD" ) OPTIONS[ vote ].click();

        }

        // Sends form
        send_form();

    }


    // Calls the code to be executed!
    gfvote( options_per_category, vote_list );
    
})();