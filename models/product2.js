const fs = require('fs');
const path = require('path');

module.exports = class Product {
    
    constructor(title) {
        this.title = title;
    }

    save() {

        console.log('root directory: ', path.dirname(process.mainModule.filename))
        
        const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
    
        console.log(filePath);

        fs.readFile(filePath, (err, res) => {
            
            // <Buffer 5b 7b 22 74 69 74 6c 65 22 3a 22 64 73 61 66 61 73 66 22 7d 2c 7b 22 74 69 74 6c 65 22 3a 22 66 61 73 64 66 22 7d 2c 7b 22 74 69 74 6c 65 22 3a 22 64 ... >
            console.log('res: ', res);
    
            let products = [];

            // meaningless but need to understand
            if(err) {
                /* 
                    { [Error: ENOENT: no such file or directory, open 'C:\Joon_Cloud\OneDrive\myApps\node\2ndPhase\mvc_logic\data\products.json']
                    errno: -4058,
                    code: 'ENOENT',
                    syscall: 'open',
                    path:
                    'C:\\Joon_Cloud\\OneDrive\\myApps\\node\\2ndPhase\\mvc_logic\\data\\products.json' }
                */
                console.log(err);
            }

            // At first time when it does not have products.json, it will skip the one below,
            //      because it or (filePath) has an error due to no json file.
            if(!err) products = JSON.parse(res);
            
            // this:  Product { title: 'adsfasdf' }
            console.log('this at fs: ', this)
            products.push(this);

            // At the moment it writes a data, the products.json file will be created.
            fs.writeFile(filePath, JSON.stringify(products), (err) => {
                if(err) {
                    console.log(err);
                    return;
                }
            });

            // No error here
            // if(!err) {
            //    products = JSON.parse(res);
            // }

            // products.push(this);
            // fs.writeFile(filePath, JSON.stringify(products), (err) => {
            //     console.log(err);
            // });
        });

        console.log('this: ', this);// an object to be created on the basis of this class
        
    }

    static fetchAll(callback) {

        const filePath = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
        
        fs.readFile(filePath, (err, res) => {
           if(err) return callback([]); // at least empty
           
           console.log('JSON.parse(): ', JSON.parse(res));
           
           callback(JSON.parse(res));
        });

    }

}