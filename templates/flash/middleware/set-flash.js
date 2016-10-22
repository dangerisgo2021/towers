/**
 * Created by clark on 1/21/16.
 */
function setFlash(req, res, next) {
	res.locals.flash = {
		notice: req.flash('notice')
		, error: req.flash('error')
	};

	next();
}

module.exports = setFlash;