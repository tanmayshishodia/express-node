const mongoose = require('mongoose');
var Blog = mongoose.model('Blog', {
    title: {
        type: String,
    },
    title_desc: {
        type: String,
    },
    body: {
        type: String,
    },
    createdBy: {
        type: String
    }
});

module.exports = { Blog };