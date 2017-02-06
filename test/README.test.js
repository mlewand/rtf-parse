const rtfParse = require( '../src' ),
	Document = require( '../src/rtf/model/Document' ),
	path = require( 'path' ),
	fsp = require( 'fs-promise' );

describe( 'README.md examples', () => {
	describe( 'parseFile example', () => {
		fsp.readFile( path.join( '_fixtures', 'rtfSimple.rtf' ), {
				encoding: 'utf-8'
			} )
			.then( content => parserMock.parseString( content ) )
			.then( doc => {
				// Do anything you like with rtf.model.Document instance of your document.
				return doc;
			} )
			.then( doc => expect( doc ).to.be.instanceOf( Document ) );
	} );


	describe( 'parseString example', () => {
		return rtfParse.parseString( '{\\rtf1 foobar}' )
			.then( doc => {
				// Do anything you like with rtf.model.Document instance of your document.
				return doc;
			} )
			.then( doc => expect( doc ).to.be.instanceOf( Document ) );
	} );

} );
