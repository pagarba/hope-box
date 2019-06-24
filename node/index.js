const express = require('express');
const app = express();
const data = require('./Routes/data');
const path = require('path');
const bodyParser = require('body-parser')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


app.get('/data/fetch', data.fetch_data)
app.post('/data/post', data.post_data)


// connects the build in the frontend
app.use(express.static(path.join(__dirname, '../client/build')))

app.listen(3500, () => console.log('listening on 3500'))