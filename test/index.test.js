const rtfParse = require( '../src/index' ),
	Parser = require( '../src/Parser' );

describe( 'rtfParse', () => {
	it( 'exposes a proper type', () => {
		expect( rtfParse ).to.be.instanceof( Parser );
	} );

} );
