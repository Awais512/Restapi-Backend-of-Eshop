const { Order } = require('../models/order');
const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');
const router = express.Router();

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrder).put(updateOrderStatus).delete(deleteOrder);

module.exports = router;
