function turn(game, action) {
	if(!action) {
		throw Error('No Action provided for Turn');
	} else if(!action.move) {
		throw Error('No Move provided for Turn');
	}

	var move = action.move;
	if(move.type === 'BUILD') {
		_build(game, move);
		_nextPlayer(game);
	} else if(move.type === 'PUSH') {
		_push(game, move);
		_nextPlayer(game);
	} else {
		throw Error('Unknown Move Type : ' + move.type);
	}
	_determineWinner(game);
	return game;
}

function _nextPlayer(game) {
	if(game.ruleSet === 'TWO_PLAYER') {
		if(game.currentColor === 'WHITE') {
			game.currentColor = 'BLACK'
		} else {
			game.currentColor = 'WHITE'
		}
	}
}

function _build(game, move) {
	for (var i = 0; i < game.towers.length; i++) {
		var tower = game.towers[i];
		if(tower.x === move.x && tower.y === move.y) {
			if(tower.pieces.length >= 5 ) {
				throw Error('Cannot Build on 5 tall tower - ' +
					'tower[' + move.x + ']['+ move.y +'] size :' + tower.pieces.length);
			} else if(tower.isFort === true) {
				throw Error('Cannot Build on forts  - ' +
					'tower[' + move.x + ']['+ move.y +'] isFort :' + tower.pieces.isFort);
			} else if(tower.pieces[tower.pieces.length -1].color === move.color) {
				tower.pieces.push({ color: move.color})
			} else if(tower.pieces[tower.pieces.length -1].color !== move.color) {
				throw Error('Player does not control tower[' + move.x + '][' + move.y + ']');
			} else {
				throw Error('Not Sure what went wrong');
			}
			break;
		}
	}
}

function _push(game, move) {
	for (var i = 0; i < game.towers.length; i++) {
		var tower = game.towers[i];
		if(tower.x == move.x && tower.y == move.y) {
			if(tower.pieces[tower.pieces.length -1].color === move.color) {
				// determine towers in push
				var pushTowers = [];
				for (var j = 0; j < game.towers.length; j++) {
					var pushTower = game.towers[j];
					switch(move.direction) {
						case 'UP':
							if(pushTower.x == move.x
								&& pushTower.y <= move.y
								&& pushTower.y > move.y - tower.pieces.length) {
								pushTowers.push(pushTower)
							}
							break;
						case 'DOWN':
							if(pushTower.x == move.x
								&& pushTower.y >= move.y
								&& pushTower.y < move.y + tower.pieces.length) {
								pushTowers.push(pushTower)
							}
							break;
						case 'LEFT':
							if(pushTower.y == move.y
								&& pushTower.x <= move.x
								&& pushTower.x > move.x - tower.pieces.length) {
								pushTowers.push(pushTower)
							}
							break;
						case 'RIGHT':
							if(pushTower.y == move.y
								&& pushTower.x >= move.x
								&& pushTower.x < move.x + tower.pieces.length) {
								pushTowers.push(pushTower)
							}
							break;
						default:
							throw Error('Unknown Direction : ' + move.direction)
					}
				}
				if(pushTowers.length === 1) {
					throw Error('Push Must Move pieces')
				}
				switch(move.direction) {
					case 'UP':
						//sorting up
						pushTowers.sort(function(a, b) {
							return b.y - a.y
						});
						break;
					case 'DOWN':
						//sorting down
						pushTowers.sort(function(a, b) {
							return a.y - b.y
						});
						break;
					case 'LEFT':
						//sorting left
						pushTowers.sort(function(a, b) {
							return b.x - a.x
						});
						break;
					case 'RIGHT':
						//sorting right
						pushTowers.sort(function(a, b) {
							return a.x - b.x
						});
						break;
					default:
						throw Error('Unknown Direction : ' + move.direction)
				}
				// move pieces from the selected tower onto push towers which are sorted
				// in order based on the direction of the push
				var selectedPieces = tower.pieces.slice();
				// Clear Pushed Tower's pieces - They will be put back based on
				// how many pieces need to be moved
				tower.pieces = [];


				for(var m = 0; selectedPieces.length > 0; m++) {
					var currentTower = pushTowers[m];

					var nextTower = pushTowers[m + 1];
					var numberOfBlockedPieces = 1;
					if(!nextTower) {
						numberOfBlockedPieces = selectedPieces.length
					} else if(nextTower.pieces.length > currentTower.pieces.length ) {
						numberOfBlockedPieces = nextTower.pieces.length - currentTower.pieces.length
					}
					//move pieces
					var blockedPieces = selectedPieces.slice(0, numberOfBlockedPieces);
					currentTower.pieces = currentTower.pieces.concat(blockedPieces);
					selectedPieces =
						selectedPieces.slice(numberOfBlockedPieces, selectedPieces.length);
				}
			} else {
				throw Error('Player does not control tower[' + move.x + ']['+ move.y +']');
			}
		}
	}
}

function _determineWinner(game){
	var whiteForts = 0
		, blackForts = 0
		, whiteCrowns = 0
		, blackCrowns = 0;

	//add up fort control
	for(var x = 0; x < game.towers.length; x++) {
		var tower = game.towers[x];
		var topPiece = tower.pieces[tower.pieces.length - 1];
		if(tower.isFort) {
			if(topPiece.color == 'WHITE') {
				whiteForts++;
				if(tower.pieces.size == 5) {
					whiteCrowns++;
				}
			} else if(topPiece.color == 'BLACK') {
				blackForts++;
				if(tower.pieces.size == 5) {
					blackCrowns++;
				}
			}
		}
	}

	if(whiteCrowns >= 3 || whiteForts >= 4) {
		game.winningColor = 'WHITE'
	} else if(blackCrowns >= 3 || blackForts >= 4) {
		game.winningColor = 'BLACK'
	}
	if(game.winningColor) {
		game.status = 'COMPLETED'
	}
}
module.exports = turn;