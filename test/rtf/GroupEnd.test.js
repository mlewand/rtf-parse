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
		it( 'matches regular group end string', () => {
			expect( mock.match( '}\viewkind4 \pard Hello world!\par}' ) ).to.be.true;
		} );

		it( 'doesnt match escaped', () => {
			expect( mock.match( '\\}\viewkind4 \pard Hello world!\par}' ) ).to.be.false;
		} );

		it( 'doesnt match regular text', () => {
			expect( mock.match( 'Hello world!\par}' ) ).to.be.false;
		} );
	} );
} );
