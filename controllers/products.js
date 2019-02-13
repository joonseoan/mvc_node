const Product = require('../models/product');

const products = [];

exports.getAddProducts = (req, res, next) => {

    res.render('addProducts', {
        docTitle: 'Add Products',
        path: '/admin/addProducts',
        activeAddProducts: true,
        productCSS: true
    });

}

exports.postAddProducts = (req, res, next) => {
    
    console.log('req.body.title: ', req.body.title)
    
    const product = new Product(req.body.title);

    product.save();

    res.redirect('/');

}

exports.getProducts = async (req, res, next) => {

    // error : no products.json file or empty array in products.json file.
    // when 'error' with products.length == 0, it returns [] to shop.ejs file.
    Product.fetchAll(products => {
        res.render('shop', { 
            products, 
            docTitle: 'Shop', 
            path: '/', 
            hasProducts: products.length > 0,
            activeShop: true,
            mainCSS: true
      
         });
    });
        
 }