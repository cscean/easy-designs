## Current Version ##

0.3 (17 June 2007)

## Requirements ##

None.

## License ##

TabInterface is distributed under the liberal [MIT License](http://easy-designs.googlecode.com/svn/trunk/TabInterface/working/LICENSE).

## Use ##

To use, simply include `TabInterface.js` and then classify elements you want tabbed as "tabbed". Then add a new anonymous function to your load event (`window` or DOM). For example:

```
if( typeOf( TabInterface ) != 'undefined' &&
    document.getElementById &&
    document.getElementsByTagName &&
    document.createElement ){
  var cabinets = Array();
  /* using Jesse Skinner's addDOMLoadEvent()
     http://www.thefutureoftheweb.com/blog/adddomloadevent */
  addDOMLoadEvent( function(){
    var collection = document.getElementsByTagName( '*' );
    var cLen = collection.length;
    for( var i=0; i<cLen; i++ ){
      if( collection[i] &&
          /\s*tabbed\s*/.test( collection[i].className ) ){
        cabinets.push( new TabInterface( collection[i], i ) );
      }
    }
  } );
}
```

Many libraries, such as [Prototype](http://prototypejs.org), offer nicer-looking means of collecting elements by `CLASS` and and those could certainly be substituted for the brute force testing seen above.

Note: Tab labels will be either the header content or the heading's `TITLE` value.

## How it works ##

Content is split using the first heading level (`H1`-`H6`) encountered.

## Demo ##

View [the demo](http://easy-designs.googlecode.com/svn/trunk/TabInterface/demo/index.html).

## Optimized Releases ##

  * [Compressed 0.3](http://easy-designs.googlecode.com/svn/trunk/TabInterface/0.3/TabInterface-v0.3.zip) [2.16 KB]
  * [Compressed 0.1](http://easy-designs.googlecode.com/svn/trunk/TabInterface/0.1/TabInterface-v0.1.zip) [2.33 KB]

## Development Version ##

If you are interested in helping to further develop this script, you can [download the uncompressed JavaScript source file](http://easy-designs.googlecode.com/svn/trunk/TabInterface/working/TabInterface.js).

## Change Log ##

  * 0.1 (7 December 2006) - Initial script
  * 0.2 (unreleased)
  * 0.3 (17 June 2007) - Removed Prototype dependency, made most methods and properties private

