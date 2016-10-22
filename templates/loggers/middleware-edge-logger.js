var loggerMiddleware = require('./middleware');

function MiddlewareEdgeLogger(middleware) {
	return [loggerMiddleware.startLog
			, middleware
			, loggerMiddleware.endLog]
}

module.exports = MiddlewareEdgeLogger;