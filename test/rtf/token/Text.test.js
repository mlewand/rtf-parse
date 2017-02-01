const Text = require( '../../../src/rtf/token/Text' );

describe( 'Text', () => {
	let mock;

	beforeEach( () => {
		mock = new Text()
	} );

	describe( 'match', () => {
		it( 'always return correct val', () => {
			expect( mock.match( '' ) ).to.be.true;
			expect( mock.match( 'abc' ) ).to.be.true;
		} );
	} );

	describe( 'applyToModel', () => {
		let fakeModel;

		const TextModel = require( '../../../src/rtf/model/Text' );

		beforeEach( () => {
			fakeModel = {
				append: sinon.stub(),
				getLast: sinon.stub()
			};
		} );

		it( 'adds a new Text entry', () => {
			mock.value = 'abcd';
			mock.applyToModel( fakeModel );
			expect( fakeModel.append ).to.be.calledWith( sinon.match.instanceOf( TextModel ) );
			let textEntry = fakeModel.append.args[ 0 ][ 0 ];
			expect( textEntry.value ).to.be.equal( 'abcd' );
		} );
	} );
} );
