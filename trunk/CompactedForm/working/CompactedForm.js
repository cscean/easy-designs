/*------------------------------------------------------------------------------
Function:       CompactedForm()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  7 December 2006
Version:        0.1
Homepage:       http://www.easy-designs.net/code/compactedform/
License:        MIT License (see homepage)
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
var CompactedForm = Class.create();
CompactedForm.prototype = {
  Version:      '0.1',
  _form:        false,
  _option:      $option(),
  _temp:        false,
  initialize:   function( el ){
    trace( 'new CompactedForm' );
    // set the form
    this._form = el;
    // get the labels
    var labels   = $A( el.getElementsByTagName( 'label' ) );
    labels.each( function( el ){
      // give each an onclick focus event
      el.onclick = this.labelClick;
      // set an ID so we can reassociate the form control easier
      var field = el.getAttribute( 'for' ) || el.htmlFor;
      if( field ){
        el.setAttribute( 'id', field + '-label' );
      } else {
        // this is an iplicit label
        Element.addClassName( el, 'not-compacted' );
      }
      // adding titles introduces a new functionality
      if( el.getAttribute( 'title' ) &&
          field ){
        Element.addClassName( el, 'not-compacted' );
        field = $( field );
        if( field.value == '' ){
          field.setAttribute( 'title', el.getAttribute( 'title' ) );
          field.setAttribute( 'value', el.getAttribute( 'title' ) );
        }
      }
    }.bind( this ) );
    // get the form controls
    var controls = $A( el.elements );
    controls.each( function( el ){
      // is the control the child of a label?
      if( el.parentNode.nodeName.toLowerCase() == 'label' ){
        el.parentNode.onclick = el.focus;
        return;
      }
      // INPUTs and TEXTAREAs
      if( el.nodeName.toLowerCase() == 'input' ||
          el.nodeName.toLowerCase() == 'textarea' ){
        var type = el.getAttribute( 'type' ) ? el.getAttribute( 'type' ).toLowerCase() : false;
        // TEXT or PASSWORD or TEXTAREA
        if( ( type &&
              ( type == 'text' ||
                type == 'password' ) ) ||
            el.nodeName.toLowerCase() == 'textarea' ){
          el.onfocus = this.inputFocus;
          el.onblur  = this.inputBlur;
        }
      // SELECTs
      }else if( el.nodeName.toLowerCase() == 'select' ){
        var selIdx = el.selectedIndex;
        var label = $( el.getAttribute( 'id' ) + '-label' );
        var text = label.getAttribute( 'title' ) || label.firstChild.nodeValue;
        if( label.getElementsByTagName( 'em' ).length > 0 &&
            label.getElementsByTagName( 'em' )[0].firstChild.nodeValue == '*' ) text += '*';
        var opt = this._option.cloneNode( true );
            opt.setAttribute( 'value', '' );
            opt.setAttribute( 'id', el.getAttribute( 'id' ) + '-label-opt' );
            opt.appendChild( document.createTextNode( text ) );
        el.insertBefore( opt, el.firstChild );

        /**
         * In Firefox 1.0.7, setting el.innerHTML to a string representation
         * of itself (el.innerHTML += '') wipes out the dynamically generated
         * <option> tags in the HTML. This is non-intuitive, so I wrote the
         * following two traces illustrate the problem in one case.
         * (Uncomment the offending line of javascript below to see the problem.)
         *
         * This is going to be a problem in any other browser as well, if
         * any code sets other fields (e.g. event handlers) on these elements.
         * CompactedForm sets its handlers after this point, but any fields
         * set earlier, by other components, will vanish.
         */
        if (trace && el.id == "form-new-year") {
          trace("form-new-year innerHTML before manipulation: " + escape(el.innerHTML));
        }
        /*@cc_on
          /*@if (@_win32)
              // IE has an issue with selected indexes
              if( selIdx > 0 ){
                // do nothing
              }else{
                el.selectedIndex = 0;
              }
            @else @*/
              // this code removed as per notes above
              // el.innerHTML += '';
          /*@end
        @*/
        if (trace && el.id == "form-new-year") {
          trace("form-new-year innerHTML after manipulation: " + escape(el.innerHTML));
        }
        el.onfocus = this.selectFocus;
        el.onblur = this.selectBlur;
        Element.addClassName( label, 'select-label' );
      }
    }.bind( this ) );
    Element.removeClassName( el, 'compact' );
    Element.addClassName( el, 'compacted' );
  },
  labelClick:  function( e ){
    var el = Event.element( e );
    var field = el.getAttribute( 'for' ) || el.htmlFor;
    if( field ){
      $( field ).focus();
    } else {
      var control = false;
      if( el.getElementsByTagName( 'input' ) ){
        control = el.getElementsByTagName( 'input' )[0];
      }else if( el.getElementsByTagName( 'select' ) ){
        control = el.getElementsByTagName( 'select' )[0];
      }else if( el.getElementsByTagName( 'textarea' ) ){
        control = el.getElementsByTagName( 'textarea' )[0];
      }
      if( control ) control.focus();
    }
    Element.addClassName( el, 'focused' );
  },
  inputFocus:  function( e ){
    var el = Event.element( e );
    if( el.getAttribute( 'title' ) &&
        el.value &&
        el.getAttribute( 'title' ) == el.value ) el.value = '';
    var label = $( el.getAttribute( 'id' ) + '-label' ) || el.parentNode;
    Element.addClassName( label, 'focused' );
  },
  inputBlur:   function( e ){
    var el = Event.element( e );
    if( el.value == '' ){
      var label = $( el.getAttribute( 'id' ) + '-label' ) || el.parentNode;
      Element.removeClassName( label, 'focused' );
      if( el.getAttribute( 'title' ) ) el.value = el.getAttribute( 'title' );
    }
  },
  selectFocus: function( e ){
    var el = Event.element( e );
    trace( 'focus: ' + el.getAttribute( 'id' ) + '-label-opt' );
    $( el.getAttribute( 'id' ) + '-label-opt' ).style.display = 'none';
  },
  selectBlur:  function( e ){
    var el = Event.element( e );
    trace( 'blur' );
    if( el.selectedIndex === 0 ){
      $( el.getAttribute( 'id' ) + '-label-opt' ).style.display = '';
    }
  }
};

// if Prototype, lowpro & required DOM methods are available
if( typeof( Prototype ) != 'undefined' &&
    typeof( LowPro ) != 'undefined' &&
    document.getElementById &&
    document.getElementsByTagName &&
    document.createElement &&
    document.getElementsByTagName( 'form' ) ){
  Event.onReady( function(){
    var compacted = Array();
    $$( 'form.compact' ).each( function( el, i ){
      compacted[i] = new CompactedForm( el );
    } );
  } );
}