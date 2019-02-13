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
    
    // 2) with model,
    const product = new Product(req.body.title);

    product.save();

    // 1) without model
    // products.push(req.body.title);
    // console.log(products);

    res.redirect('/');

}

exports.getProducts = async (req, res, next) => {

    // [Issue : can't get products array because of asynchronous fuction in model, fs.readFile()]
    // const products = Product.fetchAll();
    // console.log('products$$$$$$$$$$$$$$$$$$$$$$$$$$: ', products); // undefined.

    // console.log('products at shop: ', Product.fetchAll());
    
    // res.render('shop', { 
    //    products, 
    //    docTitle: 'Shop', 
    //    path: '/', 
    //    hasProducts: products.length > 0,
    //    activeShop: true,
    //    mainCSS: true
 
    // });


    // Insturctor's solution.
    // 'products' : an array from callback of model.

    // Solution tip; ******************************************
    // When we face a sort of this issue, 
    //  1) console.log() return value. In this case, products up and above.
    //  2) make sure that all codes are correct and console shows undefined
    //  3) Implement callback that 'retrieved in the last function which is here 'fs.readFile')
    //      with a condition that all variable values and conditions are correctly available.
    Product.fetchAll(products => {
        // When products are available, it will shoot in fs.readFile()!!!
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