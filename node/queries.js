const { Pool } = require('pg')

const pool = new Pool({
    user: 'andrewchoi',
    host: 'localhost',
    database: 'data',
    port: 5432
})

module.exports = pool