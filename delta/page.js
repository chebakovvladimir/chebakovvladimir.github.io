if ( !window.frameElement && window.location.protocol !== 'file:' ) {

	// If the page is not yet displayed as an iframe of the index page (navigation panel/working links),
	// redirect to the index page (using the current URL without extension as the new fragment).
	// If this URL itself has a fragment, append it with a dot (since '#' in an URL fragment is not allowed).

	var href = window.location.href;
	var splitIndex = href.lastIndexOf( '/docs/' ) + 6;
	var docsBaseURL = href.substr( 0, splitIndex );

	var hash = window.location.hash;

	if ( hash !== '' ) {

		href = href.replace( hash, '' );
		hash = hash.replace( '#', '.' );

	}

	var pathSnippet = href.slice( splitIndex, -5 );

	window.location.replace( docsBaseURL + '#' + pathSnippet + hash );

}


function onDocumentLoad( event ) {
};

document.addEventListener( 'DOMContentLoaded', onDocumentLoad, false );
