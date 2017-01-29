( function() {
	'use strict';

	const Token = require( './Token' );

	class GroupEnd extends Token {
		constructor() {
			super();
			this.tokenRegexp = /\}/;
		}
	}

	module.exports = GroupEnd;
} )();
