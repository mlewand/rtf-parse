const fsp = require( 'fs-promise' ),
	Parser = require( '../src/Parser' ),
	DocumentModel = require( '../src/rtf/model/Document' ),
	TextModel = require( '../src/rtf/model/Text' ),
	CommandModel = require( '../src/rtf/model/Command' ),
	GroupModel = require( '../src/rtf/model/Group' );

describe( 'Parser integration', () => {
	let parserMock = new Parser();

	it( 'parses a very simple string', () => {
		return parserMock.parseString( '{\\rtf1 foobar\r\n{abcd}{ef}}' )
			.then( doc => {
				let docChildren = doc.children;
				expect( docChildren.length, 'docChildren length' ).to.be.equal( 1 );
				expect( docChildren[ 0 ], 'docChildren first child' ).to.be.instanceOf( GroupModel );

				// Ensure that there's also a nested group.
				let grandChildren = doc.children[ 0 ].children;
				expect( grandChildren.length, 'grandChildren length' ).to.be.equal( 4 );
				expect( grandChildren[ 0 ], 'grandChildren first child' ).to.be.instanceOf( CommandModel );
				expect( grandChildren[ 0 ].value, 'grandChildren first child value' ).to.be.equal( '\\rtf1 ' );
				expect( grandChildren[ 1 ], 'grandChildren first child' ).to.be.instanceOf( TextModel );
				expect( grandChildren[ 1 ].value, 'grandChildren first child value' ).to.be.equal( 'foobar' );
				expect( grandChildren[ 2 ], 'grandChildren second child' ).to.be.instanceOf( GroupModel );
				expect( grandChildren[ 3 ], 'grandChildren third child' ).to.be.instanceOf( GroupModel );

				// Check one of nested groups.
				let nestedGroup = grandChildren[ 2 ].children;
				expect( nestedGroup.length, 'nestedGroup length' ).to.be.equal( 1 );
			} );
	} );

	it( 'merges subsequent text entries', () => {
		return parserMock.parseString( '{two \r\n lines}' )
			.then( doc => {
				let group = doc.children[ 0 ];
				expect( group.children.length ).to.be.equal( 1 );
				expect( group.children[ 0 ] ).to.be.instanceOf( TextModel );
				expect( group.children[ 0 ].value ).to.be.equal( 'two  lines' );
			} );
	} );


	describe( 'pictures', () => {
		const PictureModel = require( '../src/rtf/model/command/Picture' );

		it( 'find images', () => {
			return fsp.readFile( path.join( __dirname, '_fixtures', 'extractedPngPicture.rtf' ), {
					encoding: 'utf-8'
				} )
				.then( content => parserMock.parseString( content ) )
				.then( doc => {
					expect( doc.getChild( PictureModel, true ) ).to.be.an.instanceOf( PictureModel );
				} );
		} );

		it( 'doesnt show images in nonshppict', () => {
			return fsp.readFile( path.join( __dirname, '_fixtures', 'extractedNonshppict.rtf' ), {
					encoding: 'utf-8'
				} )
				.then( content => parserMock.parseString( content ) )
				.then( doc => {
					expect( doc.getChild( PictureModel, true ) ).to.be.null;
				} );
		} );
	} );
} );
