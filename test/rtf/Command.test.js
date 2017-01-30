const Command = require( '../../src/rtf/Command' );

describe( 'Command', () => {
	let mock = new Command();
	describe( 'match', () => {
		it( 'matches in the middle of the string', () => {
			expect( mock.match( 'foo \\pard bar' ) ).to.be.eql( [ 4, '\\pard ' ] );
		} );

		it( 'matches at the beginning of the string', () => {
			expect( mock.match( '\\abc123 bar' ) ).to.be.eql( [ 0, '\\abc123 ' ] );
		} );
	} );

} );
