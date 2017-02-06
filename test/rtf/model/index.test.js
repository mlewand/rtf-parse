const models = require( '../../../src/rtf/model' );

describe( 'model.index', () => {

	it( 'exposes Mode types', () => {
		expect( models ).to.be.an( 'object' );
		expect( models.Document ).to.be.instanceOf( Function );
		expect( models.Command ).to.be.instanceOf( Function );
		expect( models.Group ).to.be.instanceOf( Function );
		expect( models.command.Picture ).to.be.instanceOf( Function );
	} );
} );
