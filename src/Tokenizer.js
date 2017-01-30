( function() {
	'use strict';

	const Text = require( './rtf/Text' );

	class Tokenizer {

		constructor() {
			// this.splitRegExp = new RegExp( Tokenizer.RTF_NEW_LINE, 'm' );
			this.splitRegExp = /\r\n/m;
			this._loadTokens();

			this._results = [];
		}

		process( code ) {
			code = String( code );

			// Tokenizer splits RTF content into chunks per space / new line.
			let separatorMatch = this.splitRegExp.exec( code ),
				chunk = separatorMatch ? code.substr( 0, separatorMatch.index ) : code,
				remaining = separatorMatch ? code.substr( separatorMatch.index + separatorMatch[ 0 ].length ) : null;

			while ( chunk ) {
				let closestMatch = null,
					matchedText = null,
					// At what offset the token was matched?
					matchIndex = null;

				for ( let token of this.tokens ) {
					let tokenMatched = token.match( chunk );

					// Only overwrite closest match if:
					// 1. No token has been matched so far.
					// 2. ... or this token has been found closer to the end of a string than the former one.
					if ( tokenMatched && ( matchIndex === null || tokenMatched[ 0 ] < matchIndex ) ) {
						closestMatch = token;
						matchIndex = tokenMatched[ 0 ];
						matchedText = tokenMatched[ 1 ];
					}

					if ( matchIndex === 0 ) {
						// Any token matched at 0 index, takes highest priority, and means no further processing is needed.
						break;
					}
				}

				if ( matchIndex !== 0 ) {
					// console.log( `not having a perfect match (${matchIndex}) :(( using text` );

					// No match perfect match, so we'll create a text run all the way until a best match. The best
					// match will be picked in next iteration at offset 0.
					matchedText = matchIndex !== null ? chunk.substring( 0, matchIndex ) : chunk;
					closestMatch = new Text( matchedText );
					matchIndex = 0;
				}

				// Update current chunk.
				chunk = chunk.substr( matchedText.length );

				this._onMatched( closestMatch );
			}

			if ( remaining && remaining.length ) {
				this.process( remaining );
			}
		}

		_onMatched( token ) {
			// console.log( `@@ Matched ${token.constructor.name} !!` );
			this._results.push( token );
		}

		/**
		 * New line feed used in RTF files.
		 *
		 * @readonly
		 * @static
		 * @memberOf Tokenizer
		 */
		static get RTF_NEW_LINE() {
			return '\r\n';
		}

		/**
		 * Sets up known tokens array.
		 *
		 * @memberOf Tokenizer
		 */
		_loadTokens() {
			const Group = require( './rtf/Group' ),
				GroupEnd = require( './rtf/GroupEnd' );

			this.tokens = [
				new Group(),
				new GroupEnd()
			];

			this.tokens[ 0 ].name = 'Group';
			this.tokens[ 1 ].name = 'GroupEnd';
		}
	}

	module.exports = Tokenizer;
} )();
