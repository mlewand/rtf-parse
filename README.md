# rtf-parse

> A simplified RTF parser.

## Installation

```sh
$ npm install --save rtf-parse
```

## Usage examples

```javascript
const rtfParse = require( 'rtf-parse' );

rtfParse.parseString( '{\\rtf1 foobar}' )
	.then( doc => {
		// Do anything you like with rtf.model.Document instance of your document.
	} );
```

```javascript
const rtfParse = require( 'rtf-parse' ),
	path = require( 'path' ),
	fsp = require( 'fs-promise' );

fsp.readFile( path.join( '_fixtures', 'rtfSimple.rtf' ), {
		encoding: 'utf-8'
	} )
	.then( content => parserMock.parseString( content ) )
	.then( doc => {
		// Do anything you like with rtf.model.Document instance of your document.
		return doc;
	} )
```

You can find more usage examples in [examples](examples) directory.

Also you could also browse tests to see how the API is used.

## License

MIT © Marek Lewandowski
