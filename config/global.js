var env             = process.env.NODE_ENV || 'dev'
	, packageJson   = require('../package.json')
    , path          = require('path') // node core package

exports.gobalApp = {
     port: process.env.PORT || 3000
	, env: env
    , version: packageJson.version
    , name: packageJson.name
    , root: path.join(__dirname, '..')
    , db_url: process.env.DATABASE_URL || 'mongodb://localhost/' + packageJson.name + '-' + env
	, start: function() {
		if (!this.started) {
			//this is global
			this.started = true
			this.express.listen(this.port)
			console.log('Running App Version ' + App.version
				+ " on port " + App.port
				+ ' in ' + App.env + ' mode')
			console.log('http://localhost:' + App.port)
		}
	}
    // make path relative to server path
    , appPath: function(path) {
        return this.root + '/' + path
    }
    // require relavtive to server path
    , require: function(path) {
        return require(this.appPath(path))
    }
}