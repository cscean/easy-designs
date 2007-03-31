/*------------------------------------------------------------------------------
Function:       Messager()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  18 October 2006
Version:        1.0
Homepage:       http://www.easy-designs.net/code/messager/
License:        Copyright (c) 2006 Easy! Designs LLC
                Permission is hereby granted, free of charge, to any person
                obtaining a copy of this software and associated documentation
                files (the "Software"), to deal in the Software without
                restriction, including without limitation the rights to use,
                copy, modify, merge, publish, distribute, sublicense, and/or
                sell copies of the Software, and to permit persons to whom the
                Software is furnished to do so, subject to the following
                conditions:

                The above copyright notice and this permission notice shall
                be included in all copies or substantial portions of the
                Software.

                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                OTHER DEALINGS IN THE SOFTWARE.
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
var Messager = {
  _head:    false,        // private property
  _body:    false,        // private property
  _css:     false,        // private property
  _timer:   false,        // private property
  _fade:    false,        // private property
  _overlay: false,        // private property
  init:     function(){   // public method

    // test method support
    if( !document.getElementById ||
        !document.createElement ||
        typeof( fx ) == 'undefined' ) return;

    this._head = document.getElementsByTagName( 'head' )[0];
    this._body = document.getElementsByTagName( 'body' )[0];

    this._css = document.createElement( 'link' );
    this._css.setAttribute( 'rel', 'stylesheet' );
    this._css.setAttribute( 'media', 'screen' );
    this._css.setAttribute( 'href', '/css/messager.css' );
    this._head.appendChild( this._css );

    // build the div
    this._overlay = document.createElement( 'div' );
    this._overlay.className = 'message';

    // set up the effect
    this._fade = new fx.Opacity( this._overlay, { duration: 500,
                                                  onComplete: function(){ Messager._cleanup(); } } );

    // set the innerHTML
    if( document.getElementById( 'notice' ) ){
      var notice = document.getElementById( 'notice' );
      notice.style.display = 'none';
      this._overlay.innerHTML = notice.innerHTML;

      // show the message
      this._show();
    }
  },
  make: function( html ){  // public method
    // set the innerHTML
    this._overlay.innerHTML = html;

    // show the message
    this._show();
  },
  _show: function(){       // private method
    // hide the overlay
    this._overlay.style.visibility = 'hidden';

    // append the overlay
    this._body.appendChild( this._overlay );

    // get the height & position it
    var height = Element.getHeight( this._overlay );
    this._overlay.style.marginTop = '-'+( height/2 )+'px';

    // show the overlay
    this._overlay.style.visibility = 'hidden';

    // fade in the overlay
    this._fade.custom( 0, 0.9 );

  },
  _hide: function(){
    // kill the _timer
    clearTimeout( this._timer );
    // stop observing
    Event.stopObserving( this._overlay, 'mouseover', this._hide.bindAsEventListener( this ) );

    // fade out the overlay
    Element.addClassName( this._overlay, 'closing' );
    this._fade.toggle();
  },
  // cleanup
  _cleanup: function(){
    // if we're hiding the message, do it
    if( Element.hasClassName( this._overlay, 'closing' ) ){
      Element.removeClassName( this._overlay, 'closing' );
      this._body.removeChild( this._overlay );
      this._overlay.onmouseover = null;
    } else {
      // set the _timer
      this._timer = setTimeout( 'Messager._hide()', 30 * this._overlay.innerHTML.length );
      if( !this._overlay.getElementsByTagName( 'a' ) ){
        this._overlay.onmouseover = this._hide.bindAsEventListener( this );
      }
    }
  }
};
Event.observe( window, 'load', function(){ Messager.init(); }, false );