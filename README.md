# rtf-parse

[![GitHub version](https://badge.fury.io/gh/mlewand%2Frtf-parse.svg)](https://badge.fury.io/gh/mlewand%2Frtf-parse)
[![Build status](https://ci.appveyor.com/api/projects/status/7xq8eq2lil4g2t8j?svg=true&passingText=master%20%E2%9C%93)](https://ci.appveyor.com/project/mlewand/rtf-parse)
[![Build Status](https://travis-ci.org/mlewand/rtf-parse.svg?branch=master)](https://travis-ci.org/mlewand/rtf-parse)
[![codecov](https://codecov.io/gh/mlewand/rtf-parse/branch/master/graph/badge.svg)](https://codecov.io/gh/mlewand/rtf-parse)
[![Dependency Status](https://david-dm.org/mlewand/rtf-parse/status.svg)](https://david-dm.org/mlewand/rtf-parse)
[![GitHub issues](https://img.shields.io/github/issues/mlewand/rtf-parse.svg)](https://github.com/mlewand/rtf-parse/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/mlewand/rtf-parse.svg)](https://github.com/mlewand/rtf-parse/issues)

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

## Contribute

This is fully open source pet project, if you feel you're in a mood for a pull request, you're more than welcome to do so!

### Getting In Touch

You can always ping me at Twitter [@m_lewand](https://twitter.com/m_lewand).

## License

MIT © Marek Lewandowski
