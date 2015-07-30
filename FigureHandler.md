## Current Version ##

0.1 (28 August 2007)

## Requirements ##

  * [Prototype](http://prototypejs.org)

## License ##

FigureHandler is distributed under the liberal [MIT License](http://easy-designs.googlecode.com/svn/trunk/FigureHandler/working/LICENSE).

## Use ##

To use, simply include `FigureHandler.js` and `prototype.js` in the `HEAD` of your document. Then, initialize the `FigureHandler`:

```
if( typeof( Prototype ) != 'undefined' &&
    typeof( FigureHandler ) != 'undefined' ){
  Event.observe( window, 'load', function(){ new FigureHandler; } );
}
```

By default the following `class`es are applied:

### `FigureHandler`'s Default `class`es ###

| **Percent of the Column** | **`class` Applied** |
|:--------------------------|:--------------------|
| 0-25                      | quarter-col         |
| 25-34                     | third-col           |
| 34-50                     | half-col            |
| 50-67                     | two-thirds-col      |
| 67-75                     | three-quarters-col  |
| 75-100                    | full-col            |

## Customization ##

You can also customize `FigureHandler` by targeting a specific container

```
if( typeof( Prototype ) != 'undefined' &&
    typeof( FigureHandler ) != 'undefined' ){
  Event.observe( window, 'load', function(){ new FigureHandler( 'main' ); } );
}
```

or by providing a list of custom `class`es to be applied (using JSON syntax):

```
if( typeof( Prototype ) != 'undefined' &&
    typeof( FigureHandler ) != 'undefined' ){
  Event.observe( window, 'load', function(){
    new FigureHandler( 'main', { '0-27':   'small',
                                 '27-100': 'large' } );
    new FigureHandler( 'extras', { '0-50':   'potato',
                                   '50-100': 'tomato' } );
  });
}
```

## Required Markup ##

`FigureHandler` assumes all figures are `DIV` elements classified as "figure." It is recommended that the following syntax be used (at a minimum):

```
<div class="figure">
  <img src="faces-of-the-fallen.jpg" alt="The &#8220;Faces of the
    Fallen&#8221; exhibit at Arlington National Cemetery." />
</div>
```

But you can embed much more information, following some of the [current practices in figure markup](http://microformats.org/wiki/figure-examples#Revenue_Watch_Institute_.28website_forthcoming.29):

```
<div class="figure">
  <img src="fa.jpg" alt="" />
  <p class="credit"><abbr class="type" title="Photograph">Photo</abbr>
    by <cite>Aaron Gustafson</cite></p>
  <p class="caption"><em class="title">Figure 1</em> The &#8220;Faces of the
    Fallen&#8221; exhibit at Arlington National Cemetery.</p>
</div>
```

## Demo ##

View [the default demo](http://easy-designs.googlecode.com/svn/trunk/FigureHandler/demo/default.html) or [the custom demo](http://easy-designs.googlecode.com/svn/trunk/FigureHandler/demo/custom.html).

## Optimized Releases ##

  * [Compressed 0.1](http://easy-designs.googlecode.com/svn/trunk/FigureHandler/0.1/FigureHandler-v0.1.zip) [1.46 KB]

## Development Version ##

If you are interested in helping to further develop this script, you can [download the uncompressed JavaScript source file](http://easy-designs.googlecode.com/svn/trunk/FigureHandler/working/FigureHandler.js).

## Change Log ##

  * 0.1 (28 September 2006) - Initial script