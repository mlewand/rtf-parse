const rtfParse = require( '../src/index' ),
	Parser = require( '../src/Parser' );

describe( 'rtfParse', () => {
	it( 'exposes a proper type', () => {
		expect( rtfParse ).to.be.instanceof( Parser );
	} );

	it( 'exposes model types', () => {
		expect( rtfParse.model.Document ).to.be.instanceOf( Function );
		expect( rtfParse.model.Command ).to.be.instanceOf( Function );
	} );
} );
