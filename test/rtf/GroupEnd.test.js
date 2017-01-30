const GroupEnd = require( '../../src/rtf/GroupEnd' );

describe( 'GroupEnd', () => {
	let mock = new GroupEnd();

	describe( 'constructor', () => {
		it( 'sets a proper regexp', () => {
			let ret = new GroupEnd();
			expect( ret.tokenRegexp ).to.be.instanceof( RegExp );
		} );
	} );

	describe( 'match', () => {
		it( 'matches regular group on the end of string', () => {
			expect( mock.match( '\\viewkind4 \\pard Hello world!\\par}' ) ).to.be.eql( [ 33, '}' ] );
		} );

		it( 'matches group end on the beginning of the string', () => {
			expect( mock.match( '} foo bar' ) ).to.be.eql( [ 0, '}' ] );
		} );

		it( 'doesnt match regular text', () => {
			expect( mock.match( 'Hello world!\par' ) ).to.be.false;
		} );
	} );
} );
