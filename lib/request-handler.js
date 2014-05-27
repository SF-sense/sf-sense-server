var util = require('./utility');
var Incident = require('../models/incident');

/**
get data from the local mongodb db
**/
exports.getData = function(req, res) {
	Incident.find(function(err, incidents){
		return incidents;
	});
};

// get incidents 1/2 miles around an address
exports.getIncidentsNearAddress = function() {

};
