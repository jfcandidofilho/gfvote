// ==UserScript==
// @name            gfvote.js
// @namespace       http://github.com/jfcandidofilho/gfvote
// @version         2.0.0
// @description     A simple JavaScript script to vote for polls made with Google Forms.
// @author          J. F. Candido Filho | jfcandidofilho.xyz
// @match           https://docs.google.com/forms/*
// @grant           none
// @encoding        utf-8
// @downloadURL     https://raw.githubusercontent.com/jfcandidofilho/gfvote/master/auto/tampermonkey/gfvote.js
// @updateURL       https://raw.githubusercontent.com/jfcandidofilho/gfvote/master/auto/tampermonkey/gfvote.js
// @contributionURL https://github.com/jfcandidofilho/gfvote#donations
// @supportURL      https://github.com/jfcandidofilho/gfvote/issues
// ==/UserScript==

(function() { 'use strict';

    /*
    Selects the state of the code running
    "DEV" -> tests for development
    "DEBUG" -> Debugging the error
    "PROD" -> Production code
    */
    var STATE = "PROD";

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

    // Defines the maximum age (in days)
    var age_in_days = 10;

    // Defines the styles of the counting board
    var styles = {

        vote: "font-size: 12pt; position: fixed; clean: both;\
        border: 1em solid #c33; background-color: #fff; \
        color: #33c; padding: 4em; width: 120px; top: 0;\
        height: 70px; font-weight: bold; left: 0; z-index: 2;\
        text-align: center; margin: 10px; border-radius: 25px 25px;",

        vote_title: "font-size: 12pt; color: #678;",

        vote_count: "font-size: 28pt;"

    };


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

    // Sets the value being hold into the cookie
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


    // Creates an element with given arguments
    function create_element( type, id, style ){

        var element = document.createElement( type.toUpperCase() );

        element.id = id;
        element.style = style;

        return element;

    }

    // Creates a text to put inside an element
    function create_text( value ){

        var text_node = document.createTextNode( value );

        return text_node;

    }


    // Creates a vote panel with vote count
    function create_panel( styles, cookie_name ){

        // Declaring variables
        var vote_holder = null;
        var vote_child = null;


        // Creates the main div of the counting
        vote_holder = create_element( "div", "vote", styles.vote );


        // Creates the title holder of the counting and adds it
        vote_child = create_element( 
        
            "div", 
            "vote_title", 
            styles.vote_title 
            
        );

        vote_child.appendChild( create_text( "VOTE COUNT" ) );
        vote_holder.appendChild( vote_child );


        // Creates the number of votes holder and adds it
        vote_child = create_element( 
        
            "div", 
            "vote_count", 
            styles.vote_count 
            
        );

        vote_child.appendChild( create_text( 
            
            get_cookie_value( cookie_name ) 
            
        ) );
        
        vote_holder.appendChild( vote_child );


        // Adds the holder into the page as the first child of BODY tag
        document.body.insertBefore( 
            
            vote_holder, 
            document.body.childNodes[0] 
            
        );

    }


    // Executes gfvote code
    function gfvote( options_list, vote_list, styles, cookie_name, age_in_days ){

        // Declaring variables
        var restart_button = null;
        var vote = null;


        // Gets the button to restart the poll
        restart_button = document.querySelector(
            
            ".freebirdFormviewerViewResponseLinksContainer"
            
        );


        // Checks if the restart button is available ...
        if( restart_button != null ){

            // Sets the cookie
            set_cookie_value( 

                cookie_name, 
                get_cookie_value( cookie_name ) + 1, 
                age_in_days 
                
            );

            // Creates a vote panel with vote count
            create_panel( styles, cookie_name );

            // ... Restarts form
            restart_button.children[0].click();

        // ... If not available, then the "vote" button is available
        } else {
            
            // Select each poll to vote for
            for( var poll = 0; poll < options_list.length; poll++ ){

                // Select the proper element in a list of elements to vote for
                vote = toopp( options_list, poll ) + vote_list[ poll ];

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

            // Creates a vote panel with vote count
            create_panel( styles, cookie_name );

            // Sends form
            send_form();

        }

    }


    // Calls the code to be executed!
    gfvote( 
        
        options_per_category, 
        vote_list, 
        styles, 
        "gfvote_votes", 
        age_in_days 
        
        );
    
})();