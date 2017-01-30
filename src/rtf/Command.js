( function() {
	'use strict';

	const Token = require( './Token' );

	class Command extends Token {
		constructor() {
			super();
			this.tokenRegexp = /\\[a-z]+(-?[0-9]+)? ?/;
		}
	}

	module.exports = Command;
} )();
