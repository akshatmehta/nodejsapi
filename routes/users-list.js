var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from tbl_user', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"category": results,"status": 200, "error": null  }));
	});
});

//rest api to create a new customer record into mysql database
router.post('/add', function (req, res) {
	var params  = req.body;
	console.log(params);
	connection.query('insert into tbl_user set ?', params, function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });


 
//rest api to update record into mysql database
router.put('/update', function (req, res) {
   connection.query('UPDATE `tbl_user` SET `user_name`=?,`gender`=?,`mobile_no`=?,`password`=?,`email_id`=?,`address`=?,`area_id`=? where `user_id`=?', [req.body.user_name,req.body.gender,req.body.mobile_no,req.body.password,req.body.email_id,req.body.address,req.body.area_id,req.body.user_id], function (error, results, fields) {
	  if (error) throw error;
	  res.end(JSON.stringify(results));
	});
});



 //rest api to delete record from mysql database
 router.delete('/delete', function (req, res) {

	console.log(req.body);
	connection.query('DELETE FROM `tbl_user` WHERE `user_id`=?', [req.body.user_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end('Record has been deleted!');
	 });
 });

 router.get('/:id', function (req, res) {
    let user_id = req.params.id;
    if (!user_id) {
        return res.status(400).send({ error: true, message: 'Please provide Category ID' });
    }
    connection.query('SELECT * FROM tbl_user where user_id=?', user_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'User list.' });
    });
});


module.exports = router;
