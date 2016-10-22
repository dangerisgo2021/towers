function endLog(req, res, next) {
	console.log('<----------Edge End Req-------------------->');
	console.log('req.data', req.data);
	console.log('<----------Edge End Log Completed---------->');
	next()
}

module.exports = endLog;