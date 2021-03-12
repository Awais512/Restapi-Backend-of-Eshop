const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    cb(null, `${fileName}_${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getProductCount,
  getFeaturedProduct,
} = require('../controllers/productController');
const router = express.Router();

router.route(`/`).get(getProducts).post(upload.single('image'), createProduct);

router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);
router.get('/get/count', getProductCount);
router.get('/get/featured/:count', getFeaturedProduct);

module.exports = router;
