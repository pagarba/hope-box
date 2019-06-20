const { Pool } = require('pg')
const path = require('path')
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
})

module.exports = pool