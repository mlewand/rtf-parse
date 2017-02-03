const Model = require( '../../../src/rtf/model/Model' );

describe( 'Model', () => {
	class ModelA extends Model {};
	class ModelB extends Model {};

	let mock;

	beforeEach( () => {
		mock = new Model();
	} );

	describe( 'constructor', () => {
		it( 'sets proper values', () => {
			let parent = {
					foo: 1
				},
				ret = new Model( parent );

			expect( ret._parent ).to.be.equal( parent );
			expect( ret.children ).to.be.an( 'array' );
			expect( ret.children ).to.be.eql( [] );
		} );
	} );

	describe( 'append', () => {
		let getChildMock = () => ( {
			setParent: sinon.stub()
		} );

		it( 'appends a child', () => {
			let child1 = getChildMock(),
				child2 = getChildMock();

			mock.append( child1 );
			mock.append( child2 );

			expect( mock.children ).to.be.eql( [ child1, child2 ] );
		} );

		it( 'sets parent', () => {
			let child = getChildMock();

			mock.append( child );

			expect( child.setParent ).to.be.calledWith( mock );
		} );
	} );

	describe( 'setParent', () => {
		it( 'changes the parent', () => {
			mock._parent = 1;

			mock.setParent( 2 );

			expect( mock._parent ).to.be.equal( 2 );
		} );
	} );

	describe( 'getLast', () => {
		it( 'returns null if none available', () => {
			expect( mock.getLast() ).to.be.null;
		} );

		it( 'returns last child', () => {
			mock.children = [ 1, 2, 3 ];
			expect( mock.getLast() ).to.be.equal( 3 );
		} );
	} );


	describe( 'traversing methods', () => {
		let a = new ModelA(),
			b = new ModelB(),
			b2 = new ModelB(),
			nestedModel = new ModelB(),
			emptyMock = new Model();



		before( () => {
			b2.foo = true;
			nestedModel.value = 'bom';
			b.append( nestedModel );
		} );

		beforeEach( () => {
			mock.append( a );
			mock.append( b );
			mock.append( b2 );
		} );

		describe( 'getChild', () => {
			describe( 'regular', () => {
				it( 'gives correct result no criteria is given', () => {
					expect( mock.getChild() ).to.be.equal( a );
				} );

				it( 'returns correct val when no children available', () => {
					expect( emptyMock.getChild() ).to.be.null;
				} );

				it( 'returns a correct val with a given type', () => {
					expect( mock.getChild( ModelB ) ).to.be.equal( b );
				} );

				it( 'returns a correct val when given a function', () => {
					expect( mock.getChild( model => model.foo && model.foo === true ) ).to.be.equal( b2 );
				} );
			} );

			describe( 'recursive', () => {
				it( 'returns a correct val when given a function', () => {
					expect( mock.getChild( model => model.value === 'bom', true ) ).to.be.equal( nestedModel );
				} );
			} );
		} );

		describe( 'getChildren', () => {
			describe( 'regular', () => {
				it( 'gives correct result no criteria is given', () => {
					expect( mock.getChildren() ).to.be.eql( [ a, b, b2 ] );
				} );

				it( 'returns correct val when no children available', () => {
					expect( emptyMock.getChildren() ).to.be.eql( [] );
				} );

				it( 'returns a correct val with a given type', () => {
					expect( mock.getChildren( ModelB ) ).to.be.eql( [ b, b2 ] );
				} );

				it( 'returns a correct val when given a function', () => {
					expect( mock.getChildren( model => model.foo && model.foo === true ) ).to.be.eql( [ b2 ] );
				} );
			} );

			describe( 'recursive', () => {
				it( 'returns a correct val when given a function', () => {
					expect( mock.getChildren( model => model.value === 'bom', true ) ).to.be.eql( [ nestedModel ] );
				} );

				it( 'returns a correct val when given a class', () => {
					expect( mock.getChildren( ModelB, true ) ).to.be.eql( [ b, nestedModel, b2 ] );
				} );
			} );
		} );
	} );

} );
