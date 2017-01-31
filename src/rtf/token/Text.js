( function() {
	'use strict';

	const Token = require( './Token' );

	/**
	 * Text Text.
	 *
	 * @class Text
	 * @abstract
	 */
	class Text extends Token {
		constructor( value ) {
			super();
			this.value = value;
		}

		/**
		 * Checks if Text occurs at the beginning of `code`
		 *
		 * @param {String} code
		 * @returns {Boolean}
		 * @memberOf Text
		 */
		match( code ) {
			// Text always matches.
			return true;
		}
	}

	module.exports = Text;
} )();
