const Model = require( '../../../src/rtf/model/Model' );

describe( 'Model', () => {
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
		it( 'appends a child', () => {
			let child1 = {
					foo: 1
				},
				child2 = {
					bar: 'a'
				};

			mock.append( child1 );
			mock.append( child2 );

			expect( mock.children ).to.be.eql( [ child1, child2 ] );
		} );
	} );

	describe( 'setParent', () => {
		it( 'changes the parent', () => {
			mock._parent = 1;

			mock.setParent( 2 );

			expect( mock._parent ).to.be.equal( 2 );
		} );
	} );
} );
