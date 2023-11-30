const {response} = require('express');

const Post = require('../models/post');


const postsGet = async(req, res = response) =>  {
    const {limit = 10, from=0} = req.query;

    const posts = await Post.find()
    .skip(from)
    .limit(Number(limit));

    const total = await Post.countDocuments();

    res.json({posts, total});
}

module.exports = {
    postsGet
}