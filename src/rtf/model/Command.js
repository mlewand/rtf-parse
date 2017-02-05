( function() {
	'use strict';

	const Model = require( './Model' );

	class Command extends Model {
		constructor( parent ) {
			super( parent );

			/**
			 * @property {String} name Name of the command.
			 * @memberOf Command
			 */
			this.name = '';
			this.value = '';
		}

		set value( val ) {
			this._value = val;
			this.name = Command._resolveName( val ) || '';
		}

		get value() {
			return this._value;
		}

		/**
		 * Returns command name picked from command token.
		 *
		 * E.g. for `"\foobar "` token it would return `"foobar"` string.
		 *
		 * @private
		 * @param {String} value Text value picked by parser.
		 * @returns {String/null}
		 * @memberOf Command
		 */
		static _resolveName( value ) {
			let match = value.match( /\\([a-z]+(-?[0-9]+)?) ?/ );

			return match ? match[ 1 ] : null;
		}

		/**
		 * A factory for commands. Based on parsed command string it will return the most
		 * accurate command instance.
		 *
		 * If no specific class is found for given `value`, a Command instance is returned.
		 *
		 * E.g. it will return `Picture` instance for `\pict` command.
		 *
		 * @static
		 * @param {String} value Command string picked by the parser, e.g. `\pict`.
		 * @returns {Command}
		 * @memberOf Command
		 */
		static factory( value ) {
			const Picture = require( './command/Picture' );

			let name = Command._resolveName( value ),
				mapping = {
				},
				type = name in mapping ? mapping[ name ] : Command,
				ret;

			ret = new type( value );
			ret.value = value;

			return ret;
		}
	}

	module.exports = Command;
} )();
