var util = require('./utility');
var Incident = require('../models/incident');
var _ = require('underscore');

var Coords = function(longitude, latitude) {
	this.longitude = longitude;
	this.latitude = latitude;
}

var inside = function(incident) {
	return this.nw.longitude <= incident.longitude && this.ne.longitude >= incident.longitude &&
		this.nw.latitude >= incident.latitude && this.sw.latitude <= incident.latitude;
}

/**
	get data from the local mongodb db
**/
exports.getNear = function(req, res) {
	if (req.query.longitude === undefined || req.query.latitude === undefined) {
		res.send(200, {});
	}

	// defaulting the distance to 500 meters, 1 degree ~ 111.12 kms
	var distance = (req.query.distance || 0.5) / 111.12;
	var pinPoint = new Coords(parseFloat(req.query.longitude), parseFloat(req.query.latitude));

	var context = {
		nw : new Coords(pinPoint.longitude - distance, pinPoint.latitude + distance),
		ne : new Coords(pinPoint.longitude + distance, pinPoint.latitude + distance),
		sw : new Coords(pinPoint.longitude - distance, pinPoint.latitude - distance),
		se : new Coords(pinPoint.longitude + distance, pinPoint.latitude - distance)
	};

	Incident.find(function(err, incidents){
		var filteredIncidents = [];
		filteredIncidents = _.filter(incidents, inside, context);
		console.log('found ' + filteredIncidents.length + ' incidents');
		res.send(200, filteredIncidents);
	});
};
