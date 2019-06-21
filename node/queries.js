const { Pool } = require('pg')
const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})

const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT
})

module.exports = pool