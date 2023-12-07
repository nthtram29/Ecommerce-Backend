const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddlleware } = require("../middleware/authMiddleware");

// router.post('/create', ProductController.createProduct)
router.post('/create', ProductController.createProduct)
router.put('/update-product/:id', authMiddlleware, ProductController.updateProduct)
router.delete('/delete-product/:id',authMiddlleware, ProductController.deleteProduct)
router.get('/get-all', ProductController.getAllProduct)
router.get('/get-details/:id', ProductController.getDetailsProduct)
router.post('/delete-many',authMiddlleware, ProductController.deleteMany)
router.get('/get-all-type', ProductController.getAllType)
router.get('/get-all-hot', ProductController.getAllProductHot)



module.exports = router