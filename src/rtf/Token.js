( function() {
	'use strict';

	/**
	 * A generic class for any RTF token/node.
	 *
	 * @class Token
	 * @abstract
	 */
	class Token {
		constructor() {
			this.tokenRegexp = null;
		}

		/**
		 * Checks if Token occurs at the beginning of `code`
		 *
		 * @param {String} code
		 * @returns {Boolean}
		 * @memberOf Token
		 */
		match( code ) {
			if ( !this.tokenRegexp ) {
				throw new EvalError( 'Missing tokenRegexp property!' );
			}

			let match = String( code ).match( this.tokenRegexp );

			return match ? code.startsWith( match[ 0 ] ) : false;
		}
	}

	module.exports = Token;
} )();
