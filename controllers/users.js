const {response} = require('express')
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = (req, res = response) =>  {
    const query = req.query;
    res.json({
        msg: 'Get API - Controller',
        query
    });
}

const usersPost = async (req, res = response) =>  {


    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});
    //Email exist
    const existEmail = await User.findOne({email});
    if (existEmail){
        return res.status(400).json({
            msg: 'This email already exist'
        });
    }
    // Encrypt password
    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(user.password, salt);

    await user.save();

    res.json({
        msg: 'Post API - Controller',
        user
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