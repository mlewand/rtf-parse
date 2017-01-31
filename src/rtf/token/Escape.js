( function() {
	'use strict';

	const Token = require( './Token' );

	/**
	 * Escape token.
	 *
	 * @class Escape
	 * @extends {Token}
	 */
	class Escape extends Token {
		constructor( value ) {
			super();
			this.tokenRegexp = /\\./;
			this.value = value;
		}
	}

	module.exports = Escape;
} )();
