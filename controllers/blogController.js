const express = require('express');
var router = express.Router();
var { Blog }  = require('../models/blog');
var ObjectId = require('mongoose').Types.ObjectId;
router.get('/', (req, res) => {
    Blog.find((err, docs)=>{
        if (!err) {
            res.send(docs);
        }
        else {
            console.log('Error in retreiving posts: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.get('/:id', (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send('No record with given id:  ${req.params.id}');
        Blog.findById(req.params.id, (err, docs) => {
            if (!err) {
                res.send(docs);
            }
            else {
                console.log('Error in retreiving post: ' + JSON.stringify(err, undefined, 2));
            }
        });
});

router.post('/', (req,res) => {
    var newPost = new Blog({
        title: req.body.title,
        title_desc: req.body.title_desc,
        body: req.body.body,
        createdBy: req.body.createdBy
    });
    newPost.save((err,doc)=>{
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in saving post: ' + JSON.stringify(err, undefined, 2));
        }
    });
})

router.put('/:id', (req,res)=>{
    if (!ObjectId.isValid(req.params.id))
            return res.status(400).send('No record with given id:  ${req.params.id}');
    var newPost = {
        title: req.body.title,
        title_desc: req.body.title_desc,
        body: req.body.body,
        createdBy: req.body.createdBy
    };
    Blog.findByIdAndUpdate(req.params.id, { $set: newPost }, {new: true }, ( err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in updating post: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id:  ${req.params.id}');
    Blog.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        }
        else {
            console.log('Error in deleting post: ' + JSON.stringify(err, undefined, 2));
        }
    });
});
module.exports = router;