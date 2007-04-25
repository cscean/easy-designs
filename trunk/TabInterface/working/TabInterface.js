/*------------------------------------------------------------------------------
Function:       TabInterface()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  7 December 2006
Version:        0.1
Homepage:       http://code.google.com/p/easy-designs/TabInterface
License:        MIT License (see homepage)
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
var TabInterface = Class.create();
TabInterface.prototype = {
  Version:    '0.1',
  _id:        false, // folder-* string
  _cabinet:   false, // entire component div
  _active:    false, // folder-*-* string marks active
  _tag:       false, // node name of heading tag
  _index:     $ul(), // ul.tab-list of tabs
  _tab:       $li(), // li.folder-tab prototype for cloning
  _folder:    $div(),// div.folder prototype for cloning
  _folders:   null,  // array of folder elements
  initialize: function( el, index ){
    // set the cabinet
    this._cabinet = el;
    Element.cleanWhitespace( this._cabinet );

    // set the id
    this._id = el.getAttribute( 'id' ) || 'folder-' + index;
    if( !el.getAttribute( 'id' ) ){
      el.setAttribute( 'id', this._id );
    }

    // set up the elements
    Element.addClassName( this._index, 'tab-list' );
    Element.addClassName( this._tab, 'folder-tab' );
    Element.addClassName( this._folder, 'folder' );

    // establish folders but retain original elements
    this._folders = [];
    for (var i=0; i < this._cabinet.childNodes.length; i++) {
      var elem = this._cabinet.childNodes.item(i);
      if (elem.className && Element.hasClassName(elem, "tab-unit")) {
        this._folders.push(elem);
      }
    }
    var tabs = this._index.cloneNode( true );

    $A(this._folders).each(function(folderElem, i) {

      // add class, and ID if unset
      Element.addClassName(folderElem, 'folder');
      if ( ! folderElem.id) {
        folderElem.id = this._id + '-' + i;
      }

      // create tab element
      folderElem.tab = this._tab.cloneNode( true );
      folderElem.tab.folderElem = folderElem;
      folderElem.tab.id = folderElem.id + '-tab';

      var heading = this.findHeadingElement(folderElem);
      if (heading == null) {
        folderElem.tab.innerHTML = folderElem.id;
      } else if (heading.getAttribute('title')) {
        folderElem.tab.innerHTML = heading.getAttribute('title');
      } else {
        folderElem.tab.innerHTML = heading.innerHTML;
      }

      tabs.appendChild(folderElem.tab);
      folderElem.tab.onclick = this.swap.bindAsEventListener( this );
    }.bind(this));
    this._cabinet.appendChild( tabs );

    if (this._folders[0]){
      Element.addClassName(this._folders[0], 'visible' );
      Element.addClassName(this._folders[0].tab, 'active-tab' );
      this._activeElem = this._folders[0];
    }

    Element.removeClassName( this._cabinet, 'tabbed' );
    Element.addClassName( this._cabinet, 'tabbed-on' );
  },

  // find the first heading in a folder element, or null if no heading
  findHeadingElement: function(folder) {
    var hs = ( 'h1|h2|h3|h4|h5|h6' ).split( '|' );
    var curr = folder.firstChild;
    while( curr != null && !hs.inArray( curr.nodeName.toLowerCase() ) ){
      curr = DOM.nextElement( curr );
    }
    return curr;
  },

  swap:       function( e ){
    trace( 'was active: ' + this._activeElem.id );
    var tab = Event.element( e );
    Element.removeClassName( this._activeElem.tab, 'active-tab' );
    Element.removeClassName( this._activeElem, 'visible' );
    Element.addClassName( tab, 'active-tab' );
    Element.addClassName( tab.folderElem, 'visible' );
    this._activeElem = tab.folderElem;
    trace( 'now active: ' + this._activeElem.id );
  }
};

// if Prototype, lowpro & required DOM methods are available
if( typeof( Prototype ) != 'undefined' &&
    typeof( LowPro ) != 'undefined' &&
    document.getElementById &&
    document.getElementsByTagName &&
    document.createElement &&
    document.getElementsByTagName( 'div' ) ){
  Event.onReady( function(){
    var cabinets = Array();
    $$( 'div.tabbed' ).each( function( el, i ){
      cabinets[i] = new TabInterface( el, i );
    } );
  } );
}

