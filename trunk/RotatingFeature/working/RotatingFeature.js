/*------------------------------------------------------------------------------
Function:       RotatingFeature()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  7 December 2006
Version:        0.1
Homepage:       http://code.google.com/p/easy-designs/wiki/RotatingFeature
License:        MIT License (see homepage)
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
var RotatingFeature = Class.create();
RotatingFeature.prototype = {
  Version:    '0.1',
  _index:     false,
  _screen:    false,
  _id:        false,
  _slides:    false,
  _slide:     $div(),
  _tag:       false,
  _old:       false,
  _active:    false,
  _width:     false,
  _timer:     false,
  _direction: 'forward',
  _paused:    false,
  _moving:    false,
  initialize: function( el, index ){
    trace( 'new RotatingFeature' );
    // store the index
    this._index = index;

    // set the screen
    this._screen = el;
    this._width  = el.offsetWidth;
    /*@cc_on
      /*@if (@_win32)
        // IE doesn't implement the DOM the normal way
        @else @*/
          el.cleanWhitespace();
      /*@end
    @*/
    // set the id
    this._id = el.getAttribute( 'id' ) || 'slide-' + index;
    if( !el.getAttribute( 'id' ) ){
      el.setAttribute( 'id', this._id );
    }

    // make the slide
    Element.addClassName( this._slide, 'slide' );

    // find the first heading
    var hs = ( 'h1|h2|h3|h4|h5|h6' ).split( '|' );
    var curr = this._screen.firstChild;
    while( !hs.inArray( curr.nodeName.toLowerCase() ) ){
      curr = DOM.nextElement( curr );
    }
    this._tag = curr.nodeName.toLowerCase();

    // establish the slides
    var rexp = new RegExp( '<(' + this._tag + ')', 'ig' );
    var arr  = this._screen.innerHTML.replace( rexp, "||||<$1" ).split( '||||' );
        arr.shift();
    this._screen.innerHTML = '';
    Element.removeClassName( this._screen, 'rotate' );
    Element.addClassName( this._screen, 'rotating' );
    this._slides = [];
    $A( arr ).each( function( html, i ){
      // build the div
      var slide = this._slide.cloneNode( true );
          slide.style.width = this._width;
          slide.setAttribute( 'id', this._id + '-' + i );
          slide.innerHTML = html;
      // add to the _slides array
      this._slides.push( slide.getAttribute( 'id' ) );
      // set the default styles
      slide.style.zIndex = 0;
      slide.style.opacity = 0;
      // append the slide
      this._screen.appendChild( slide );
    }.bind( this ) );
    // make the first slide the active one
    var first = this._screen.firstChild;
        first.style.opacity = 1;
    this._active = first.getAttribute( 'id' );
    // build the controls
    var rev   = $a( 'Reverse' );
        Element.addClassName( rev, 'reverse' );
        Event.observe( rev, 'click', this.reverse.bind( this ), false );
    var pause = $a( 'Pause' );
        Element.addClassName( pause, 'pause' );
        Event.observe( pause, 'click', this.pause.bind( this ), false );
    var fwd   = $a( 'Forward' );
        Element.addClassName( fwd, 'forward' );
        Event.observe( fwd, 'click', this.forward.bind( this ), false );
    var controls = $ul( $li( rev ), $li( pause ), $li( fwd ) );
        controls.setAttribute( 'id', this._id + '-controls' );
        Element.addClassName( controls, 'rotation-controls' );
    this._screen.appendChild( controls );
    // add the timing functionality
    this._timer = setInterval( 'rotating[' + this._index + '].forward()', 5000 );
  },
  reverse:    function(){
    if( this._moving == true ) return;
    clearInterval( this._timer );
    this._direction = 'reverse';
    this.move();
  },
  forward:    function(){
    if( this._moving == true ) return;
    clearInterval( this._timer );
    this._direction = 'forward';
    this.move();
  },
  pause:      function( e ){
    var el = Event.element( e );
    if( this._paused ){
      // play
      this._paused = false;
      this._direction = 'forward';
      this._timer = setInterval( 'rotating[' + this._index + '].forward()', 5000 );
      el.innerHTML = 'Pause';
      Element.addClassName( el, 'pause' );
      Element.removeClassName( el, 'play' );
    } else {
      // pause
      this._paused = true;
      clearInterval( this._timer );
      el.innerHTML = 'Play';
      Element.addClassName( el, 'play' );
      Element.removeClassName( el, 'pause' );
    }
  },
  move:       function(){
    this._moving = true;
    // get the current slide #
    this._old = this._active;
    $( this._old ).style.zIndex = '0';
    var old_id = parseInt( this._old.replace( /.*-(\d+)$/g, "$1" ) );
    // figure out the # of the slide we need to move
    var new_id;
    if( this._direction == 'forward' ){
      new_id = ( old_id == this._slides.length - 1 ) ? 0 : old_id + 1;
    }else{
      new_id = ( old_id === 0 ) ? this._slides.length - 1 : old_id - 1;
    }
    this._active = this._id + '-' + new_id;
    var slide = $( this._active );
    // move it
    slide.style.visibility = 'hidden';
    slide.style.zIndex = '1';
    slide.fade = new fx.Style( slide, 'opacity', { duration: 1000,
                                                   transition: function(t, b, c, d) { return c*t/d + b; },
                                                   onComplete: this.reset.bind( this ) });
    slide.fade.custom( 0, 1 );
  },
  reset:      function(){
    $( this._old ).style.visibility = 'hidden';
    $( this._old ).style.opacity = 0;
    if( !this._paused ) this._timer = setInterval( 'rotating[' + this._index + '].forward()', 5000 );
    this._moving = false;
  }
};

// if Prototype, lowpro & required DOM methods are available
if( typeof( Prototype ) != 'undefined' &&
    typeof( LowPro ) != 'undefined' &&
    document.getElementById &&
    document.getElementsByTagName &&
    document.createElement &&
    document.getElementsByTagName( 'form' ) ){
  var rotating = Array();
  Event.onReady( function(){
    $$( '.rotate' ).each( function( el, i ){
      rotating[i] = new RotatingFeature( el, i );
    } );
  } );
}