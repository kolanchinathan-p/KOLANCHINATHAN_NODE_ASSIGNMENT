const express = require("express");
const router = express.Router();

let categories = [];
let products = [];
let count = 0;

var store = require("./store.js");

//1. List Category (eg URL: http://localhost:3000/api/category)
router.get("/", (req, res, next) => {

	store.getAllCategory((err, rows) => {
		if (err)
			return next(err);
		categories = rows;
		count = categories.length;
		if(categories.length > 0) {
			res.status(200);
			res.json({
				categories: categories,
				count: count
			});
		}
		else{
			let error = "No Category List found";
			res.status(204);
			res.json({
				error: error,
				count: count
			});
		}
	});
    
});

//Get All Products
router.get("/getAllProducts", (req, res, next) => {
    
	store.getAllProducts((err, rows) => {
		if (err)
			return next(err);
		products = rows;
		count = products.length;
		if(products.length > 0) {
			res.status(200);
			res.json({
				products: products,
				count: count
			});
		}
		else{
			let error = "No Products List found ";
			res.status(204);
			res.json({
				error: error,
				count: count
			});
		}
            
	});
   
});

//Get Products by CategoryID (eg URL: )
router.get("/getProductCategoryId/:id", (req, res, next) => {
	let id = req.params.id;

	if(isNaN(id)){
		let error = "Invalid category id";
		res.status(400);
		res.json({
			error: error,
			count: count
		});
	}
	else {
		store.getAllProductsByCategoryID(id, (err, rows) => {
			if (err)
				return next(err);
			products = rows;
			count = products.length;
			if(products.length > 0) {
				res.status(200);
				res.json({
					products: products,
					count: count
				});
			}
			else{
				res.status(204);
				let error = "No Products List found for the category id "+ id;
				res.json({
					error: error,
					count: count
				});
			}
              
		});
	}
   
});

module.exports = router;
