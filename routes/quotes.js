const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Quote = require('../models/Quote');

// @desc Show add page
// @route GET /quotes/add

router.get('/add', ensureGuest, (req, res) => {
	res.render('/quotes/add');
});

module.exports = router;
