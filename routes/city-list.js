var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from tbl_city', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

//rest api to create a new customer record into mysql database
router.post('/add', function (req, res) {
	var params  = req.body;
	console.log(params);
	connection.query('insert into tbl_city set ?', params, function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });


 
//rest api to update record into mysql database
router.put('/update', function (req, res) {
   connection.query('UPDATE `tbl_city` SET `category_name`=? where `city_id`=?', [req.body.city_name,req.body.city_id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});



 //rest api to delete record from mysql database
 router.delete('/delete', function (req, res) {

	console.log(req.body);
	connection.query('DELETE FROM `tbl_city` WHERE `city_id`=?', [req.body.city_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end('Record has been deleted!');
	 });
 });

 router.get('/:id', function (req, res) {
    let city_id = req.params.id;
    if (!city_id) {
        return res.status(400).send({ error: true, message: 'Please provide City ID' });
    }
    connection.query('SELECT * FROM tbl_city where city_id=?', city_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'city list.' });
    });
});

module.exports = router;
