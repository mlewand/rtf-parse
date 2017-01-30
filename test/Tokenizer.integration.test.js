const Tokenizer = require( '../src/Tokenizer' ),
	GroupToken = require( '../src/rtf/Group' ),
	GroupEndToken = require( '../src/rtf/GroupEnd' ),
	TextToken = require( '../src/rtf/Text' );

describe( 'Tokenizer', () => {
	let mock;

	beforeEach( () => {
		mock = new Tokenizer();
	} );

	describe( 'process', () => {
		it( 'works with simple single-line markup', () => {
			mock.process( '{\\rtf1 foobar}' );

			let ret = mock._results;
			expect( ret.length ).to.be.equal( 3 );
			expect( ret[ 0 ], 'ret[ 0 ]' ).to.be.instanceof( GroupToken );
			expect( ret[ 1 ], 'ret[ 1 ]' ).to.be.instanceof( TextToken );
			expect( ret[ 2 ], 'ret[ 2 ]' ).to.be.instanceof( GroupEndToken );
		} );

		it( 'works with multiline markup', () => {
			mock.process( '{\\rtf1 foobar\r\n{abcd}}' );

			let ret = mock._results;
			expect( ret.length ).to.be.equal( 6 );
			expect( ret[ 0 ], 'ret[ 0 ]' ).to.be.instanceof( GroupToken );
			expect( ret[ 1 ], 'ret[ 1 ]' ).to.be.instanceof( TextToken );
			expect( ret[ 1 ].value, 'ret[ 1 ] value' ).to.be.equal( '\\rtf1 foobar' );
			expect( ret[ 2 ], 'ret[ 2 ]' ).to.be.instanceof( GroupToken );
			expect( ret[ 3 ], 'ret[ 3 ]' ).to.be.instanceof( TextToken );
			expect( ret[ 3 ].value, 'ret[ 3 ] value' ).to.be.equal( 'abcd' );
			expect( ret[ 4 ], 'ret[ 4 ]' ).to.be.instanceof( GroupEndToken );
			expect( ret[ 5 ], 'ret[ 5 ]' ).to.be.instanceof( GroupEndToken );
		} );
	} );
} );
