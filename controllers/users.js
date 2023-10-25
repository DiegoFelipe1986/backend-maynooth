const {response} = require('express')

const usersGet = (req, res = response) =>  {
    const query = req.query;
    res.json({
        msg: 'Get API - Controller',
        query
    });
}

const usersPost = (req, res = response) =>  {

    const {name, age} = req.body;

    res.json({
        msg: 'Post API - Controller',
        name,
        age
    });
}

const usersPut = (req, res = response) =>  {
    const {id} = req.params;
    res.json({
        msg: 'Put API - Controller',
        id
    });
}

const usersPatch = (req, res = response) =>  {

    res.json({
        msg: 'Patch API - Controller'
    });
}

const usersDelete = (req, res = response) =>  {

    res.json({
        msg: 'Delete API - Controller'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPatch,
    usersPut,
    usersDelete
}