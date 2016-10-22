function newRouter() {
	var controller  = require('./controller')
		, router    = App.framework.newRouter();

	router.route('/')
		.get(controller.search)
		.post(controller.create);

	router.route('/:id')
		.get(controller.read)
		.put(controller.update)
		.delete(controller.destroy);

	return router;
}

exports.newRouter = newRouter;