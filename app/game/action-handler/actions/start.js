function start(game) {
	if(game.status !== 'OPEN') {
		throw Error('Cannot Start Game when status is not OPEN got : ' + game.status )
	} else {
		game.status = 'IN_PROGRESS';
		game.currentColor = 'WHITE';
		for(var i = 0; i < game.towers.length; i++) {
			var tower = game.towers[i];
			if(tower.x == 1 && tower.y == 0) {
				tower.pieces.push({ color: 'WHITE'});
				tower.pieces.push({ color: 'WHITE'});
			} else if(tower.x == 0 && tower.y == 1) {
				tower.pieces.push({ color: 'WHITE'});
				tower.pieces.push({ color: 'WHITE'});
			} else if(tower.x == 6 && tower.y == 1) {
				tower.pieces.push({ color: 'BLACK'});
				tower.pieces.push({ color: 'BLACK'});
			} else if(tower.x == 5 && tower.y == 0) {
				tower.pieces.push({ color: 'BLACK'});
				tower.pieces.push({ color: 'BLACK'});
			} else if(tower.x == 0 && tower.y == 5) {
				tower.pieces.push({ color: 'BLACK'});
				tower.pieces.push({ color: 'BLACK'});
			} else if(tower.x == 6 && tower.y == 5) {
				tower.pieces.push({ color: 'WHITE'});
				tower.pieces.push({ color: 'WHITE'});
			} else if(tower.x == 1 && tower.y == 6) {
				tower.pieces.push({ color: 'BLACK'});
				tower.pieces.push({ color: 'BLACK'});
			} else if(tower.x == 5 && tower.y == 6) {
				tower.pieces.push({ color: 'WHITE'});
				tower.pieces.push({ color: 'WHITE'});
			} else if(tower.x == 3 && tower.y == 1) {
				tower.isFort = true;
				tower.pieces.push({ color: 'GREEN'});
			} else if(tower.x == 3 && tower.y == 3) {
				tower.isFort = true;
				tower.pieces.push({ color: 'GREEN'});
			} else if(tower.x == 3 && tower.y == 5) {
				tower.isFort = true;
				tower.pieces.push({ color: 'GREEN'});
			} else if(tower.x == 1 && tower.y == 3) {
				tower.isFort = true;
				tower.pieces.push({ color: 'GREEN'});
			} else if(tower.x == 5 && tower.y == 3) {
				tower.isFort = true;
				tower.pieces.push({ color: 'GREEN'});
			}
		}
	}
	return game;
}

module.exports = start;