const pool = require('./queries')


const fetch_data = async (req, res) => {
    const result = await pool.query('SELECT * FROM data');
    res.send(result.rows)
}

module.exports = {
    fetch_data
}