const {Router} = require('express');
const {check} = require('express-validator');
const Role = require('../models/role');

const { postsGet} = require('../controllers/posts');


const router = Router();

router.get('/', postsGet);


module.exports = router;