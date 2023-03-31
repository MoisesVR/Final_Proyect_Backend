const { Pool } = require("pg");
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.HOST,
    password: process.env.PASS,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    allowExitOnIdle: true,
    ssl: { rejectUnauthorized: false}
});
/* port: 5432, */
module.exports = { pool }