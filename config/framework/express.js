/**
 * Created by clark on 1/21/16.
 */
var bodyParser      = require('body-parser')
    , cookieParser  = require('cookie-parser')
	, express       = require('express')
    , logger        = require('morgan')
    , connectFlash  = require('connect-flash')
    , session       = require('express-session');

var sessionStarted = false;
var _app = {};

exports.app = _app;
exports.newRouter = express.Router;

exports.init = function(viewPath){
	_app = express();
	_app.locals.pretty = true;
	_app.use(express.static(App.appPath('public')));
	setJadeView(viewPath);
	useLoggers();
	useParsers();
	useSession();
	useFlash();

	return _app;
};

function setJadeView(viewPath){
	// Config Jade for view engine
	if(!viewPath) {
		throw new Error('Path for views not set');
	}

	_app.set('views', App.appPath(viewPath));
	_app.set('view engine', 'jade');
	_app.set('view options', { pretty: App.env === 'dev' });
	_app.locals.pretty = true;
}

function useLoggers(){
	_app.use(logger('dev'));
	_app.use(require("express-chrome-logger"));
}

function useParsers(){
	_app.use(bodyParser.json());
	_app.use(bodyParser.urlencoded({ extended: false }));
	_app.use(cookieParser());
}

function useSession(){
	sessionStarted = true;
	_app.use(session({ secret: 'game secret', resave: false, saveUninitialized: false}));
}

function useFlash(){
	//Flash goes after sessions
	if(sessionStarted) {
		_app.use(connectFlash());
	} else {
		console.log('skipping express flash because session has not started');
	}
}