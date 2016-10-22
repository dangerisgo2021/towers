function contextTracker(req, res, next) {

	req.data = {
		context: {
			start: Date.now()
			, user: req.user
			, path: req.path
			, baseUrl: req.baseUrl
			, body: req.body
			, method: req.method
			, params : req.params
		}
	};
	console.log('req.data', req.data);
	next();
}

module.exports = contextTracker;