function newRouter() {
	var controller  = require('./controller')
		, router    = App.framework.newRouter();

	// Routes
	router.route('/').get(controller.home);

	return router;
}

exports.newRouter = newRouter;
