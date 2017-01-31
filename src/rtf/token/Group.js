( function() {
	'use strict';

	const Token = require( './Token' );

	class Group extends Token {
		constructor() {
			super();
			this.tokenRegexp = /\{/;
		}
	}

	module.exports = Group;
} )();
