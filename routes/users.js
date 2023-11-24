const {Router} = require('express');
const {check} = require('express-validator');
const Role = require('../models/role');

const { usersGet,
        usersPost,
        usersPatch,
        usersPut,
        usersDelete} = require('../controllers/users');

const { validateFields } = require('../middlewares/validate-fields');


const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('name', 'Name is mandatory').not().isEmpty(),
    check('password', 'Password must content more than 6 digits').isLength(6),
    check('email', 'Email not valid').isEmail(),
    check('role').custom(async (role = '') => {

        const existRoles = await Role.find();
        const roleSearch = existRoles.filter(role => role.role == role)
        console.log(roleSearch)
        if (existRoles.length === 0) {
            throw new Error(`This role ${role} isn't a valid role`);
        }
    }),

    // check('role', 'It´s not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateFields
], usersPost);

router.put('/:id', usersPut);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;