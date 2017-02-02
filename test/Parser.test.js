const fsp = require( 'fs-promise' ),
	Parser = require( '../src/Parser' ),
	DocumentModel = require( '../src/rtf/model/Document' ),
	GroupModel = require( '../src/rtf/model/Group' );

describe( 'Parser', () => {
	let simpleFixturePath = path.join( __dirname, '_fixtures', 'rtfSimple.rtf' ),
		parserMock;

	beforeEach( () => {
		parserMock = new Parser();
	} );

	describe( 'parseString', () => {
		let readSimpleRtf = () => fsp.readFile( simpleFixturePath, {
			encoding: 'utf8'
		} );

		it( 'returns a promise', () => {
			return readSimpleRtf()
				.then( content => {
					expect( parserMock.parseString( content ) ).to.be.instanceof( Promise );
				} );
		} );

		it( 'resolves simple rtf', () => {
			return readSimpleRtf()
				.then( content => parserMock.parseString( content ) )
				.then( doc => {
					expect( doc ).to.be.instanceof( DocumentModel );
				} );
		} );

		it( 'emits contextChanged events', () => {
			let listener = sinon.spy();
			parserMock.on( 'contextChanged', listener );

			return fsp.readFile( path.join( __dirname, '_fixtures', 'rtfNested.rtf' ), {
					encoding: 'utf8'
				} )
				.then( content => parserMock.parseString( content ) )
				.then( doc => {
					expect( listener ).to.be.called;
					expect( listener ).to.be.calledWith( sinon.match.instanceOf( GroupModel ), sinon.match.instanceOf( GroupModel ) );
				} );
		} );

		it( 'does not fire contextChanged event if no change occurred', () => {
			let listener = sinon.spy();
			parserMock.on( 'contextChanged', listener );

			return parserMock.parseString( 'foobar' )
				.then( doc => {
					expect( listener ).not.to.be.called;
				} );
		} );
	} );

	it( 'returns a promise', () => {
		expect( parserMock.parseFile( simpleFixturePath ) ).to.be.instanceof( Promise );
	} );

	it( 'resolves simple rtf', () => {
		let parseStringSpy = sinon.spy( parserMock, 'parseString' );

		return parserMock.parseFile( simpleFixturePath )
			.then( doc => {
				expect( doc ).to.be.instanceof( DocumentModel );
				expect( parseStringSpy ).to.be.called;
				parseStringSpy.restore();
			} )
			.catch( err => {
				parseStringSpy.restore();
				throw err;
			 } );
	} );
} );
