const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const {
  usersGet,
  usersPost,
  usersPatch,
  usersPut,
  usersDelete,
  findUsersGet,
  loginUser,
  logoutUser
} = require('../controllers/users');

const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/', usersGet);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     parameters:
 *       - name: name
 *         description: User's name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password (must be at least 6 characters)
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: User's email
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       422:
 *         description: Unprocessable Entity (validation error)
 */
router.post('/', [
  check('name', 'Name is mandatory').not().isEmpty(),
  check('password', 'Password must content more than 6 digits').isLength(6),
  check('email', 'Email not valid').isEmail(),
  validateFields
], usersPost);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     description: Update a user by ID
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.put('/:id', usersPut);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get a user by ID
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/:id', findUsersGet);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     description: Delete a user by ID
 *     parameters:
 *       - name: id
 *         description: User's ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
router.delete('/:id', usersDelete);

/**
 * @swagger
 * /users:
 *   patch:
 *     description: Partially update a user
 *     responses:
 *       200:
 *         description: Successful response
 */
router.patch('/', usersPatch);

/**
 * @swagger
 * /users/login:
 *   post:
 *     description: User login
 *     parameters:
 *       - name: email
 *         description: User's email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized (invalid credentials)
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /users/logOut:
 *   post:
 *     description: User logout
 *     responses:
 *       200:
 *         description: Successful response
 */
router.post('/logOut', logoutUser);

module.exports = router;
