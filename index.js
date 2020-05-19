const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database'); 
const bodyParser = require('body-parser');
var blogController = require('./controllers/blogController');
const cors = require('cors');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, { useNewUrlParser: true }, (err)=>{
    if (err) {
        console.log('Could not connect to database', err);
    }
    else {
        console.log('Connected to database: ' + config.db);
    }
});

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use('/blogs', blogController);
app.listen(3000, () => console.log('Server started at port 3000'));

