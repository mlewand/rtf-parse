const Picture = require( '../../../../src/rtf/model/command/Picture' ),
	Group = require( '../../../../src/rtf/model/Group' ),
	Text = require( '../../../../src/rtf/model/Text' );

const SAMPLE_IMAGE = '0100090000036e00000000004500000000000400000003010800050000000b0200000000050000000c0203000' +
	'300030000001e000400000007010400040000000701040045000000410b2000cc00020002000000000002000200000000002800000' +
	'002000000020000000100040000000000000000000000000000000000000000000000000000000000ffffff000000ff00ff0000000' +
	'0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000031010000020' +
	'2ffff040000002701ffff030000000000';

describe( 'Picture', () => {
	let parentGroup = new Group(),
		mock = new Picture(),
		text = new Text();

	parentGroup.append( mock );

	// Set the "stringified blob" of an image.
	text.value = SAMPLE_IMAGE;
	parentGroup.append( text );

	describe( 'getType', () => {
		it( 'returns correct type', () => {
			expect( mock.getType() ).to.be.a( 'string' );
		} );
	} );


	describe( 'getPicture', () => {
		it( 'works', () => {
			let imageBytes = mock.getPicture();

			expect( imageBytes[ 0 ], 'byte at 0 offset' ).to.be.eql( 1 );
			expect( imageBytes[ 1 ], 'byte at 1 offset' ).to.be.eql( 0 );
		} );

	} );

	describe( '_getImageText', () => {
		it( 'works', () => {
			expect( mock._getImageText() ).to.be.equal( SAMPLE_IMAGE );
		} );
	} );
} );
