var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	var params  = req.body;
	console.log(params);
	connection.query('insert into tbl_area set ?', params, function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });

 module.exports = router;