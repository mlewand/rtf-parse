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
} );
