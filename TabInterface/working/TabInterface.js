/*------------------------------------------------------------------------------
Function:       TabInterface()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  7 December 2006
Version:        0.3
Homepage:       http://code.google.com/p/easy-designs/wiki/TabInterface
License:        MIT License (see homepage)
Note:           If you change or improve on this script, please let us know by
                emailing the author (above) with a link to your demo page.
------------------------------------------------------------------------------*/
function TabInterface( el, i ){
  // Public Properties
  this.Version = '0.3'; // version

  // Private Properties
  var _i       = i;     // incrementor
  var _cabinet = el;    // the "cabinet" element (container)
  var _id      = false; // ID of _cabinet
  var _active  = false; // ID of the active "folder"
  var _tag     = false; // tag we'll split it on
  // the tab list
  var _index   = document.createElement( 'ul' );
  // prototype elements
  var _els     = { li:  document.createElement( 'li' ),
                   div: document.createElement( 'div' ) };

  // Private Methods
  function initialize(){
    // set the id
    _id = el.getAttribute( 'id' ) || 'folder-' + _i;
    if( !el.getAttribute( 'id' ) ) el.setAttribute( 'id', _id );

    // trim whitespace
    var node = _cabinet.firstChild;
    while( node ){
      var nextNode = node.nextSibling;
      if( node.nodeType == 3 &&
          !/\S/.test( node.nodeValue ) )
        _cabinet.removeChild( node );
      node = nextNode;
    }

    // find the first heading
    var headers = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ];
    var hLen = headers.length;
    for( var i=0; i<hLen; i++ ){
      if( _cabinet.firstChild.nodeName.toLowerCase() == headers[i] ){
        _tag = headers[i];
        break;
      }
    }

    // establish the folders
    var rexp = new RegExp( '<(' + _tag + ')', 'ig' );
    var arr  = _cabinet.innerHTML.replace( rexp, "||||<$1" ).split( '||||' );
        arr.shift();
    _cabinet.innerHTML = '';
    removeClassName( _cabinet, 'tabbed' );
    addClassName( _cabinet, 'tabbed-on' );
    var aLen = arr.length;
    for( var k=0; k<aLen; k++ ){
      // build the div
      var folder = _els.div.cloneNode( true );
          addClassName( folder, 'folder' );
          folder.setAttribute( 'id', _id + '-' + k );
          folder.innerHTML = arr[k];
          _cabinet.appendChild( folder );
      // build the tab
      var tab = _els.li.cloneNode( true );
          tab.folder = folder.getAttribute( 'id' );
          tab.setAttribute( 'id', tab.folder + '-tab' );
          tab.onclick = swap; // set the action
      var heading = folder.getElementsByTagName( _tag )[0];
          if( heading.getAttribute( 'title' ) ){
            tab.innerHTML = heading.getAttribute( 'title' )
          } else {
            tab.innerHTML = heading.innerHTML;
            addClassName( heading, 'hidden' );
          }
          _index.appendChild( tab );
      // active?
      if( k == 0 ){
        addClassName( folder, 'visible' );
        _active = folder.getAttribute( 'id' );
        addClassName( tab, 'active-tab' );
      }
    }
    // add the index
    _index.className = 'tab-list';
    _cabinet.appendChild( _index );
  }
  function swap( e ){
    e = ( e ) ? e : event;
    var tab = e.target || e.srcElement;
    removeClassName( document.getElementById( _active + '-tab' ), 'active-tab' );
    removeClassName( document.getElementById( _active ), 'visible' );
    addClassName( tab, 'active-tab' );
    addClassName( document.getElementById( tab.folder ), 'visible' );
    _active = tab.folder;
  }
  function addClassName( e, c ){
    var classes = ( !e.className ) ? [] : e.className.split( ' ' );
    classes.push( c );
    e.className = classes.join( ' ' );
  }
  function removeClassName( e, c ){
    var classes = e.className.split( ' ' );
    for( var i=classes.length-1; i>=0; i-- ){
      if( classes[i] == c ) classes.splice( i, 1 );
    }
    e.className = classes.join( ' ' );
  }

  // start it up
  initialize();
};