const { Order } = require('../models/order');
const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  deleteOrder,
  getTotalSaleSum,
  getCountOfOrders,
  getUserOrders,
} = require('../controllers/orderController');
const router = express.Router();

router.route('/').post(createOrder).get(getOrders);
router.route('/:id').get(getOrder).put(updateOrderStatus).delete(deleteOrder);

router.get('/get/totalsales', getTotalSaleSum);

router.get(`/get/count`, getCountOfOrders);

router.get(`/get/userorders/:userid`, getUserOrders);

module.exports = router;
