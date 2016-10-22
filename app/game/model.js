var mongoose = require('mongoose');

var schema = mongoose.Schema({
	boardSize       : { rows: Number, cols: Number}
	, status		: { type: String, enum: ['OPEN', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED'] }
	, ruleSet       : { type: String, enum: ['TWO_PLAYER', 'FOUR_PLAYER'] }
	, name			: String
	, currentColor  : String
	, winningColor  : String
	, towers		: [ { x             : Number
						, y             : Number
						, controlColor  : String
						, isFort        : Boolean
						, pieces        : [{ color: String }]
						, display       : String
						}]
});

schema.set('autoIndex', App.env === 'prod');

var Model = mongoose.model('Game', schema);

module.exports = Model;