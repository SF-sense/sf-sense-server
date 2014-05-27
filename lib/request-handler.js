var util = require('./utility');
var Incident = require('../models/incident');

exports.auth = function(req, res) {

};

/**
get data from the local mongodb db
**/
exports.getData = function(req, res) {
	Incident.find(function(err, incidents){
		return incidents;
	});
};
