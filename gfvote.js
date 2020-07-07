/*
    Selects the state of the code running
    "DEV" -> tests for development
    "DEBUGG" -> Debugging the error
    "PROD" -> Production code
*/
var STATE = "DEV";

// Sets number of options a given poll has, polls separated by comma
var options_per_category = [

    6, 7, 8, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7

];

// Your vote for each poll, each vote for each poll separated by a comma
var vote_list = [

    0, 6, 5, 1, 3, 5, 5, 3, 3, 3, 6, 0, 2, 6, 1, 3, 5, 0, 6, 6, 3, 1, 3, 4, 2, 6, 3

];

// Returns the sum of the number of options of each previous considered poll.
// "toopp" stands for "total options of previous polls"
function toopp( option_list, current_index ){

    var count = 0;

    for( var i = 0; i < current_index; i++ ){

        count += option_list[ i ];

    }

    return count;

}

// Select each poll to vote for
for( var poll = 0; poll < options_per_category.length; poll++ ){

    // Select the proper element in a list of elements to vote for
    var vote = toopp( options_per_category, poll ) + vote_list[ poll ];

    // Verifies the vote selected
    if( STATE == "DEV" ) console.log( 
        
        "POLL: " + (poll + 1),
        
        "VOTE: " + document.querySelectorAll(
            
            ".appsMaterialWizToggleRadiogroupEl"
            
        )[ vote ].dataset.value
        
    );

    // Votes for the selected option in the poll
    if( STATE == "PROD" ) document.querySelectorAll(
            
        ".appsMaterialWizToggleRadiogroupEl"
        
    )[ vote ].click();

}


// Send form
var send_form = document.querySelectorAll(".appsMaterialWizButtonPaperbuttonContent.exportButtonContent");

send_form[ send_form.length + (send_form.length > 0 ? -1 : 0) ].click();