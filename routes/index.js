const express = require('express');

const messages = [
	{
		text: 'Hi there!',
		user: 'Amando',
		added: new Date(),
	},
	{
		text: 'Hello World!',
		user: 'Charles',
		added: new Date(),
	},
];

const router = express.Router();

router.get('/', (req, res) => {
	res.status(200).render('index', { title: 'Messages', messages });
});

module.exports = {
	router,
	messages,
};
