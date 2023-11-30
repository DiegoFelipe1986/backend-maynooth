const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { getProducts } = require('../controllers/products');

/**
 * @swagger
 * /products:
 *   get:
 *     description: Get all products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized (invalid or missing token)
 */
router.get('/', [verifyToken, getProducts]);

module.exports = router;
