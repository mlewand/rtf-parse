const Picture = require( '../../../../src/rtf/token/command/Picture' );

describe( 'Picture', () => {
	let mock = new Picture();

	describe( 'match', () => {
		it( 'matches a standalone pict', () => {
			expect( mock.match( '{\\pict {}}' ) ).to.be.eql( [ 1, '\\pict ' ] );
		} );
	} );

	describe( 'applyToModel', () => {
		let fakeModel;

		const PictureModel = require( '../../../../src/rtf/model/command/Picture' ),
			CommandModel = require( '../../../../src/rtf/model/Command' );

		beforeEach( () => {
			fakeModel = {
				getParent: sinon.stub().returns(),
				append: sinon.stub(),
				getChild: sinon.stub()
			};
		} );

		it( 'adds a new Picture when parent doesnt have nonshppict', () => {
			mock.applyToModel( fakeModel );
			expect( fakeModel.append ).to.be.calledWith( sinon.match.instanceOf( PictureModel ) );
		} );

		it( 'adds a Command instance when parent have nonshppict', () => {
			fakeModel.getParent = sinon.stub().returns( {
				getChild: sinon.stub().returns( {} )
			} );

			let ret = mock.applyToModel( fakeModel );

			expect( fakeModel.append ).not.to.be.calledWith( sinon.match.instanceOf( PictureModel ) );
			expect( fakeModel.append ).to.be.calledWith( sinon.match.instanceOf( CommandModel ) );
		} );
	} );
} );
