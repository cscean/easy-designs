## Current Version ##

1.3 (21 June 2005)

## Requirements ##

This script uses functions contained in [jsUtilities](jsUtilities.md).

## Use ##

In your onload function, call `footnoteLinks()`, setting `containerID` and `targetID` to the `ID`s your desired containers.

```
window.onload = function(){
  footnoteLinks( 'content', 'extras' );
}
```

In your screen CSS (and anywhere else you want to hide the list and superscripts), create a rule for `.printOnly`:

```
.printOnly {
  display: none;
}
```

You can classify links as "ignore" to have them ignored up by the script:

```
<a href="http://foo.bar.com" class="ignore">link</a>
```

You can also use the content generation from CSS2 as a fall-back for the script. When the script runs, it will classify the `HTML` element as “noted.” You simply supply the following rules to add the content generation and then remove it when the script runs:

```
a:link:after,
a:visited:after {
  content: " (" attr(href) ") ";
  font-size: 90%;
}
html.noted a:link:after,
html.noted a:visited:after {
  content: "";
}
```

## Optimized Releases ##

These releases have been compressed using [Dean Edwards' packer](http://dean.edwards.name/packer/).

  * [Compressed 1.3](http://easy-designs.googlecode.com/svn/trunk/FootnoteLinks/1.3/footnoteLinks-v1.3.zip) [1.27Kb .zip archive]
  * [Compressed 1.2](http://easy-designs.googlecode.com/svn/trunk/FootnoteLinks/1.2/footnoteLinks-v1.2.zip) [1.25Kb .zip archive]
  * [Compressed 1.1](http://easy-designs.googlecode.com/svn/trunk/FootnoteLinks/1.1/footnoteLinks-v1.1.zip) [1.23Kb .zip archive]
  * [Compressed 1.0](http://easy-designs.googlecode.com/svn/trunk/FootnoteLinks/1.0/footnoteLinks-v1.0.zip) [1.2Kb .zip archive]

## Development Version ##

If you are interested in helping to further develop this script, you can [download the uncompressed JavaScript source file](http://easy-designs.googlecode.com/svn/trunk/FootnoteLinks/working/FootnoteLinks.js).

## Change Log ##

  * 1.0 (8 May 2005) - Initial script
  * 1.1 (12 May 2005) - Added search for ignore class to avoid listing certain links
  * 1.2 (5 June 2005) - Added support for jsUtilities 2.0 & fall-back CSS2 support
  * 1.3 (21 June 2005) - Added support for jsUtilities 2.1 & fixed IE incompatibilities