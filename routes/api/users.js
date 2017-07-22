var express = require('express');
var User = require('../../models/User');
var route = express.Router();

route.get('/users/s/:searchString', function(req, res) {
	var searchString = req.params.searchString || '';

	if (searchString != '') {
		User
			.find({
				$or: [
					{
						full_name: {
							$regex: searchString,
							$options: 'i'
						}
					},
					{
						nik: {
							$regex: searchString,
							$options: 'i'
						}
					}
				]
			})
			.select('-password -__v')
			.exec(function(err, users) {

				if (err) {
					res.json([]);
				} else {
					res.json(users);
				}

			});
	} else {
		res.json([]);
	}
});


route.post('/user', function(req, res) {
	
});

route.route('/user/:userId')
	.get(function(req, res) {

	})
	.put(function(res, req) {})
	.delete(function(res, req) {});


module.exports = route;