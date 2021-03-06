# __`gfvote`__

A simple JavaScript script to vote for polls made with Google Forms.

Latest release: `4.0.1`

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

Modify the code in `gfvote.js` to suit the number of polls inside the Google Form. Also set `number_of_days` with the number of days to save the vote count. Put everything into __Greasemonkey__ (or __Tampermonkey__ or others). Alternatively, you could do it manually if you don't want to vote an unsure number of times.

Example? Consider that we have the following:

- Three polls inside the form, namely #1, #2 and #3;
- Four options in polls #1 and #2 and five options in poll #3;
- We are voting at the options 1, 2 and 5 for polls #1, #2 and #3, respectively;


Now, after these considerations, modify the variable `STATE` to be:

    var STATE = "DEV";
    
Modify the variable `option_per_category` to be:

    var option_per_category = [ 4, 4, 5 ];

Modify the variable `vote_list` to contain our votes. It starts at zero for each poll so subtract one from each option. We get:

    var vote_list = [ 0, 1, 4 ];

Modify the variable `age_in_days` to determine the number of days to store the vote count:

    var age_in_days = 10;

Insert every code into the proper location, be it in console or in __Greasemonkey__ or __Tapermonkey__. Your choice.

Open the console. You should see what you would be voting for as your are in `"DEV"` mode. If everything is alright, modify the variable `STATE` to be:

    var STATE = "PROD";

__That's it!__ Everything is set to run! Just open the Google Form with the polling (or refresh it) and the code will run after everything was set in place.

You really should select the options you desire and let the script run once _BEFORE_ changing the `STATE` variable to `"PROD"` by refreshing the page if it is already loaded. Vvisit it if not loaded already. Check the console output and verify if the output is as desired. After that, if everything is OK, change it to `"PROD"`.

__PS:__ The code will auto update whenever changes are made by this geeky developer. This action will scrap your votes in the sense you need to modify the variables again UNLESS you remove this line:

    // @updateURL       https://raw.githubusercontent.com/jfcandidofilho/gfvote/master/auto/tampermonkey/gfvote.js

This deactivates autoupdates but preserves you choice of votes and polls. It is your choice if you prefer updated code but having to set yet again the votes OR if you prefer the old code but no hassle in setting it again.

_( I think I would not like autoupdate. But the option should be available for those that do. )_

## How to edit

You can either save these files in your machine and open with a simple text editor like Notepad __OR__ simply copy the code from this git repository, paste into Greasemonkey (or equivalent) and modify there before saving. There is no right or wrong in how to modify it in the scope expected.


## About the manual way to use this code

- Open your browser's _developer console_ ( [click here][0] to find out how if you do not know already );
- Copy (the previously modified) code `gfvote.js`;
- Paste the code into the console and hit `ENTER`;
- It should load the page informing you voted OK;
- Copy (the previously modified) code `gfvote.js`;
- Paste the code into the console and hit `ENTER`;
- __Done!__


## About the automated way to use

This short tutorial assumes you are using the browser extension __Greasemonkey__ with Firefox or __Tampermonkey__ with almost everything else (e.g. Chromium, Chrome, Edge, Safari...). It can be adapted to other similar extensions. _Probably._

This is not a tutorial on how to use such extensions. There are plenty already over the internet - including videos. Search for it - random example [here][1].

To automate the voting, do the following:

- Follow the tutorial to change the code where it is needed to be changed;
- Create a new script in __Greasemonkey__ or __Tampermonkey__;
- Clean the default code presented;
- Paste the code of `gfvote.js`;
- Save the script and enable it if it isn't enabled already;
- Close it;
- Open the desired Google Form with a polling (__can't__ be inside an `iframe`);
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