# Text To Speech Shoutbox Experiment

* Brian Khuu (2014)

**2020 Note: This is a very old code from 2014, it may not work now. But may be of interest to others. It was previously hosted on my personal website, but is now archived here instead. Enjoy!**

This is an experimental text to speech shoutbox designed to read out loud any new messages it receives. This allows for semi-real time discussions, that can be followed without having to actively check-up on the page.

There is many applications for this kind of technology, such as real time dynamic virtual online lectures.

## Version list:

* V7 - reducing polling, and ability to turn off TTS
* V6 - Shows last updated
* V5 - Fixed crash when not find TTS
* V4 - Generate time elapsed since last post
* V3 - Limit number of stored post to 100 posts.
* V2 - Generate last updated status image
* V1 - Start of first working shoutbox

This is a mish mash of various codes to make a good platform for semi real time speech synth chatroom (Which would be good for web radio etc...)

Mashup of codes by Brian Khuu (briankhuu.com) 2014

## Usage:

Place these files into a properly configered php webserver in /shoutbox/ folder (script must be able to create files). Then run either shoutbox.html for a low speed shoutbox (updates every 10 sec), and shoutbox_TTS.html for a highspeed shoutbox(3 sec update) with Text To Speech of any incoming messages.

# Concept:

To possibly allow for semi-realtime conversation without having to read the messages. E.g. hosting a radio interview behind TOR

# USES CODES FROM:

----------

HMTL5 Speech Synthsis API:
Mashed up by Brian Khuu briankhuu.com

http://updates.html5rocks.com/2014/01/Web-apps-that-talk---Introduction-to-the-Speech-Synthesis-API

-----------

Lifted codes and styling from:

```
  HTML code is very simple and comes from : http://instantchatbox.net/

  The licence for the javascript used above is :
  /***************************
  /
  //@Author: Adrian "yEnS" Mato Gondelle & Ivan Guardado Castro

  //@website: www.yensdesign.com

  //@email: yensamg@gmail.com

  //@license: Feel free to use it, but keep this credits please!
  /***************************/
```

-------------------

For the backend, I used:

  SIMPLE PHP GUESTBOOK v1.0 by Pasi Havia (roomeo@yahoo.com)

  INSTALL NOTES

  1. Unzip guestbook.zip
  2. Transfer all unzipped files to your webserver
  3. Change guestbook.txt file attributes so that it is writable by public. For example 'chmod 646 guestbook.txt'.
  4. You are ready to use! Just make a link to readbook.php or to addbook.php from your webpage.

  This guestbook is distributed under GPL license.

  Pasi Havia, 2nd April 2003


------------------