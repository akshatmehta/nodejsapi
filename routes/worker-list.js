var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from tbl_worker', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});


router.get('/:id', function (req, res) {
    let worker_id = req.params.id;
    if (!worker_id) {
        return res.status(400).send({ error: true, message: 'Please provide Worker ID' });
    }
    connection.query('SELECT * FROM tbl_worker where worker_id=?', worker_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Worker list.' });
    });
});

//rest api to create a new customer record into mysql database
router.post('/add', function (req, res) {
	var params  = req.body;
	console.log(params);
	connection.query('insert into tbl_worker set ?', params, function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });


 
//rest api to update record into mysql database
router.put('/update', function (req, res) {
   connection.query('UPDATE `tbl_worker` SET `worker_name`=?, `gender`=?, `mobile_no`=?, `password`=?, `email_id`=?, `address`=?, `area_id`=?, `photo`=?, `join_date`=?, `subcategory_id`=?, `subcategory_charge`=?, `document_1`=?, `document_2`=?, `adharcard`=?, `is_verify`=?, `is_block`=?  where `worker_id`=?', [req.body.worker_name,req.body.gender,req.body.mobile_no,req.body.password,req.body.email_id,req.body.address,req.body.area_id,req.body.photo,req.body.join_date,req.body.subcategory_id,req.body.subcategory_charge,req.body.document_1,req.body.document_2,req.body.adharcard,req.body.is_verify,req.body.is_block,req.body.worker_id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});



 //rest api to delete record from mysql database
 router.delete('/delete', function (req, res) {

	console.log(req.body);
	connection.query('DELETE FROM `tbl_worker` WHERE `worker_id`=?', [req.body.worker_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end('Record has been deleted!');
	 });
 });

module.exports = router;
