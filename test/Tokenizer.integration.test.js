const fsp = require( 'fs-promise' ),
	Tokenizer = require( '../src/Tokenizer' ),
	GroupToken = require( '../src/rtf/token/Group' ),
	GroupEndToken = require( '../src/rtf/token/GroupEnd' ),
	CommandToken = require( '../src/rtf/token/Command' ),
	TextToken = require( '../src/rtf/token/Text' ),
	EscapeToken = require( '../src/rtf/token/Escape' );

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
			let ret = mock.process( '{\\rtf1 foobar}' );

			assertParsedTokens( [
				GroupToken, [ CommandToken, '\\rtf1 ' ],
				[ TextToken, 'foobar' ],
				GroupEndToken
			], ret );
		} );

		it( 'works with multiline markup', () => {
			let ret = mock.process( '{\\rtf1 foobar\r\n{abcd}}' );

			assertParsedTokens( [
				GroupToken, [ CommandToken, '\\rtf1 ' ],
				[ TextToken, 'foobar' ],
				GroupToken, [ TextToken, 'abcd' ],
				GroupEndToken,
				GroupEndToken
			], ret );
		} );

		it( 'integrates well with escape tokens', () => {
			let ret = mock.process( '{\\rtf1 foo\\}bar}' );

			assertParsedTokens( [
				GroupToken, [ CommandToken, '\\rtf1 ' ],
				[ TextToken, 'foo' ],
				[ EscapeToken, '\\}' ],
				[ TextToken, 'bar' ],
				GroupEndToken
			], ret );
		} );

		it( 'doesnt crash with real rtfs', () => {
			return fsp.readFile( path.join( __dirname, '_fixtures', 'smallimage.rtf' ) )
				.then( content => mock.process( content ) )
				.then( results => {
					// Nothing crashed, yaaayy. Just make sure that some tokens were actually read.
					expect( results.length ).not.to.be.eql( 0 );
				} );
		} );
	} );
} );
