const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

const routes = require('./routes/index');
app.use('/api', routes);

app.get('/', function(req, res) {
    res.render('test');
});

app.get('/verif_gagal', function(req, res) {
    res.render('verif_gagal');
});

const PORT = 8000;
app.listen(PORT,() => {
    console.log(`Server is listening to port ${PORT}`)
})