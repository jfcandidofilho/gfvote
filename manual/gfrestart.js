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