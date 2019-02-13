const fs = require('fs');
const path = require('path');

// const products = [];

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {

        // path.dirname(process.mainModule.filename) : current root directory
        console.log('root directory: ', path.dirname(process.mainModule.filename));
        
        // 'data' at data folder, at json-based file
        const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        console.log(filePath);

        // It is an asychronous function. However, it does not have a return.
        //      Therefore, no need to think about the order.
        fs.readFile(filePath, (err, res) => {
            
            console.log(res);
            
            let products = [];
            
            if(!err) {

                // read json as an object or array
               products = JSON.parse(res);

            }

            // object of constuctor
            products.push(this);
            
            // stringfy : javascript array or object => json format
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                console.log(err);
            });

        });

        // this:  Product { title: 'adfasf' }
        console.log('this: ', this);// an object to be created on the basis of this class
        
        // this vs this.title
        // When we put this, it stores an an object [{title: 'dfa'}]
        //      because all constructor values are stored.

        // when we put this.title, it stores as an prmitive type [ 'dfa' ]
        // products.push(this);
    }

    // static: can retrieve value directly from class
    
    // for 1) and 2-1) 
    // static fetchAll() {

    // for 2 - 2) solution
    static fetchAll(callback) {

        // 2 - 1) with filesystem, alternatively used for database
        const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        
        // by using fs
        // Keep in mind that it is an asynchronous function.
        //      that means that invokation of the callback inside exists in fs's emmiter.
        //      readFile[filePath] = function (err, res) {}
        //      Therefore, we do not know when it returns the value.

        // [Issuess]
        // No return of fetchAll() here.
        // Also, /controllers/products
        /* 
            const products = Product.fetchAll();
            console.log('products$$$$$$$$$$$$$$$$$$$$$$$$$$: ', products); // undefined.
        */ 
       // Therefore, in shop.ejs, products.length is 'undefined'

        // fs.readFile(filePath, (err, res) => {
        //    if(err) return []; // at least empty
        //    console.log('JSON.parse(): ', JSON.parse(res));
        //    return JSON.parse(res);
        // });
        
        // Instructor's solution
        // 2 - 2) with filesystem, alternatively used for database

        fs.readFile(filePath, (err, res) => {
           if(err) return callback([]); // at least empty
           
           // to confirm JSON.parse
           console.log('JSON.parse(): ', JSON.parse(res));
           
           // invoke here
           callback(JSON.parse(res));
        });

        // ---------------------------------------------------------

        // 1) without file system
        // returns the current products that this class has
        // please, go to controllers/products
        
        // return products;
    }

}