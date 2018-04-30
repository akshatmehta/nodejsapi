var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from tbl_booking', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

//rest api to create a new customer record into mysql database
router.post('/add', function (req, res) {
	var params  = req.body;
	console.log(params);
	connection.query('INSERT INTO tbl_booking SET ?', params, function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });

 //rest api to update record into mysql database
router.put('/update', function (req, res) {
	connection.query('UPDATE `tbl_booking` SET `booking_date`=?,`worker_id`= ?,`user_id` = ?,`price`= ?,`is_complete`=?, `address`=? , `area_id`=? , `booking_time`=?  where `booking_id`=? ', [req.body.booking_date,req.body.worker_id, req.body.user_id,req.body.price,req.body.is_complete,req.body.address,req.body.area_id,req.body.booking_time,req.body.booking_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });
 
 //rest api to delete record from mysql database
 router.delete('/delete', function (req, res) {
	console.log(req.body);
	connection.query('DELETE FROM `tbl_booking` WHERE `booking_id`=?', [req.body.booking_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end('Record has been deleted!');
	 });
 });

 router.get('/:id', function (req, res) {
    let booking_id = req.params.id;
    if (!booking_id) {
        return res.status(400).send({ error: true, message: 'Please provide Booking ID' });
    }
    connection.query('SELECT * FROM tbl_booking where booking_id=?', booking_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'booking list.' });
    });
});

module.exports = router;