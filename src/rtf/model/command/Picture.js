( function() {
	'use strict';

	const Command = require( '../Command' ),
		Text = require( '../Text' );

	class Picture extends Command {
		/**
		 * Returns a buffer containing the image.
		 *
		 * @returns {Buffer}
		 * @memberOf Picture
		 */
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
			return this.getParent().getChild( Text ).value;
		}
	}

	module.exports = Picture;
} )();
