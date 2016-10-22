var mongoose = require('mongoose');
var Player = require('./model');

exports.search = search;
exports.create = create;
exports.read = read;
exports.update = update;
exports.destroy = destroy;

function search(req, res) {
	Player.findOne({userId:req.user.id.toString()}, function(err, player) {
		if (err) throw err;
		if (player) {
			req.data.player = player;
			return res.json(player);
		}

		Player({ userId	: req.user.id }).save(function(err, player) {
			if (err) throw err;
			req.data.player = player;
			res.json(player)
		})
	})
}

function create(req, res){
	// save the user
	Player.save(function(err, player) {
		if (err) throw err;
		req.data.player = player;
		res.json(player)
	});
}

function read(req, res) {
	Player.findById({ _id: req.params.id }, function(err, player) {
		req.data.player = player;
		res.json(player)
	})
}

function update(req, res){
	Player.findById({ _id: req.params.id }, function(err, player) {
		if (err) throw err;
		player.firstName = req.body.firstName;
		player.lastName = req.body.lastName;

		player.save(function(err) {
			req.data.player = player;
			req.flash('notice', 'successful updated player');
			res.json(player);
		})
	})
}

function destroy(req, res){
	Player.findById({ _id: req.params.id }, function(err, player) {
		if (err) throw err;
		player.remove(function(err) {
			req.flash('notice', 'successful deleted player');
		})
	})
}

