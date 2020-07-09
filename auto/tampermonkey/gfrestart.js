// ==UserScript==
// @name            gfrestart.js
// @namespace       http://github.com/jfcandidofilho/gfvote
// @version         1.2.0
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

    /*
    Selects the state of the code running
    "DEV" -> tests for development
    "DEBUG" -> Debugging the error
    "PROD" -> Production code
    */
    var STATE = "DEV";


    // Defines the maximum age (in days)
    var age_in_days = 10;


    // Gets the value of a give cookie
    function get_cookie_value( name ){

        // Sets cookie parameters
        var cookie_name = name + "=";

        // Decodes cookie for the current Google Form
        var cookie_decoded = (decodeURIComponent( document.cookie ))
                            .split( ";" );

        // Print cookie table for the current Google Form
        if( STATE == "DEV" ) console.table( cookie_decoded );

        // Returns the amount of votes so far
        if( STATE == "PROD" ) {

            // Seeks inside the cookie for the current Google Form
            for( var i = 0; i < cookie_decoded.length; i++ ) {

                // Remove leading spaces
                while( cookie_decoded[i].charAt(0) == ' ' ){

                    cookie_decoded[i] = cookie_decoded[i].substring(1);

                }

                // Returns the amount of votes so far (without this vote)
                if ( cookie_decoded[i].indexOf( cookie_name ) == 0 ){

                    // Parses the string to int and stores it
                    return parseInt( cookie_decoded[i].substring(

                        cookie_name.length, 
                        cookie_decoded[i].length

                    ));

                }

            }

        // In case no cookie was created yet
        } return 0;

    }


    function set_cookie_value( name, value, age_in_days ){

        // Set the number of seconds in a day
        var seconds_per_day = 60 * 60 * 24;

        // Creates a new Date object to set expire date
        var expires = new Date();

        // Setting the proper expire date
        expires.setTime( 

            expires.getTime() + ( seconds_per_day * age_in_days )
        
        );

        // Convert date to an UTC string
        var expire_date = expires.toUTCString();

        // Sets the cookie
        document.cookie = name + "=" + value + ";expires=" + expire_date;

    }


    // Checks wheter there is a set value   (votes) or not inside the cookie
    function check_cookie_value( name, age_in_days ) {

        // Gets the value of the give cookie
        var cookie_value = get_cookie_value( name );

        // Sets the cookie
        set_cookie_value( name, cookie_value + 1, age_in_days );

        // Print current counting of votes
        console.log( 
            
            "gfvote: " + ( cookie_value + 1 ) + " votes just completed!" 
            
        );

    }


    // Executes gfrestart code
    function gfrestart( cookie_name, age_in_days ){

        // Gets the button to restart
        var restart_button = document.querySelector(
            
            ".freebirdFormviewerViewResponseLinksContainer"
            
        );

        // Checks if the restart button is available
        if( restart_button.children.length > 0 && STATE == "PROD" ){

            // Checks the number of votes 
            check_cookie_value( cookie_name, age_in_days );

            // Restarts form
            restart_button.children[0].click();

        }

    }


    // Calls the code to be executed!
    gfrestart( "gfvote_votes", age_in_days );
    
})();