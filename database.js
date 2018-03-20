var mysql = require("mysql");
// Create MySQL connection.
var pool = mysql.createPool({
	connectionLimit : 10, 
	host: "localhost",
	user: "root",
	password: "",
	database: "nodejs" //Database Name
});

pool.getConnection((err, conn) => {
	if (err) throw err;
});

module.exports = pool;