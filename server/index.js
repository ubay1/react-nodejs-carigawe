const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const routes = require('./routes/index');
app.use('/api', routes);

const PORT = 8000;
app.listen(PORT,() => {
    console.log(`Server is listening to port ${PORT}`)
})