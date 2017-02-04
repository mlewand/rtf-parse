( function() {
	'use strict';

	const Token = require( './Token' ),
		CommandModel = require( '../model/Command' );

	class Command extends Token {
		constructor( matchedText ) {
			super( matchedText );

			this.tokenRegexp = /\\[a-z]+(-?[0-9]+)? ?/;

			this.value = matchedText || '';
		}

		applyToModel( model ) {
			model.append( CommandModel.factory( this.value ) );
		}
	}

	module.exports = Command;
} )();
