const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.POSTGRESQL_CONNECTION_URI,
});

router.get('/', async (req, res) => {
	const messagesRaw = await pool.query('SELECT * FROM messages');
	const messages = messagesRaw.rows;
	res.status(200).render('index', { title: 'Messages', messages });
});

module.exports = {
	router,
};
