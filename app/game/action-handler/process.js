function gameActionProcessor(game, action) {
	console.log("Game Action : ", action);
	switch(action.type) {
		case 'clear':
			this.actions.clear(game);
			break;
		case 'start':
			this.actions.start(game);
			break;
		case 'turn':
			this.actions.turn(game, action);
			break;
		default:
			throw new Error('Unknown Action Type got : ' + action.type);
	}
	return game;
}

module.exports = gameActionProcessor;