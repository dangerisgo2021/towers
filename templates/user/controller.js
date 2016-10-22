var passport = require('passport');

var User = require('./model');

exports.users = users;
exports.register = register;
exports.logout = logout;
exports.login = login;

function users(req, res){
	User.find({}, function(err, users) {
		if (err) throw err;
		res.json(users);
	})
}

function register(req, res, next){
	User.register(new User({ username : req.body.username }), req.body.password,
		function(err, user) {
			if (err) {
				res.status(422).send('Problem: ' + err.message);
			}

			passport.authenticate('local')(req, res, function () {
				if (err) { return next(err) }
				req.data.user = user;
			});
		});
}

function login(req, res){
	res.status(200).redirect('/');
}

function logout(req, res){
	req.logout();
}

