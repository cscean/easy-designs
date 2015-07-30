## Current Version ##

1.3 (1 November 2005)

## Requirements ##

If you would like a draggable window, it requires [Aaron Boodman](http://www.youngpup.net/)'s [DOM Drag Library](http://www.youngpup.net/2001/domdrag) (included with the "drag" distribution)

## License ##

jsTrace is distributed under the liberal [MIT License](http://easy-designs.googlecode.com/svn/trunk/jsTrace/working/LICENSE).

## Use ##

In the head of your document, include the JavaScript file(s):

```
<script type="text/javascript" src="/path/to/jsTrace.js"></script>
<script type="text/javascript" src="/path/to/dom-drag.js"></script>
```

Then, simply add the following function to your main JavaScript file (or a library you use) to allow you to trace messages to the window:

Unknown end tag for &lt;/p&gt;



```
var trace;
if( typeof( jsTrace ) != 'undefined' ){
  trace = function( msg ){
    jsTrace.send( msg );
  };
} else {
  trace = function(){};
}
```

Whenever you want to trace something to the window, simply call `trace()`:

```
trace( 'This message goes to the window' );
```

The best part is, when you are finished debugging, you leave the `trace()` calls in your code and can simply delete the references to the two JavaScript files from the `HEAD` of your document and it will not cause JavaScript errors.

## Demo ##

You can [view this script in action](http://easy-designs.googlecode.com/svn/trunk/jsTrace/demo/index.html) if you have a modern browser. The window is draggable and resizable. You can also clear the window or set a delimeter to mark your place.

## Optimized Releases ##

  * [Compressed 1.3 (Draggable)](http://easy-designs.googlecode.com/svn/trunk/jsTrace/1.3/jsTrace-v1.3-drag.zip) [3.54 KB]

Unknown end tag for &lt;/li&gt;


  * [Compressed 1.3 (Not Draggable)](http://easy-designs.googlecode.com/svn/trunk/jsTrace/1.3/jsTrace-v1.3-nodrag.zip) [2.43 KB]

Unknown end tag for &lt;/li&gt;


  * [Compressed 1.2 (Draggable)](http://easy-designs.googlecode.com/svn/trunk/jsTrace/1.2/jsTrace-v1.2-drag.zip) [3.48 KB]

Unknown end tag for &lt;/li&gt;


  * [Compressed 1.2 (Not Draggable)](http://easy-designs.googlecode.com/svn/trunk/jsTrace/1.2/jsTrace-v1.2-nodrag.zip) [2.36 KB]

Unknown end tag for &lt;/li&gt;


  * [Compressed 1.1 (Draggable)](http://easy-designs.googlecode.com/svn/trunk/jsTrace/1.1/jsTrace-v1.1-drag.zip) [3.43 KB]

Unknown end tag for &lt;/li&gt;


  * [Compressed 1.1 (Not Draggable)](http://easy-designs.googlecode.com/svn/trunk/jsTrace/1.1/jsTrace-v1.1-nodrag.zip) [2.32 KB]

Unknown end tag for &lt;/li&gt;


  * [Compressed 1.0 (Draggable)](http://easy-designs.googlecode.com/svn/trunk/jsTrace/1.0/jsTrace-v1.0-drag.zip) [3.03 KB]

Unknown end tag for &lt;/li&gt;


  * [Compressed 1.0 (Not Draggable)](http://easy-designs.googlecode.com/svn/trunk/jsTrace/1.0/jsTrace-v1.0-nodrag.zip) [1.91 KB]

Unknown end tag for &lt;/li&gt;



## Development Version ##

If you are interested in helping to further develop this script, you can [download the uncompressed JavaScript source file](http://easy-designs.googlecode.com/svn/trunk/jsTrace/working/TabInterface.js).

## Change Log ##

  * 1.0 (26 October 2005) - Initial script
  * 1.1 (29 October 2005) - "Memory" enhancement (by Joe Shelby) added (position &#38; size remembered via an open cookie), size of additional tools text increased, streamlined creation of new tools (for future development), added generic timer function (for future development), `jsTrace.kill()` renamed `jsTrace.killWindow()`
  * 1.2 (30 October 2005) - Added buffer for traces executed before the window is drawn
  * 1.3 (1 November 2005) - Buffer fix for IE and viewport now scrolls with the content (newest lines show by default)

## Who's Using jsTrace? ##

  * [CartoWeb](http://www.cartoweb.org/)
  * CT Department of Environmental Protection
  * [Ethnio](http://ethnio.com)
  * Konica Minolta
  * [Riverview Funeral Home](http://riverviewfh.com)
  * Twinings USA
  * [Wifty](http://www.jifty.org/view/Wifty)
