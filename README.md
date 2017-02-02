# rtf-parse

> A simplified RTF parser.

## Installation

```sh
$ npm install --save rtf-parse
```

## Usage examples

```javascript
const rtfParse = require( 'rtf-parse' ),
	path = require( 'path' );

rtfParse.parseFile( path.join( '_fixtures', 'rtfSimple.rtf' ) )
	.then( doc => {
		// Do anything you like with rtf.model.Document instance of your document.
	} );
```

```javascript
const rtfParse = require( 'rtf-parse' ),
	path = require( 'path' );

rtfParse.parseString( '{\rtf1 foobar}' )
	.then( doc => {
		// Do anything you like with rtf.model.Document instance of your document.
	} );
```

## License

MIT © Marek Lewandowski
