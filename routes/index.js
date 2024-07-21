const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.get('/', async (req, res) => {
	const messagesRaw = await pool.query(
		'SELECT * FROM messages ORDER BY created_at DESC'
	);
	const messages = messagesRaw.rows;
	res.status(200).render('index', { title: 'Messages', messages });
});

module.exports = {
	router,
};
