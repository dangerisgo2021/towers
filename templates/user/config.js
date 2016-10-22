function config() {
	var passport = require('passport')
		, LocalStrategy = require('passport-local').Strategy;
	// user config
	var User = require('./model');
	passport.use(new LocalStrategy(User.authenticate()));
	passport.serializeUser(User.serializeUser());
	passport.deserializeUser(User.deserializeUser());
}

module.exports = config;