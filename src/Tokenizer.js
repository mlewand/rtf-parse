( function() {
	'use strict';

	class Tokenizer {

		constructor() {
			this.splitRegExp = new RegExp( Tokenizer.RTF_NEW_LINE, 'm' );
		}

		process( code ) {
			// Tokenizer splits RTF content into chunks per space / new line.
			let chunk = code.search( this.splitRegExp ),
				delimiter = null;

			if ( chunk !== -1 ) {
				delimiter = chunk.match( this.splitRegExp )[ 0 ];
			}

			// check if group
			// check if command
			// check if escape
				// recognize type
			// otherwise treat as regular input
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
	}

	module.exports = Tokenizer;
} )();
