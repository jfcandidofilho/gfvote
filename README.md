# __`gfvote`__

A simple JavaScript script to vote for polls made with Google Forms.

Latest release: `1.1.0`

# Functions

gfvote can help you automate voting in polls made with Google Forms. It is worth noting that it inly works with polls that have restriction to only one option as a vote. In the future, it might get better.

There is a vote count system. To fully use it, read the "_How To_" below.

# How to use gfvote

"_I highly suggest reading everything once before trying anything_." - Me.

Modify the code in `gfvote.js` to suit the number of polls inside the form with the polls. Also modify `gfrestart.js` to set the number of days in which to save the vote count. And put everything into Greasemonkey (or equivalent).

Example? Consider that we have the following:

- Three polls inside the form, namely #1, #2 and #3;
- Four options in polls #1 and #2 and five options in poll #3;
- We are voting at the options 1, 2 and 5 for polls #1, #2 and #3, respectively;

In `gfvote.js` and in `gfrestart.js`, modify the variables `STATE` to be:

    var STATE = "PROD";

In `gfvote.js`, modify the variable `option_per_category` to be:

    var option_per_category = [ 4, 4, 5 ];

In `gfvote.js`, modify the variable `vote_list` to contain our votes. It starts at zero for each poll so subtract one from each option. We get:

    var vote_list = [ 0, 1, 4 ];

In `gfrestart.js`, modify the variable `age_in_days` to determine the number of days to store the vote count:

    var age_in_days = 10;

__That's it!__ Everything is set to run! Just open the Google Form with the polling (or refresh it) and the code will run after everything was set in place.

__PS__: In case you want to know the __number of votes__ already given, open developer console, and let checked only the option for logs. There is a link later in this tutorial to help with this.


## How to edit

You can either save these files in your machine and open with a simple text editor like Notepad __OR__ simply copy the code from this git repository, paste into Greasemonkey (or equivalent) and modify there before saving. There is no right or wrong in how to modify it in the scope expected.


## About the manual way to use this code

- Open your browser's _developer console_ ( [click here][0] to find out how if you do not know already );
- Copy the properly modified code from `gfvote.js`;
- Paste the code into the console and hit `ENTER`;
- Copy the properly modified code from `gfrestart.js`;
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


# `STATE` variable explanation

This information is only useful to _developers_. Skip ahead if you are not interested in it. Won't cause problems for you if you do not know what follows ahead.

There are three states the code can operate and that behaves differently. `DEBUG` state needs to be implemented in case you want to fix modifications and is up to you to use.

To modify a state, simply change the variable `STATE` to be one of the following values:

- `"DEV"`: use this mode to check your votes after you calculate their values;
- `"PROD"`: use this mode to vote;
- `"DEBUG"`: use this mode to debug;


# Future releases

I plan on making a tool to help in generating the votes with the click of a mouse. Not sure if it will see the light of the day.


# Dedicatory

This is dedicated to by dear cute little sister that always takes parts in polls - with extreme passion - to help famous people she likes and holds dear to win prizes and awards! She spends a huuuuge amount of time voting here and there so this script will help her, I hope! :)


[0]: https://balsamiq.com/support/faqs/browserconsole/
[1]: http://hayageek.com/greasemonkey-tutorial/#install-greasemonkey