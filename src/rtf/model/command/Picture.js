( function() {
	'use strict';

	const Command = require( '../Command' );

	class Picture extends Command {
		getPicture() {
			var input = this._getImageText(),
				inputLen = input.length,
				buffer = Buffer.alloc( inputLen / 2 );

			for ( var i = 0; i < inputLen; i += 2 ) {
				buffer.writeUInt8(
					parseInt( input.substr( i, 2 ), 16 ),
					i ? ( i / 2 ) : 0
				);
			}

			return buffer;
		}

		/**
		 * @returns {String} Mime type of the image, e.g. `image/png`.
		 * @memberOf Picture
		 */
		getType() {
			return 'image/bmp';
		}

		_getImageText() {
			return SAMPLE_IMAGE;
		}
	}

	const SAMPLE_IMAGE = '0100090000036e00000000004500000000000400000003010800050000000b0200000000050000000c0203000' +
		'300030000001e000400000007010400040000000701040045000000410b2000cc00020002000000000002000200000000002800000' +
		'002000000020000000100040000000000000000000000000000000000000000000000000000000000ffffff000000ff00ff0000000' +
		'0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000031010000020' +
		'2ffff040000002701ffff030000000000';

	module.exports = Picture;
} )();
