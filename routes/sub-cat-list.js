var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from tbl_subcategory', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

//rest api to create a new customer record into mysql database
router.post('/add', function (req, res) {
	var params  = req.body;
	console.log(params);
	connection.query('insert into tbl_category set ?', params, function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });


 
//rest api to update record into mysql database
router.put('/update', function (req, res) {
   connection.query('UPDATE `tbl_subcategory` SET `subcategory_name`=?,`category_id`= ? where `subcategory_id`=?', [req.body.subcategory_name,req.body.category_id,req.body.subcategory_id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});



 //rest api to delete record from mysql database
 router.delete('/delete', function (req, res) {

	console.log(req.body);
	connection.query('DELETE FROM `tbl_subcategory` WHERE `subcategory_id`=?', [req.body.subcategory_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end('Record has been deleted!');
	 });
 });

 router.get('/:id', function (req, res) {
    let subcategory_id = req.params.id;
    if (!subcategory_id) {
        return res.status(400).send({ error: true, message: 'Please provide Subcategory ID' });
    }
    connection.query('SELECT * FROM tbl_subcategory where subcategory_id=?', subcategory_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Subcategory list.' });
    });
});

module.exports = router;
