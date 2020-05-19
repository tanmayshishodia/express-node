const express = require('express');
const app = express();
const { mongoose } = require('./config/database.js');
const bodyParser = require('body-parser');
var blogController = require('./controllers/blogController');
const cors = require('cors');


app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Our app is running on port ${ PORT }');
});

app.use('/blogs', blogController);


