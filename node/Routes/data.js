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
    const status = req.body.status

    if (!isNaN(imsi && lat && lon)) {
        try {
            await pool.query('INSERT INTO PEOPLE (imsi, lat, lon, message, status) VALUES ($1,$2,$3,$4,$5)', [imsi, lat, lon, message, status])
            res.send('success!')
        }   catch(err) {
            res.send(err)
        }
    } else if (imsi)  {
       try {
        await pool.query('UPDATE PEOPLE SET status=($1) WHERE imsi=($2)', [status, imsi])
        await pool.query('UPDATE PEOPLE SET message=($1) WHERE imsi=($2)', [message, imsi])
        res.send('success!')
       } catch(err) {
           res.send(err)
       }
    }    
}


module.exports = {
    fetch_data,
    post_data
}