const express = require('express');
const { body, validationResult } = require('express-validator');
const pool = require('../db/pool');

const formValidation = [
	body('message')
		.trim()
		.matches(/^[a-zA-Z0-9\s.,:;!?(){}[\]'"@#$%^&*+=_/\\-]*$/)
		.withMessage('Only text and punctuation allowed')
		.escape()
		.notEmpty()
		.withMessage('Message is required'),
	body('author')
		.trim()
		.matches(/^[a-zA-Z0-9\s.,:;!?(){}[\]'"@#$%^&*+=_/\\-]*$/)
		.withMessage('Only text and punctuation allowed')
		.escape()
		.notEmpty()
		.withMessage('Author is required'),
];

const router = express.Router();

router.get('/new', (req, res) => {
	if (req.query.errors) {
		try {
			const errors = JSON.parse(req.query.errors);
			const sanitized = errors.map((string) =>
				string.replace(/[^\w\s.,!?]/g, '')
			);
			res.render('new', { errors: sanitized });
		} catch (err) {
			console.error(err);
			res.redirect('/');
		}
	} else res.status(200).render('new');
});

router.post('/new', formValidation, async (req, res) => {
	const validationErrors = validationResult(req);
	if (validationErrors.isEmpty()) {
		const text = req.body.message.trim();
		const author = req.body.author.trim();

		try {
			await pool.query(
				'INSERT INTO messages (text, author) VALUES ($1, $2)',
				[text, author]
			);
			res.status(201).redirect('/');
		} catch (error) {
			console.error('Error inserting message: ', error.message);
			res.status(500).send('Internal server error');
		}
	} else {
		const errors = validationErrors.array().map((error) => error.msg);
		res.redirect(
			`/new?errors=${encodeURIComponent(JSON.stringify(errors))}`
		);
	}
});

module.exports = router;
