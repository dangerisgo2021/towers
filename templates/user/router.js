var passport = require('passport');

function newRouter() {
	var controller  = require('./controller')
		, router    = App.framework.newRouter();

	// Routes
	router.route('/')
		.get(controller.users);

	router.route('/register')
		.post(controller.register);

	router.route('/login')
		.post(passport.authenticate('local'), controller.login);

	router.route('/logout')
		.get(controller.logout);

	return router;
}

exports.newRouter = newRouter;