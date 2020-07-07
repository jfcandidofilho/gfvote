# __gfvote__

A simple JavaScript script to vote for polls made with Google Forms.

Latest release: `1.0.0`


# How to use

" _I highly suggest reading everything here before trying anything_. " - Me.

Modify the code in `gfvote.js` to suit the number of polls inside the form with the polls. Example? Consider that we have the following:

- Three polls inside the form, namely #1, #2 and #3;
- Four options in polls #1 and #2 and five options in poll #3;
- We are voting at the options 1, 2 and 5 for polls #1, #2 and #3, respectively;

We need to modify the variable `option_per_category` to be:

    var option_per_category = [ 4, 4, 5 ];

We need to modify `vote_list` to contain our votes. It starts at zero for each poll so subtract one from each option. We get:

    var vote_list = [ 0, 1, 4 ];

That's it!

_( Note that the code currently holds values for a poll I used to test the code. Scrap it! )_


## About the "states"

There are three states the code can operate and that behaves differently. `DEBUG` state needs to be implemented in case you want to fix modifications and is up to you to use.

To modify a state, simply change the variable `STATE` to be one of the following values:

- `"DEV"`: use this mode to check your votes after you calculate their values;
- `"PROD"`: use this mode to vote;
- `"DEBUG"`: use this mode to debug;


## About the manual way to use this code

- Open your browser's _developer console_ ([click here][0] to find out how if you do not know already);
- Copy the properly modified code from `gfvote.js`;
- Paste the code into the console and hit `ENTER`;
- Copy the code from `gfrestart.js`;
- Paste the code into the console and hit `ENTER`;
- __Done!__


## About the automated way to use

This short tutorial assumes you are using the browser extension __Greasemonkey__ but can be adapted to other extesnions. _Probably._ 

It is worth noting that Chromium browsers have __Tampermonkey__. Other browsers might have other extensions.

This is not a tutorial on how to use such extensions. There are plenty already over the internet - including videos. Search for it - random example [here][1].

To automate the voting, do the following:

- Create a new script in __Greasemonkey__;
- Add the properly modified code of `gfvote.js` into this script - below the default data _(see below)_;
- Change the script name to `gfvote.js` by modifying the text after @name in the default data;
- Save the script and enable it if it isn't enabled already;
- Close it;
- Repeat eveything above but copying the code from `gfrestart` intead and using it as name;
- Open the desired form (__can't__ be inside an `iframe`);
- __Profit!__

Default data:

    // ==UserScript==
    // @name        Unnamed Script ....
    // @version     1
    // @grant       none
    // ==/UserScript==

Paste the code below it!


# Future

I plan on making a tool to help in generating the votes with the click of a mouse. Not sure if it will see the light of the day.


# Dedicatory

This is dedicated to by dear cute little sister that always takes parts in polls - with extreme passion - to help famous people she likes and holds dear win prizes! She spends a huuuuge amount of time voting here and there so this scripts will help her, I hope! :)


[0]: https://balsamiq.com/support/faqs/browserconsole/
[1]: http://hayageek.com/greasemonkey-tutorial/#install-greasemonkey