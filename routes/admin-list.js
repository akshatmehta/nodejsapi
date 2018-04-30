var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    connection.query('SELECT * from tbl_admin', function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

router.get('/:id', function (req, res) {
    let admin_id = req.params.id;
    if (!admin_id) {
        return res.status(400).send({ error: true, message: 'Please provide Admin ID' });
    }
    connection.query('SELECT * FROM tbl_admin where admin_id=?', admin_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'Admin list.' });
    });
});
module.exports = router;
