const pool = require('../queries')

const fetch_data = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM people');
        res.send(result.rows)
    } catch(err) {
        res.send(err)
    }   
}

const post_data = async (req, res) => {
    const imsi = req.body.imsi
    const lat = req.body.lat
    const lon = req.body.lon
    const message = req.body.message

    if (!isNaN(imsi && lat && lon)) {
        try {
            const data = await pool.query('INSERT INTO PEOPLE (imsi, lat, lon, message) VALUES ($1,$2,$3,$4)', [imsi, lat, lon, message])
            res.send('success!')
        }   catch(err) {
            res.send(err)
        }
    } else {
        res.send('needs to be a number')
    }    
}

module.exports = {
    fetch_data,
    post_data
}