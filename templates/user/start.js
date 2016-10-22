/**
 * Created by clark on 1/21/16.
 */
function start() {
	var passport = require('passport');
	return [passport.initialize(),  passport.session()]
}

module.exports = start;