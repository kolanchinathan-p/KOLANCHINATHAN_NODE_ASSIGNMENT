const express = require("express");
const mysql = require("mysql");
const router = express.Router();

let categories = [];
let products = [];

// Create MySQL connection.
var pool = mysql.createPool({
    connectionLimit : 10, 
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs"
  });

//1. List Category (eg URL: http://localhost:3000/api/category)
router.get("/", function(req, res, next) {
    getAllCategory( function(err, rows) {
        if (err)
          return next(err);
          categories = rows;
          if(categories.length > 0) {
            res.status(201);
            res.json(categories);
          }
          else{
            let error = 'No Category List found';
            res.json({ error });
          }
    });
    
});

function getAllCategory(cb){

    pool.getConnection(function(err, conn) {
        if (err)
            return cb(err);

        conn.query("SELECT CategoryID as id, CategoryName as name FROM productcategories",
            function(err, rows) {
            conn.release();
            cb(err, rows);
        });
    });
}

//Get All Products
router.get("/getAllProducts", function (req, res, next) {
    
    getAllProducts(function(err, rows) {
        if (err)
            return next(err);
            products = rows;

            if(products.length > 0) {
            res.status(201);
            res.json(products);
            }
            else{
            let error = 'No Products List found ';
            res.json({ error });
            }
            
    });
   
});

//Get Products by CategoryID (eg URL: )
router.get("/getProductCategoryId/:id", function (req, res, next) {
    let id = req.params.id;

    if(isNaN(id)){
        let error = 'Invalid category id';
        res.json({ error });
    }
    else {
        getAllProductsByCategoryID(id, function(err, rows) {
            if (err)
              return next(err);
              products = rows;
    
              if(products.length > 0) {
                res.status(201);
                res.json(products);
              }
              else{
                let error = 'No Products List found for the category id '+ id;
                res.json({ error });
              }
              
        });
    }
   
});

function getAllProductsByCategoryID(id, cb){
    pool.getConnection(function(err, conn) {
        if (err)
            return cb(err);

        conn.query("SELECT p.* FROM products p INNER JOIN productcategories pc ON p.ProductCategoryID=pc.CategoryID  WHERE p.ProductCategoryID= ? ", [id],
            function(err, rows) {
            conn.release();
            cb(err, rows);
        });
    });

}
function getAllProducts(cb){
    pool.getConnection(function(err, conn) {
        if (err)
            return cb(err);
        conn.query("SELECT p.* FROM products p INNER JOIN productcategories pc ON p.ProductCategoryID=pc.CategoryID",
            function(err, rows) {
            conn.release();
            cb(err, rows);
        });
    });

}

module.exports = router;
