/**
 * Created by clark on 1/21/16.
 */
//Configuration for Express Middleware Queue
global.App      = require('./global').gobalApp;
console.log('Global done')
//TODO Probably should have something better for the view path
var framework = App.framework = App.require('config/framework/express')
var templates = App.templates = App.require('templates')
var app       = App.app       = App.require('app')
var express   = App.express   = App.framework.init(/* viewPath */ 'app/navigation/views')
var database  = App.require('config/database')(App.db_url)
var appRouter = App.require('config/router');

console.log('server dependencies installed');

//short hand templates
var user        = templates.user
	, flash     = templates.flash
	, loggers   = templates.loggers;

//auth
user.config();

express.use(flash.middleware.setFlash);
express.use(user.start());
express.use(user.middleware.attachAuthDetails);

//express.all('/app/*', user.middleware.ensureAuthenticated);

//install context tracker
express.use(loggers.middleware.contextTracker);

//Install Auth User router
express.use('user', App.templates.user.router.newRouter());

//install app routers
express.use(appRouter(app));

//install context tracker
express.use(loggers.middleware.contextTracker);

//Dirty Tests
express.use('/test_flash', function(req, res){
	req.flash('notice', 'flash notice');
	res.redirect('/test_success')
})

express.use('/test_success', function(req, res){
	//res.send(JSON.stringify(req.flash));
	 res.send('success')
	//res.render('user/login-form.jade')
})
