var mongoose = require('mongoose');

var schema = mongoose.Schema({
	firstName	: String
	, lastName	: String
	, age		: Number
	, wins		: Number
	, losses	: Number
	, userId	: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

schema.set('autoIndex', App.env === 'prod');

var Model = mongoose.model('Player', schema);

module.exports = Model;