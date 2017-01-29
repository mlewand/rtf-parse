const fsp = require( 'fs-promise' ),
	Parser = require( '../src/Parser' ),
	Document = require( '../src/rtf/Document' );

describe( 'Parser', () => {
	let parserMock = new Parser();

	describe( 'parseString', () => {
		it( 'returns a promise', () => {
			return fsp.readFile( path.join( __dirname, '_fixtures', 'rtfSimple.rtf' ), {
					encoding: 'utf8'
				} )
				.then( content => {
					expect( parserMock.parseString( content ) ).to.be.instanceof( Promise );
				} );
		} );

		it( 'resolves simple rtf', () => {
			return fsp.readFile( path.join( __dirname, '_fixtures', 'rtfSimple.rtf' ), {
					encoding: 'utf8'
				} )
				.then( content => parserMock.parseString( content ) )
				.then( doc => {
					//expect( doc ).to.be.instanceof( Document );
				} );
		} );

	} );

} );
