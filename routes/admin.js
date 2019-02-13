const express = require('express');
const router = express.Router();

// set up a controller and import that from the controller file
const { getAddProducts, postAddProducts } = require('../controllers/products');

// const products = [];

// 2) get AddProducts
router.get('/addProducts', getAddProducts);

// 1) without controller 
// router.get('/addProducts', (req, res, next) => {

//     res.render('addProducts', {
//         docTitle: 'Add Products',
//         path: '/admin/addProducts',
//         activeAddProducts: true,
//         productCSS: true
//     });

// });

router.post('/addProducts', postAddProducts);

module.exports = router;
