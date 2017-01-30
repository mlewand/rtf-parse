( function() {
	'use strict';

	const Token = require( './Token' );

	class Command extends Token {
		constructor( value ) {
			super();
			this.tokenRegexp = /\\[a-z]+(-?[0-9]+)? ?/;

			this.value = value;
		}
	}

	module.exports = Command;
} )();
