/*
    Selects the state of the code running
    "DEV" -> tests for development
    "DEBUG" -> Debugging the error
    "PROD" -> Production code
*/
var STATE = "DEV";


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


// A collection of the entities that represents the options
var OPTIONS = document.querySelectorAll(
                
    ".appsMaterialWizToggleRadiogroupEl"
    
);


// Returns the sum of the # of options of each previous poll.
// "toopp" stands for "total options of previous polls"
function toopp( option_list, current_index ){

    var count = 0;

    for( var i = 0; i < current_index; i++ ){

        count += option_list[ i ];

    }

    return count;

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


// Checks wheter there is a set value (votes) or not inside the cookie
function check_cookie_value( name ) {

    // Gets the value of the give cookie
    var cookie_value = get_cookie_value( name );

    // Executes if there is no vote so far
    if( cookie_value == 0 ) console.log( "gfvote: no votes yet." );

    // Executes if there is at least one vote
    else console.log( "gfvote: " + cookie_value + " votes so far." );

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
function gfvote( options_list, vote_list, cookie_name ){

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

    // Print current total votes
    check_cookie_value( cookie_name );

    // Sends form
    send_form();

}


// Calls the code to be executed!
gfvote( options_per_category, vote_list, "gfvote_votes" );