function startLog(req, res, next) {
	console.log('<----------Edge Start Req-------------------->');
	console.log('req.data', req.data);
	console.log('<----------Edge Start Log Completed---------->');
	next()
}

module.exports = startLog;