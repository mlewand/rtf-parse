# rtf-parse

[![Build status](https://ci.appveyor.com/api/projects/status/7xq8eq2lil4g2t8j?svg=true&passingText=master%20%E2%9C%93)](https://ci.appveyor.com/project/mlewand/rtf-parse) [![Build Status](https://travis-ci.org/mlewand/rtf-parse.svg?branch=master)](https://travis-ci.org/mlewand/rtf-parse)

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
const rtfParse = require( 'rtf-parse' );

rtfParse.parseString( '{\\rtf1 foobar}' )
	.then( doc => {
		// Do anything you like with rtf.model.Document instance of your document.
	} );
```

You can find more usage examples in [examples](examples) directory.

Also you could also browse tests to see how the API is used.

## License

MIT © Marek Lewandowski
