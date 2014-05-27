var mongoose = require('mongoose');

var incidentSchema = mongoose.Schema({
	id: { type: String, required: true, index: { unique: true } },
	time: {type : String},
	category: {type : String},
	district: {type : String},
	address: {type : String},
	description: {type : String},
	day : {type : String},
	resolution : {type : String},
	date : {type : String},
	longitude : {type : String},
	latitude : {type : String}
});

var Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
