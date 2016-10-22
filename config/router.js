var middlewareEdgeLogger = App.templates.loggers.middlewareEdgeLogger;

var APP = '/app';

function configAppRouter(app) {
	var gameRouter = app.game.router.newRouter()
		, navRouter = app.navigation.router.newRouter()
		, profileRouter = app.profile.router.newRouter();

	appRouter = App.framework.newRouter();

	//Homepage Navigation
	appRouter.use('/', navRouter);

	//App
	appRouter.use(APP + '/player', profileRouter);
	appRouter.use(APP + '/game', gameRouter);


	console.log('routers installed');
	return appRouter;
}

module.exports = configAppRouter;