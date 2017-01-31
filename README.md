# rtf-parse

> A simplified RTF parser.

## Installation

```sh
$ npm install --save rtf-parse
```

## Usage

```js
const rtfParse = require( 'rtf-parse' );

rtfParse.fromString( '{\rtf1 foobar}' )
	.then( doc => {
		console.log( 'RTF was parsed!' );
	} );
```
## License

MIT © [Marek Lewandowski]()


[npm-image]: https://badge.fury.io/js/rtf-parse.svg
[npm-url]: https://npmjs.org/package/rtf-parse
[travis-image]: https://travis-ci.org/mlewand/rtf-parse.svg?branch=master
[travis-url]: https://travis-ci.org/mlewand/rtf-parse
[daviddm-image]: https://david-dm.org/mlewand/rtf-parse.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mlewand/rtf-parse
[coveralls-image]: https://coveralls.io/repos/mlewand/rtf-parse/badge.svg
[coveralls-url]: https://coveralls.io/r/mlewand/rtf-parse
