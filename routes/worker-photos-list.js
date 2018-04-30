var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from tbl_workerphotos', function (error, results, fields) {
		if (error) throw error;
		

    });
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));

});


router.get('/:id', function (req, res) {
    let worker_id = req.params.id;
    if (!worker_id) {
        return res.status(400).send({ error: true, message: 'Please provide Worker ID' });
    }
    connection.query('SELECT * FROM tbl_workerphotos where worker_id=?', worker_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Worker list.' });
    });
});


//rest api to create a new customer record into mysql database
router.post('/add', function (req, res) {
	var params  = req.body;
	console.log(params);
	connection.query('INSERT INTO tbl_workerphotos SET ?', params, function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });

 //rest api to update record into mysql database
router.put('/update', function (req, res) {
	connection.query('UPDATE `tbl_workerphotos` SET `worker_id`=?, `photo_path`=?  where `worker_photos_id`=? ', [req.body.worker_id, req.body.photo_path,req.body.worker_photos_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });
 
 //rest api to delete record from mysql database
 router.delete('/delete', function (req, res) {
	console.log(req.body);
	connection.query('DELETE FROM `tbl_workerphotos` WHERE `worker_photos_id`=?', [req.body.worker_photos_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end('Record has been deleted!');
	 });
 });

 
module.exports = router;

