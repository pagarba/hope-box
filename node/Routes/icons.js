const pool = require('../queries')

const fetch_icon = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM icons');
        console.log(result.rows)
    } catch (err) {
        res.send(err)
    }
}

module.exports = {
    fetch_icon
}