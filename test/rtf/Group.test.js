const Group = require( '../../src/rtf/Group' );

describe( 'Group', () => {
	let mock = new Group();

	describe( 'constructor', () => {
		it( 'sets a proper regexp', () => {
			let ret = new Group();
			expect( ret.tokenRegexp ).to.be.instanceof( RegExp );
		} );
	} );

	describe( 'match', () => {
		it( 'matches regular group string at the beginning', () => {
			expect( mock.match( '{{\*\generator Sample Rich Text Editor}\viewkind4 \pard Hello world!\par}' ) ).to.be.eql( [ 0, '{' ] );
		} );

		it( 'matches regular group string', () => {
			expect( mock.match( 'foo {{\*\generator Sample Rich Text Editor}\viewkind4 \pard Hello world!\par}' ) ).to.be.eql( [ 4, '{' ] );
		} );
	} );
} );
