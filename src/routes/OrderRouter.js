const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const { authUserMiddlleware, authMiddlleware } = require("../middleware/authMiddleware");

router.post('/create/:id', authUserMiddlleware, OrderController.createOrder)
router.get('/get-all-order/:id', authUserMiddlleware, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.delete('/cancel-order/:id',authUserMiddlleware, OrderController.cancelOrderDetails)
router.get('/get-all-order',authMiddlleware, OrderController.getAllOrder)
router.get('/get-revenue-by-customer',authMiddlleware, OrderController.getRevenueByCustomers)
router.get('/get-revenue',authMiddlleware, OrderController.getRevenue)



module.exports = router