var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from tbl_contact', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

//rest api to create a new customer record into mysql database
router.post('/add', function (req, res) {
	var params  = req.body;
	console.log(params);
	connection.query('insert into tbl_contact set ?', params, function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });


 
//rest api to update record into mysql database
router.put('/update', function (req, res) {
   connection.query('UPDATE `contact` SET `tbl_contact_name`=?, `email_id`=?, `mobile_no`=? where `contact_id`=?', [req.body.contact_name,req.body.email_id,req.body.mobile_no,,req.body.contact_id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});



 //rest api to delete record from mysql database
 router.delete('/delete', function (req, res) {

	console.log(req.body);
	connection.query('DELETE FROM `tbl_contact` WHERE `contact_id`=?', [req.body.contact_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end('Record has been deleted!');
	 });
 });

 router.get('/:id', function (req, res) {
    let contact_id = req.params.id;
    if (!contact_id) {
        return res.status(400).send({ error: true, message: 'Please provide Contact ID' });
    }
    connection.query('SELECT * FROM tbl_contact where contact_id=?', contact_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'contact list.' });
    });
});


module.exports = router;
