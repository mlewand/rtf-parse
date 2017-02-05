const Command = require( '../../../src/rtf/model/Command' );

describe( 'Command', () => {
	let mock;

	beforeEach( () => {
		mock = new Command();
	} );

	describe( 'value setter', () => {
		it( 'sets name correctly', () => {
			mock.value = '\\foo123 ';
			expect( mock.name ).to.be.equal( 'foo123' );

			mock.value = '\\a';
			expect( mock.name ).to.be.equal( 'a' );
		} );
	} );


	describe( 'value getter', () => {
		it( 'returns correct value', () => {
			mock.value = 'aa';
			expect( mock.value ).to.be.equal( 'aa' );

		} );
	} );


	describe( 'factory', () => {
		it( 'returns a different command type if possible', () => {
			const Picture = require( '../../../src/rtf/model/command/Picture' );
			expect( Command.factory( '\\pict ' ) ).to.be.instanceOf( Picture );
		} );
	} );
} );
