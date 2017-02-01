const Command = require( '../../../src/rtf/token/Command' ),
	CommandModel = require( '../../../src/rtf/model/Command' );

describe( 'Command', () => {
	let mock;

	beforeEach( () => {
		mock = new Command()
	} );

	describe( 'match', () => {
		it( 'matches in the middle of the string', () => {
			expect( mock.match( 'foo \\pard bar' ) ).to.be.eql( [ 4, '\\pard ' ] );
		} );

		it( 'matches at the beginning of the string', () => {
			expect( mock.match( '\\abc123 bar' ) ).to.be.eql( [ 0, '\\abc123 ' ] );
		} );
	} );


	describe( 'applyToModel', () => {
		let fakeModel;

		beforeEach( () => {
			fakeModel = {
				append: sinon.stub()
			};
		} );

		it( 'adds a command', () => {
			mock.value = '\\foo123';
			mock.applyToModel( fakeModel );
			expect( fakeModel.append ).to.be.calledWith( sinon.match.instanceOf( CommandModel ) );
			let textEntry = fakeModel.append.args[ 0 ][ 0 ];
			expect( textEntry.value ).to.be.equal( '\\foo123' );
		} );
	} );
} );
