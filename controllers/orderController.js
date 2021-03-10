const { Order } = require('../models/order');
const { OrderItem } = require('../models/orderItem');

//@desc     Create Order
//@route    POST /api/v1/orders
//@access   PRIVATE
exports.createOrder = async (req, res) => {
  try {
    const orderItemsIds = Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
      })
    );
    const orderItemsIdsResolved = await orderItemsIds;

    const totalPrices = await Promise.all(
      orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate(
          'product',
          'price'
        );
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
      })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

    let order = new Order({
      orderItems: orderItemsIdsResolved,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user,
    });
    order = await order.save();

    if (!order) return res.status(400).send('the order cannot be created!');

    res.send(order);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(error);
  }
};

//@desc     Get all Orders
//@route    GET /api/v1/orders
//@access   PRIVATE
exports.getOrders = async (req, res) => {
  try {
    const orderList = await Order.find()
      .populate('user', 'name')
      .sort({ dateOrdered: -1 });

    if (!orderList) {
      res.status(500).json({ success: false });
    }
    res.send(orderList);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(error);
  }
};

//@desc     Get Order
//@route    GET /api/v1/orders/:id
//@access   PRIVATE
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: 'category' },
      });
    if (!order) {
      return res.status(404).send('Order not found');
    }
    res.send(order);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(error);
  }
};

//@desc     Update Status of orders
//@route    PUT /api/v1/orders/:id
//@access   PRIVATE
exports.updateOrderStatus = async (req, res) => {
  try {
    let order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ msg: 'Order does not exist' });
    }

    res.status(200).send(order);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(err);
  }
};

//@desc     Delete  Order
//@route    DELETE /api/v1/orders/:id
//@access   PRIVATE
exports.deleteOrder = async (req, res) => {
  try {
    let order = await Order.findByIdAndRemove(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: 'Order does not exist' });
    }

    res.status(200).json({ success: true, msg: 'Order deleted!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
    console.log(err);
  }
};
