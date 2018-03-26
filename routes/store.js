var pool = require("../database.js");

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
	},
	createUser (user, cb) {
		pool.getConnection((err, conn) => {
			if (err)
				return cb(err);
			 var values = [];
			 
             values.push([user.email, user.password]);
			
			 conn.query('INSERT INTO users (UserEmail, UserPassword) VALUES ?', [values], (err, result) => {
				conn.release();
				
				cb(err, result.insertId);
			});
			
		});
	},
};
