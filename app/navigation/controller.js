exports.home = home;

function home(req,res) {
	res.render('home', { title: 'Towers' })
}


