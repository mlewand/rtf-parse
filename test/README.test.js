const rtfParse = require( '../src' ),
	Document = require( '../src/rtf/model/Document' ),
	path = require( 'path' );

describe( 'README.md examples', () => {
	describe( 'parseFile example', () => {
		rtfParse.parseFile( path.join( '_fixtures', 'rtfSimple.rtf' ) )
			.then( doc => {
				// Do anything you like with rtf.model.Document instance of your document.
				return doc;
			} )
			.then( doc => expect( doc ).to.be.instanceOf( Document ) );
	} );


	describe( 'parseString example', () => {
		return rtfParse.parseString( '{\rtf1 foobar}' )
			.then( doc => {
				// Do anything you like with rtf.model.Document instance of your document.
				return doc;
			} )
			.then( doc => expect( doc ).to.be.instanceOf( Document ) );
	} );

} );
