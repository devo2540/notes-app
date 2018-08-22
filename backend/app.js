const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

// connect to database
mongoose.connect('mongodb+srv://devo2540:txCoder2540@cluster0-2csbv.mongodb.net/notes-app?retryWrites=true', { useNewUrlParser: true } )
    .then(() => {
        console.log('Connected to database!')
    })
    .catch(() => {
        console.log('Connection to database failed!');
    })

app.use(bodyParser.json()); // parse JSON data
// app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // no matter what domain app is running on, allowed to access server resources
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // incoming request may have these extra headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

// save to database
app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added succesfully',
            postId: createdPost._id
        });
    });
});

// fetch from database
app.get('/api/posts', (req, res, next) => {
    // find ALL posts in database
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts: documents
        });
    });
});

// delete post from database
app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);

        res.status(200).json({
            message: 'Post Deleted'
        });
    });
});

module.exports = app;