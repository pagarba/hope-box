const express = require('express');
const app = express();
const data = require('./Routes/data');
const path = require('path');

app.get('/data/fetch', data.fetch_data)

app.use(express.static(path.join(__dirname, 'client/build')))

app.listen(3500, () => console.log('listening on 3500'))