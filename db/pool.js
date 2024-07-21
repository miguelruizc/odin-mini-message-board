const { Pool } = require('pg');

const pool = new Pool({
	connectionString: process.env.POSTGRESQL_CONNECTION_URI,
});

module.exports = pool;
