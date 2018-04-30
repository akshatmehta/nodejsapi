var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from tbl_area', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});



 //rest api to update record into mysql database
router.put('/update', function (req, res) {
	connection.query('UPDATE `tbl_area` SET `area_name`=?,`city_id`= ?  where `area_id`=?', [req.body.area_name,req.body.city_id, req.body.area_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end(JSON.stringify(results));
	 });
 });
 
 //rest api to delete record from mysql database
 router.delete('/delete', function (req, res) {
	console.log(req.body);
	connection.query('DELETE FROM `tbl_area` WHERE `area_id`=?', [req.body.area_id], function (error, results, fields) {
	   if (error) throw error;
	   res.end('Record has been deleted!');
	 });
 });

 router.get('/:id', function (req, res) {
    let area_id = req.params.id;
    if (!area_id) {
        return res.status(400).send({ error: true, message: 'Please provide area ID' });
    }
    connection.query('SELECT * FROM tbl_area where area_id=?', area_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'area list.' });
    });
});
module.exports = router;
