var Game = require('./model');

var actionHandler = require('./action-handler');

exports.search  = search;
exports.create  = create;
exports.read    = read;
exports.update  = update;
exports.destroy = destroy;

function search(req, res) {
	Game.find({}, function(err, games) {
		if (err) throw err;
		if (games) {
			req.data.games = games;
			return res.json(games);
		}
	})
}

function read(req, res) {
	Game.findById({ _id: req.params.id }, function(err, game) {
		if (err) throw err;

		req.data.game = game;
		res.json(game)
	})
}

function create(req, res){

	var newGame = new Game({
		created		: Math.floor(Date.now() / 1000)
		, status	: 'OPEN'
		, ruleSet	: 'TWO_PLAYER'
		, name		: req.body.gameName
		, boardSize	: {rows: 7, cols: 7}
		, towers 	: [ { x: 0, y: 0, pieces: [] }, { x: 1, y: 0, pieces: [] }, { x: 2, y: 0, pieces: [] }, { x: 3, y: 0, pieces: [] }
			, { x: 4, y: 0, pieces: [] }, { x: 5, y: 0, pieces: [] }, { x: 6, y: 0, pieces: [] }, { x: 0, y: 1, pieces: [] }
			, { x: 1, y: 1, pieces: [] }, { x: 2, y: 1, pieces: [] }, { x: 3, y: 1, pieces: [] }, { x: 4, y: 1, pieces: [] }
			, { x: 5, y: 1, pieces: [] }, { x: 6, y: 1, pieces: [] }, { x: 0, y: 2, pieces: [] }, { x: 1, y: 2, pieces: [] }
			, { x: 2, y: 2, pieces: [] }, { x: 3, y: 2, pieces: [] }, { x: 4, y: 2, pieces: [] }, { x: 5, y: 2, pieces: [] }
			, { x: 6, y: 2, pieces: [] }, { x: 0, y: 3, pieces: [] }, { x: 1, y: 3, pieces: [] }, { x: 2, y: 3, pieces: [] }
			, { x: 3, y: 3, pieces: [] }, { x: 4, y: 3, pieces: [] }, { x: 5, y: 3, pieces: [] }, { x: 6, y: 3, pieces: [] }
			, { x: 0, y: 4, pieces: [] }, { x: 1, y: 4, pieces: [] }, { x: 2, y: 4, pieces: [] }, { x: 3, y: 4, pieces: [] }
			, { x: 4, y: 4, pieces: [] }, { x: 5, y: 4, pieces: [] }, { x: 6, y: 4, pieces: [] }, { x: 0, y: 5, pieces: [] }
			, { x: 1, y: 5, pieces: [] }, { x: 2, y: 5, pieces: [] }, { x: 3, y: 5, pieces: [] }, { x: 4, y: 5, pieces: [] }
			, { x: 5, y: 5, pieces: [] }, { x: 6, y: 5, pieces: [] }, { x: 0, y: 6, pieces: [] }, { x: 1, y: 6, pieces: [] }
			, { x: 2, y: 6, pieces: [] }, { x: 3, y: 6, pieces: [] }, { x: 4, y: 6, pieces: [] }, { x: 5, y: 6, pieces: [] }
			, { x: 6, y: 6, pieces: [] }]
	});
	// save the user
	newGame.save(function(err) {
		if (err) throw err;

		req.data.game = newGame;
		res.json(newGame);
	})
}

function destroy(req, res){
	Game.findById({ _id: req.params.id }, function(err, game) {
		if (err) throw err;

		game.remove(function(err) {
			if (err) throw err;
			req.flash('notice', 'successful deleted game');
		});
		res.sendStatus(200)
	})
}

function update(req, res){
	Game.findById({ _id: req.params.id }, function(err, game) {
		if (err) throw err;
		var action = req.body.action;
		var success = false;
		if(action) {
			try {
				actionHandler.process(game, action);
				success = true;
			} catch(err) {
				console.log(err);
				res.status(400).send('Error : ' + err);
			}
		}
		if(success) {
			game.save(function(err) {
				if (err) throw err;

				req.data.game = game;
				res.json(game);
			});
		}

	})
}

/*
function _initTowers() {
	var towers = [];
	for(var i = 0; i < 7; i++) {
		for(var j = 0; j < 7; j++) {
			towers.push({ x: i, y: j, pieces: [] })
		}
	}
}
*/