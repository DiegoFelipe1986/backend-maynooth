const {Router} = require('express');


const { albumsGet} = require('../controllers/albums');


const router = Router();

router.get('/', albumsGet);


module.exports = router;