( function() {
	'use strict';

	const Model = require( './Model' );

	class Text extends Model {
		constructor( parent ) {
			super( parent );

			this.value = '';
		}
	}

	module.exports = Text;
} )();
