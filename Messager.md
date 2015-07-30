## Current Version ##

1.0 (18 October 2006)

## Requirements ##

This script requires [Prototype](http://prototypejs.org) and [moo.fx](http://moofx.mad4milk.net/) to run. It comes with a CSS file to control basic display which the script dynamically adds to the page from the location `/css/messager.css</span>`.

## Use ##

The length of time the message is displayed depends on the amount of content contained in it, so it stay around long enough to read it comfortably, but doesn not stay around too long. This script will also pick up the content of any element with an `ID` of "notice" and display its contents in a message box.

You can call `Messager.make()` and pass your message string (including HTML) as the argument at any point to trigger a message.

## Demo ##

[View this script in action](http://easy-designs.net/code/messager/demo.html)

## Optimized Releases ##

These releases have been compressed using [Dean Edwards' packer](http://dean.edwards.name/packer/).

**[Compressed 1.0](http://easy-designs.googlecode.com/svn/trunk/Messager/1.0/messager-v1.0.zip) [2.25KB ZIP archive]**

## Development Version ##

If you are interested in helping to further develop this script, you can [download the uncompressed JavaScript source file](http://easy-designs.googlecode.com/svn/trunk/Messager/working/messager.js).

## Change Log ##

