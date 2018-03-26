var express = require("express");
var router = express.Router();

let users = [];

var store = require("./store.js");

/* GET users listing. */
router.get("/", function(req, res, next) {
	res.send("respond with a resource");
});

//2. User Register
router.post("/signup", function(req, res, next) {
  let users = req.body;
  
  store.createUser(users, (err, user) => {
    if (err)
      return next(err);
      res.status(200);
      res.json({
          insertId: user,
          msg : 'User has been registered successfully!'
				});
             
  });

	
});
module.exports = router;
