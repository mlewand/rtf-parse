const TextModel = require( '../../../src/rtf/model/Text' );

describe( 'TextModel', () => {
	let mock;

	beforeEach( () => {
		mock = new TextModel();
	} );

	describe( 'appendText', () => {
		let getChildMock = () => ({ setParent: sinon.stub() });

		it( 'adds text', () => {
			mock.appendText( 'aa' );
			mock.appendText( 'bb' );
			mock.appendText( 'cc' );

			expect( mock.value ).to.be.equal( 'aabbcc' );
		} );
	} );
} );
