const Token = require( '../../src/rtf/Token' );

describe( 'Token', () => {
	class TokenSubclass extends Token {
		constructor() {
			super();
			this.tokenRegexp = /^abc/;
		}
	}

	class NoRegexpToken extends Token {}

	describe( 'constructor', () => {
	} );

	describe( 'match', () => {
		it( 'throw an error if no tokenRegexp is provided', () => {
			expect( () => new NoRegexpToken().match( 'abcde' ) ).to.throw( EvalError, 'Missing tokenRegexp' );
		} );

		it( 'matches correctly with valid regexp', () => {
			expect( new TokenSubclass().match( 'abcde' ) ).to.be.true;
			expect( new TokenSubclass().match( 'foobar' ) ).to.be.false;
			expect( new TokenSubclass().match( ' abcde' ) ).to.be.false;
		} );
	} );

} );
