( function() {
	'use strict';

	const Document = require( './rtf/model/Document' ),
		Tokenizer = require( './Tokenizer' ),
		EventEmmiter = require( 'events' );

	class Parser extends EventEmmiter {
		parseString( str ) {
			return new Promise( ( resolve, reject ) => {
				let doc = new Document(),
					tokenizer = new Tokenizer(),
					modelContext = doc;

				tokenizer.on( 'matched', token => modelContext = this._tokenMatched( token, modelContext ) );

				let tokens = tokenizer.process( str );

				resolve( doc );
			} );
		}

		_tokenMatched( token, currentContext ) {
			let targetContext = token.applyToModel( currentContext ) || currentContext;

			if ( targetContext !== currentContext ) {
				this.emit( 'contextChanged', targetContext, currentContext );
			}

			return targetContext;
		}
	};

	module.exports = Parser;
} )();
