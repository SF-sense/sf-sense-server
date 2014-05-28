var util = require('./utility');
var Incident = require('../models/incident');

/**
get data from the local mongodb db
**/
exports.getNear = function(req, res) {
	var longitude = req.query.longitude;
	var latitude = req.query.latitude;
	var radians = 0.014;
	if (longitude === undefined || latitude === undefined) {
		Incident.find(function(err, incidents){
			res.send(200, incidents);
		});		
	} else {
		console.log('dist :' + radians);
		var args = {coords : { $nearSphere : [longitude, latitude], $maxDistance : radians}};
		Incident.find(args, function(err, incidents){
			console.log('found ' + incidents.length + " incidents");
			res.send(200, incidents);
		});
	}
};
