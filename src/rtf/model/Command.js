( function() {
	'use strict';

	const Model = require( './Model' );

	class Command extends Model {
		constructor( parent ) {
			super( parent );
			this.value = '';
		}
	}

	module.exports = Command;
} )();
