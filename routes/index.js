const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Quote = require('../models/Quote');

// @desc login/landing page
// @route GET/

router.get('/', ensureGuest, (req, res) => {
	res.render('login', {
		layout: 'login',
	});
});

// @desc Dashboard
// @route GET/dashboard

router.get('/dashboard', ensureAuth, async (req, res) => {
	try {
		const quotes = await Quote.find({ user: req.user.id }).lean();

		res.render('dashboard', {
			name: req.user.firstName,
		});
	} catch (error) {
		console.error(error);
		res.render('error/500');
	}
});

module.exports = router;
