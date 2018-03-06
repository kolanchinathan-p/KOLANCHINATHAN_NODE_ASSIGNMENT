const express = require("express");
const router = express.Router();

var fs = require('fs')
let products = [];

//Read the Db.json config file to get all list of Products.
fs.readFile('./db.json', 'utf-8', function(err, data) {
	if (err) throw err
    products = JSON.parse(data);
    console.log(products.length);
})

//set default variables
let totalProducts = products.length;
let pageSize = 4;
let currentPage = 1;
let productsArrays = [];
let productsList = [];
let pageCount = Math.round(products.length / pageSize);

//1. List products with pagination (eg URL: http://localhost:3000/api/products?page=2)
router.get("/", function(req, res) {

    //split list into groups
    while (products.length > 0) {
        productsArrays.push(products.splice(0, pageSize));
    }

    //set current page if specifed as get variable 
    if (typeof req.query.page !== 'undefined') {
      currentPage = +req.query.page;
    }

    //show list of students from group
    productsList = productsArrays[+currentPage - 1];

    res.json({
        products: productsList,
        pageSize: pageSize,
        totalProducts: totalProducts,
        pageCount: pageCount,
        currentPage: currentPage
        });
});

//2. Add product
router.post("/add", function(req, res) {
    //Get the Product input
    let product = req.body;
    //Push the request product to Products Array
    products.push(product);
    
    //Write the db.json with updated Products
    fs.writeFile('./db.json', JSON.stringify(products), 'utf-8', function(err) {
    if (err) throw err
      console.log('Product Added Successfully!')
    });
    res.status(201);
    res.json(products);
});

//3. Update product
router.put("/edit/:id", function (req, res) {
    let product = req.body;
    let id = req.params.id;
    let idx = products.findIndex(p => p.id == id);
    product.id = id;
    products[idx] = product;
    
    //Write the db.json with updated Products
    fs.writeFile('./db.json', JSON.stringify(products), 'utf-8', function(err) {
    if (err) throw err
        console.log('Product Updated Successfully!')
    });
    res.status(201);
    res.json(products);
})
//4. Delete product
router.delete("/edit/:id", function (req, res) {
    let id = req.params.id;
    let idx = products.findIndex(p => p.id == id);
    //remove the items from products array.
    if (idx > -1) {
        products.splice(idx, 1);
    }
    
    //Write the db.json with updated Products
    fs.writeFile('./db.json', JSON.stringify(products), 'utf-8', function(err) {
    if (err) throw err
        console.log('Product has been deleted Successfully!')
    });
    res.status(201);
    res.json(products);
})
//5. Get product by name / id
//Get Product by ID
router.get("/getProductId/:id", function (req, res) {
    let id = req.params.id;
    let idx = products.findIndex(p => p.id == id);
    res.status(201);
    res.json(products[idx]);
});

//Get Product by Name
router.get("/getProductName/:productName", function (req, res) {
    let productName = req.params.productName;
    let idx = products.findIndex(p => p.productName == productName);
    if (!users[username]){
        return  new Error(
            'No Product matching '
             + productName
            );
    }
    else{
        res.status(201);
        res.json(products[idx]);
    }
    
});

//6. Search product by name (should support pagination) ex url: http://localhost:3000/api/products/search?productName=mo

router.get("/search", function(req, res) {
    
    let searchStr = req.query.productName;
    
    const srchRsltProducts = products.filter(p => p.productName.indexOf(searchStr) > -1);
    totalProducts = srchRsltProducts.length;
    
    if(srchRsltProducts.length > pageSize){
        pageCount = Math.round(srchRsltProducts.length / pageSize);
    }
    else{
        pageCount = srchRsltProducts.length;
    }
   
    //split list into groups
    while (srchRsltProducts.length > 0) {
        productsArrays.push(srchRsltProducts.splice(0, pageSize));
    }

    //set current page if specifed as get variable 
    if (typeof req.query.page !== 'undefined') {
      currentPage = +req.query.page;
    }

    //show list of students from group
    productsList = productsArrays[+currentPage - 1];

    res.json({
        products: productsList,
        pageSize: pageSize,
        totalProducts: totalProducts,
        pageCount: pageCount,
        currentPage: currentPage
        });
});

//7. Get products grouped by category
//Group by attribute
Array.prototype.groupBy = function(prop) {
    return this.reduce(function(groups, item) {
      const val = item[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
  }

router.get("/groupByCategory", function(req, res) {

    const groupedByCategory = products.groupBy('category');
    
    res.json({
        products: groupedByCategory
    });
});

//8. global search
router.get("/siteSearch", function(req, res) {
    
    let searchStr = req.query.q;

    const srchRsltProducts = products.filter(p => (
        p.id.indexOf(searchStr) > -1 ||
        p.category.indexOf(searchStr) > -1 ||
        p.price == searchStr ||
        p.inTheBox.indexOf(searchStr) > -1 ||
        p.modelNumber.indexOf(searchStr) > -1 ||
        p.size.indexOf(searchStr) > -1 ||
        p.color.indexOf(searchStr) > -1 ||
        p.touchScreen.indexOf(searchStr) > -1 ||
        p.image.indexOf(searchStr) > -1 ||
        p.productName.indexOf(searchStr) > -1 )
    );

    totalProducts = srchRsltProducts.length;
    
    if(srchRsltProducts.length > pageSize){
        pageCount = Math.round(srchRsltProducts.length / pageSize);
    }
    else{
        pageCount = srchRsltProducts.length;
    }
   
    //split list into groups
    while (srchRsltProducts.length > 0) {
        productsArrays.push(srchRsltProducts.splice(0, pageSize));
    }

    //set current page if specifed as get variable 
    if (typeof req.query.page !== 'undefined') {
      currentPage = +req.query.page;
    }

    //show list of students from group
    productsList = productsArrays[+currentPage - 1];

    res.json({
        products: productsList,
        pageSize: pageSize,
        totalProducts: totalProducts,
        pageCount: pageCount,
        currentPage: currentPage
        });
});
module.exports = router;
