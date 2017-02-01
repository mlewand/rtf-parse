( function() {
	'use strict';

	const Document = require( './rtf/model/Document' ),
		Tokenizer = require( './Tokenizer' );

	class Parser {
		parseString( str ) {
			return new Promise( ( resolve, reject ) => {
				let doc = new Document(),
					tokenizer = new Tokenizer(),
					modelContext = doc;

				tokenizer.on( 'matched', token => modelContext = token.applyToModel( modelContext ) || modelContext );

				let tokens = tokenizer.process( str );

				resolve( doc );
			} );
		}
	};

	module.exports = Parser;
} )();
