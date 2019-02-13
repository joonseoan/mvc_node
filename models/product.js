const fs = require('fs');
const path = require('path');

const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = (callback) => {
        
    fs.readFile(filePath, (err, res) => {

        // no products.json exists or empty array in products.json
        if(err) {

            console.log('dddd') // 
            return callback([]); // at least empty

        } else {

            callback(JSON.parse(res)); // the current array
        }
        
    });

}

module.exports = class Product {
    
    constructor(title) {
        this.title = title;
    }

    save() {

        //2) 
        getProductsFromFile(products => {
                        
            products.push(this);

            fs.writeFile(filePath, JSON.stringify(products), (err) => {

                if(err) {
                    console.log(err);
                    return;
                }
                
            });

        });
        
    }

    static fetchAll(callback) {

        getProductsFromFile(callback);

    }

}