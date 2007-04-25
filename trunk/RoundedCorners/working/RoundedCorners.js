var RoundedCorners = Class.create();
RoundedCorners.prototype = {
  _css:       false,
  _styles:    '',
  _currSel:   false,
  initialize: function( file ){
    trace( 'RoundedCorners initialized' );
    //trace( 'rounding corners' );
    var request = this._newXHR();
    if( request ){
      request.onreadystatechange = function(){
        this._parseXHR( request );
      }.bind( this );
      request.open( "GET", file, true );
      request.send( null );
    }
  },
  _newXHR:    function(){
    var xhr = false;
    if( window.XMLHttpRequest ){
      xhr = new XMLHttpRequest();
    }else if( window.ActiveXObject ){
      try{
        xhr = new ActiveXObject( 'Msxml2.XMLHTTP' );
      }catch( e ){
        try{
          xhr = new ActiveXObject( 'Microsoft.XMLHTTP' );
        }catch( e ){
          xhr = false;
        }
      }
    }
    return xhr;
  },
  _parseXHR:  function( request ){
    if( request.readyState == 4 ){
      if( request.status == 200 || request.status == 304 ){
        //trace( 'parsing' );
        this._css = request.responseText;
        // parse it
        this._cleanCSS();
        this._getStyles( this._css );
        /*@cc_on
        /*@if( @_win32 )
        // do nothing
          @else @*/
        // append the rules to the page
        var style = $style( { media: 'screen,projection',
                              type:  'text/css' }, this._styles );
        document.getElementsByTagName( 'head' )[0].appendChild( style );
        /*@end
          @*/
      }
    }
  },
  _cleanCSS:  function(){
    //trace( 'cleaning' );
    // remove returns and indenting whitespace
    this._css = this._css.replace( /[\s]*([{}:;]{1})*[\s]{2,}/g,  "$1");
    // remove extraneous whitespace around brackets & colons
    this._css = this._css.replace( /[\s]?([{}:;]{1})+[\s]?/g,  "$1");
    // strip comments
    this._css = this._css.replace( /\/\*.*?\*\/(.*?)/g, "$1" ); //(.*?)\/\*(?:\w|\s)*?\*\/(.*?)
    //trace( this._css );
  },
  _getStyles: function( str ){
    //trace( 'building' );
    var buildList = {};
    // break it into an array by declaration block
    var arr = str.split('}');
    // remove the empty last element
    if ( arr[arr.length-1] == '') arr.pop();
    /* Parse the declaration blocks looking for
       BORDER-RADIUS rules, dropping any blocks
       without them
       ----
       Add rules to the stylesheet for Mozilla & Safari
       ----
       Round if we're in IE */
    trace(arr.length + " css rules");
    $A( arr ).each( function( block ){
      //trace( 'iterating' );
      if( block.indexOf('border-radius') != -1 ){
        //trace( 'found one' );
        var bArr = block.split( '{' );
        this._currSel = bArr[0];
        this._styles += bArr[0] + '{';
        // now get the BORDER-RADIUS
        $A( bArr[1].split( ';' ) ).each( function( rule ){
          //trace( 'iterating again' );
          rule = rule.split( ':' );
          if( rule[0] == 'border-radius' ){
            this._styles += '-moz-border-radius:' + rule[1] + ';';
            this._styles += '-webkit-border-radius:' + rule[1] + ';';
            // For IE
            /*@cc_on
                @if (@_win32)
                  //trace( 'rounding corners' );
                  // find the elements
                  var els = [];
                  trace( this._currSel.split(',').length + " selectors" );
                  this._currSel.split(',').each( function( selector, index ){
                    // LowPro fails badly when it can't parse a selector
                    var newEls = null;
                    try {
                      newEls = $$( selector );
                    } catch (exc) {
                      trace("LowPro.$$ error: " + selector);
                    }
                    if( newEls &&
                        newEls.length > 0 ){
                      //trace( newEls.length + ' instances found' );
                      newEls.each( function( el ){
                        els.push( el );
                      });
                    } else {
                      //trace( 'no instance found' );
                    }
                  });
                  //trace( 'I\'ve got to round '+els.length );
                  // split the values
                  var values = rule[1].split( ' ' );
                  var i = document.createElement( 'i' );
                  var temp, up, dn, rt, lt;
                  if( values.length == 1 ){
                    els.each( function( el ){
                      // are we dealing with borders?
                      up = ( Element.getStyle( el, 'border-top' ) != null ) ? Element.getStyle( el, 'border-top' ) : '0';
                      rt = ( Element.getStyle( el, 'border-right' ) != null ) ? Element.getStyle( el, 'border-right' ) : '0';
                      dn = ( Element.getStyle( el, 'border-bottom' ) != null ) ? Element.getStyle( el, 'border-bottom' ) : '0';
                      lt = ( Element.getStyle( el, 'border-left' ) != null ) ? Element.getStyle( el, 'border-left' ) : '0';
                      // top left, top right, bottom right, bottom left
                      [ 'tl', 'tr', 'br', 'bl' ].each( function( item ){
                        temp = i.cloneNode( true );
                        Element.addClassName( temp, item );
                        Element.addClassName( temp, 'radius-'+values[0] );
                        // border stuff
                        if( item == 'tl' ){
                          temp.style.top  = '-'+up;
                          temp.style.left = '-'+lt;
                        }
                        if( item == 'tr' ){
                          temp.style.top   = '-'+up;
                          temp.style.right = '-'+rt;
                        }
                        if( item == 'br' ){
                          temp.style.bottom = '-'+dn;
                          temp.style.right  = '-'+rt;
                        }
                        if( item == 'bl' ){
                          temp.style.bottom = '-'+dn;
                          temp.style.left   = '-'+lt;
                        }
                        el.appendChild( temp );
                      });
                      // round it
                      Element.makePositioned( el );
                      Element.addClassName( el, 'rounded' );
                    });
                  }else if( values.length == 2 ){
                    els.each( function( el ){
                      // are we dealing with borders?
                      up = ( Element.getStyle( el, 'border-top' ) != null ) ? Element.getStyle( el, 'border-top' ) : '0';
                      rt = ( Element.getStyle( el, 'border-right' ) != null ) ? Element.getStyle( el, 'border-right' ) : '0';
                      dn = ( Element.getStyle( el, 'border-bottom' ) != null ) ? Element.getStyle( el, 'border-bottom' ) : '0';
                      lt = ( Element.getStyle( el, 'border-left' ) != null ) ? Element.getStyle( el, 'border-left' ) : '0';
                      // top left, bottom right
                      [ 'tl', 'br' ].each( function( item ){
                        temp = i.cloneNode( true );
                        Element.addClassName( temp, item );
                        Element.addClassName( temp, 'radius-'+values[0] );
                        el.appendChild( temp );
                        // border stuff
                        if( item == 'tl' ){
                          temp.style.top  = '-'+up;
                          temp.style.left = '-'+lt;
                        }
                        if( item == 'br' ){
                          temp.style.bottom = '-'+dn;
                          temp.style.right  = '-'+rt;
                        }
                      });
                      // top right, bottom left
                      [ 'tr', 'bl' ].each( function( item ){
                        temp = i.cloneNode( true );
                        Element.addClassName( temp, item );
                        Element.addClassName( temp, 'radius-'+values[1] );
                        el.appendChild( temp );
                        // border stuff
                        if( item == 'tr' ){
                          temp.style.top   = '-'+up;
                          temp.style.right = '-'+rt;
                        }
                        if( item == 'bl' ){
                          temp.style.bottom = '-'+dn;
                          temp.style.left   = '-'+lt;
                        }
                      });
                      // round it
                      Element.makePositioned( el );
                      Element.addClassName( el, 'rounded' );
                    });
                  }else if( values.length == 3 ){
                    els.each( function( el ){
                      // are we dealing with borders?
                      up = ( Element.getStyle( el, 'border-top' ) != null ) ? Element.getStyle( el, 'border-top' ) : '0';
                      rt = ( Element.getStyle( el, 'border-right' ) != null ) ? Element.getStyle( el, 'border-right' ) : '0';
                      dn = ( Element.getStyle( el, 'border-bottom' ) != null ) ? Element.getStyle( el, 'border-bottom' ) : '0';
                      lt = ( Element.getStyle( el, 'border-left' ) != null ) ? Element.getStyle( el, 'border-left' ) : '0';
                      // top left
                      temp = i.cloneNode( true );
                      Element.addClassName( temp, 'tl' );
                      Element.addClassName( temp, 'radius-'+values[0] );
                      el.appendChild( temp );
                      // border stuff
                      if( item == 'tl' ){
                        temp.style.top  = '-'+up;
                        temp.style.left = '-'+lt;
                      }
                      // top right, bottom left
                      [ 'tr', 'bl' ].each( function( item ){
                        temp = i.cloneNode( true );
                        Element.addClassName( temp, item );
                        Element.addClassName( temp, 'radius-'+values[1] );
                        el.appendChild( temp );
                        // border stuff
                        if( item == 'tr' ){
                          temp.style.top   = '-'+up;
                          temp.style.right = '-'+rt;
                        }
                        if( item == 'bl' ){
                          temp.style.bottom = '-'+dn;
                          temp.style.left   = '-'+lt;
                        }
                      });
                      // bottom right
                      temp = i.cloneNode( true );
                      Element.addClassName( temp, 'br' );
                      Element.addClassName( temp, 'radius-'+values[2] );
                      // border stuff
                      if( item == 'br' ){
                        temp.style.bottom = '-'+dn;
                        temp.style.right  = '-'+rt;
                      }
                      el.appendChild( temp );
                      // round it
                      Element.makePositioned( el );
                      Element.addClassName( el, 'rounded' );
                    });
                  }else{
                    els.each( function( el ){
                      // are we dealing with borders?
                      up = ( Element.getStyle( el, 'border-top' ) != null ) ? Element.getStyle( el, 'border-top' ) : '0';
                      rt = ( Element.getStyle( el, 'border-right' ) != null ) ? Element.getStyle( el, 'border-right' ) : '0';
                      dn = ( Element.getStyle( el, 'border-bottom' ) != null ) ? Element.getStyle( el, 'border-bottom' ) : '0';
                      lt = ( Element.getStyle( el, 'border-left' ) != null ) ? Element.getStyle( el, 'border-left' ) : '0';
                      // top left
                      temp = i.cloneNode( true );
                      Element.addClassName( temp, 'tl' );
                      Element.addClassName( temp, 'radius-'+values[0] );
                      // border stuff
                      if( item == 'tl' ){
                        temp.style.top  = '-'+up;
                        temp.style.left = '-'+lt;
                      }
                      el.appendChild( temp );
                      // top right
                      temp = i.cloneNode( true );
                      Element.addClassName( temp, 'tr' );
                      Element.addClassName( temp, 'radius-'+values[0] );
                      // border stuff
                      if( item == 'tr' ){
                        temp.style.top   = '-'+up;
                        temp.style.right = '-'+rt;
                      }
                      el.appendChild( temp );
                      // bottom right
                      temp = i.cloneNode( true );
                      Element.addClassName( temp, 'br' );
                      Element.addClassName( temp, 'radius-'+values[2] );
                      // border stuff
                      if( item == 'br' ){
                        temp.style.bottom = '-'+dn;
                        temp.style.right  = '-'+rt;
                      }
                      el.appendChild( temp );
                      // bottom left
                      temp = i.cloneNode( true );
                      Element.addClassName( temp, 'bl' );
                      Element.addClassName( temp, 'radius-'+values[1] );
                      // border stuff
                      if( item == 'bl' ){
                        temp.style.bottom = '-'+dn;
                        temp.style.left   = '-'+lt;
                      }
                      el.appendChild( temp );
                      // round it
                      Element.makePositioned( el );
                      Element.addClassName( el, 'rounded' );
                    });
                  }
                @end
              @*/
          }
        }.bind( this ) );
        this._styles += '}';
      }
    }.bind( this ) );
  }
};
// if Prototype, lowpro & required DOM methods are available
if( typeof( Prototype ) != 'undefined' &&
    typeof( LowPro ) != 'undefined' &&
    document.getElementById &&
    document.getElementsByTagName &&
    document.createElement ){
  Event.onReady( function(){
    var rounded =  new RoundedCorners( '/css/screen.css' );
  } );
}
