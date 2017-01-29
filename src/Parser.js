( function() {
	'use strict';

	class Parser {

		parseString( str ) {
			return new Promise( ( resolve, reject ) => {
				resolve( null );
			} );
		}

		parseStream( stream ) {
			return null;
		}
	};

	module.exports = Parser;
} )();
