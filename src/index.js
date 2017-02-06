'use strict';

const Parser = require( './Parser' );

module.exports = new Parser();

module.exports.model = {
	command: {
		Picture: require( './rtf/model/command/Picture' )
	},
	Command: require( './rtf/model/Command' )
};
