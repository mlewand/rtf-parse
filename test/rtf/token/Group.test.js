const Group = require( '../../../src/rtf/token/Group' );

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

		it( 'doesnt match regular text', () => {
			expect( mock.match( 'foo' ) ).to.be.false;
		} );
	} );


	describe( 'applyToModel', () => {
		let fakeModel;

		const GroupModel = require( '../../../src/rtf/model/Group' );

		beforeEach( () => {
			fakeModel = {
				append: sinon.stub()
			};
		} );

		it( 'adds a new group context', () => {
			mock.applyToModel( fakeModel );
			expect( fakeModel.append ).to.be.calledWith( sinon.match.instanceOf( GroupModel ) );
		} );

		it( 'changes the context', () => {
			let ret = mock.applyToModel( fakeModel );
			expect( ret ).to.be.instanceOf( GroupModel );
		} );
	} );
} );
