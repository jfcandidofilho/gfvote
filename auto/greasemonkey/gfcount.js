// ==UserScript==
// @name            gfcount.js
// @namespace       http://github.com/jfcandidofilho/gfvote
// @version         1.3.0
// @description     A simple JavaScript script to vote for polls made with Google Forms.
// @author          J. F. Candido Filho | jfcandidofilho.xyz
// @match           https://docs.google.com/forms/*
// @grant           none
// @downloadURL     https://raw.githubusercontent.com/jfcandidofilho/gfvote/master/auto/greasemonkey/gfcount.js
// @updateURL       https://raw.githubusercontent.com/jfcandidofilho/gfvote/master/auto/greasemonkey/gfcount.js
// ==/UserScript==

/*
    Selects the state of the code running
    "DEV" -> tests for development
    "DEBUG" -> Debugging the error
    "PROD" -> Production code
*/
var STATE = "DEV";


// Defines the maximum age (in days)
var age_in_days = 10;

// Defines the styles of the counting board
var styles = {

    vote: "font-size: 12pt; position: fixed; clean: both;\
    border: 1em solid #c33; background-color: #fff; \
    color: #33c; padding: 4em; width: 120px; top: 0;\
    height: 70px; font-weight: bold; left: 0;\
    text-align: center; margin: 10px; border-radius: 25px 25px;",

    vote_title: "font-size: 12pt; color: #678;",

    vote_count: "font-size: 28pt;"

};


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


// Executes gfcount code
function gfcount( styles, cookie_name, age_in_days ){

    // Declaring variables
    var restart_button = null;
    var cookie_value = null;
    var vote_holder = null;
    var vote_child = null;


    // Gets the button that restarts the poll
    restart_button = document.querySelector(
        
        ".freebirdFormviewerViewResponseLinksContainer"
        
    );

    // Gets the cookie value
    cookie_value = get_cookie_value( cookie_name );


    // Sets the cookie value if in production
    if( restart_button != null && STATE == "PROD" ){

        // Sets the cookie
        set_cookie_value( 

            cookie_name, 
            get_cookie_value( cookie_name ) + 1, 
            age_in_days 
            
        );

    }


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


// Calls the code to be executed!
gfcount( styles, "gfvote_votes", age_in_days );