# __`gfvote`__

A simple JavaScript script to vote for polls made with Google Forms.

Latest release: `1.3.0`

# Donations

If you can and would like to support me, send a donation! Any amount is desirable - even a cent! :)

[PayPal][2]

[Bitcoin][3] - bc1q6wp8znaedr4u6pc8es3dr5k0jgtw78xg3lclfn

# Functions

gfvote can help you automate voting in polls made with Google Forms. It is worth noting that it inly works with polls that have restriction to only one option as a vote. In the future, it might get better.

There is a vote count system. To fully use it, read the "_How To_" below.

It should be able to autoupdate or easy manual update with __Greasemonkey__ and __Tapermonkey__. Hit the update button and that is it!

# How to use gfvote

"_I highly suggest reading everything once before trying anything_." - Me.

Modify the code in `gfvote.js` to suit the number of polls inside the Google Form. Also modify `gfcount.js` to set the number of days in which to save the vote count. And put everything into Greasemonkey (or Tampermonkey). Alternatively, you could do it manually if you don't want to vote countless times. Either way, you should choose the proper directory.

Example? Consider that we have the following:

- Three polls inside the form, namely #1, #2 and #3;
- Four options in polls #1 and #2 and five options in poll #3;
- We are voting at the options 1, 2 and 5 for polls #1, #2 and #3, respectively;

In `gfvote.js` and in `gfcount.js`, modify the variables `STATE` to be:

    var STATE = "PROD";

In `gfvote.js`, modify the variable `option_per_category` to be:

    var option_per_category = [ 4, 4, 5 ];

In `gfvote.js`, modify the variable `vote_list` to contain our votes. It starts at zero for each poll so subtract one from each option. We get:

    var vote_list = [ 0, 1, 4 ];

In `gfcount.js`, modify the variable `age_in_days` to determine the number of days to store the vote count:

    var age_in_days = 10;

Insert every code into the proper location, be it in console or in __Greasemonkey__ or __Tapermonkey__. Your choice.

__That's it!__ Everything is set to run! Just open the Google Form with the polling (or refresh it) and the code will run after everything was set in place.

__PS__: You should select the options you desire and let the script run once _BEFORE_ changing the `STATE` variable to `"PROD"` (i.e. letting it be set to the default value `"DEV"`) by refreshing the page if it is already loaded. Vvisit it if not loaded already. Check the console output and verify if the output is as desired. After that, if everything is OK, change it to `"PROD"`.

## Directory structure

There are three files: gfvote.js, gfrestart.js and gfcount.js. Each method has one file of these differing only by the metadata block (present if for automators or inexistent if manual).

The directory structure divides the code into usage. So:

- If you are going to use it _manually_, use the code inside `manual`directory.
- If you are going to use it with an _automator_, use the code from `auto` directory.
    * If you are using __Greasemonkey__, use the `greasemonkey` directory;
    * If you are using __Tampermonkey__, use the `tampermonkey` directory;


## How to edit

You can either save these files in your machine and open with a simple text editor like Notepad __OR__ simply copy the code from this git repository, paste into Greasemonkey (or equivalent) and modify there before saving. There is no right or wrong in how to modify it in the scope expected.


## About the manual way to use this code

- Open your browser's _developer console_ ( [click here][0] to find out how if you do not know already );
- Copy the properly modified code from `gfcount.js` inside `manual` directory;
- Paste the code into the console and hit `ENTER`;
- Copy the properly modified code from `gfvote.js` inside `manual` directory;
- Paste the code into the console and hit `ENTER`;
- It should load the page informing you voted OK;
- Copy the properly modified code from `gfcount.js` inside `manual` directory;
- Paste the code into the console and hit `ENTER`;
- Copy the properly modified code from `gfrestart.js` inside `manual` directory;
- Paste the code into the console and hit `ENTER`;
- __Done!__


## About the automated way to use

This short tutorial assumes you are using the browser extension __Greasemonkey__ with Firefox or __Tampermonkey__ with almost everything else (e.g. Chromium, Chrome, Edge, Safari...). It can be adapted to other similar extensions. _Probably._

This is not a tutorial on how to use such extensions. There are plenty already over the internet - including videos. Search for it - random example [here][1].

To automate the voting, do the following:

- Follow the tutorial to change the code where it is needed to be changed;
- Create a new script in __Greasemonkey__ or __Tampermonkey__;
- Clean the default code presented;
- Paste the code of `gfvote.js` here. It is located inside the `auto` directory by the extension name;
- Save the script and enable it if it isn't enabled already;
- Close it;
- Repeat eveything above but copying the code from `gfcount` and `gfrestart` intead;
- Open the desired form (__can't__ be inside an `iframe`);
- __Profit!__


## `STATE` variable explanation

There are three states the code can operate and that behaves differently. `"DEBUG"` state needs to be implemented in case you want to fix modifications and is up to you to use.

To modify a state, simply change the variable `STATE` to be one of the following values:

- `"DEV"`: use this mode to check your votes after you calculate their values;
- `"PROD"`: use this mode to vote;
- `"DEBUG"`: use this mode to debug and should be interesting for programmers wanting to modify this code;


# Future releases

I plan on making a tool to help in generating the votes with the click of a mouse. Not sure if it will see the light of the day.


# Dedicatory

This is dedicated to by dear cute little sister that always takes parts in polls - with extreme passion - to help famous people she likes and holds dear to win prizes and awards! She spends a huuuuge amount of time voting here and there so this script will help her, I hope! :)


[0]: https://balsamiq.com/support/faqs/browserconsole/
[1]: http://hayageek.com/greasemonkey-tutorial/#install-greasemonkey
[2]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=F4LCB3BY4KQHG&source=url
[3]: https://www.investopedia.com/news/how-donate-charity-using-bitcoin/