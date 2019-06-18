const express = require('express');
const app = express();
const data = require('./Routes/data');

app.get('/data/fetch', data.fetch_data)

app.listen(3500, () => console.log('listening on 3500'))