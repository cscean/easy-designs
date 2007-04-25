/*------------------------------------------------------------------------------
Function:       Stripey()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  28 August 2006
Version:        0.1
Homepage:       http://code.google.com/p/easy-designs/Stripey
License:        MIT License (see homepage)
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
var Stripey = Class.create();
Stripey.prototype = {
  el:         false,
  type:       false,
  // Default odd and even classes
  odd:        'odd',
  even:       'even',
  curr_class: false,
  initialize: function( id, odd, even ){

    // Get the element
    this.el = $( id );

    /* Check the type
       we are looking for UL, OL, DL or TABLE */
    this.type = this.el.nodeName.toLowerCase();

    // Set the odd and even classes, if provided
    if( typeof( odd ) != 'undefined' ) this.odd = odd;
    if( typeof( even ) != 'undefined' ) this.even = even;

    // Stripe it
    this.stripe();

  },
  stripe:     function(){
    var collection, len, even = this.even, odd = this.odd, i;
    if( this.type == 'ol' ||
        this.type == 'ul' ){
      collection = this.el.getElementsByTagName( 'li' );
      len = collection.length;
      for( i=0; i<len; i++ ){
        this.curr_class = ( ( i & 1 ) == 0 ) ? odd : even;
        Element.addClassName( collection[i], this.curr_class );
      }
    }else if( this.type == 'dl' ){
      Element.cleanWhitespace( this.el );
      this.curr_class = odd;
      collection = $A( this.el.childNodes );
      collection.each( function( item ){
        Element.addClassName( item, this.curr_class );
        if( item.nextSibling &&
            ( item.nodeName.toLowerCase() == 'dd' &&
              item.nextSibling.nodeName.toLowerCase() == 'dt' ) ){
          this.curr_class = ( this.curr_class == odd ) ? even : odd;
        }
      }.bind( this ) );
    }else if( this.type == 'table' ){
      collection = this.el.getElementsByTagName( 'tr' );
      len = collection.length;
      for( i=0; i<len; i++ ){
        if( collection[i].parentNode.nodeName.toLowerCase() == 'thead' ||
            collection[i].parentNode.nodeName.toLowerCase() == 'tfoot' ){
          continue;
        }
        this.curr_class = ( ( i & 1 ) == 0 ) ? odd : even;
        Element.addClassName( collection[i], this.curr_class );
      }
    }else{
      // Um, what exactly are you striping?
    }
  }
};