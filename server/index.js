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

app.get('/woyo', function(req, res) {
    res.render('woyo');
});

const PORT = 8000;
app.listen(PORT,() => {
    console.log(`Server is listening to port ${PORT}`)
})