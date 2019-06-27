const pool = require('../queries')

const fetch_icon = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM icons');
        res.send(result.rows)
    } catch(err) {
        res.send(err)
    }
}

const post_icon = async (req, res) => {
    const lat = req.body.lat
    const lon = req.body.lon
    const message = req.body.message
    const item = req.body.item  

    if (!isNaN(lat && lon)) {
        try {
            await pool.query('INSERT INTO icons (lat, lon, message, item) VALUES ($1,$2,$3,$4)', [lat, lon, message, item])
            res.send('success!')
        } catch (err) {
            res.send(err)
        }
    } else {
        res.send('needs to be a number')
    }
}

module.exports = {
    fetch_icon,
    post_icon
}