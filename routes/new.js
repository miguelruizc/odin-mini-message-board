const express = require('express');
const { messages } = require('./index');

const router = express.Router();

router.get('/new', (req, res) => {
	res.status(200).render('new');
});

router.post('/new', (req, res) => {
	const newMessage = {
		text: req.body.message,
		user: req.body.author,
		added: new Date(),
	};

	messages.push(newMessage);
	res.status(201).redirect('/');
});

module.exports = router;
