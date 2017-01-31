const Tokenizer = require( '../src/Tokenizer' );

describe( 'Tokenizer', () => {
	let mock = new Tokenizer();

	it( 'has correct RTF_NEW_LINE', () => {
		expect( Tokenizer.RTF_NEW_LINE ).to.be.equal( '\r\n' );
	} );

	describe( 'splitRegExp', () => {
		it( 'splits multiline string', () => {
			let str = 'foo bar\r\nbaz\r\n\r\nboom';

			expect( str.split( mock.splitRegExp ) ).to.be.eql( [ 'foo bar', 'baz', '', 'boom' ] );
		} );
	} );

	describe( 'process', () => {
		it( 'fires matched event', () => {
			let spy = sinon.spy();
			mock.on( 'matched', spy );
			mock.process( '{\\rtf1 foobar}' );

			expect( spy ).to.be.called;
		} );
	} );
} );
