var pool = require('../database.js');

module.exports = {
    getAllProducts (cb) {
        pool.getConnection((err, conn) => {
            if (err)
                return cb(err);
            conn.query("SELECT p.* FROM products p INNER JOIN productcategories pc ON p.ProductCategoryID=pc.CategoryID",
                (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    },
    getAllProductsByCategoryID (id, cb) {
        pool.getConnection((err, conn) => {
            if (err)
                return cb(err);
    
            conn.query("SELECT p.* FROM products p INNER JOIN productcategories pc ON p.ProductCategoryID=pc.CategoryID  WHERE p.ProductCategoryID= ? ", [id], (err, rows) => {
                conn.release();
                cb(err, rows);
            });
        });
    },
    getAllCategory (cb) {
        pool.getConnection((err, conn) => {
            if (err)
                return cb(err);
    
            conn.query("SELECT CategoryID as id, CategoryName as name FROM productcategories",
                function(err, rows) {
                conn.release();
                cb(err, rows);
            });
        });
    }
  }
