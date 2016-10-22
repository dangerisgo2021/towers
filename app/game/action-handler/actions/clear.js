
function clear(game) {
	console.log(game);
	game.towers = [
		{ x: 0, y: 0, pieces: [] }, { x: 1, y: 0, pieces: [] }, { x: 2, y: 0, pieces: [] }, { x: 3, y: 0, pieces: [] }
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
		, { x: 6, y: 6, pieces: [] }];
	game.status = 'OPEN';
	game.winningColor = "";
	return game;
}

module.exports = clear;