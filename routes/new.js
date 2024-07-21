const express = require('express');
const { messages } = require('./index');
const { body, validationResult } = require('express-validator');

const validationRules = [
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
		const errors = JSON.parse(req.query.errors);
		res.render('new', { errors });
	} else res.status(200).render('new');
});

router.post('/new', validationRules, (req, res) => {
	const validationErrors = validationResult(req);
	if (validationErrors.isEmpty()) {
		const newMessage = {
			text: req.body.message,
			user: req.body.author,
			added: new Date(),
		};

		messages.push(newMessage);
		res.status(201).redirect('/');
	} else {
		const errors = validationErrors.array().map((error) => error.msg);
		res.redirect(
			`/new?errors=${encodeURIComponent(JSON.stringify(errors))}`
		);
	}
});

module.exports = router;
