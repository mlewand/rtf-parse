const Tokenizer = require( '../src/Tokenizer' ),
	GroupToken = require( '../src/rtf/Group' ),
	GroupEndToken = require( '../src/rtf/GroupEnd' ),
	CommandToken = require( '../src/rtf/Command' ),
	TextToken = require( '../src/rtf/Text' ),
	EscapeToken = require( '../src/rtf/Escape' );

describe( 'Tokenizer integration', () => {
	let mock;

	beforeEach( () => {
		mock = new Tokenizer();
	} );

	/**
	 * Helper function to assert tokens returned by Tokenizer.
	 *
	 * @param {Array[]/Function[]} expected Either array of expected types, or array of arrays in format `[ <type>, <expectedStringValue> ]`.
	 * @param {Token[]} actual
	 */
	function assertParsedTokens( expected, actual ) {
		if ( !Array.isArray( expected ) ) {
			throw new TypeError( 'assertParsedTokens expects to get an array' );
		}

		expect( actual.length, 'ret.length' ).to.be.equal( expected.length, 'expected.length' );

		for ( let i = 0; i < expected.length; i++ ) {
			let curExpect = expected[ i ];

			if ( typeof curExpect === 'function' ) {
				// Simply checking type.
				expect( actual[ i ], `ret[${i}]` ).to.be.instanceof( curExpect );
			} else {
				// Array format.
				expect( actual[ i ], `ret[${i}]` ).to.be.instanceof( curExpect[ 0 ] );
				expect( actual[ i ].value, `ret[${i}].value` ).to.be.equal( curExpect[ 1 ] );
			}
		}
	}

	describe( 'process', () => {
		it( 'works with simple single-line markup', () => {
			mock.process( '{\\rtf1 foobar}' );

			let ret = mock._results;

			assertParsedTokens( [
				GroupToken, [ CommandToken, '\\rtf1 ' ],
				[ TextToken, 'foobar' ],
				GroupEndToken
			], ret );
		} );

		it( 'works with multiline markup', () => {
			mock.process( '{\\rtf1 foobar\r\n{abcd}}' );

			let ret = mock._results;

			assertParsedTokens( [
				GroupToken, [ CommandToken, '\\rtf1 ' ],
				[ TextToken, 'foobar' ],
				GroupToken, [ TextToken, 'abcd' ],
				GroupEndToken,
				GroupEndToken
			], ret );
		} );

		it( 'integrates well with escape tokens', () => {
			mock.process( '{\\rtf1 foo\\}bar}' );

			let ret = mock._results;

			assertParsedTokens( [
				GroupToken, [ CommandToken, '\\rtf1 ' ],
				[ TextToken, 'foo' ],
				[ EscapeToken, '\\}' ],
				[ TextToken, 'bar' ],
				GroupEndToken
			], ret );
		} );

	} );
} );
