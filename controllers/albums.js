const {response} = require('express');

const Post = require('../models/albums');


const postsGet = async(req, res = response) =>  {
    const {limit = 10, from=0} = req.query;

    const albums = await Post.find()
    .skip(from)
    .limit(Number(limit));

    const total = await Post.countDocuments();

    res.json({albums, total});
}

module.exports = {
    albumsGet
}